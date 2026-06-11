import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { getGitLastModified, getEntryFilepath } from '../utils/getLastModified';
import { getSpokePath } from '../data/service-slugs';

// Build-time manifest: maps every CONTENT/dynamic-route URL to its source
// file's git last-commit date (YYYY-MM-DD). Static .astro pages are resolved
// separately by scripts/inject-sitemap-lastmod.mjs (URL → src/pages file).
//
// This endpoint exists only to surface getCollection() + the canonical slug
// helpers (getSpokePath, urlSlug) to the post-build step, so we never have to
// re-derive routing. The emitted dist/sitemap-lastmod.json is consumed and
// then deleted by the post-build script, and is excluded from the sitemap.

const SITE = 'https://starkrank.com';

function iso(d: Date | null): string {
  return (d ?? new Date()).toISOString().split('T')[0];
}

export const GET: APIRoute = async () => {
  const map: Record<string, string> = {};
  const add = (path: string, file: string | undefined) => {
    if (!file) return;
    map[`${SITE}${path}`] = iso(getGitLastModified(file));
  };

  // Blog posts: /{de|ch-de|en|pe}/blog/{id}/
  for (const post of await getCollection('blog')) {
    const prefix = post.data.locale === 'de' ? '/de' : post.data.locale === 'ch-de' ? '/ch-de' : post.data.locale === 'pe' ? '/pe' : '/en';
    add(`${prefix}/blog/${post.id}/`, getEntryFilepath(post));
  }

  // Service hubs (de, ch-de): /{''|ch-de}/services/{urlSlug ?? serviceSlug}/
  for (const loc of ['de', 'ch-de'] as const) {
    const prefix = loc === 'de' ? '' : '/ch-de';
    for (const hub of await getCollection('serviceHubs', (h) => h.data.locale === loc)) {
      add(`${prefix}/services/${hub.data.urlSlug ?? hub.data.serviceSlug}/`, getEntryFilepath(hub));
    }
  }

  // EN services: /en/services/{slug}/ (services collection minus hand-crafted EN pages)
  const EN_EXCLUDE = ['ai-search-optimization', 'multi-location-seo', 'audience-persona-mapping'];
  for (const service of await getCollection('services')) {
    if (EN_EXCLUDE.includes(service.data.slug)) continue;
    add(`/en/services/${service.data.slug}/`, getEntryFilepath(service));
  }

  // City hubs (de, ch-de): /{''|ch-de}/agentur-{citySlug}/
  for (const hub of await getCollection('cityHubs')) {
    const loc = hub.data.locale;
    if (loc !== 'de' && loc !== 'ch-de') continue;
    const prefix = loc === 'de' ? '' : '/ch-de';
    add(`${prefix}/agentur-${hub.data.citySlug}/`, getEntryFilepath(hub));
  }

  // City spokes (de, ch-de, pe): generated from cities × city.services, slug via getSpokePath.
  // Date prefers the spoke entry; falls back to the city config that drives the page.
  const spokes = await getCollection('spokes');
  for (const city of await getCollection('cities')) {
    const loc = city.data.locale;
    if (loc !== 'de' && loc !== 'ch-de' && loc !== 'pe') continue;
    const prefix = loc === 'de' ? '' : `/${loc}`;
    for (const serviceSlug of city.data.services) {
      const spokeSlug = getSpokePath(serviceSlug, city.data.citySlug, loc);
      const spoke = spokes.find(
        (s) => s.data.serviceSlug === serviceSlug && s.data.citySlug === city.data.citySlug && s.data.locale === loc,
      );
      add(`${prefix}/${spokeSlug}/`, getEntryFilepath(spoke ?? city));
    }
  }

  return new Response(JSON.stringify(map), { headers: { 'content-type': 'application/json' } });
};
