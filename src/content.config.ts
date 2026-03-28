import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const faqItem = z.object({
  question: z.string(),
  answer: z.string(),
});

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
    locale: z.enum(['en', 'pe', 'de', 'ch-de']).default('en'),
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
    locale: z.enum(['en', 'pe', 'de', 'ch-de']),
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

const spokes = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/spokes' }),
  schema: z.object({
    serviceSlug: z.string(),
    citySlug: z.string(),
    locale: z.enum(['en', 'pe', 'de', 'ch-de']),
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

export const collections = { services, blog, cities, spokes };
