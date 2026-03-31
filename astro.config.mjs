import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://starkrank.com',
  trailingSlash: 'always',
  output: 'static',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pe', 'de', { path: 'ch-de', codes: ['ch-de'] }],
    routing: {
      prefixDefaultLocale: false,
    },
    fallback: {
      pe: 'en',
      de: 'en',
      'ch-de': 'de',
    },
  },
  redirects: {
    '/schweiz/': '/ch-de/',
    '/peru/': '/pe/',
    '/deutschland/': '/de/',
    '/services/ai-search-optimisation/': '/services/ai-search-optimization/',
    '/services/ai-search-optimisation': '/services/ai-search-optimization/',
    '/free-aiso-score/': '/aiso-score/',
    '/audits/free-google-ads-check/': '/free-google-ads-audit/',
    '/audits/copywriting-ux-analysis/': '/free-copywriting-audit/',
  },
  integrations: [
    react(),
    sitemap({
      serialize(item) {
        item.lastmod = new Date().toISOString();
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
