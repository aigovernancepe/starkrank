/**
 * Hreflang clusters for standalone landing pages with genuine cross-locale
 * translation pairs (unlike most non-root pages, which only self-reference —
 * see getHreflangAlternates in ../utils/i18n.ts).
 *
 * Same shape and rationale as blogHreflangPairs in the blog [slug].astro
 * routes: every page in a family lists the SAME complete set of alternates,
 * including its own self-reference. No x-default here — that stays reserved
 * for the four locale roots (/, /en/, /ch-de/, /pe/) per the #245 fix.
 */
export type HreflangAlternate = { hreflang: string; href: string };

export const landingHreflangPairs: Record<string, HreflangAlternate[]> = {
  expertenbibliothek: [
    { hreflang: 'de-DE', href: 'https://starkrank.com/expertenbibliothek/' },
    { hreflang: 'de-CH', href: 'https://starkrank.com/ch-de/expertenbibliothek/' },
  ],
  'kostenloser-copywriting-check': [
    { hreflang: 'de-DE', href: 'https://starkrank.com/kostenloser-copywriting-check/' },
    { hreflang: 'de-CH', href: 'https://starkrank.com/ch-de/kostenloser-copywriting-check/' },
    { hreflang: 'en', href: 'https://starkrank.com/en/free-copywriting-audit/' },
  ],
  'ecommerce-seo-audit': [
    { hreflang: 'de-DE', href: 'https://starkrank.com/ecommerce-seo-audit/' },
    { hreflang: 'de-CH', href: 'https://starkrank.com/ch-de/ecommerce-seo-audit/' },
    { hreflang: 'en', href: 'https://starkrank.com/en/services/ecommerce-seo-audit/' },
  ],
  'pre-deploy-seo-check': [
    { hreflang: 'de-DE', href: 'https://starkrank.com/pre-deploy-seo-check/' },
    { hreflang: 'de-CH', href: 'https://starkrank.com/ch-de/pre-deploy-seo-check/' },
  ],
  'aiso-check': [
    { hreflang: 'de-DE', href: 'https://starkrank.com/aiso-check/' },
    { hreflang: 'de-CH', href: 'https://starkrank.com/ch-de/aiso-check/' },
    { hreflang: 'en', href: 'https://starkrank.com/en/aiso-score/' },
  ],
  'eeat-audit': [
    { hreflang: 'de-DE', href: 'https://starkrank.com/eeat-audit/' },
    { hreflang: 'de-CH', href: 'https://starkrank.com/ch-de/eeat-audit/' },
    { hreflang: 'en', href: 'https://starkrank.com/en/services/eeat-audit/' },
  ],
  'kostenloser-google-ads-check': [
    { hreflang: 'de-DE', href: 'https://starkrank.com/kostenloser-google-ads-check/' },
    { hreflang: 'de-CH', href: 'https://starkrank.com/ch-de/kostenloser-google-ads-check/' },
    { hreflang: 'en', href: 'https://starkrank.com/en/free-google-ads-audit/' },
  ],
  experteninterview: [
    { hreflang: 'de-DE', href: 'https://starkrank.com/experteninterview/' },
    { hreflang: 'de-CH', href: 'https://starkrank.com/ch-de/experteninterview/' },
  ],
  'preise-seo': [
    { hreflang: 'de-DE', href: 'https://starkrank.com/preise/seo/' },
    { hreflang: 'de-CH', href: 'https://starkrank.com/ch-de/preise/seo/' },
  ],
};
