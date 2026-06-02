import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

// Wrap every markdown <table> in <div class="table-scroll"> so wide tables
// (e.g. the CHF pricing tables in blog posts and CH-DE service hubs) scroll
// horizontally on their own instead of forcing the whole article to scroll.
// Zero-dependency hast walker — no unist-util-visit needed.
function rehypeWrapTables() {
  return (tree) => {
    const walk = (node) => {
      if (!node.children) return;
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        if (child.type === 'element' && child.tagName === 'table') {
          node.children[i] = {
            type: 'element',
            tagName: 'div',
            properties: { className: ['table-scroll'] },
            children: [child],
          };
        } else {
          walk(child);
        }
      }
    };
    walk(tree);
  };
}

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
    '/free-aiso-score/': '/en/aiso-score/',
    '/audits/free-google-ads-check/': '/kostenloser-google-ads-check/',
    '/audits/copywriting-ux-analysis/': '/kostenloser-copywriting-check/',
    '/locations/': '/',
  },
  integrations: [
    react(),
    sitemap(),
  ],
  markdown: {
    // Keep apostrophes and quotes straight across all locales. Swiss number
    // formatting requires the straight apostrophe (1'500 CHF, not 1’500 CHF).
    // Content uses direct Unicode em-dashes (—) and ellipses (…) so disabling
    // autotypography is safe — no ---/... shortcuts in the corpus.
    smartypants: false,
    rehypePlugins: [rehypeWrapTables],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
