import { getRelativeLocaleUrl } from 'astro:i18n';
import { localeConfig, defaultLocale, type Locale } from '../data/locales';
import { en } from './translations/en';
import { pe } from './translations/pe';
import { de } from './translations/de';
import { chde } from './translations/ch-de';

const translations: Record<Locale, Record<string, string>> = {
  en,
  pe,
  de,
  'ch-de': chde,
};

/**
 * Extract the current locale from a URL pathname.
 * Post-Phase-2b: DE lives at root, EN at /en/*, CH-DE at /ch-de/*.
 * PE (es-PE) lives at /pe/*. /de/blog/ is intentionally retained as DE
 * (localized blog index tree).
 */
export function getCurrentLocale(url: URL): Locale {
  const path = url.pathname;
  if (path.startsWith('/ch-de/') || path === '/ch-de') return 'ch-de';
  if (path.startsWith('/en/') || path === '/en') return 'en';
  if (path.startsWith('/pe/') || path === '/pe') return 'pe';
  return 'de';
}

/**
 * Get a localized URL path.
 */
export function getLocalizedUrl(path: string, locale: Locale): string {
  return getRelativeLocaleUrl(locale, path);
}

/**
 * Simple translation lookup.
 */
export function t(key: string, locale: Locale = defaultLocale): string {
  return translations[locale]?.[key] ?? translations[defaultLocale][key] ?? key;
}

/**
 * Translation with variable interpolation. Replaces {varName} placeholders.
 */
export function tf(key: string, vars: Record<string, string>, locale: Locale = defaultLocale): string {
  let result = t(key, locale);
  for (const [k, v] of Object.entries(vars)) {
    result = result.replaceAll(`{${k}}`, v);
  }
  return result;
}

/**
 * Get the lang attribute value for a locale.
 */
export function getLangAttribute(locale: Locale): string {
  return localeConfig[locale].lang;
}

/**
 * Get hreflang alternates for a given pathname.
 * Only returns alternates for pages that exist (based on locale-specific logic).
 */
export function getHreflangAlternates(
  pathname: string,
  site: string
): Array<{ hreflang: string; href: string }> {
  const currentLocale = getCurrentLocaleFromPath(pathname);
  const config = localeConfig[currentLocale];
  const alternates: Array<{ hreflang: string; href: string }> = [
    { hreflang: config.hreflang, href: `${site}${pathname}` },
    { hreflang: 'x-default', href: `${site}${pathname}` },
  ];
  return alternates;
}

function getCurrentLocaleFromPath(path: string): Locale {
  if (path.startsWith('/ch-de/')) return 'ch-de';
  if (path.startsWith('/en/')) return 'en';
  if (path.startsWith('/pe/')) return 'pe';
  return 'de';
}
