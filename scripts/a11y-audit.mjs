#!/usr/bin/env node
// scripts/a11y-audit.mjs
//
// Accessibility-Tree-Audit. Prüft das, was ein Screenreader oder ein
// KI-Agent aus einer Seite herausliest: Heading-Hierarchie, Accessible
// Names von Links/Buttons/Bildern, Landmarks und Formular-Labels.
//
// Läuft gegen den lokalen Build oder gegen beliebige Live-URLs — damit
// auch auf Kunden-Sites einsetzbar, ohne Zugriff auf deren Repo.
//
// Usage:
//   npm run a11y                                   # lokaler dist/-Build
//   npm run a11y -- https://kunde.ch/              # eine Live-URL
//   npm run a11y -- https://kunde.ch/ --sitemap    # alle URLs aus der Sitemap
//   npm run a11y -- --dir dist --limit 50
//
// Flags:
//   --sitemap        URLs aus <origin>/sitemap-index.xml bzw. sitemap.xml ziehen
//   --dir PFAD       Build-Verzeichnis (default: dist)
//   --limit N        Maximal N Seiten prüfen
//   --json           Maschinenlesbare Ausgabe statt Report
//   --quiet          Nur die Zusammenfassung, keine Per-Seite-Zeilen
//   --concurrency N  Parallele Requests bei URL-Audits (default: 6)
//
// Exit-Code: 1 wenn Befunde existieren, sonst 0 — damit CI-tauglich.
//
// Grenzen, die man kennen muss:
//   - Statisches HTML. CSS-Sichtbarkeit (display:none, `hidden md:grid`)
//     wird NICHT ausgewertet. Responsive ausgeblendete Blöcke tauchen hier
//     auf, im echten Accessibility Tree je nach Viewport nicht.
//   - Kein JavaScript. Client-seitig nachgerenderte Inhalte fehlen.
//   - Der Accessible Name wird angenähert (aria-label > aria-labelledby >
//     Subtree-Text + alt + svg><title> > title-Attribut), nicht nach der
//     vollen AccName-Spezifikation berechnet.

import { readFileSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { parse } from 'parse5';

const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) usage();

const flag = (name, fallback) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : fallback;
};
const has = (name) => args.includes(name);

const urls = args.filter((a) => /^https?:\/\//.test(a));
const useSitemap = has('--sitemap');
const buildDir = flag('--dir', 'dist');
const limit = parseInt(flag('--limit', '0'), 10) || Infinity;
const asJson = has('--json');
const quiet = has('--quiet');
const concurrency = parseInt(flag('--concurrency', '6'), 10);

function usage() {
  console.log(readFileSync(new URL(import.meta.url), 'utf8')
    .split('\n').filter((l) => l.startsWith('//')).map((l) => l.slice(3)).join('\n'));
  process.exit(0);
}

/* ---------------------------------------------------------------- DOM-Helfer */

const attr = (n, name) => n.attrs?.find((a) => a.name === name)?.value;
const hasAttr = (n, name) => n.attrs?.some((a) => a.name === name) ?? false;

function walk(node, fn, parents = []) {
  fn(node, parents);
  const next = [...parents, node];
  for (const c of node.childNodes ?? []) walk(c, fn, next);
}

// Aus dem Accessibility Tree entfernt: aria-hidden, das hidden-Attribut,
// role="presentation"/"none". Honeypot-Felder und Deko-SVGs fallen so raus.
const isHiddenNode = (n) =>
  attr(n, 'aria-hidden') === 'true' ||
  hasAttr(n, 'hidden') ||
  ['presentation', 'none'].includes(attr(n, 'role'));

const isHidden = (n, parents) => isHiddenNode(n) || parents.some(isHiddenNode);

// "Name from content" nach AccName: jeder Nachfahre steuert seinen EIGENEN
// Namen bei. Ein Kind mit aria-label (typisch: <button><svg aria-label="Suche">)
// beendet den Abstieg — sonst meldet das Audit fälschlich "kein Name".
function subtreeText(node, depth = 0) {
  if (depth > 25) return '';
  let out = '';
  for (const c of node.childNodes ?? []) {
    if (c.nodeName === '#text') { out += c.value; continue; }
    if (isHiddenNode(c)) continue;

    const label = attr(c, 'aria-label');
    if (label?.trim()) { out += ' ' + label.trim(); continue; }

    if (c.nodeName === 'img') { out += ' ' + (attr(c, 'alt') ?? ''); continue; }

    out += ' ' + subtreeText(c, depth + 1);
  }
  return out.replace(/\s+/g, ' ').trim();
}

// Angenäherter Accessible Name in Spec-Reihenfolge.
function accName(node, byId) {
  const label = attr(node, 'aria-label');
  if (label?.trim()) return label.trim();

  const labelledby = attr(node, 'aria-labelledby');
  if (labelledby) {
    const t = labelledby.split(/\s+/).map((id) => (byId[id] ? subtreeText(byId[id]) : '')).join(' ').trim();
    if (t) return t;
  }

  if (node.nodeName === 'img') return (attr(node, 'alt') ?? '').trim();

  const text = subtreeText(node);
  if (text) return text;

  // <svg><title> als letzter inhaltlicher Träger, dann title-Attribut.
  let svgTitle = '';
  walk(node, (n) => { if (n.nodeName === 'title' && !svgTitle) svgTitle = subtreeText(n); });
  return (svgTitle || attr(node, 'title') || '').trim();
}

/* ------------------------------------------------------------------ Regeln */

// Link-Texte, die im Accessibility Tree keinerlei Ziel verraten.
const GENERIC_NAMES = new RegExp('^(' + [
  'mehr', 'mehr erfahren', 'mehr dazu', 'weiterlesen', 'weiter', 'hier', 'hier klicken',
  'klicken sie hier', 'jetzt starten', 'los geht.?s', 'details', 'link', 'artikel lesen',
  'learn more', 'read more', 'more', 'click here', 'get started', 'this page', 'here',
  'más información', 'mas informacion', 'leer más', 'ver más', 'empezar', 'aquí', 'clic aquí',
].join('|') + ')$', 'i');

// input-Typen ohne sichtbares Label-Bedürfnis.
const UNLABELLED_INPUT_TYPES = new Set(['hidden', 'submit', 'button', 'reset', 'image']);

function auditDocument(html, source) {
  const doc = parse(html);
  const findings = [];
  const add = (rule, detail, severity = 'error') => findings.push({ source, rule, detail, severity });

  const byId = {};
  walk(doc, (n) => { const id = attr(n, 'id'); if (id && !byId[id]) byId[id] = n; });

  // Redirect-Stubs (meta-refresh, noindex) haben bewusst kein h1/main.
  let isRedirectStub = false;
  walk(doc, (n) => {
    if (n.nodeName === 'meta' && /refresh/i.test(attr(n, 'http-equiv') ?? '')) isRedirectStub = true;
  });
  if (isRedirectStub) return { findings, skipped: true };

  const headings = []; const navs = []; const links = []; const buttons = [];
  const inputs = []; const imgs = []; const iframes = []; const tables = [];
  const labelledIds = new Set(); const wrappedControls = new Set();
  let mains = 0;

  walk(doc, (n, parents) => {
    if (isHidden(n, parents)) return;
    const tag = n.nodeName;

    if (/^h[1-6]$/.test(tag)) headings.push({ level: +tag[1], name: accName(n, byId) });
    else if (tag === 'nav') navs.push(n);
    else if (tag === 'main') mains++;
    else if (tag === 'a' && hasAttr(n, 'href')) links.push(n);
    else if (tag === 'button' || attr(n, 'role') === 'button') buttons.push(n);
    else if (['input', 'select', 'textarea'].includes(tag)) inputs.push(n);
    else if (tag === 'img') imgs.push(n);
    else if (tag === 'iframe') iframes.push(n);
    else if (tag === 'table') tables.push(n);
    else if (tag === 'label') {
      const forId = attr(n, 'for');
      if (forId) labelledIds.add(forId);
      // <label>Text <input></label> — Wrapping-Label ohne for-Attribut.
      walk(n, (c) => { if (['input', 'select', 'textarea'].includes(c.nodeName)) wrappedControls.add(c); });
    }
  });

  // Heading-Hierarchie
  const h1s = headings.filter((h) => h.level === 1).length;
  if (h1s === 0) add('no-h1', 'Seite hat keine <h1>');
  if (h1s > 1) add('multi-h1', `${h1s}× <h1> auf einer Seite`);
  for (let i = 1; i < headings.length; i++) {
    const jump = headings[i].level - headings[i - 1].level;
    if (jump > 1) add('heading-skip',
      `h${headings[i - 1].level} "${trunc(headings[i - 1].name)}" → h${headings[i].level} "${trunc(headings[i].name)}"`);
  }

  // Landmarks
  if (mains === 0) add('no-main', 'kein <main>-Landmark');
  if (mains > 1) add('multi-main', `${mains}× <main>`);
  if (navs.length > 1) {
    const unnamed = navs.filter((n) => !attr(n, 'aria-label') && !attr(n, 'aria-labelledby'));
    if (unnamed.length) add('nav-unnamed',
      `${unnamed.length} von ${navs.length} <nav> ohne aria-label — im Baum nicht unterscheidbar`);
  }

  // Bilder
  for (const n of imgs) if (!hasAttr(n, 'alt')) add('img-no-alt', attr(n, 'src') ?? '(ohne src)');

  // Links
  for (const n of links) {
    const name = accName(n, byId);
    if (!name) add('link-no-name', `→ ${attr(n, 'href')}`);
    else if (GENERIC_NAMES.test(name)) add('link-generic', `"${name}" → ${attr(n, 'href')}`, 'warn');
  }

  // Buttons
  for (const n of buttons) if (!accName(n, byId)) add('button-no-name', `class="${trunc(attr(n, 'class') ?? '', 40)}"`);

  // Formularfelder
  for (const n of inputs) {
    const type = attr(n, 'type') ?? '';
    if (n.nodeName === 'input' && UNLABELLED_INPUT_TYPES.has(type)) continue;
    const id = attr(n, 'id');
    const named = attr(n, 'aria-label') || attr(n, 'aria-labelledby') ||
      (id && labelledIds.has(id)) || wrappedControls.has(n) || attr(n, 'title');
    if (!named) add('input-no-label', `${n.nodeName}[type=${type || '—'}] name="${attr(n, 'name') ?? '?'}"`);
  }

  // Sonstiges
  for (const n of iframes) if (!attr(n, 'title')) add('iframe-no-title', trunc(attr(n, 'src') ?? '?', 60));
  for (const n of tables) {
    let th = 0;
    walk(n, (c) => { if (c.nodeName === 'th') th++; });
    if (!th) add('table-no-th', 'Tabelle ohne <th> — Spalten im Baum nicht zuordenbar', 'warn');
  }

  return { findings, skipped: false, stats: { headings: headings.length, links: links.length, imgs: imgs.length } };
}

const trunc = (s, n = 34) => (s ?? '').length > n ? (s ?? '').slice(0, n) + '…' : (s ?? '');

/* -------------------------------------------------------------- Quellen */

async function collectBuildFiles(dir) {
  const out = [];
  async function rec(d) {
    for (const e of await readdir(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) await rec(p);
      else if (e.name.endsWith('.html')) out.push(p);
    }
  }
  await rec(dir);
  return out.sort();
}

async function collectSitemapUrls(origin) {
  const candidates = ['/sitemap-index.xml', '/sitemap.xml'];
  const seen = new Set();
  for (const c of candidates) {
    let res;
    try { res = await fetch(new URL(c, origin)); } catch { continue; }
    if (!res.ok) continue;
    const xml = await res.text();
    const locs = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);
    for (const loc of locs) {
      if (loc.endsWith('.xml')) {
        try {
          const sub = await fetch(loc);
          if (!sub.ok) continue;
          for (const m of (await sub.text()).matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)) seen.add(m[1]);
        } catch { /* Teil-Sitemap nicht erreichbar — Rest trotzdem prüfen */ }
      } else seen.add(loc);
    }
    if (seen.size) break;
  }
  return [...seen].sort();
}

async function mapLimit(items, n, fn) {
  const results = new Array(items.length);
  let i = 0;
  await Promise.all(Array.from({ length: Math.min(n, items.length) }, async () => {
    while (i < items.length) {
      const idx = i++;
      results[idx] = await fn(items[idx], idx);
    }
  }));
  return results;
}

/* ---------------------------------------------------------------- Ausgabe */

const RULE_HELP = {
  'heading-skip': 'Überschriften-Ebene übersprungen — Inhalt hängt im Baum unter einer Sektion, die es nicht gibt',
  'no-h1': 'ohne <h1> fehlt dem Baum der Einstiegspunkt',
  'multi-h1': 'mehrere <h1> machen die Seitenhierarchie mehrdeutig',
  'no-main': 'ohne <main> kann direkt zum Inhalt gesprungen werden',
  'multi-main': 'mehrere <main>-Landmarks',
  'nav-unnamed': 'mehrere Navigationen ohne Namen sind im Baum nicht unterscheidbar',
  'img-no-alt': 'Bild ohne alt — Inhalt fehlt im Baum vollständig',
  'link-no-name': 'Link ohne Accessible Name — Ziel im Baum unbekannt',
  'link-generic': 'Linktext ohne Kontext — sagt nichts über das Ziel',
  'button-no-name': 'Button ohne Accessible Name',
  'input-no-label': 'Formularfeld ohne Label',
  'iframe-no-title': 'iframe ohne title',
  'table-no-th': 'Tabelle ohne Kopfzellen',
};

function report(results, { pages, skipped }) {
  const all = results.flatMap((r) => r.findings);
  const errors = all.filter((f) => f.severity === 'error');
  const warns = all.filter((f) => f.severity === 'warn');

  if (!quiet) {
    const dirty = results.filter((r) => r.findings.length);
    for (const r of dirty) {
      console.log(`\n✗ ${r.source}`);
      for (const f of r.findings) console.log(`    ${f.severity === 'warn' ? '~' : '!'} ${f.rule}: ${f.detail}`);
    }
  }

  const byRule = {};
  for (const f of all) (byRule[f.rule] ??= []).push(f);

  console.log('\n' + '─'.repeat(66));
  console.log(`Seiten geprüft: ${pages}${skipped ? `  (${skipped} Redirect-Stubs übersprungen)` : ''}`);
  console.log(`Befunde: ${errors.length} Fehler, ${warns.length} Hinweise\n`);

  if (!all.length) {
    console.log('✓ Keine Befunde.');
  } else {
    for (const [rule, list] of Object.entries(byRule).sort((a, b) => b[1].length - a[1].length)) {
      const pagesHit = new Set(list.map((f) => f.source)).size;
      console.log(`  ${rule.padEnd(16)} ${String(list.length).padStart(4)}×  auf ${pagesHit} Seite(n)`);
      console.log(`  ${' '.repeat(16)}      ${RULE_HELP[rule] ?? ''}`);
    }
  }
  console.log('─'.repeat(66));
  return errors.length + warns.length;
}

/* -------------------------------------------------------------------- Main */

let sources = [];
let fetchMode = false;

if (urls.length && useSitemap) {
  const origin = new URL(urls[0]).origin;
  sources = await collectSitemapUrls(origin);
  if (!sources.length) {
    console.error(`Keine Sitemap unter ${origin} gefunden. Ohne --sitemap wird nur die übergebene URL geprüft.`);
    process.exit(2);
  }
  fetchMode = true;
} else if (urls.length) {
  sources = urls;
  fetchMode = true;
} else {
  try {
    sources = await collectBuildFiles(buildDir);
  } catch {
    console.error(`Build-Verzeichnis "${buildDir}" nicht lesbar. Zuerst \`npm run build\`, oder eine URL übergeben.`);
    process.exit(2);
  }
  if (!sources.length) {
    console.error(`Keine HTML-Dateien in "${buildDir}".`);
    process.exit(2);
  }
}

sources = sources.slice(0, limit);

let skipped = 0;
const results = (await mapLimit(sources, fetchMode ? concurrency : sources.length, async (src) => {
  let html;
  if (fetchMode) {
    try {
      const res = await fetch(src, { headers: { 'user-agent': 'StarkRank-a11y-audit' } });
      if (!res.ok) return { source: src, findings: [{ source: src, rule: 'fetch-failed', detail: `HTTP ${res.status}`, severity: 'error' }] };
      html = await res.text();
    } catch (e) {
      return { source: src, findings: [{ source: src, rule: 'fetch-failed', detail: e.message, severity: 'error' }] };
    }
  } else {
    html = readFileSync(src, 'utf8');
  }
  const r = auditDocument(html, src);
  if (r.skipped) { skipped++; return null; }
  return { source: src, ...r };
})).filter(Boolean);

if (asJson) {
  console.log(JSON.stringify({
    pages: results.length, skipped,
    findings: results.flatMap((r) => r.findings),
  }, null, 2));
  process.exit(results.some((r) => r.findings.length) ? 1 : 0);
}

const total = report(results, { pages: results.length, skipped });
process.exit(total ? 1 : 0);
