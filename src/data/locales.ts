export const localeConfig = {
  en: {
    label: 'United States',
    lang: 'en-US',
    hreflang: 'en',
    currency: 'USD',
    flag: 'US',
    dir: 'ltr',
  },
  pe: {
    label: 'Perú',
    lang: 'es-PE',
    hreflang: 'es-PE',
    currency: 'PEN',
    flag: 'PE',
    dir: 'ltr',
  },
  de: {
    label: 'Deutschland',
    lang: 'de-DE',
    hreflang: 'de-DE',
    currency: 'EUR',
    flag: 'DE',
    dir: 'ltr',
  },
  'ch-de': {
    label: 'Schweiz',
    lang: 'de-CH',
    hreflang: 'de-CH',
    currency: 'CHF',
    flag: 'CH',
    dir: 'ltr',
  },
} as const;

export type Locale = keyof typeof localeConfig;
export const defaultLocale: Locale = 'en';
export const locales = Object.keys(localeConfig) as Locale[];

/** The primary city slug used for spoke page links per locale. */
export const defaultCity: Record<Locale, string> = {
  en: 'miami',
  pe: 'lima',
  de: 'hannover',
  'ch-de': 'basel',
};
