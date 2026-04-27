import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const faqItem = z.object({
  question: z.string(),
  answer: z.string(),
});

// SERP meta-description budget. Google truncates DE/CH-DE descriptions around
// 155 chars on most viewports. Caught 5 over-length hubs in the Phase 3d audit
// post-write — this lint surfaces them at build-time instead.
const metaDescription = z
  .string()
  .max(155, { message: 'description must be ≤155 chars (SERP meta budget)' });

const services = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    pillar: z.enum([
      'search-ai-intelligence',
      'performance-media',
      'authority-pr',
      'content-copywriting',
      'data-web',
    ]),
    isPillarHub: z.boolean().default(false),
    icon: z.string().optional(),
    features: z.array(z.string()).optional(),
    relatedServices: z.array(z.string()).optional(),
    ogImage: z.string().optional(),
    faq: z.array(faqItem).optional(),
    updatedDate: z.coerce.date().optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('StarkRank'),
    tags: z.array(z.string()).optional(),
    locale: z.enum(['en', 'de', 'ch-de']).default('en'),
    category: z.string().optional(),
    ogImage: z.string().optional(),
    faq: z.array(faqItem).optional(),
  }),
});

const cities = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/cities' }),
  schema: z.object({
    city: z.string(),
    citySlug: z.string(),
    country: z.string(),
    locale: z.enum(['en', 'de', 'ch-de']),
    services: z.array(z.string()),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
    localPhone: z.string().optional(),
    address: z.string().optional(),
    region: z.string().optional(),
    postalCode: z.string().optional(),
  }),
});

const serviceHubs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/service-hubs' }),
  schema: z.object({
    serviceSlug: z.string(),
    // Optional keyword-friendly URL slug per locale (Phase 3d). Falls back to
    // serviceSlug if not set. Matches /services/<urlSlug>/ on DE and
    // /ch-de/services/<urlSlug>/ on CH-DE. See feedback_serp_intent_locale_verification
    // for the rationale (DE bare-keyword SERPs are guide/tool gravity wells;
    // agency hubs need buyer-qualified suffixes).
    urlSlug: z.string().optional(),
    locale: z.enum(['de', 'ch-de']),
    title: z.string().optional(),
    description: metaDescription,
    heroLede: z.string().optional(),
    faq: z.array(faqItem).optional(),
    updatedDate: z.coerce.date().optional(),
    processTotalTime: z.string().optional(),
    processSteps: z.array(z.object({
      name: z.string(),
      description: z.string(),
      tools: z.array(z.string()).optional(),
    })).optional(),
  }),
});

const spokes = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/spokes' }),
  schema: z.object({
    serviceSlug: z.string(),
    citySlug: z.string(),
    locale: z.enum(['en', 'de', 'ch-de']),
    title: z.string(),
    description: z.string(),
    localCTA: z.string().optional(),
    highlights: z.array(z.object({
      title: z.string(),
      description: z.string(),
    })).optional(),
    sectors: z.array(z.object({
      name: z.string(),
      description: z.string(),
    })).optional(),
    deliverables: z.array(z.string()).optional(),
    faq: z.array(faqItem).optional(),
    updatedDate: z.coerce.date().optional(),
    highlightsTitle: z.string().optional(),
    sectorsTitle: z.string().optional(),
  }),
});

const cityHubs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/city-hubs' }),
  schema: z.object({
    citySlug: z.string(),
    locale: z.enum(['de', 'ch-de']),
    title: z.string(),
    description: metaDescription,
    heroHeadline: z.string(),
    heroLede: z.string(),
    sectorsTitle: z.string().optional(),
    sectors: z.array(z.object({
      name: z.string(),
      description: z.string(),
    })).optional(),
    whyTitle: z.string().optional(),
    whyParagraphs: z.array(z.string()).optional(),
    servicesTitle: z.string().optional(),
    servicesIntro: z.string().optional(),
    featuredServices: z.array(z.string()).optional(),
    faq: z.array(faqItem).optional(),
    cta: z.string().optional(),
    updatedDate: z.coerce.date().optional(),
  }),
});

export const collections = { services, blog, cities, spokes, serviceHubs, cityHubs };
