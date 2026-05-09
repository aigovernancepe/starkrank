import { type Locale, defaultCity } from './locales';
import { getFlatLocaleSlug, getSpokePath, hasLocalizedService } from './service-slugs';

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  hiddenInLocales?: Locale[];
}

export const mainNav: NavItem[] = [
  {
    label: 'Services',
    href: '/services/',
    children: [
      { label: 'Search & AI Intelligence', href: '/services/#search-ai-intelligence' },
      { label: 'Performance Media', href: '/services/#performance-media' },
      { label: 'Digital PR', href: '/services/#authority-pr' },
      { label: 'Content & Copywriting', href: '/services/#content-copywriting' },
      { label: 'Data & Web', href: '/services/#data-web' },
    ],
  },
  {
    label: 'Pricing',
    href: '/preise/seo/',
    hiddenInLocales: ['en'],
  },
  { label: 'Case Studies', href: '/case-studies/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
];

export const footerNav = {
  pillars: [
    { label: 'Search & AI', href: '/services/#search-ai-intelligence' },
    { label: 'Performance Media', href: '/services/#performance-media' },
    { label: 'Digital PR', href: '/services/#authority-pr' },
    { label: 'Content & Copy', href: '/services/#content-copywriting' },
    { label: 'Data & Web', href: '/services/#data-web' },
  ],
  company: [
    { label: 'About', href: '/about/' },
    { label: 'Case Studies', href: '/case-studies/' },
    { label: 'Blog', href: '/blog/' },
    { label: 'Contact', href: '/contact/' },
  ],
  audits: [
    { label: 'Free Google Ads Audit', href: '/free-google-ads-audit/' },
    { label: 'Copywriting Audit', href: '/free-copywriting-audit/' },
    { label: 'Free AISO Score', href: '/aiso-score/' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy/' },
    { label: 'Impressum', href: '/impressum/' },
  ],
};

/** Locale-specific overrides for non-service navigation paths. */
const contactPaths: Record<Locale, string> = {
  en: '/en/contact/',
  de: '/kontakt/',
  'ch-de': '/ch-de/kontakt/',
};

const privacyPaths: Record<Locale, string> = {
  en: '/en/privacy/',
  de: '/datenschutz/',
  'ch-de': '/ch-de/datenschutz/',
};

const impressumPaths: Record<string, string> = {
  en: '/en/imprint/',
  de: '/impressum/',
  'ch-de': '/ch-de/impressum/',
};

const aboutPaths: Record<Locale, string> = {
  en: '/en/about/',
  de: '/ueber-uns/',
  'ch-de': '/ch-de/ueber-uns/',
};

/** Locale-specific lead magnet overrides for footer audits section. */
const auditPaths: Record<Locale, NavItem[]> = {
  en: [
    { label: 'Free AISO Score', href: '/en/aiso-score/' },
    { label: 'Free Google Ads Audit', href: '/en/free-google-ads-audit/' },
    { label: 'Free Copywriting Audit', href: '/en/free-copywriting-audit/' },
  ],
  de: [
    { label: 'Kostenloser AISO-Check', href: '/aiso-check/' },
    { label: 'Kostenloser Google Ads Check', href: '/kostenloser-google-ads-check/' },
    { label: 'Kostenloser Copywriting Check', href: '/kostenloser-copywriting-check/' },
  ],
  'ch-de': [
    { label: 'Kostenloser AISO-Check', href: '/ch-de/aiso-check/' },
    { label: 'Kostenloser Google Ads Check', href: '/ch-de/kostenloser-google-ads-check/' },
    { label: 'Kostenloser Copywriting Check', href: '/ch-de/kostenloser-copywriting-check/' },
  ],
};

/** Get locale-specific audit lead magnets for footer. */
export function getLocalizedAudits(locale: Locale): NavItem[] {
  return auditPaths[locale] ?? auditPaths.en;
}

/**
 * Services with a DE service-hub page at /services/<slug>/.
 * Kept in sync with src/content/service-hubs/*--de.md. When a new DE hub ships,
 * add its serviceSlug → urlSlug mapping here so the mega-menu routes to the hub
 * at the correct URL. urlSlug differs from serviceSlug for Phase 3d hubs that
 * migrated to buyer-qualified keyword URLs (per feedback_serp_intent_locale_verification).
 * AISO is intentionally absent — it routes to /aiso-check/.
 */
const deServiceHubSlugMap = new Map<string, string>([
  // Phase 3d keyword URLs (buyer-qualified; SERP-intent-verified)
  ['technical-web-design', 'webdesign-agentur'],
  ['performance-web-development', 'webagentur-deutschland'],
  ['technical-seo-audit', 'seo-audit-agentur'],
  ['google-ads-management', 'google-ads-betreuung'],
  ['local-seo-consulting', 'local-seo-agentur'],
  ['authority-link-building', 'linkaufbau-agentur'],
  // Other DE hubs: urlSlug equals serviceSlug (no keyword migration warranted)
  ['google-ads-audit', 'google-ads-audit'],
  ['paid-social-strategy', 'paid-social-strategy'],
  ['content-marketing', 'content-marketing-agentur'],
  ['seo-copywriting', 'seo-copywriting'],
  ['copywriting-audit', 'copywriting-audit'],
  ['audience-persona-mapping', 'zielgruppenanalyse'],
  ['google-analytics-consultancy', 'google-analytics-consultancy'],
]);

/**
 * CH-DE service hubs — Phase 3d (2026-04-26).
 * Six greenfield hubs at /ch-de/services/<urlSlug>/, all using <service>-schweiz
 * keyword pattern (validated against CH SERP buyer-intent in starkrank-v2 briefs).
 */
const chDeServiceHubSlugMap = new Map<string, string>([
  ['technical-web-design', 'webdesign-schweiz'],
  ['performance-web-development', 'webagentur-schweiz'],
  ['technical-seo-audit', 'seo-audit-schweiz'],
  ['google-ads-management', 'google-ads-schweiz'],
  ['local-seo-consulting', 'lokale-seo-schweiz'],
]);

/**
 * Prefix a root-relative path with the locale's URL namespace.
 * DE is served at root (no prefix); EN at /en/*; CH-DE at /ch-de/*.
 */
function localePrefixFor(locale: Locale): string {
  if (locale === 'de') return '';
  return `/${locale}`;
}

/**
 * Convert a navigation href (written in canonical EN-slug form) to its
 * locale-aware equivalent. Post-Phase-2b: DE sits at root, so DE returns
 * paths unprefixed (with DE slug rewrites where applicable); EN gets a
 * /en/ prefix; CH-DE gets /ch-de/ prefix.
 */
export function getLocalizedNavHref(href: string, locale: Locale): string {
  // Legal + company pages — explicit per-locale slugs
  if (href === '/impressum/' || href === '/imprint/') return impressumPaths[locale] ?? href;
  if (href === '/contact/') return contactPaths[locale];
  if (href === '/privacy/') return privacyPaths[locale];
  if (href === '/about/') return aboutPaths[locale];

  const prefix = localePrefixFor(locale);

  // Blog index — each locale has its own index page.
  // DE blog stays at /de/blog/* (Phase 2b debt — see public/_redirects);
  // override the empty DE prefix so the menu doesn't point at /blog/, which
  // _redirects 301s to /en/blog/.
  if (href === '/blog/') return locale === 'de' ? '/de/blog/' : `${prefix}/blog/`;

  // Case studies — EN-only tree; non-EN locales link cross-locale into /en/
  if (href === '/case-studies/') {
    return locale === 'en' ? '/en/case-studies/' : '/en/case-studies/';
  }

  // Pricing — DE + CH-DE only; hidden in EN nav via hiddenInLocales.
  // Currently a single entry pointing at /preise/seo/; will restructure
  // to a dropdown when /preise/google-ads/ unparks.
  if (href === '/preise/seo/') {
    return locale === 'ch-de' ? '/ch-de/preise/seo/' : '/preise/seo/';
  }

  // Services hub
  if (href === '/services/') return `${prefix}/services/`;

  // Services hub anchor links (pillar headers in mega-menu)
  if (href.startsWith('/services/#')) {
    return `${prefix}${href}`;
  }

  // Individual service pages → flat locale page first (for non-city-scoped services),
  // DE service hub, else the city spoke in the default city, else fall through to EN cross-locale.
  const serviceMatch = href.match(/^\/services\/([^/]+)\/$/);
  if (serviceMatch) {
    const serviceSlug = serviceMatch[1];

    // EN locale: services live at /en/services/{slug}/
    if (locale === 'en') return `/en${href}`;

    // DE locale: services with a DE hub go to their /services/<urlSlug>/ page.
    // urlSlug may differ from serviceSlug for Phase 3d keyword-URL migrations.
    // (AISO routes to /aiso-check/ via flatLocaleSlugs — same path for DE + CH-DE.)
    if (locale === 'de' && deServiceHubSlugMap.has(serviceSlug)) {
      return `/services/${deServiceHubSlugMap.get(serviceSlug)}/`;
    }

    // CH-DE locale: services with a CH-DE hub (Phase 3d, 6 services) go to their
    // /ch-de/services/<urlSlug>/ page. Other CH-DE services fall through to the
    // city-spoke fallback.
    if (locale === 'ch-de' && chDeServiceHubSlugMap.has(serviceSlug)) {
      return `/ch-de/services/${chDeServiceHubSlugMap.get(serviceSlug)}/`;
    }

    const flatSlug = getFlatLocaleSlug(serviceSlug, locale);
    if (flatSlug !== null) {
      return `${prefix}/${flatSlug}/`;
    }
    if (!hasLocalizedService(serviceSlug, locale)) {
      return `/en${href}`;
    }
    const city = defaultCity[locale];
    const spokePath = getSpokePath(serviceSlug, city, locale);
    return `${prefix}/${spokePath}/`;
  }

  // Fallthrough: generic localization by prefix
  return `${prefix}${href}`;
}
