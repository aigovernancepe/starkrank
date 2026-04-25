import { de } from './de';
import type { ServiceFinderLocale } from '../types';

// CH-DE inherits everything from DE, with specific overrides
export const chDe: ServiceFinderLocale = {
  ...de,
  market: 'ch-de',
  intro: {
    ...de.intro,
    trustLine: 'Unternehmen in Deutschland und der Schweiz vertrauen auf StarkRank. Datenverarbeitung in Z\u00fcrich.',
  },
  steps: {
    ...de.steps,
    industry: {
      heading: de.steps.industry.heading,
      options: [
        { id: 'I1', label: 'Zahnarztpraxis / Gesundheitswesen' },
        { id: 'I2', label: 'Rechtsanwaltskanzlei' },
        { id: 'I4', label: 'Med Spa / \u00c4sthetik' },
        { id: 'I6', label: 'Gastronomie / Hotellerie' },
        { id: 'I7', label: 'E-Commerce / Online-Handel' },
        { id: 'I8', label: 'B2B / Maschinenbau / Industrie' },
        { id: 'I9', label: 'Finanzdienstleistung / Verm\u00f6gensverwaltung' },
        { id: 'I12', label: 'Tourismus / Reisen' },
        { id: 'I13', label: 'Pharma / Life Sciences' },
        { id: 'I14', label: 'Luxus / Premium-Dienstleistungen' },
        { id: 'I15', label: 'Andere Branche' },
      ],
    },
    questions: {
      ...de.steps.questions,
      byIndustry: {
        ...de.steps.questions.byIndustry,
        I9: [
          { id: 'Q-I9a', text: 'Compliance (FINMA) blockiert die meisten Marketing-Ideen' },
          { id: 'Q-I9b', text: 'Verm\u00f6gende Kunden nutzen KI-Assistenten f\u00fcr die Beratersuche \u2014 wir erscheinen nicht' },
          { id: 'Q-I9c', text: 'Unsere Konkurrenz hat einen Wikipedia/Wikidata-Eintrag, wir nicht' },
        ],
        I13: [
          { id: 'Q-I13a', text: 'Unsere Fachinhalte ranken nicht f\u00fcr relevante medizinische Suchbegriffe' },
          { id: 'Q-I13b', text: 'Swissmedic-Vorgaben machen Content-Erstellung extrem aufw\u00e4ndig' },
        ],
        I14: [
          { id: 'Q-I14a', text: 'Wir m\u00fcssen sichtbar sein, ohne unseren exklusiven Ruf zu gef\u00e4hrden' },
          { id: 'Q-I14b', text: 'Unsere Zielgruppe nutzt zunehmend KI-Assistenten f\u00fcr Empfehlungen' },
        ],
      },
    },
    result: {
      ...de.steps.result,
      secondaryCta: {
        text: 'Nicht sicher, wo Sie anfangen sollen? Testen Sie unseren kostenlosen AISO-Check \u2014 Ihre KI-Suchbereitschafts-Diagnose.',
        buttonText: 'Kostenloser AISO-Check',
        link: '/ch-de/aiso-check/',
      },
      emailCapture: {
        ...de.steps.result.emailCapture,
        privacyNote: 'Ihre Daten werden gem\u00e4ss unserer <a href="/ch-de/datenschutz/">Datenschutzerkl\u00e4rung</a> verarbeitet. Sie k\u00f6nnen Ihre Einwilligung jederzeit widerrufen. Datenverarbeitung in Z\u00fcrich, Schweiz.',
      },
      serviceCards: {
        ...de.steps.result.serviceCards,
        'consent-audit': {
          headline: 'Ihre revDSG-Konformit\u00e4t braucht eine Pr\u00fcfung',
          description: 'Consent Mode v2, Cookie-Banner und Datenschutz \u2014 wir stellen sicher, dass Sie gem\u00e4ss revDSG konform sind. Datenverarbeitung in Z\u00fcrich.',
          ctaText: 'Mehr erfahren',
        },
        'authority-building': {
          headline: 'Sichtbarkeit mit Diskretion',
          description: 'Wir positionieren Ihr Unternehmen in der Suche und bei KI-Assistenten \u2014 ohne den exklusiven Charakter Ihrer Marke zu beeintr\u00e4chtigen.',
          ctaText: 'Mehr erfahren',
        },
      },
    },
  },
  faq: [
    ...de.faq.filter(f => f.question !== 'Werden meine Daten gespeichert?'),
    {
      question: 'Werden meine Daten gespeichert?',
      answer: 'Nur wenn Sie freiwillig Ihre E-Mail-Adresse eingeben. Die Antworten im Tool selbst werden nicht personenbezogen gespeichert. Datenverarbeitung erfolgt in Z\u00fcrich, Schweiz, gem\u00e4ss revDSG. Details in unserer <a href="/ch-de/datenschutz/">Datenschutzerkl\u00e4rung</a>.',
    },
    {
      question: 'Arbeitet StarkRank auch mit Schweizer Unternehmen?',
      answer: 'Ja. Wir betreuen Unternehmen in der Deutschschweiz mit lokalem Marktverst\u00e4ndnis, Kenntnis der Schweizer Regulierungen (revDSG, FINMA, Swissmedic) und Datenverarbeitung in Z\u00fcrich. Pers\u00f6nliche Beratungsgespr\u00e4che in Z\u00fcrich oder Bern sind m\u00f6glich.',
    },
  ],
};
