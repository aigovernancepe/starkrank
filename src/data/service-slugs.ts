/**
 * Maps service collection slugs to short, locale-aware URL slugs for city spoke pages.
 * Format: /[locale]/[localizedShortSlug]-[citySlug]/
 */

type SlugMap = Record<string, string>;

const enSlugs: SlugMap = {
  'ai-search-optimization': 'ai-search',
  'technical-seo-audit': 'seo-audit',
  'local-seo-consulting': 'seo',
  'performance-ads-management': 'ads-management',
  'google-ads-management': 'google-ads',
  'google-ads-audit': 'ads-audit',
  'paid-social-strategy': 'paid-social',
  'digital-pr-strategy': 'digital-pr',
  'reactive-pr': 'pr',
  'authority-link-building': 'link-building',
  'content-marketing': 'content',
  'seo-copywriting': 'copywriting',
  'copywriting-audit': 'copy-audit',
  'audience-persona-mapping': 'persona-mapping',
  'technical-web-design': 'web-design',
  'google-analytics-consultancy': 'analytics',
  'performance-web-development': 'web-dev',
  'roi-reporting-transparency': 'roi-reporting',
};

const peSlugs: SlugMap = {
  'ai-search-optimization': 'busqueda-ia',
  'technical-seo-audit': 'auditoria-seo',
  'local-seo-consulting': 'seo-local',
  'performance-ads-management': 'gestion-anuncios',
  'google-ads-management': 'google-ads',
  'google-ads-audit': 'auditoria-google-ads',
  'paid-social-strategy': 'redes-sociales',
  'digital-pr-strategy': 'pr-digital',
  'reactive-pr': 'pr-reactivo',
  'authority-link-building': 'link-building',
  'content-marketing': 'marketing-contenidos',
  'seo-copywriting': 'redaccion-seo',
  'copywriting-audit': 'auditoria-redaccion',
  'audience-persona-mapping': 'analisis-audiencia',
  'technical-web-design': 'diseno-web',
  'google-analytics-consultancy': 'consultoria-analytics',
  'performance-web-development': 'desarrollo-web',
  'roi-reporting-transparency': 'reportes-roi',
};

const deSlugs: SlugMap = {
  'ai-search-optimization': 'ki-suchoptimierung',
  'technical-seo-audit': 'seo-audit',
  'local-seo-consulting': 'lokale-seo-beratung',
  'performance-ads-management': 'ads-management',
  'google-ads-management': 'google-ads',
  'google-ads-audit': 'google-ads-audit',
  'paid-social-strategy': 'paid-social',
  'digital-pr-strategy': 'digitale-pr',
  'reactive-pr': 'reaktive-pressearbeit',
  'authority-link-building': 'linkaufbau',
  'content-marketing': 'content-marketing',
  'seo-copywriting': 'seo-texterstellung',
  'copywriting-audit': 'text-audit',
  'audience-persona-mapping': 'zielgruppenanalyse',
  'technical-web-design': 'webdesign',
  'google-analytics-consultancy': 'analytics-beratung',
  'performance-web-development': 'webentwicklung',
  'roi-reporting-transparency': 'roi-reporting',
};

const chDeSlugs: SlugMap = { ...deSlugs };

const allSlugs: Record<string, SlugMap> = {
  en: enSlugs,
  pe: peSlugs,
  de: deSlugs,
  'ch-de': chDeSlugs,
};

/**
 * Services that publish as flat locale pages (no city suffix) instead of city-scoped spokes.
 * Key = EN canonical service slug. Inner key = locale. Value = flat URL slug for that locale.
 * A locale missing from the inner record means no localized flat page exists — callers
 * should fall back to the EN hub (/services/{enSlug}/).
 */
const flatLocaleSlugs: Record<string, Partial<Record<string, string>>> = {
  'ecommerce-seo-audit': {
    de: 'ecommerce-seo-audit',
    'ch-de': 'ecommerce-seo-audit',
  },
  'pre-deploy-seo-check': {
    de: 'pre-deploy-seo-check',
    'ch-de': 'pre-deploy-seo-check',
  },
  'eeat-audit': {
    de: 'eeat-audit',
    'ch-de': 'eeat-audit',
  },
  'sme-expertise-library': {
    de: 'sme-expertise-library',
    'ch-de': 'sme-expertise-library',
    pe: 'biblioteca-experto',
  },
  'expert-interview': {
    de: 'expert-interview',
    'ch-de': 'expert-interview',
    pe: 'entrevista-experto',
  },
};

/**
 * Get the localized short slug for a service in a given locale.
 */
export function getLocalizedServiceSlug(serviceSlug: string, locale: string): string {
  return allSlugs[locale]?.[serviceSlug] ?? enSlugs[serviceSlug] ?? serviceSlug;
}

/**
 * Get the full spoke slug for a service + city combination.
 * e.g. getSpokePath('local-seo-consulting', 'lima', 'pe') => 'seo-local-lima'
 */
export function getSpokePath(serviceSlug: string, citySlug: string, locale: string): string {
  const shortSlug = getLocalizedServiceSlug(serviceSlug, locale);
  return `${shortSlug}-${citySlug}`;
}

/**
 * Get the flat-locale slug for a service if one exists, else null.
 * Use to route to /{locale}/{slug}/ for services that aren't city-scoped.
 */
export function getFlatLocaleSlug(serviceSlug: string, locale: string): string | null {
  return flatLocaleSlugs[serviceSlug]?.[locale] ?? null;
}

/**
 * True if a locale has either a city-spoke slug OR a flat-locale slug for this service.
 * Used by nav to decide between locale-link and EN cross-locale fallback.
 */
export function hasLocalizedService(serviceSlug: string, locale: string): boolean {
  if (getFlatLocaleSlug(serviceSlug, locale) !== null) return true;
  return Boolean(allSlugs[locale]?.[serviceSlug]);
}
