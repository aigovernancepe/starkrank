// Post-build: inject <lastmod> into dist/sitemap-0.xml for every URL.
//
// Dates come from two sources, both rooted in git last-commit dates:
//   1. dist/sitemap-lastmod.json — emitted by src/pages/sitemap-lastmod.json.ts
//      for content/dynamic-route URLs (blog, service hubs, city hubs, spokes),
//      resolved via getCollection() + the canonical slug helpers.
//   2. Direct URL → src/pages/*.astro resolution for static pages (everything
//      not in the manifest: landings, index pages, vertical hubs, legal, etc.).
//
// The manifest file is deleted afterwards so it is never served.

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const SITE = 'https://starkrank.com';
const DIST = 'dist';
const manifestPath = path.join(DIST, 'sitemap-lastmod.json');
const sitemapPath = path.join(DIST, 'sitemap-0.xml');

if (!fs.existsSync(sitemapPath)) {
  console.error(`[sitemap-lastmod] ${sitemapPath} not found — skipping.`);
  process.exit(0);
}

const manifest = fs.existsSync(manifestPath)
  ? JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
  : {};

const gitCache = new Map();
function gitDate(file) {
  if (gitCache.has(file)) return gitCache.get(file);
  let date = null;
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%aI', '--', file], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    if (out) date = out.split('T')[0];
  } catch {
    /* untracked or no history */
  }
  gitCache.set(file, date);
  return date;
}

// Resolve a sitemap URL to its static src/pages source file (non-dynamic pages only).
function staticSource(url) {
  const pathname = (url.startsWith(SITE) ? url.slice(SITE.length) : url).replace(/^\/+|\/+$/g, '');
  const base = pathname === '' ? 'index' : pathname;
  for (const candidate of [`src/pages/${base}.astro`, `src/pages/${base}/index.astro`]) {
    if (fs.existsSync(candidate)) return candidate;
  }
  return null;
}

let xml = fs.readFileSync(sitemapPath, 'utf8');
const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

let covered = 0;
const missing = [];
for (const loc of locs) {
  let date = manifest[loc];
  if (!date) {
    const src = staticSource(loc);
    if (src) date = gitDate(src);
  }
  if (date) {
    xml = xml.replace(`<loc>${loc}</loc>`, `<loc>${loc}</loc><lastmod>${date}</lastmod>`);
    covered++;
  } else {
    missing.push(loc);
  }
}

fs.writeFileSync(sitemapPath, xml);
fs.rmSync(manifestPath, { force: true });

console.log(`[sitemap-lastmod] ${covered}/${locs.length} URLs got <lastmod>`);
if (missing.length) {
  console.log(`[sitemap-lastmod] no source resolved for ${missing.length}:`);
  for (const u of missing) console.log(`  ${u}`);
}
