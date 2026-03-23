import { type Locale, defaultCity } from './locales';
import { getSpokePath } from './service-slugs';

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
        href: '/services/ai-search-optimisation/',
        children: [
          { label: 'AI Search Optimisation', href: '/services/ai-search-optimisation/' },
          { label: 'Technical SEO Audit', href: '/services/technical-seo-audit/' },
          { label: 'Local SEO Consulting', href: '/services/local-seo-consulting/' },
        ],
      },
      {
        label: 'Performance Media',
        href: '/services/performance-ads-management/',
        children: [
          { label: 'Performance Ads Management', href: '/services/performance-ads-management/' },
          { label: 'Google Ads Management', href: '/services/google-ads-management/' },
          { label: 'Google Ads Audit', href: '/services/google-ads-audit/' },
          { label: 'Paid Social Strategy', href: '/services/paid-social-strategy/' },
        ],
      },
      {
        label: 'Authority & PR',
        href: '/services/digital-pr-strategy/',
        children: [
          { label: 'Digital PR Strategy', href: '/services/digital-pr-strategy/' },
          { label: 'Reactive PR', href: '/services/reactive-pr/' },
          { label: 'Authority Link Building', href: '/services/authority-link-building/' },
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
          { label: 'Performance Web Development', href: '/services/performance-web-development/' },
          { label: 'ROI Reporting & Transparency', href: '/services/roi-reporting-transparency/' },
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
    { label: 'Search & AI', href: '/services/ai-search-optimisation/' },
    { label: 'Performance Media', href: '/services/performance-ads-management/' },
    { label: 'Authority & PR', href: '/services/digital-pr-strategy/' },
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
    { label: 'Free Google Ads Audit', href: '/audits/free-google-ads-check/' },
    { label: 'Copywriting Audit', href: '/audits/copywriting-ux-analysis/' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy/' },
  ],
};

/** Locale-specific overrides for non-service navigation paths. */
const contactPaths: Record<Locale, string> = {
  en: '/contact/',
  pe: '/pe/contacto/',
  de: '/de/kontakt/',
  'ch-de': '/ch-de/kontakt/',
};

const privacyPaths: Record<Locale, string> = {
  en: '/privacy/',
  pe: '/pe/privacidad/',
  de: '/de/datenschutz/',
  'ch-de': '/ch-de/datenschutz/',
};

/**
 * Convert a navigation href to its locale-aware equivalent.
 * - EN locale: returns the original href (global master pages).
 * - Other locales: maps /services/[slug]/ to the local spoke page,
 *   /contact/ to the localized contact page, and /services/ to the locale home.
 */
export function getLocalizedNavHref(href: string, locale: Locale): string {
  if (locale === 'en') return href;

  const localePrefix = `/${locale}`;

  // Contact page
  if (href === '/contact/') return contactPaths[locale];

  // Privacy page
  if (href === '/privacy/') return privacyPaths[locale];

  // Top-level /services/ link → locale homepage (shows pillar cards)
  if (href === '/services/') return `${localePrefix}/`;

  // Individual service pages → spoke page in default city
  const serviceMatch = href.match(/^\/services\/([^/]+)\/$/);
  if (serviceMatch) {
    const serviceSlug = serviceMatch[1];
    const city = defaultCity[locale];
    const spokePath = getSpokePath(serviceSlug, city, locale);
    return `${localePrefix}/${spokePath}/`;
  }

  // Everything else (about, blog, case-studies, audits) → keep as-is
  return href;
}
