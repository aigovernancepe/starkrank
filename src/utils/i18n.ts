import { getRelativeLocaleUrl } from 'astro:i18n';
import { localeConfig, defaultLocale, type Locale } from '../data/locales';
import { en } from './translations/en';
import { de } from './translations/de';
import { chde } from './translations/ch-de';

const translations: Record<Locale, Record<string, string>> = {
  en,
  de,
  'ch-de': chde,
};

/**
 * Extract the current locale from a URL pathname.
 */
export function getCurrentLocale(url: URL): Locale {
  const path = url.pathname;
  if (path.startsWith('/ch-de/') || path === '/ch-de') return 'ch-de';
  if (path.startsWith('/de/') || path === '/de') return 'de';
  return defaultLocale;
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
  const alternates: Array<{ hreflang: string; href: string }> = [];

  // For global service pages (no locale prefix), only en + x-default
  if (pathname.startsWith('/services/') || pathname.startsWith('/blog/')) {
    alternates.push(
      { hreflang: 'en', href: `${site}${pathname}` },
      { hreflang: 'x-default', href: `${site}${pathname}` }
    );
    return alternates;
  }

  // For locale-prefixed pages, add the current page + x-default
  const currentLocale = getCurrentLocaleFromPath(pathname);
  const config = localeConfig[currentLocale];
  alternates.push(
    { hreflang: config.hreflang, href: `${site}${pathname}` },
    { hreflang: 'x-default', href: `${site}${pathname}` }
  );

  return alternates;
}

function getCurrentLocaleFromPath(path: string): Locale {
  if (path.startsWith('/ch-de/')) return 'ch-de';
  if (path.startsWith('/de/')) return 'de';
  return defaultLocale;
}
