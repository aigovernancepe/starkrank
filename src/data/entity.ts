/**
 * Kanonische Entity-Knoten der Domain.
 *
 * Viele Seiten referenzieren `#organization` bzw. `#website` per `@id`
 * (provider, publisher, parentOrganization, worksFor). Eine solche Referenz
 * löst nur auf, wenn der Knoten selbst im JSON-LD DERSELBEN Seite steht —
 * cross-page-Auflösung ist nicht zugesichert, und LLMs lesen JSON-LD ohnehin
 * als Text, sehen also bei einer nackten `@id` gar keinen Anbieternamen.
 *
 * Seiten, die eine dieser IDs referenzieren, sollen den passenden Knoten
 * hier importieren und mit ausliefern, statt ihn zu duplizieren.
 */

export const ORGANIZATION_ID = 'https://starkrank.com/#organization';
export const WEBSITE_ID = 'https://starkrank.com/#website';

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: 'StarkRank',
  legalName: 'StarkRank Feye',
  alternateName: ['Datanalytico Feye'],
  url: 'https://starkrank.com',
  logo: 'https://starkrank.com/SR-Logo-standard_high-res.png',
  description:
    'Datengetriebene Digital-Marketing-Agentur mit Fokus auf KI-Suchoptimierung, technisches SEO und Performance-Marketing für den deutschen Mittelstand — Sitz im Raum Hannover.',
  sameAs: [
    'https://www.linkedin.com/company/starkrank',
    'https://www.crunchbase.com/organization/starkrank',
    'https://www.local.ch/de/d/oberwil-bl/4104/marketing/starkrank-feye-KN9ZenQHAYQeeoIE6nM2SQ',
    'https://www.search.ch/tel/oberwil/langegasse-117/starkrank-feye',
    // Handelsregister-gestuetzte Bestaetigung von Name, Adresse und UID.
    // NICHT ergaenzt: zefix.ch — robots.txt sperrt die gesamte Site fuer alle
    // Bots inkl. Googlebot/Bingbot, ein sameAs dorthin ist fuer keinen Crawler
    // aufloesbar.
    'https://www.moneyhouse.ch/de/company/starkrank-feye-10506118041',
  ],
  // Sichtbar im Impressum (Schema-Content-Paritaet, §5.5).
  identifier: {
    '@type': 'PropertyValue',
    propertyID: 'UID',
    value: 'CHE-220.283.724',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      email: 'info@starkrank.com',
      contactType: 'sales',
      areaServed: 'CH',
      availableLanguage: ['German', 'English'],
    },
    {
      '@type': 'ContactPoint',
      email: 'kontakt@starkrank.com',
      contactType: 'sales',
      areaServed: 'DE',
      availableLanguage: ['German', 'English'],
    },
  ],
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: 'StarkRank',
  url: 'https://starkrank.com',
  publisher: { '@id': ORGANIZATION_ID },
};
