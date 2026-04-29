#!/usr/bin/env node
// scripts/salience-verify.mjs
//
// Google Cloud NL API entity-salience verifier for service-hub pages.
// Run post-publish to check whether the brief's primary entity scores ≥0.30.
//
// Usage:
//   npm run salience -- src/content/service-hubs/technical-seo-audit--de.md
//   npm run salience -- https://6548bf1a.starkrank.pages.dev/services/seo-audit-agentur/ --locale de --targets "SEO Audit Agentur,AISO Score,StarkRank"
//
// Flags:
//   --locale {de|ch-de}   Override locale (default: auto-detect from filename or 'de')
//   --targets "a,b,c"     Override target entities (default: title + schemaAbout + schemaMentions from frontmatter)
//   --top N               Top-N table size (default: 15)
//
// Auth: uses `gcloud auth print-access-token` + `x-goog-user-project` header.
// Project routing: de → starkrank-de-prod, ch-de → starkrank-ch-de-prod.
// Both projects must have language.googleapis.com enabled (done 2026-04-29).
//
// Thresholds (per `reference_google_nlp_api_entity_salience` memory):
//   ≥0.30  STRONG    — entity recognised as primary
//   ≥0.10  meaningful — entity is being noticed
//   <0.10  weak       — topical signal absent
//
// German NL API fragments compound entities ("SEO Audit Agentur" → 5–7 records);
// always aggregate by canonical name (case-insensitive) before comparing.

import fs from 'node:fs/promises';
import path from 'node:path';
import { execSync } from 'node:child_process';

const args = process.argv.slice(2);
if (!args[0] || args.includes('--help') || args.includes('-h')) usage();

const input = args[0];
const flag = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};

let locale = flag('--locale');
const targetsArg = flag('--targets');
const topN = parseInt(flag('--top') ?? '15', 10);

const isUrl = /^https?:\/\//.test(input);
let text, targets, sourceLabel;

if (isUrl) {
  ({ text, targets } = await fromUrl(input));
  sourceLabel = input;
  if (!locale) locale = input.includes('/ch-de/') ? 'ch-de' : 'de';
} else {
  const filePath = path.resolve(input);
  const md = await fs.readFile(filePath, 'utf-8');
  const parsed = fromMarkdown(md);
  text = parsed.text;
  targets = parsed.targets;
  sourceLabel = path.relative(process.cwd(), filePath);
  if (!locale) {
    if (filePath.includes('--ch-de.md')) locale = 'ch-de';
    else if (filePath.includes('--de.md')) locale = 'de';
    else locale = 'de';
  }
}

if (targetsArg) {
  targets = targetsArg.split(',').map((t) => t.trim()).filter(Boolean);
}
if (!targets || targets.length === 0) {
  console.error('No target entities. Pass --targets "Foo,Bar,Baz" or set schemaAbout/schemaMentions in frontmatter.');
  process.exit(2);
}

const project = locale === 'ch-de' ? 'starkrank-ch-de-prod' : 'starkrank-de-prod';

let token;
try {
  token = execSync('gcloud auth print-access-token', { encoding: 'utf-8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
} catch (e) {
  console.error('gcloud auth print-access-token failed. Run `gcloud auth login` first.');
  process.exit(3);
}

const resp = await fetch('https://language.googleapis.com/v1/documents:analyzeEntities', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    'x-goog-user-project': project,
  },
  body: JSON.stringify({
    document: { type: 'PLAIN_TEXT', content: text, language: 'de' },
    encodingType: 'UTF8',
  }),
});

if (!resp.ok) {
  const errText = await resp.text();
  console.error(`NL API ${resp.status}: ${errText.slice(0, 800)}`);
  process.exit(4);
}

const result = await resp.json();
const entities = result.entities ?? [];

const agg = new Map();
for (const e of entities) {
  const key = (e.name ?? '').toLowerCase().trim();
  if (!key) continue;
  const cur = agg.get(key) ?? { sum: 0, instances: 0, mentions: 0, types: new Set(), wiki: '', display: e.name };
  cur.sum += e.salience ?? 0;
  cur.instances += 1;
  cur.mentions += (e.mentions ?? []).length;
  cur.types.add(e.type ?? '');
  if (!cur.wiki && e.metadata?.wikipedia_url) cur.wiki = e.metadata.wikipedia_url;
  agg.set(key, cur);
}

const units = Math.ceil(text.length / 1000);
console.log(`\nSalience verify — ${sourceLabel}`);
console.log(`Locale: ${locale} · Project: ${project} · Body: ${text.length} chars (~${units} NL API units)`);
console.log(`Entities: ${entities.length} raw / ${agg.size} unique after aggregation`);

const top = [...agg.values()].sort((a, b) => b.sum - a.sum).slice(0, topN);
console.log(`\nTOP ${topN} BY AGGREGATED SALIENCE:`);
printTable(
  ['Sum sal.', 'Inst', 'Ment', 'Type', 'Name', 'KG anchor'],
  top.map((v) => [
    v.sum.toFixed(4),
    String(v.instances),
    String(v.mentions),
    [...v.types].join('/').slice(0, 12),
    truncate(v.display, 36),
    shortWiki(v.wiki),
  ]),
);

console.log(`\nBRIEF §5.5 TARGET ENTITIES:`);
const targetRows = targets.map((t) => resolveTarget(t, agg));
printTable(
  ['Target', 'Sum sal.', 'Inst', 'Ment', 'Verdict'],
  targetRows.map((r) => [
    truncate(r.target + (r.combined ? ` (∑partials)` : ''), 40),
    r.match ? r.match.sum.toFixed(4) : '—',
    r.match ? String(r.match.instances) : '0',
    r.match ? String(r.match.mentions) : '0',
    verdictLabel(r.match?.sum ?? 0),
  ]),
);

const primary = targetRows[0];
const primarySum = primary?.match?.sum ?? 0;
console.log(`\nPrimary entity: '${primary.target}' = ${primarySum.toFixed(4)} → ${verdictLabel(primarySum)}`);
if (primarySum < 0.30 && primarySum >= 0.10) {
  console.log(`  Below brief 0.30 strong threshold but in meaningful range.`);
  console.log(`  Common causes: body length overshoot, fragmented compound (DE NL API quirk), competing topical mass.`);
}
if (primarySum < 0.10) {
  console.log(`  WARNING: primary entity not recognised as central topic. Rewrite to lead with canonical surface form in H1 and first paragraph.`);
}

const kgAnchored = [...agg.values()].filter((v) => v.wiki).sort((a, b) => b.sum - a.sum);
if (kgAnchored.length) {
  console.log(`\nKnowledge-graph anchored (${kgAnchored.length}):`);
  for (const v of kgAnchored.slice(0, 8)) {
    console.log(`  ${v.sum.toFixed(4)}  ${truncate(v.display, 30).padEnd(32)}  ${shortWiki(v.wiki)}`);
  }
}

console.log();

// ─────────────────────────────────────────────────────────────────────────────

function fromMarkdown(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) {
    return { text: stripMarkdown(md), targets: [], locale: null };
  }
  const fm = m[1];
  const body = m[2];

  const title = pickString(fm, 'title');
  const heroLede = pickString(fm, 'heroLede');
  const schemaAbout = pickStringArray(fm, 'schemaAbout');
  const schemaMentions = pickStringArray(fm, 'schemaMentions');
  const faqText = [...fm.matchAll(/-\s*question:\s*"([^"]+)"\s*\n\s*answer:\s*"([^"]+)"/g)]
    .map((mm) => `${mm[1]}\n${mm[2]}`)
    .join('\n\n');

  const cleanBody = stripMarkdown(body);
  const text = [title, heroLede, cleanBody, faqText].filter(Boolean).join('\n\n');

  const targets = [];
  if (title) targets.push(title);
  for (const a of schemaAbout) if (!targets.includes(a)) targets.push(a);
  for (const a of schemaMentions) if (!targets.includes(a)) targets.push(a);

  return { text, targets, locale: null };
}

async function fromUrl(url) {
  const r = await fetch(url, { headers: { 'User-Agent': 'starkrank-salience-verify/1.0' } });
  if (!r.ok) {
    console.error(`Fetch failed: ${r.status} ${url}`);
    process.exit(5);
  }
  const html = await r.text();
  const mainMatch = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
  let bodyHtml = mainMatch ? mainMatch[1] : html;
  // strip non-content
  for (const tag of ['script', 'style', 'svg', 'aside', 'nav', 'header', 'footer']) {
    bodyHtml = bodyHtml.replace(new RegExp(`<${tag}\\b[^>]*>[\\s\\S]*?<\\/${tag}>`, 'gi'), ' ');
  }
  // strip class= / data-* / id= attributes (Tailwind class strings pollute output otherwise)
  bodyHtml = bodyHtml.replace(/\s(?:class|id|data-[\w-]+)=("[^"]*"|'[^']*')/gi, '');
  // tags → whitespace
  bodyHtml = bodyHtml.replace(/<br\s*\/?>/gi, '\n').replace(/<\/(p|h\d|li|tr|div|section|article)>/gi, '\n');
  bodyHtml = bodyHtml.replace(/<[^>]+>/g, ' ');
  // entities
  bodyHtml = bodyHtml.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n));
  bodyHtml = bodyHtml.replace(/\n\s*\n+/g, '\n\n').replace(/[ \t]+/g, ' ').trim();
  return { text: bodyHtml, targets: [] };
}

function stripMarkdown(s) {
  let r = s;
  r = r.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1'); // links → anchor text
  r = r.replace(/\*\*([^*]+)\*\*/g, '$1'); // bold
  r = r.replace(/`([^`]+)`/g, '$1'); // inline code
  r = r.replace(/\|/g, ' '); // table pipes
  r = r.replace(/^[-*]\s+/gm, ''); // bullets
  r = r.replace(/^\d+\.\s+/gm, ''); // numbered list
  r = r.replace(/^#+\s+/gm, ''); // headings
  r = r.replace(/\n\s*\n+/g, '\n\n').trim();
  return r;
}

function pickString(fm, key) {
  return fm.match(new RegExp(`^${key}:\\s*"([^"]+)"`, 'm'))?.[1] ?? null;
}

function pickStringArray(fm, key) {
  // block form: "key:\n  - \"a\"\n  - \"b\"" — walk lines until indent stops
  const lines = fm.split('\n');
  const startIdx = lines.findIndex((l) => l.match(new RegExp(`^${key}:\\s*$`)));
  if (startIdx >= 0) {
    const items = [];
    for (let i = startIdx + 1; i < lines.length; i++) {
      const m = lines[i].match(/^[ \t]+-\s*"([^"]+)"/);
      if (m) items.push(m[1]);
      else if (lines[i].match(/^[^ \t]/)) break; // dedented to a new top-level key
    }
    if (items.length) return items;
  }
  // inline form: "key: [\"a\", \"b\"]"
  const inline = fm.match(new RegExp(`^${key}:\\s*\\[(.*?)\\]`, 'm'));
  if (inline) {
    return [...inline[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]);
  }
  return [];
}

function resolveTarget(target, agg) {
  const key = target.toLowerCase().trim();
  if (agg.has(key)) {
    return { target, match: agg.get(key), combined: false };
  }
  // partial: sum every aggregated entity whose name CONTAINS the target string
  const partials = [...agg.entries()].filter(([k]) => k.includes(key) || key.includes(k));
  if (partials.length === 0) return { target, match: null, combined: false };
  const merged = {
    sum: 0,
    instances: 0,
    mentions: 0,
    display: partials[0][1].display,
  };
  for (const [, v] of partials) {
    merged.sum += v.sum;
    merged.instances += v.instances;
    merged.mentions += v.mentions;
  }
  return { target, match: merged, combined: partials.length > 1 };
}

function verdictLabel(s) {
  if (s >= 0.30) return '✓ STRONG (≥0.30)';
  if (s >= 0.10) return '○ meaningful (≥0.10)';
  if (s > 0) return '⚠ weak (<0.10)';
  return '✗ absent';
}

function truncate(s, n) {
  if (!s) return '';
  return s.length > n ? s.slice(0, n - 1) + '…' : s;
}

function shortWiki(url) {
  if (!url) return '—';
  return url
    .replace(/^https:\/\/en\.wikipedia\.org\/wiki\//, 'wiki:')
    .replace(/^https:\/\/de\.wikipedia\.org\/wiki\//, 'wiki-de:')
    .replace(/^https:\/\/[^/]+\/wiki\//, 'wiki-other:');
}

function printTable(headers, rows) {
  const widths = headers.map((h, i) => Math.max(h.length, ...rows.map((r) => String(r[i] ?? '').length)));
  const line = (cells) => cells.map((c, i) => String(c ?? '').padEnd(widths[i])).join('  ');
  console.log(line(headers));
  console.log(widths.map((w) => '─'.repeat(w)).join('  '));
  for (const r of rows) console.log(line(r));
}

function usage() {
  console.log(`Usage: npm run salience -- <md-file-or-url> [--locale de|ch-de] [--targets "a,b,c"] [--top N]`);
  process.exit(1);
}
