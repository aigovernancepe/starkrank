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

/** The one page per locale that is a genuine translation of the others. */
const localeRoots: Record<Locale, string> = {
  de: '/',
  'ch-de': '/ch-de/',
  en: '/en/',
  pe: '/pe/',
};

/** Global fallback for unmatched languages. DE-first, see the de-first pivot. */
const xDefaultPath = localeRoots.de;

/**
 * Get hreflang alternates for a given pathname.
 *
 * Only the four locale roots form a real cross-locale cluster — they get the
 * full set plus x-default. Every other page emits a self-reference only.
 *
 * x-default deliberately does NOT appear outside that cluster: most pages have
 * no equivalent in another locale (EN runs in caretaker mode, not parity), and
 * a self-referential x-default would make every page claim the global-fallback
 * role at once, which is how this previously produced 179 competing
 * declarations and no usable cluster anywhere.
 */
export function getHreflangAlternates(
  pathname: string,
  site: string
): Array<{ hreflang: string; href: string }> {
  // The error page is not a locale variant of anything.
  if (pathname === '/404/' || pathname === '/404') return [];

  const rootEntries = Object.entries(localeRoots) as Array<[Locale, string]>;
  const isLocaleRoot = rootEntries.some(([, path]) => path === pathname);

  if (isLocaleRoot) {
    return [
      ...rootEntries.map(([locale, path]) => ({
        hreflang: localeConfig[locale].hreflang,
        href: `${site}${path}`,
      })),
      { hreflang: 'x-default', href: `${site}${xDefaultPath}` },
    ];
  }

  const config = localeConfig[getCurrentLocaleFromPath(pathname)];
  return [{ hreflang: config.hreflang, href: `${site}${pathname}` }];
}

function getCurrentLocaleFromPath(path: string): Locale {
  if (path.startsWith('/ch-de/')) return 'ch-de';
  if (path.startsWith('/en/')) return 'en';
  if (path.startsWith('/pe/')) return 'pe';
  return 'de';
}
