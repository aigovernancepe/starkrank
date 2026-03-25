export interface Pillar {
  id: string;
  name: string;
  tagline: string;
  description: string;
  services: string[];
}

export const pillars: Pillar[] = [
  {
    id: 'search-ai-intelligence',
    name: 'Search & AI Intelligence',
    tagline: 'The Visibility Engine',
    description:
      'Future-proof your visibility with AI search optimization, technical SEO, and local search strategies.',
    services: [
      'ai-search-optimization',
      'technical-seo-audit',
      'local-seo-consulting',
    ],
  },
  {
    id: 'performance-media',
    name: 'Performance Media',
    tagline: 'The Scale Engine',
    description:
      'Buying growth with surgical precision through Google Ads, paid social, and local service ads.',
    services: [
      'performance-ads-management',
      'google-ads-management',
      'google-ads-audit',
      'paid-social-strategy',
    ],
  },
  {
    id: 'authority-pr',
    name: 'Authority & PR',
    tagline: 'The Reputation Engine',
    description:
      'Turn your brand into a source of truth through digital PR, reactive PR, and strategic link building.',
    services: [
      'digital-pr-strategy',
      'reactive-pr',
      'authority-link-building',
    ],
  },
  {
    id: 'content-copywriting',
    name: 'Content & Copywriting',
    tagline: 'The Engage Engine',
    description:
      'Create content that engages humans and ranks in search engines through strategic copywriting and persona mapping.',
    services: [
      'content-marketing',
      'seo-copywriting',
      'copywriting-audit',
      'audience-persona-mapping',
    ],
  },
  {
    id: 'data-web',
    name: 'Data & Web',
    tagline: 'The Brain',
    description:
      'Build and measure the engine with performance web development, analytics consultancy, and transparent reporting.',
    services: [
      'technical-web-design',
      'google-analytics-consultancy',
      'performance-web-development',
      'roi-reporting-transparency',
    ],
  },
];

const pillarTranslations: Record<string, Record<string, { name: string; tagline: string; description: string }>> = {
  pe: {
    'search-ai-intelligence': {
      name: 'Búsqueda e Inteligencia IA',
      tagline: 'El Motor de Visibilidad',
      description: 'Asegure su visibilidad con optimización de búsqueda IA, SEO técnico y estrategias de búsqueda local.',
    },
    'performance-media': {
      name: 'Medios de Rendimiento',
      tagline: 'El Motor de Escala',
      description: 'Crecimiento con precisión quirúrgica a través de Google Ads, redes sociales pagadas y anuncios de servicios locales.',
    },
    'authority-pr': {
      name: 'Autoridad y PR',
      tagline: 'El Motor de Reputación',
      description: 'Convierta su marca en fuente de verdad a través de PR digital, PR reactivo y link building estratégico.',
    },
    'content-copywriting': {
      name: 'Contenido y Redacción',
      tagline: 'El Motor de Engagement',
      description: 'Cree contenido que conecte con las personas y posicione en buscadores mediante redacción estratégica y mapeo de personas.',
    },
    'data-web': {
      name: 'Datos y Web',
      tagline: 'El Cerebro',
      description: 'Construya y mida el motor con desarrollo web de alto rendimiento, consultoría analítica y reportes transparentes.',
    },
  },
  de: {
    'search-ai-intelligence': {
      name: 'Suche & KI-Intelligenz',
      tagline: 'Die Sichtbarkeits-Engine',
      description: 'Zukunftssichere Sichtbarkeit durch KI-Suchoptimierung, technisches SEO und lokale Suchstrategien.',
    },
    'performance-media': {
      name: 'Performance Media',
      tagline: 'Die Skalierungs-Engine',
      description: 'Wachstum mit chirurgischer Präzision durch Google Ads, Paid Social und lokale Serviceanzeigen.',
    },
    'authority-pr': {
      name: 'Autorität & PR',
      tagline: 'Die Reputations-Engine',
      description: 'Machen Sie Ihre Marke zur vertrauenswürdigen Quelle durch Digital PR, Reactive PR und strategischen Linkaufbau.',
    },
    'content-copywriting': {
      name: 'Content & Texterstellung',
      tagline: 'Die Engagement-Engine',
      description: 'Erstellen Sie Inhalte, die Menschen begeistern und in Suchmaschinen ranken — durch strategische Texterstellung und Persona-Mapping.',
    },
    'data-web': {
      name: 'Daten & Web',
      tagline: 'Das Gehirn',
      description: 'Bauen und messen Sie die Engine mit performantem Webdesign, Analytics-Beratung und transparentem Reporting.',
    },
  },
  'ch-de': {
    'search-ai-intelligence': {
      name: 'Suche & KI-Intelligenz',
      tagline: 'Die Sichtbarkeits-Engine',
      description: 'Zukunftssichere Sichtbarkeit durch KI-Suchoptimierung, technisches SEO und lokale Suchstrategien.',
    },
    'performance-media': {
      name: 'Performance Media',
      tagline: 'Die Skalierungs-Engine',
      description: 'Wachstum mit chirurgischer Präzision durch Google Ads, Paid Social und lokale Serviceanzeigen.',
    },
    'authority-pr': {
      name: 'Autorität & PR',
      tagline: 'Die Reputations-Engine',
      description: 'Machen Sie Ihre Marke zur vertrauenswürdigen Quelle durch Digital PR, Reactive PR und strategischen Linkaufbau.',
    },
    'content-copywriting': {
      name: 'Content & Texterstellung',
      tagline: 'Die Engagement-Engine',
      description: 'Erstellen Sie Inhalte, die Menschen begeistern und in Suchmaschinen ranken — durch strategische Texterstellung und Persona-Mapping.',
    },
    'data-web': {
      name: 'Daten & Web',
      tagline: 'Das Gehirn',
      description: 'Bauen und messen Sie die Engine mit performantem Webdesign, Analytics-Beratung und transparentem Reporting.',
    },
  },
};

export function getPillarById(id: string): Pillar | undefined {
  return pillars.find((p) => p.id === id);
}

export function getLocalizedPillars(locale: string): Pillar[] {
  if (locale === 'en' || !pillarTranslations[locale]) return pillars;

  const translations = pillarTranslations[locale];
  return pillars.map((pillar) => {
    const t = translations[pillar.id];
    if (!t) return pillar;
    return { ...pillar, name: t.name, tagline: t.tagline, description: t.description };
  });
}
