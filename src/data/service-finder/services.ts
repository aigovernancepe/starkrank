import type { ServiceDef } from './types';

// URL mapping verified against live site (firecrawl map 2026-03-29)
// EN: /services/* hub pages
// DE: /de/{service}-hannover city pages
// CH-DE: /ch-de/{service}-basel city pages
// PE: /pe/{service}-lima city pages

export const services: ServiceDef[] = [
  {
    id: 'ai-search-optimization',
    icon: 'brain-circuit',
    links: {
      en: '/services/ai-search-optimization/',
      es: '/pe/busqueda-ia-lima/',
      de: '/de/ki-suchoptimierung-hannover/',
      'ch-de': '/ch-de/ki-suchoptimierung-basel/',
    },
  },
  {
    id: 'aiso-score',
    icon: 'gauge',
    links: {
      en: '/free-aiso-score/',
      es: '/pe/apareces-en-google/',
      de: '/de/aiso-check/',
      'ch-de': '/ch-de/aiso-check/',
    },
  },
  {
    id: 'local-seo',
    icon: 'map-pin',
    links: {
      en: '/services/local-seo-consulting/',
      es: '/pe/seo-local-lima/',
      de: '/de/lokale-seo-beratung-hannover/',
      'ch-de': '/ch-de/lokale-seo-beratung-basel/',
    },
  },
  {
    id: 'technical-seo',
    icon: 'wrench',
    links: {
      en: '/services/technical-seo-audit/',
      es: '/pe/auditoria-seo-lima/',
      de: '/de/seo-audit-hannover/',
      'ch-de': '/ch-de/seo-audit-basel/',
    },
  },
  {
    id: 'content-marketing',
    icon: 'pen-line',
    links: {
      en: '/services/content-marketing/',
      es: '/pe/marketing-contenidos-lima/',
      de: '/de/content-marketing-hannover/',
      'ch-de': '/ch-de/content-marketing-basel/',
    },
  },
  {
    id: 'google-ads-audit',
    icon: 'badge-dollar-sign',
    links: {
      en: '/audits/free-google-ads-check/',
      es: '/pe/auditoria-google-ads-lima/',
      de: '/de/google-ads-audit-hannover/',
      'ch-de': '/ch-de/google-ads-audit-basel/',
    },
  },
  {
    id: 'paid-strategy',
    icon: 'trending-up',
    links: {
      en: '/services/google-ads-management/',
      es: '/pe/google-ads-lima/',
      de: '/de/google-ads-hannover/',
      'ch-de': '/ch-de/google-ads-basel/',
    },
  },
  {
    id: 'multi-location-seo',
    icon: 'building-2',
    links: {
      en: '/services/multi-location-seo/',
    },
  },
  {
    id: 'review-management',
    icon: 'star',
    links: {
      en: '/services/local-seo-consulting/',
      es: '/pe/seo-local-lima/',
      de: '/de/lokale-seo-beratung-hannover/',
      'ch-de': '/ch-de/lokale-seo-beratung-basel/',
    },
  },
  {
    id: 'digital-pr',
    icon: 'megaphone',
    links: {
      en: '/services/digital-pr-strategy/',
      de: '/de/digitale-pr-hannover/',
      'ch-de': '/ch-de/digitale-pr-basel/',
    },
  },
  {
    id: 'multilingual-seo',
    icon: 'globe',
    links: {
      en: '/services/content-marketing/',
      de: '/de/content-marketing-hannover/',
      'ch-de': '/ch-de/content-marketing-basel/',
    },
  },
  {
    id: 'website-design-brief',
    icon: 'layout',
    links: {
      en: '/services/technical-web-design/',
      es: '/pe/diseno-web-lima/',
      de: '/de/webdesign-hannover/',
      'ch-de': '/ch-de/webdesign-basel/',
    },
  },
  {
    id: 'roi-analytics',
    icon: 'bar-chart-3',
    links: {
      en: '/services/roi-reporting-transparency/',
      de: '/de/roi-reporting-hannover/',
      'ch-de': '/ch-de/roi-reporting-basel/',
    },
  },
  {
    id: 'entity-building',
    icon: 'fingerprint',
    links: {
      en: '/services/ai-search-optimization/',
      de: '/de/ki-suchoptimierung-hannover/',
      'ch-de': '/ch-de/ki-suchoptimierung-basel/',
    },
  },
  {
    id: 'compliance-content',
    icon: 'shield-check',
    links: {
      en: '/services/content-marketing/',
      de: '/de/content-marketing-hannover/',
      'ch-de': '/ch-de/content-marketing-basel/',
    },
  },
  {
    id: 'consent-audit',
    icon: 'cookie',
    links: {
      en: '/services/technical-seo-audit/',
      de: '/de/seo-audit-hannover/',
      'ch-de': '/ch-de/seo-audit-basel/',
    },
  },
  {
    id: 'seo-retainer',
    icon: 'handshake',
    links: {
      en: '/services/local-seo-consulting/',
      es: '/pe/seo-local-lima/',
      de: '/de/lokale-seo-beratung-hannover/',
      'ch-de': '/ch-de/lokale-seo-beratung-basel/',
    },
  },
  {
    id: 'free-audit',
    icon: 'clipboard-check',
    links: {
      en: '/free-aiso-score/',
      es: '/pe/apareces-en-google/',
      de: '/de/aiso-check/',
      'ch-de': '/ch-de/aiso-check/',
    },
  },
  {
    id: 'full-service-retainer',
    icon: 'layers',
    links: {
      en: '/services/local-seo-consulting/',
      es: '/pe/seo-local-lima/',
      de: '/de/lokale-seo-beratung-hannover/',
      'ch-de': '/ch-de/lokale-seo-beratung-basel/',
    },
  },
  {
    id: 'competitive-analysis',
    icon: 'users',
    links: {
      en: '/services/local-seo-consulting/',
      es: '/pe/seo-local-lima/',
      de: '/de/lokale-seo-beratung-hannover/',
      'ch-de': '/ch-de/lokale-seo-beratung-basel/',
    },
  },
  {
    id: 'landing-page-audit',
    icon: 'scan-line',
    links: {
      en: '/services/technical-seo-audit/',
      de: '/de/seo-audit-hannover/',
      'ch-de': '/ch-de/seo-audit-basel/',
    },
  },
  {
    id: 'strategy',
    icon: 'compass',
    links: {
      en: '/services/local-seo-consulting/',
      de: '/de/lokale-seo-beratung-hannover/',
      'ch-de': '/ch-de/lokale-seo-beratung-basel/',
    },
  },
  {
    id: 'monthly-reporting',
    icon: 'file-text',
    links: {
      en: '/services/roi-reporting-transparency/',
      de: '/de/roi-reporting-hannover/',
      'ch-de': '/ch-de/roi-reporting-basel/',
    },
  },
  {
    id: 'gbp-audit',
    icon: 'map',
    links: {
      en: '/services/local-seo-consulting/',
      es: '/pe/seo-local-lima/',
      de: '/de/lokale-seo-beratung-hannover/',
      'ch-de': '/ch-de/lokale-seo-beratung-basel/',
    },
  },
  {
    id: 'gbp-photos',
    icon: 'camera',
    links: {
      en: '/services/local-seo-consulting/',
      de: '/de/lokale-seo-beratung-hannover/',
    },
  },
  {
    id: 'schema-eeat',
    icon: 'code',
    links: {
      en: '/services/technical-seo-audit/',
      de: '/de/seo-audit-hannover/',
      'ch-de': '/ch-de/seo-audit-basel/',
    },
  },
];
