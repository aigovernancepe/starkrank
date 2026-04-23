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
        href: '/services/ai-search-optimization/',
        children: [
          { label: 'AI Search Optimization', href: '/services/ai-search-optimization/' },
          { label: 'Technical SEO Audit', href: '/services/technical-seo-audit/' },
          { label: 'E-commerce SEO Audit', href: '/services/ecommerce-seo-audit/' },
          { label: 'Local SEO Consulting', href: '/services/local-seo-consulting/' },
        ],
      },
      {
        label: 'Performance Media',
        href: '/services/google-ads-management/',
        children: [
          { label: 'Google Ads Management', href: '/services/google-ads-management/' },
          { label: 'Google Ads Audit', href: '/services/google-ads-audit/' },
          { label: 'Paid Social Strategy', href: '/services/paid-social-strategy/' },
        ],
      },
      {
        label: 'Authority',
        href: '/services/authority-link-building/',
        children: [
          { label: 'Authority Link Building', href: '/services/authority-link-building/' },
          { label: 'E-E-A-T Audit', href: '/services/eeat-audit/' },
        ],
      },
      {
        label: 'Content & Copywriting',
        href: '/services/content-marketing/',
        children: [
          { label: 'Content Marketing', href: '/services/content-marketing/' },
          { label: 'SEO Copywriting', href: '/services/seo-copywriting/' },
          { label: 'Copywriting Audit', href: '/services/copywriting-audit/' },
          { label: 'Audience Persona Mapping', href: '/services/audience-persona-mapping/' },
        ],
      },
      {
        label: 'Data & Web',
        href: '/services/technical-web-design/',
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
  en: '/contact/',
  de: '/de/kontakt/',
  'ch-de': '/ch-de/kontakt/',
};

const privacyPaths: Record<Locale, string> = {
  en: '/privacy/',
  de: '/de/datenschutz/',
  'ch-de': '/ch-de/datenschutz/',
};

const impressumPaths: Record<string, string> = {
  en: '/imprint/',
  de: '/de/impressum/',
  'ch-de': '/ch-de/impressum/',
};

/** Locale-specific lead magnet overrides for footer audits section. */
const auditPaths: Record<Locale, NavItem[]> = {
  en: [
    { label: 'Free AISO Score', href: '/aiso-score/' },
    { label: 'Free Google Ads Audit', href: '/free-google-ads-audit/' },
    { label: 'Free Copywriting Audit', href: '/free-copywriting-audit/' },
  ],
  de: [
    { label: 'Kostenloser AISO-Check', href: '/de/aiso-check/' },
  ],
  'ch-de': [
    { label: 'Kostenloser AISO-Check', href: '/ch-de/aiso-check/' },
  ],
};

/** Get locale-specific audit lead magnets for footer. */
export function getLocalizedAudits(locale: Locale): NavItem[] {
  return auditPaths[locale] ?? auditPaths.en;
}

/**
 * Convert a navigation href to its locale-aware equivalent.
 * - EN locale: returns the original href (global master pages).
 * - Other locales: maps /services/[slug]/ to the local spoke page,
 *   /contact/ to the localized contact page, and /services/ to the locale home.
 */
export function getLocalizedNavHref(href: string, locale: Locale): string {
  // Impressum/Imprint: path differs per locale (incl. EN → /imprint/), so
  // resolve before the EN early-return shortcut below.
  if (href === '/impressum/') return impressumPaths[locale] ?? href;

  if (locale === 'en') return href;

  const localePrefix = `/${locale}`;

  // Contact page
  if (href === '/contact/') return contactPaths[locale];

  // Privacy page
  if (href === '/privacy/') return privacyPaths[locale];

  // Blog index (locales with their own blog)
  if (href === '/blog/' && (locale === 'de' || locale === 'ch-de')) return `${localePrefix}/blog/`;

  // Top-level /services/ link → locale homepage (shows pillar cards)
  if (href === '/services/') return `${localePrefix}/`;

  // Individual service pages → flat locale page first (for non-city-scoped services),
  // then the city spoke in the default city, else fall through to EN cross-locale.
  const serviceMatch = href.match(/^\/services\/([^/]+)\/$/);
  if (serviceMatch) {
    const serviceSlug = serviceMatch[1];
    const flatSlug = getFlatLocaleSlug(serviceSlug, locale);
    if (flatSlug !== null) {
      return `${localePrefix}/${flatSlug}/`;
    }
    if (!hasLocalizedService(serviceSlug, locale)) {
      return href;
    }
    const city = defaultCity[locale];
    const spokePath = getSpokePath(serviceSlug, city, locale);
    return `${localePrefix}/${spokePath}/`;
  }

  // Everything else (about, blog, case-studies, audits) → keep as-is
  return href;
}
