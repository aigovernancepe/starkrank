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
      'Buy growth with surgical precision through Google Ads and paid social campaigns.',
    services: [
      'google-ads-management',
      'google-ads-audit',
      'paid-social-strategy',
    ],
  },
  {
    id: 'authority-pr',
    name: 'Authority',
    tagline: 'The Reputation Engine',
    description:
      'Turn your brand into a source of truth through strategic link building and E-E-A-T signals.',
    services: [
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
      'Build and measure the engine with performant web design and analytics consultancy.',
    services: [
      'technical-web-design',
      'google-analytics-consultancy',
    ],
  },
];

const pillarTranslations: Record<string, Record<string, { name: string; tagline: string; description: string }>> = {
  de: {
    'search-ai-intelligence': {
      name: 'Suche & KI-Intelligenz',
      tagline: 'Die Sichtbarkeits-Engine',
      description: 'Zukunftssichere Sichtbarkeit durch KI-Suchoptimierung, technisches SEO und lokale Suchstrategien.',
    },
    'performance-media': {
      name: 'Performance Media',
      tagline: 'Die Skalierungs-Engine',
      description: 'Wachstum mit chirurgischer Präzision durch Google Ads und Paid-Social-Kampagnen.',
    },
    'authority-pr': {
      name: 'Autorität',
      tagline: 'Die Reputations-Engine',
      description: 'Machen Sie Ihre Marke zur vertrauenswürdigen Quelle durch strategischen Linkaufbau und E-E-A-T-Signale.',
    },
    'content-copywriting': {
      name: 'Content & Texterstellung',
      tagline: 'Die Engagement-Engine',
      description: 'Erstellen Sie Inhalte, die Menschen begeistern und in Suchmaschinen ranken — durch strategische Texterstellung und Persona-Mapping.',
    },
    'data-web': {
      name: 'Daten & Web',
      tagline: 'Das Gehirn',
      description: 'Bauen und messen Sie die Engine mit performantem Webdesign und Analytics-Beratung.',
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
      description: 'Wachstum mit chirurgischer Präzision durch Google Ads und Paid-Social-Kampagnen.',
    },
    'authority-pr': {
      name: 'Autorität',
      tagline: 'Die Reputations-Engine',
      description: 'Machen Sie Ihre Marke zur vertrauenswürdigen Quelle durch strategischen Linkaufbau und E-E-A-T-Signale.',
    },
    'content-copywriting': {
      name: 'Content & Texterstellung',
      tagline: 'Die Engagement-Engine',
      description: 'Erstellen Sie Inhalte, die Menschen begeistern und in Suchmaschinen ranken — durch strategische Texterstellung und Persona-Mapping.',
    },
    'data-web': {
      name: 'Daten & Web',
      tagline: 'Das Gehirn',
      description: 'Bauen und messen Sie die Engine mit performantem Webdesign und Analytics-Beratung.',
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
