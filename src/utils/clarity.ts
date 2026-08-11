/**
 * Microsoft Clarity — session replay and heatmaps.
 *
 * Scope is deliberately narrow. Clarity needs *sessions*, not impressions, and
 * organic traffic is currently ~6 clicks/28d with no service, city or money page
 * ever clicked. Loading a DOM-recording script across ~120 hubs, spokes, glossary
 * and blog pages would buy nothing but INP cost, so it runs only where a replay
 * can actually change a decision: the lead-form pages and the locale homepages
 * (which is where the brand traffic lands).
 *
 * LandingLayout pages are not listed here — that layout is used exclusively by
 * the free-check landings, so it embeds Clarity unconditionally.
 *
 * Note on view transitions: once loaded, Clarity keeps recording as the visitor
 * navigates on to pages outside this list. The list therefore gates *which
 * sessions get recorded* (by entry point), not which individual pages. That is
 * intentional — the interesting question is the journey into the form.
 */
export const CLARITY_PROJECT_ID = 'wv9i3u54lb';

declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void;
  }
}

const CLARITY_PATHS = new Set([
  // Locale homepages
  '/',
  '/ch-de/',
  '/en/',
  '/pe/',
  // Contact pages (LeadForm)
  '/kontakt/',
  '/ch-de/kontakt/',
  '/en/contact/',
  '/pe/contacto/',
]);

/** True when the given pathname should embed the Clarity tag. */
export function hasClarity(pathname: string): boolean {
  const path = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return CLARITY_PATHS.has(path);
}
