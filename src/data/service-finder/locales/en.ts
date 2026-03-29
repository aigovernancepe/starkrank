import type { ServiceFinderLocale } from '../types';

export const en: ServiceFinderLocale = {
  market: 'en',
  intro: {
    h1: 'Find the Right Service for Your Business',
    subheading: 'Not sure where to start? Answer 4 quick questions and we\u2019ll show you exactly which services match your situation \u2014 in 60 seconds.',
    trustLine: 'Used by 500+ businesses across the US, Peru, Germany, and Switzerland.',
  },
  steps: {
    role: {
      heading: 'What best describes your role?',
      options: [
        { id: 'R1', label: 'Business Owner / CEO', subtitle: 'I run the business and make the decisions' },
        { id: 'R2', label: 'Marketing Manager / Director', subtitle: 'I manage marketing but need specialist support' },
        { id: 'R3', label: 'Practice Manager / Partner', subtitle: 'I manage a professional practice (medical, legal, financial)' },
        { id: 'R4', label: 'Head of Digital / CMO', subtitle: 'I lead digital strategy and innovation' },
        { id: 'R5', label: 'Startup Founder', subtitle: 'I\u2019m launching or just launched a new business' },
        { id: 'R6', label: 'Agency', subtitle: 'I\u2019m looking for a white-label or partner agency' },
        { id: 'R7', label: 'Other', subtitle: 'None of the above' },
      ],
    },
    industry: {
      heading: 'What industry is your business in?',
      options: [
        { id: 'I1', label: 'Dental / Healthcare' },
        { id: 'I2', label: 'Legal / Law Firm' },
        { id: 'I3', label: 'Auto Services / Detailing' },
        { id: 'I4', label: 'Med Spa / Aesthetics' },
        { id: 'I5', label: 'Home Services (Plumbing, HVAC, Electrical)' },
        { id: 'I6', label: 'Restaurant / Hospitality' },
        { id: 'I7', label: 'E-Commerce / Online Retail' },
        { id: 'I8', label: 'B2B / Manufacturing' },
        { id: 'I9', label: 'Financial Services / Advisory' },
        { id: 'I10', label: 'Real Estate' },
        { id: 'I11', label: 'Education / Training' },
        { id: 'I15', label: 'Other' },
      ],
    },
    questions: {
      heading: 'Which of these sound like your business?',
      hint: 'Select all that apply',
      universal: [
        { id: 'Q-U1', text: 'Our website doesn\u2019t generate leads or inquiries' },
        { id: 'Q-U2', text: 'Our competitors rank above us on Google' },
        { id: 'Q-U3', text: 'We don\u2019t appear on ChatGPT, Perplexity, or AI search' },
        { id: 'Q-U4', text: 'We\u2019re spending on Google Ads but not sure it\u2019s working' },
        { id: 'Q-U5', text: 'We don\u2019t know what\u2019s working and what isn\u2019t' },
      ],
      byRole: {
        R1: [
          { id: 'Q-R1a', text: 'I don\u2019t have a website yet, or it\u2019s very outdated' },
          { id: 'Q-R1b', text: 'I don\u2019t have time for marketing \u2014 I run everything' },
          { id: 'Q-R1c', text: 'I was burned by an agency before' },
        ],
        R5: [
          { id: 'Q-R1a', text: 'I don\u2019t have a website yet, or it\u2019s very outdated' },
          { id: 'Q-R1b', text: 'I don\u2019t have time for marketing \u2014 I run everything' },
          { id: 'Q-R1c', text: 'I was burned by an agency before' },
        ],
        R2: [
          { id: 'Q-R2a', text: 'Our internal team lacks deep SEO expertise' },
          { id: 'Q-R2b', text: 'We lost traffic after a website migration or redesign' },
          { id: 'Q-R2c', text: 'I need to prove marketing ROI to the board' },
          { id: 'Q-R2d', text: 'Our current agency sends reports but nothing improves' },
        ],
        R4: [
          { id: 'Q-R2a', text: 'Our internal team lacks deep SEO expertise' },
          { id: 'Q-R2b', text: 'We lost traffic after a website migration or redesign' },
          { id: 'Q-R2c', text: 'I need to prove marketing ROI to the board' },
          { id: 'Q-R2d', text: 'Our current agency sends reports but nothing improves' },
        ],
        R3: [
          { id: 'Q-R3a', text: 'Our locations rank inconsistently across cities' },
          { id: 'Q-R3b', text: 'Compliance makes content creation painfully slow' },
          { id: 'Q-R3c', text: 'We\u2019re opening new locations and need visibility there' },
        ],
      },
      byIndustry: {
        I1: [
          { id: 'Q-I1a', text: 'We\u2019re not in the Google Maps 3-pack for our area' },
          { id: 'Q-I1b', text: 'Our Google reviews are stagnating or our rating is dropping' },
          { id: 'Q-I1c', text: 'We need service pages for each procedure we offer' },
        ],
        I2: [
          { id: 'Q-I2a', text: 'We need more case inquiries from our service area' },
          { id: 'Q-I2b', text: 'Our attorney profiles don\u2019t appear in search results' },
          { id: 'Q-I2c', text: 'Marketing compliance (bar rules) slows everything down' },
        ],
        I3: [
          { id: 'Q-I3a', text: 'Customers search for our services but find competitors first' },
          { id: 'Q-I3b', text: 'We have great before/after work but it\u2019s not online' },
        ],
        I4: [
          { id: 'Q-I4a', text: 'We need treatment pages that comply with FDA/medical regulations' },
          { id: 'Q-I4b', text: 'AI assistants recommend our competitors for treatments we specialize in' },
        ],
        I5: [
          { id: 'Q-I5a', text: 'Customers in our service area can\u2019t find us on Google' },
          { id: 'Q-I5b', text: 'We need to display our licensing and insurance credentials online' },
        ],
        I6: [
          { id: 'Q-I6a', text: 'Our restaurant doesn\u2019t show up when people search "near me"' },
          { id: 'Q-I6b', text: 'We get bad reviews and don\u2019t know how to respond' },
        ],
        I7: [
          { id: 'Q-I7a', text: 'Our customer acquisition cost keeps climbing' },
          { id: 'Q-I7b', text: 'Our site is slow and we\u2019re losing conversions' },
          { id: 'Q-I7c', text: 'Our products don\u2019t appear in Google Shopping or AI recommendations' },
          { id: 'Q-I7d', text: 'We want to expand to new markets (LATAM, Europe)' },
        ],
        I8: [
          { id: 'Q-I8a', text: 'Our website lists products but doesn\u2019t generate leads' },
          { id: 'Q-I8b', text: 'Trade fairs are declining \u2014 we need a digital alternative' },
        ],
        I9: [
          { id: 'Q-I9a', text: 'Compliance (SEC/FINRA) blocks most marketing ideas' },
          { id: 'Q-I9b', text: 'High-net-worth clients search AI assistants for advisors \u2014 we don\u2019t appear' },
          { id: 'Q-I9c', text: 'Our competitors have a Wikipedia/Wikidata presence, we don\u2019t' },
        ],
        I10: [
          { id: 'Q-I10a', text: 'Our listings don\u2019t appear when people search for properties in our area' },
          { id: 'Q-I10b', text: 'We rely on Zillow/Realtor.com and need our own organic presence' },
        ],
        I11: [
          { id: 'Q-I11a', text: 'Prospective students can\u2019t find our programs on Google' },
          { id: 'Q-I11b', text: 'Our competitors rank above us for program-related searches' },
        ],
      },
    },
    result: {
      heading: 'Here\u2019s what we recommend for your business',
      subheading: 'Based on your answers, these services will have the biggest impact.',
      submitButton: 'Show my results',
      startOver: 'Start over',
      secondaryCta: {
        text: 'Not sure where to start? Get a free AISO Score \u2014 our AI search readiness diagnostic.',
        buttonText: 'Get My Free AISO Score',
        link: '/aiso-score/',
      },
      emailCapture: {
        heading: 'Want these recommendations sent to your inbox?',
        subtext: 'We\u2019ll include a brief explanation of each service and suggested next steps. No spam, no sales calls unless you ask.',
        buttonText: 'Send My Results',
        fields: [
          { name: 'email', label: 'Email', type: 'email', required: true },
          { name: 'firstname', label: 'Name', type: 'text', required: false },
        ],
      },
      serviceCards: {
        'ai-search-optimization': {
          headline: 'Your business is invisible to AI search',
          description: 'ChatGPT, Perplexity, and Google AI Overviews are how customers discover businesses now. We make sure they find you.',
          ctaText: 'Learn more',
        },
        'aiso-score': {
          headline: 'Your business is invisible to AI search',
          description: 'ChatGPT, Perplexity, and Google AI Overviews are how customers discover businesses now. We make sure they find you.',
          ctaText: 'Free AISO check',
        },
        'local-seo': {
          headline: 'You\u2019re missing out on local customers',
          description: 'When people search for your services nearby, your competitors show up first. We fix that.',
          ctaText: 'Learn more',
        },
        'technical-seo': {
          headline: 'Your website has technical issues holding it back',
          description: 'Site speed, crawlability, and structure problems are costing you rankings and conversions.',
          ctaText: 'Learn more',
        },
        'content-marketing': {
          headline: 'You need content that ranks and converts',
          description: 'Service pages, city pages, and expert content that earns traffic and builds authority.',
          ctaText: 'Learn more',
        },
        'google-ads-audit': {
          headline: 'Your ad spend needs a health check',
          description: 'Get a free audit to see where your Google Ads budget is being wasted \u2014 and where to invest it.',
          ctaText: 'Free audit',
        },
        'paid-strategy': {
          headline: 'Your ad spend needs a health check',
          description: 'Get a free audit to see where your Google Ads budget is being wasted \u2014 and where to invest it.',
          ctaText: 'Learn more',
        },
        'multi-location-seo': {
          headline: 'Your locations need consistent visibility',
          description: 'Some locations thrive, others are invisible. We build a scalable system that works for every location.',
          ctaText: 'Learn more',
        },
        'review-management': {
          headline: 'Your reviews need attention',
          description: 'Review velocity and ratings directly impact your rankings. We help you build and maintain momentum.',
          ctaText: 'Learn more',
        },
        'digital-pr': {
          headline: 'You need to build online authority',
          description: 'Backlinks, media mentions, and entity signals that make Google and AI platforms trust your brand.',
          ctaText: 'Learn more',
        },
        'multilingual-seo': {
          headline: 'You\u2019re ready to reach international markets',
          description: 'Proper multilingual SEO \u2014 not just translation \u2014 for each target market.',
          ctaText: 'Learn more',
        },
        'website-design-brief': {
          headline: 'You need a website that works',
          description: 'We create the complete spec for a site built for search performance and conversions \u2014 take it to any developer.',
          ctaText: 'Learn more',
        },
        'roi-analytics': {
          headline: 'You need to know what\u2019s actually working',
          description: 'Clear attribution reporting that connects marketing spend to revenue \u2014 board-ready.',
          ctaText: 'Learn more',
        },
        'entity-building': {
          headline: 'You need to build online authority',
          description: 'Backlinks, media mentions, and entity signals that make Google and AI platforms trust your brand.',
          ctaText: 'Learn more',
        },
        'compliance-content': {
          headline: 'You need content that ranks and converts',
          description: 'Service pages, city pages, and expert content that earns traffic and builds authority.',
          ctaText: 'Learn more',
        },
        'consent-audit': {
          headline: 'Your website has technical issues holding it back',
          description: 'Site speed, crawlability, and structure problems are costing you rankings and conversions.',
          ctaText: 'Learn more',
        },
        'seo-retainer': {
          headline: 'You\u2019re missing out on local customers',
          description: 'When people search for your services nearby, your competitors show up first. We fix that.',
          ctaText: 'Learn more',
        },
        'free-audit': {
          headline: 'Your business is invisible to AI search',
          description: 'ChatGPT, Perplexity, and Google AI Overviews are how customers discover businesses now. We make sure they find you.',
          ctaText: 'Free check',
        },
        'full-service-retainer': {
          headline: 'You\u2019re missing out on local customers',
          description: 'When people search for your services nearby, your competitors show up first. We fix that.',
          ctaText: 'Learn more',
        },
        'competitive-analysis': {
          headline: 'You\u2019re missing out on local customers',
          description: 'When people search for your services nearby, your competitors show up first. We fix that.',
          ctaText: 'Learn more',
        },
        'landing-page-audit': {
          headline: 'Your website has technical issues holding it back',
          description: 'Site speed, crawlability, and structure problems are costing you rankings and conversions.',
          ctaText: 'Learn more',
        },
        'strategy': {
          headline: 'You\u2019re missing out on local customers',
          description: 'When people search for your services nearby, your competitors show up first. We fix that.',
          ctaText: 'Learn more',
        },
        'monthly-reporting': {
          headline: 'You need to know what\u2019s actually working',
          description: 'Clear attribution reporting that connects marketing spend to revenue \u2014 board-ready.',
          ctaText: 'Learn more',
        },
        'gbp-audit': {
          headline: 'You\u2019re missing out on local customers',
          description: 'When people search for your services nearby, your competitors show up first. We fix that.',
          ctaText: 'Learn more',
        },
        'gbp-photos': {
          headline: 'You need content that ranks and converts',
          description: 'Service pages, city pages, and expert content that earns traffic and builds authority.',
          ctaText: 'Learn more',
        },
        'schema-eeat': {
          headline: 'Your website has technical issues holding it back',
          description: 'Site speed, crawlability, and structure problems are costing you rankings and conversions.',
          ctaText: 'Learn more',
        },
      },
    },
  },
  faq: [
    {
      question: 'How does the Service Check work?',
      answer: 'You answer 4 quick questions about your role, industry, and business challenges. Our diagnostic matches your answers to the services that will have the biggest impact \u2014 in under 60 seconds.',
    },
    {
      question: 'Is it really free?',
      answer: 'Yes. No sign-up required to see your results. You can optionally enter your email to receive a copy.',
    },
    {
      question: 'What happens after I get my results?',
      answer: 'Each recommendation links to a detailed service page where you can learn more. If you want to take action, most services start with a free audit or consultation.',
    },
    {
      question: 'I selected "Other" for my industry \u2014 will the results still be accurate?',
      answer: 'You\u2019ll see our most common recommendations based on your role and general business challenges. For a tailored assessment, book a free consultation.',
    },
    {
      question: 'How is this different from the AISO Score?',
      answer: 'The AISO Score specifically measures your AI search readiness across 6 dimensions. This diagnostic is broader \u2014 it helps you figure out which of our services (including AISO) match your business needs.',
    },
  ],
};
