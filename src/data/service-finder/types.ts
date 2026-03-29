export type Market = 'en' | 'es' | 'de' | 'ch-de';

export interface ServiceFinderLocale {
  market: Market;
  intro: {
    h1: string;
    subheading: string;
    trustLine: string;
  };
  steps: {
    role: {
      heading: string;
      options: RoleOption[];
    };
    industry: {
      heading: string;
      options: IndustryOption[];
    };
    questions: {
      heading: string;
      hint: string;
      universal: Question[];
      byRole: Record<string, Question[]>;
      byIndustry: Record<string, Question[]>;
    };
    result: {
      heading: string;
      subheading: string;
      submitButton: string;
      startOver: string;
      secondaryCta: {
        text: string;
        buttonText: string;
        link: string;
      };
      emailCapture: {
        heading: string;
        subtext: string;
        buttonText: string;
        privacyNote?: string;
        fields: FormField[];
      };
      serviceCards: Record<string, ServiceCardCopy>;
    };
  };
  faq: FaqItem[];
}

export interface RoleOption {
  id: string;
  label: string;
  subtitle: string;
}

export interface IndustryOption {
  id: string;
  label: string;
}

export interface Question {
  id: string;
  text: string;
}

export interface ServiceCardCopy {
  headline: string;
  description: string;
  ctaText: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FormField {
  name: string;
  label: string;
  type: 'email' | 'text' | 'tel' | 'hidden';
  required: boolean;
}

export interface ServiceFinderState {
  step: 1 | 2 | 3 | 4;
  role: string | null;
  industry: string | null;
  selectedQuestions: string[];
  results: ScoredService[];
}

export interface ScoredService {
  serviceId: string;
  score: number;
}

export interface RoutingRule {
  questionId: string;
  services: {
    serviceId: string;
    weight: number;
  }[];
}

export interface ServiceDef {
  id: string;
  icon: string;
  links: Partial<Record<Market, string>>;
}
