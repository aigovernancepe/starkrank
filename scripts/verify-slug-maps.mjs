#!/usr/bin/env node
/**
 * Build-Guard: die Slug-Maps in src/data/navigation.ts sind eine handgepflegte
 * Kopie der urlSlug-Frontmatter aus src/content/service-hubs/. Laufen sie
 * auseinander, erzeugt getLocalizedNavHref() Links auf nie gebaute URLs — der
 * Fehler ist im Build unsichtbar und faellt erst als 404 in der Produktion auf
 * (so geschehen bei seo-copywriting -> seo-texterstellung, 4 verweisende Seiten).
 *
 * Dieses Skript vergleicht beide Quellen und bricht den Build bei Abweichung ab.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const HUB_DIR = 'src/content/service-hubs';
const NAV_FILE = 'src/data/navigation.ts';

const field = (fm, key) => {
  const m = fm.match(new RegExp(`^${key}:\\s*"?([^"\\n]+?)"?\\s*$`, 'm'));
  return m ? m[1].trim() : null;
};

// Ist-Zustand: urlSlug je (locale, serviceSlug) aus den Hub-Frontmattern.
const hubs = new Map();
for (const file of readdirSync(HUB_DIR)) {
  if (!file.endsWith('.md')) continue;
  const fm = readFileSync(join(HUB_DIR, file), 'utf-8').split('---')[1] ?? '';
  const locale = field(fm, 'locale');
  const serviceSlug = field(fm, 'serviceSlug');
  if (!locale || !serviceSlug) continue;
  hubs.set(`${locale}|${serviceSlug}`, field(fm, 'urlSlug') ?? serviceSlug);
}

const nav = readFileSync(NAV_FILE, 'utf-8');
const readMap = (name) => {
  const start = nav.indexOf(`const ${name}`);
  if (start === -1) throw new Error(`${name} nicht in ${NAV_FILE} gefunden`);
  const block = nav.slice(start, nav.indexOf(']);', start));
  return [...block.matchAll(/\['([^']+)',\s*'([^']+)'\]/g)].map((m) => [m[1], m[2]]);
};

const problems = [];
for (const [mapName, locale] of [
  ['deServiceHubSlugMap', 'de'],
  ['chDeServiceHubSlugMap', 'ch-de'],
]) {
  const entries = readMap(mapName);
  const listed = new Set(entries.map(([s]) => s));

  for (const [serviceSlug, mapped] of entries) {
    const actual = hubs.get(`${locale}|${serviceSlug}`);
    if (actual === undefined) {
      problems.push(`${mapName}: "${serviceSlug}" -> "${mapped}", aber kein ${locale}-Hub vorhanden`);
    } else if (actual !== mapped) {
      problems.push(`${mapName}: "${serviceSlug}" -> "${mapped}", Hub sagt "${actual}"`);
    }
  }

  for (const key of hubs.keys()) {
    const [hubLocale, serviceSlug] = key.split('|');
    if (hubLocale === locale && !listed.has(serviceSlug)) {
      problems.push(`${mapName}: Hub "${serviceSlug}" (${hubs.get(key)}) fehlt in der Map`);
    }
  }
}

if (problems.length > 0) {
  console.error(`\n[verify-slug-maps] ${problems.length} Abweichung(en) zwischen ${NAV_FILE} und ${HUB_DIR}:\n`);
  for (const p of problems) console.error(`  - ${p}`);
  console.error('\nMap an die Hub-Frontmatter angleichen, sonst entstehen 404-Links.\n');
  process.exit(1);
}

console.log(`[verify-slug-maps] ok — ${hubs.size} Hubs, keine Abweichung`);
