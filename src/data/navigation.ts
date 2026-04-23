import { type Locale, defaultCity } from './locales';
import { getFlatLocaleSlug, getSpokePath, hasLocalizedService } from './service-slugs';

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const mainNav: NavItem[] = [
  {
    label: 'Services',
    href: '/services/',
    children: [
      {
        label: 'Search & AI Intelligence',
        href: '/services/#search-ai-intelligence',
        children: [
          { label: 'AI Search Optimization', href: '/services/ai-search-optimization/' },
          { label: 'Technical SEO Audit', href: '/services/technical-seo-audit/' },
          { label: 'E-commerce SEO Audit', href: '/services/ecommerce-seo-audit/' },
          { label: 'Local SEO Consulting', href: '/services/local-seo-consulting/' },
        ],
      },
      {
        label: 'Performance Media',
        href: '/services/#performance-media',
        children: [
          { label: 'Google Ads Management', href: '/services/google-ads-management/' },
          { label: 'Google Ads Audit', href: '/services/google-ads-audit/' },
          { label: 'Paid Social Strategy', href: '/services/paid-social-strategy/' },
        ],
      },
      {
        label: 'Authority',
        href: '/services/#authority-pr',
        children: [
          { label: 'Authority Link Building', href: '/services/authority-link-building/' },
          { label: 'E-E-A-T Audit', href: '/services/eeat-audit/' },
        ],
      },
      {
        label: 'Content & Copywriting',
        href: '/services/#content-copywriting',
        children: [
          { label: 'Content Marketing', href: '/services/content-marketing/' },
          { label: 'SEO Copywriting', href: '/services/seo-copywriting/' },
          { label: 'Copywriting Audit', href: '/services/copywriting-audit/' },
          { label: 'Audience Persona Mapping', href: '/services/audience-persona-mapping/' },
        ],
      },
      {
        label: 'Data & Web',
        href: '/services/#data-web',
        children: [
          { label: 'Technical Web Design', href: '/services/technical-web-design/' },
          { label: 'Google Analytics Consultancy', href: '/services/google-analytics-consultancy/' },
        ],
      },
    ],
  },
  { label: 'Case Studies', href: '/case-studies/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
];

export const footerNav = {
  pillars: [
    { label: 'Search & AI', href: '/services/ai-search-optimization/' },
    { label: 'Performance Media', href: '/services/google-ads-management/' },
    { label: 'Authority', href: '/services/authority-link-building/' },
    { label: 'Content & Copy', href: '/services/content-marketing/' },
    { label: 'Data & Web', href: '/services/technical-web-design/' },
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

  // Blog index — each locale has its own index page
  if (href === '/blog/') return `${prefix}/blog/`;

  // Case studies — EN-only tree; non-EN locales link cross-locale into /en/
  if (href === '/case-studies/') {
    return locale === 'en' ? '/en/case-studies/' : '/en/case-studies/';
  }

  // Services hub
  if (href === '/services/') return `${prefix}/services/`;

  // Services hub anchor links (pillar headers in mega-menu)
  if (href.startsWith('/services/#')) {
    return `${prefix}${href}`;
  }

  // Individual service pages → flat locale page first (for non-city-scoped services),
  // then the city spoke in the default city, else fall through to EN cross-locale.
  const serviceMatch = href.match(/^\/services\/([^/]+)\/$/);
  if (serviceMatch) {
    const serviceSlug = serviceMatch[1];

    // EN locale: services live at /en/services/{slug}/
    if (locale === 'en') return `/en${href}`;

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
