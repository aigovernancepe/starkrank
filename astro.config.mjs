import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://starkrank.com',
  trailingSlash: 'always',
  output: 'static',
  i18n: {
    defaultLocale: 'de',
    locales: ['de', 'en', { path: 'ch-de', codes: ['ch-de'] }],
    routing: {
      prefixDefaultLocale: false,
    },
    fallback: {
      'ch-de': 'de',
    },
  },
  redirects: {
    '/schweiz/': '/ch-de/',
    '/deutschland/': '/',
    '/services/ai-search-optimisation/': '/en/services/ai-search-optimization/',
    '/services/ai-search-optimisation': '/en/services/ai-search-optimization/',
    '/free-aiso-score/': '/aiso-check/',
    '/audits/free-google-ads-check/': '/kostenloser-google-ads-check/',
    '/audits/copywriting-ux-analysis/': '/kostenloser-copywriting-check/',
    '/locations/': '/',
  },
  integrations: [
    react(),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
