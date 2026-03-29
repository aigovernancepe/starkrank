import type { RoutingRule, ScoredService, Market } from './types';
import { services } from './services';

export const roleIndustryFilter: Record<string, string[] | 'all' | 'skip'> = {
  R1: 'all',
  R2: 'all',
  R3: ['I1', 'I2', 'I4', 'I9', 'I13', 'I14'],
  R4: 'all',
  R5: 'all',
  R6: 'skip',
  R7: 'all',
};

export const roleQuestionFilter: Record<string, string[]> = {
  R1: ['Q-R1a', 'Q-R1b', 'Q-R1c'],
  R2: ['Q-R2a', 'Q-R2b', 'Q-R2c', 'Q-R2d'],
  R3: ['Q-R3a', 'Q-R3b', 'Q-R3c'],
  R4: ['Q-R2a', 'Q-R2b', 'Q-R2c', 'Q-R2d'],
  R5: ['Q-R1a', 'Q-R1b', 'Q-R1c'],
  R6: [],
  R7: [],
};

export const industryQuestionFilter: Record<string, string[]> = {
  I1:  ['Q-I1a', 'Q-I1b', 'Q-I1c'],
  I2:  ['Q-I2a', 'Q-I2b', 'Q-I2c'],
  I3:  ['Q-I3a', 'Q-I3b'],
  I4:  ['Q-I4a', 'Q-I4b'],
  I5:  ['Q-I5a', 'Q-I5b'],
  I6:  ['Q-I6a', 'Q-I6b'],
  I7:  ['Q-I7a', 'Q-I7b', 'Q-I7c', 'Q-I7d'],
  I8:  ['Q-I8a', 'Q-I8b', 'Q-I8c', 'Q-I8d'],
  I9:  ['Q-I9a', 'Q-I9b', 'Q-I9c'],
  I10: ['Q-I10a', 'Q-I10b'],
  I11: ['Q-I11a', 'Q-I11b'],
  I12: ['Q-I12a', 'Q-I12b'],
  I13: ['Q-I13a', 'Q-I13b'],
  I14: ['Q-I14a', 'Q-I14b'],
  I15: [],
};

export const marketIndustries: Record<Market, string[]> = {
  en:     ['I1','I2','I3','I4','I5','I6','I7','I8','I9','I10','I11','I15'],
  es:     ['I1','I2','I3','I6','I7','I10','I11','I12','I15'],
  de:     ['I1','I2','I3','I4','I5','I6','I7','I8','I9','I11','I12','I13','I15'],
  'ch-de':['I1','I2','I4','I6','I7','I8','I9','I12','I13','I14','I15'],
};

export const routingRules: RoutingRule[] = [
  // Universal
  { questionId: 'Q-U1', services: [
    { serviceId: 'technical-seo', weight: 1 },
    { serviceId: 'landing-page-audit', weight: 0.5 },
    { serviceId: 'content-marketing', weight: 0.25 },
  ]},
  { questionId: 'Q-U2', services: [
    { serviceId: 'local-seo', weight: 1 },
    { serviceId: 'competitive-analysis', weight: 0.5 },
    { serviceId: 'seo-retainer', weight: 0.25 },
  ]},
  { questionId: 'Q-U3', services: [
    { serviceId: 'aiso-score', weight: 1 },
    { serviceId: 'ai-search-optimization', weight: 0.5 },
    { serviceId: 'entity-building', weight: 0.25 },
  ]},
  { questionId: 'Q-U4', services: [
    { serviceId: 'google-ads-audit', weight: 1 },
    { serviceId: 'paid-strategy', weight: 0.5 },
  ]},
  { questionId: 'Q-U5', services: [
    { serviceId: 'roi-analytics', weight: 1 },
    { serviceId: 'monthly-reporting', weight: 0.5 },
  ]},

  // Role: Owner / Startup
  { questionId: 'Q-R1a', services: [
    { serviceId: 'website-design-brief', weight: 1 },
  ]},
  { questionId: 'Q-R1b', services: [
    { serviceId: 'full-service-retainer', weight: 1 },
  ]},
  { questionId: 'Q-R1c', services: [
    { serviceId: 'free-audit', weight: 1 },
  ]},

  // Role: Marketing / Digital
  { questionId: 'Q-R2a', services: [
    { serviceId: 'seo-retainer', weight: 1 },
  ]},
  { questionId: 'Q-R2b', services: [
    { serviceId: 'technical-seo', weight: 1 },
  ]},
  { questionId: 'Q-R2c', services: [
    { serviceId: 'roi-analytics', weight: 1 },
  ]},
  { questionId: 'Q-R2d', services: [
    { serviceId: 'competitive-analysis', weight: 1 },
    { serviceId: 'technical-seo', weight: 0.5 },
    { serviceId: 'strategy', weight: 0.25 },
  ]},

  // Role: Practice Manager
  { questionId: 'Q-R3a', services: [
    { serviceId: 'multi-location-seo', weight: 1 },
  ]},
  { questionId: 'Q-R3b', services: [
    { serviceId: 'compliance-content', weight: 1 },
    { serviceId: 'content-marketing', weight: 0.5 },
  ]},
  { questionId: 'Q-R3c', services: [
    { serviceId: 'multi-location-seo', weight: 1 },
    { serviceId: 'content-marketing', weight: 0.5 },
  ]},

  // Industry: Dental / Healthcare
  { questionId: 'Q-I1a', services: [
    { serviceId: 'local-seo', weight: 1 },
    { serviceId: 'gbp-audit', weight: 0.5 },
  ]},
  { questionId: 'Q-I1b', services: [
    { serviceId: 'review-management', weight: 1 },
  ]},
  { questionId: 'Q-I1c', services: [
    { serviceId: 'content-marketing', weight: 1 },
  ]},

  // Industry: Legal
  { questionId: 'Q-I2a', services: [
    { serviceId: 'local-seo', weight: 1 },
    { serviceId: 'content-marketing', weight: 0.5 },
  ]},
  { questionId: 'Q-I2b', services: [
    { serviceId: 'schema-eeat', weight: 1 },
    { serviceId: 'digital-pr', weight: 0.5 },
  ]},
  { questionId: 'Q-I2c', services: [
    { serviceId: 'compliance-content', weight: 1 },
  ]},

  // Industry: Auto Services
  { questionId: 'Q-I3a', services: [
    { serviceId: 'local-seo', weight: 1 },
    { serviceId: 'competitive-analysis', weight: 0.5 },
  ]},
  { questionId: 'Q-I3b', services: [
    { serviceId: 'content-marketing', weight: 1 },
    { serviceId: 'gbp-photos', weight: 0.5 },
  ]},

  // Industry: Med Spa
  { questionId: 'Q-I4a', services: [
    { serviceId: 'compliance-content', weight: 1 },
    { serviceId: 'content-marketing', weight: 0.5 },
  ]},
  { questionId: 'Q-I4b', services: [
    { serviceId: 'aiso-score', weight: 1 },
    { serviceId: 'entity-building', weight: 0.5 },
  ]},

  // Industry: Home Services
  { questionId: 'Q-I5a', services: [
    { serviceId: 'local-seo', weight: 1 },
  ]},
  { questionId: 'Q-I5b', services: [
    { serviceId: 'content-marketing', weight: 1 },
    { serviceId: 'schema-eeat', weight: 0.5 },
  ]},

  // Industry: Restaurant / Hospitality
  { questionId: 'Q-I6a', services: [
    { serviceId: 'local-seo', weight: 1 },
    { serviceId: 'gbp-audit', weight: 0.5 },
  ]},
  { questionId: 'Q-I6b', services: [
    { serviceId: 'review-management', weight: 1 },
  ]},

  // Industry: E-Commerce
  { questionId: 'Q-I7a', services: [
    { serviceId: 'seo-retainer', weight: 1 },
    { serviceId: 'content-marketing', weight: 0.5 },
  ]},
  { questionId: 'Q-I7b', services: [
    { serviceId: 'technical-seo', weight: 1 },
    { serviceId: 'landing-page-audit', weight: 0.5 },
  ]},
  { questionId: 'Q-I7c', services: [
    { serviceId: 'schema-eeat', weight: 1 },
    { serviceId: 'aiso-score', weight: 0.5 },
  ]},
  { questionId: 'Q-I7d', services: [
    { serviceId: 'multilingual-seo', weight: 1 },
  ]},

  // Industry: B2B / Manufacturing
  { questionId: 'Q-I8a', services: [
    { serviceId: 'content-marketing', weight: 1 },
  ]},
  { questionId: 'Q-I8b', services: [
    { serviceId: 'content-marketing', weight: 1 },
    { serviceId: 'seo-retainer', weight: 0.5 },
  ]},
  { questionId: 'Q-I8c', services: [
    { serviceId: 'multilingual-seo', weight: 1 },
  ]},
  { questionId: 'Q-I8d', services: [
    { serviceId: 'consent-audit', weight: 1 },
  ]},

  // Industry: Financial Services
  { questionId: 'Q-I9a', services: [
    { serviceId: 'compliance-content', weight: 1 },
  ]},
  { questionId: 'Q-I9b', services: [
    { serviceId: 'aiso-score', weight: 1 },
    { serviceId: 'entity-building', weight: 0.5 },
  ]},
  { questionId: 'Q-I9c', services: [
    { serviceId: 'entity-building', weight: 1 },
    { serviceId: 'digital-pr', weight: 0.5 },
  ]},

  // Industry: Real Estate
  { questionId: 'Q-I10a', services: [
    { serviceId: 'local-seo', weight: 1 },
  ]},
  { questionId: 'Q-I10b', services: [
    { serviceId: 'seo-retainer', weight: 1 },
    { serviceId: 'content-marketing', weight: 0.5 },
  ]},

  // Industry: Education
  { questionId: 'Q-I11a', services: [
    { serviceId: 'local-seo', weight: 1 },
    { serviceId: 'content-marketing', weight: 0.5 },
  ]},
  { questionId: 'Q-I11b', services: [
    { serviceId: 'competitive-analysis', weight: 1 },
    { serviceId: 'seo-retainer', weight: 0.5 },
  ]},

  // Industry: Tourism
  { questionId: 'Q-I12a', services: [
    { serviceId: 'local-seo', weight: 1 },
    { serviceId: 'content-marketing', weight: 0.5 },
  ]},
  { questionId: 'Q-I12b', services: [
    { serviceId: 'multilingual-seo', weight: 1 },
  ]},

  // Industry: Pharma
  { questionId: 'Q-I13a', services: [
    { serviceId: 'content-marketing', weight: 1 },
  ]},
  { questionId: 'Q-I13b', services: [
    { serviceId: 'compliance-content', weight: 1 },
  ]},

  // Industry: Luxury / Premium (CH-DE only)
  { questionId: 'Q-I14a', services: [
    { serviceId: 'digital-pr', weight: 1 },
    { serviceId: 'content-marketing', weight: 0.5 },
  ]},
  { questionId: 'Q-I14b', services: [
    { serviceId: 'aiso-score', weight: 1 },
    { serviceId: 'entity-building', weight: 0.5 },
  ]},
];

export function computeResults(
  selectedQuestions: string[],
  market: Market
): ScoredService[] {
  const scores: Record<string, number> = {};

  for (const questionId of selectedQuestions) {
    const rule = routingRules.find(r => r.questionId === questionId);
    if (!rule) continue;
    for (const { serviceId, weight } of rule.services) {
      scores[serviceId] = (scores[serviceId] || 0) + weight;
    }
  }

  return Object.entries(scores)
    .map(([serviceId, score]) => ({ serviceId, score }))
    .filter(s => {
      const svc = services.find(d => d.id === s.serviceId);
      return svc?.links[market] != null;
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}
