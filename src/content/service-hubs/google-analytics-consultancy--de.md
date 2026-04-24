---
serviceSlug: "google-analytics-consultancy"
locale: "de"
title: "Google Analytics Beratung"
description: "Google Analytics 4 Beratung: Setup, Consent Mode, Conversion-Tracking, BigQuery-Export. DSGVO- und revDSG-konform. Kostenlose Erstberatung."
heroLede: "Google Analytics 4 (GA4) richtig aufzusetzen ist eine technische Übung, die über den Wert jedes Marketing-Reports entscheidet. Schlechtes Tracking produziert schönes Reporting mit unzuverlässigen Zahlen; gutes Tracking verwandelt GA4 in das zentrale Messwerkzeug für klassisches SEO, Paid Ads, KI-Traffic und Conversion-Attribution. StarkRank baut oder revidiert Ihren Setup — DSGVO- und revDSG-konform."
processTotalTime: "PT14D"
processSteps:
  - name: "Setup-Audit"
    description: "Audit des bestehenden GA4-Setups (oder Aufsetzen bei Greenfield), Prüfung der Tag-Manager-Integration, Event-Parameter-Qualität, Consent-Mode-Status, Conversion-Definitions, Verknüpfungen mit Google Ads, Search Console und BigQuery."
    tools:
      - "Google Analytics 4"
      - "Google Tag Manager"
      - "Chrome DevTools"
  - name: "Consent Mode und DSGVO/revDSG"
    description: "Konfiguration des Consent Mode v2 mit default=denied, Integration Ihres Consent-Management-Tools (CMP), Server-Side-Tagging-Option für Datenresidenz, Dokumentation der Datenschutz-Konformität für Impressum und Datenschutz-Erklärung."
    tools:
      - "Cookiebot, Usercentrics, oder OneTrust"
      - "Google Tag Manager Server-Side"
  - name: "Event- und Conversion-Schema"
    description: "Definition der relevanten Events pro Seitentyp (nicht alle GA4-Empfehlungen sind für jeden Use-Case sinnvoll), Conversion-Markierung, Enhanced Measurement-Einstellung, E-Commerce-Ereignisse bei Shops, Custom Dimensions und Metrics für Ihr Geschäftsmodell."
  - name: "BigQuery-Export und Attribution"
    description: "BigQuery-Verknüpfung für rohdatenbasierte Analysen jenseits der GA4-UI-Limits, strukturierte Attribution-Modellierung (data-driven als Standard), Cross-Device- und Cross-Channel-Reporting, Rohdaten-Zugriff für Ihr BI-Tool (Looker, Metabase, Power BI)."
    tools:
      - "BigQuery"
      - "Looker Studio"
  - name: "Reporting-Dashboards und Training"
    description: "Aufbau zielgruppenspezifischer Dashboards (Marketing-Team, Management, SEO-Detail-Ansicht) in Looker Studio, Schulung Ihres Teams im Umgang mit GA4 und Consent-Mode-Artefakten (Modelled Data), laufende Support-Option im Retainer."
faq:
  - question: "Ist der Setup DSGVO- und revDSG-konform?"
    answer: "Ja, wenn er korrekt aufgesetzt ist. Das bedeutet: Consent Mode v2 mit default=denied, Integration eines validen CMP (Cookiebot, Usercentrics, OneTrust oder vergleichbar), IP-Anonymisierung, datensparsame Event-Parameter, Dokumentation in der Datenschutz-Erklärung. Wir übernehmen die technische Konfiguration; die rechtliche Freigabe (Datenschutz-Erklärung, CMP-Text) liegt bei Ihrer Datenschutz-Beratung."
  - question: "Brauchen wir Server-Side-Tagging?"
    answer: "Nicht zwingend. Server-Side-Tagging hat Vorteile für Datenresidenz (Google-Tag-Manager-Server in EU oder Schweiz statt US), für First-Party-Cookie-Lebensdauer und für Performance (weniger Client-Side-Skripte). Für Unternehmen mit hoher Datenschutz-Sensibilität oder E-Commerce mit iOS-14-Attribution-Drop empfehlen wir es; für kleinere Setups ist Client-Side ausreichend."
  - question: "Was kostet BigQuery?"
    answer: "GA4-zu-BigQuery-Export ist im GA4-Standard kostenlos. BigQuery selbst wird nach Speicher und Abfragevolumen abgerechnet — für mittelgroße Sites liegen die Monatskosten typisch im ein- bis niedrigen zweistelligen Euro-Bereich. Für Enterprise-Sites mit 100+ Millionen Events pro Monat werden drei- bis vierstellige Beträge realistisch. Wir helfen bei der Cost-Estimation vor Aktivierung."
  - question: "Kombinieren Sie GA4 mit anderen Tools?"
    answer: "Ja. GA4 ist die Kanal-Performance-Schicht; daneben setzen wir häufig Google Tag Manager (Event-Orchestration), Search Console (Suchperformance), Microsoft Clarity oder Hotjar (UX-Heatmaps, datenschutz-sensibel konfiguriert) und je nach Use-Case Looker Studio oder Metabase als Reporting-Layer. Die Integrations-Architektur ist Teil der Beratung."
---

## Was ist Google Analytics 4 Beratung?

Google Analytics 4 Beratung ist die Arbeit am Mess-Fundament Ihrer digitalen Kanäle. Die Oberflächlichkeit des GA4-Reportings in der Standard-UI verdeckt die eigentliche Herausforderung: die Qualität der Daten, auf denen alle Marketing-Entscheidungen beruhen. Falsche Consent-Mode-Konfiguration macht Conversions unsichtbar. Fehlende Event-Parameter machen Funnels unmessbar. Inkonsistente UTM-Governance macht Channel-Attribution zufällig. Dashboards, die darauf aufbauen, sehen seriös aus, produzieren aber Entscheidungen auf Sand.

Die Beratung setzt die drei kritischen Ebenen: technisch (was wird erfasst und wie), rechtlich (wie ist der Consent-Fluss, wo liegen die Daten) und analytisch (welche Events sind für Ihre Entscheidungen relevant, wie werden sie visualisiert). Diese drei zusammen definieren, ob GA4 ein Arbeitswerkzeug wird oder ein Reporting-Theater.

## Was umfasst die Google Analytics 4 Beratung bei StarkRank?

Die Beratung deckt sechs Kernbereiche ab:

- **Setup und Tag-Manager-Integration** — GA4-Property-Aufsetzung oder -Revision, Google Tag Manager als Orchestrations-Layer, Migration aus Universal Analytics (falls noch nicht erfolgt), Measurement-ID- und Stream-Konfiguration
- **Consent Mode v2 und DSGVO/revDSG** — default=denied-Konfiguration, Integration Ihres Consent-Management-Tools, Server-Side-Tagging-Option für Datenresidenz, modelled-data-Verständnis und -Interpretation, Dokumentation für Datenschutz-Erklärung
- **Event- und Conversion-Schema** — Definition der relevanten Events pro Seitentyp, Conversion-Markierung, Enhanced Measurement-Einstellung, E-Commerce-Events bei Shops, Custom Dimensions und Metrics für Ihr spezifisches Geschäftsmodell
- **Google Ads- und Search-Console-Verknüpfung** — Enhanced Conversions für Ads, Search Console-Daten-Integration, Attribution-Modell-Abgleich, Offline-Conversion-Import für B2B-Lead-Gen
- **BigQuery-Export und Rohdaten-Zugriff** — BigQuery-Verknüpfung für Analysen jenseits der UI-Limits, strukturierte Attribution-Modellierung, Cross-Device- und Cross-Channel-Reporting, Rohdaten-Zugriff für Ihr BI-Tool
- **Reporting-Dashboards und Team-Training** — zielgruppenspezifische Dashboards (Marketing, Management, SEO-Detail) in Looker Studio, Schulung Ihres Teams im Umgang mit GA4 und Consent-Mode-Artefakten

Die Beratung kann als Einmal-Setup (für Greenfield oder Migration), als punktueller Audit plus Fix oder als laufender Retainer im Rahmen unserer Retainer-Bänder gebucht werden.

## Wie läuft die Google Analytics 4 Beratung bei StarkRank ab?

Die Beratung läuft in fünf klar getrennten Schritten ab:

1. **Setup-Audit** — Audit des bestehenden GA4-Setups (oder Aufsetzen bei Greenfield), Prüfung der Tag-Manager-Integration, Event-Parameter-Qualität, Consent-Mode-Status, Conversion-Definitions, Verknüpfungen mit Google Ads, Search Console und BigQuery
2. **Consent Mode und DSGVO/revDSG** — Konfiguration des Consent Mode v2 mit default=denied, Integration Ihres Consent-Management-Tools (CMP), Server-Side-Tagging-Option für Datenresidenz, Dokumentation der Datenschutz-Konformität für Impressum und Datenschutz-Erklärung
3. **Event- und Conversion-Schema** — Definition der relevanten Events pro Seitentyp, Conversion-Markierung, Enhanced Measurement-Einstellung, E-Commerce-Ereignisse bei Shops, Custom Dimensions und Metrics für Ihr Geschäftsmodell
4. **BigQuery-Export und Attribution** — BigQuery-Verknüpfung für rohdatenbasierte Analysen jenseits der GA4-UI-Limits, strukturierte Attribution-Modellierung, Cross-Device- und Cross-Channel-Reporting, Rohdaten-Zugriff für Ihr BI-Tool (Looker Studio, Metabase, Power BI)
5. **Reporting-Dashboards und Training** — Aufbau zielgruppenspezifischer Dashboards in Looker Studio, Schulung Ihres Teams im Umgang mit GA4 und Consent-Mode-Artefakten (Modelled Data), laufende Support-Option im Retainer

Für Greenfield-Projekte läuft Schritt 1 bis 5 typisch in vier bis sechs Wochen; für Retrofit bestehender Setups sechs bis acht Wochen, je nach Zustand des aktuellen Setups.

## Welche typischen Fehler finden wir in DACH-GA4-Setups?

Ein GA4-Audit bei DACH-Unternehmen fördert wiederkehrende Muster zu Tage:

- **Consent Mode fehlt oder falsch konfiguriert** — Consent Mode v1 noch aktiv statt v2, default=granted statt default=denied, keine ad_storage-Abstimmung mit Google Ads, modelled-data-Ausfälle unsichtbar
- **Conversions doppelt getrackt** — GA4-Conversions und Google-Ads-Conversions parallel zählend, ohne Deduplizierung, mit Bid-Strategien die auf inflationiertes Signal optimieren
- **Keine Custom Dimensions** — generische GA4-Standard-Dimensions ohne Geschäftslogik (User-Type, Lead-Source-Custom, Plan-Tier), Reports bleiben oberflächlich
- **BigQuery-Export inaktiv** — rohdaten-fähige Analysen nicht möglich, Reports auf GA4-UI-Sampling angewiesen, Data-Studio-Dashboards mit Abfrage-Limits
- **Enhanced Measurement ungeprüft** — automatische Events (scroll, click, file_download, video_engagement) eingeschaltet, ohne Prüfung ob sie sinnvoll für den Use-Case sind; Event-Mengen explodieren mit geringem Wert
- **Internal-Traffic nicht gefiltert** — Office-IP und VPN-Traffic als Conversions gezählt, Onsite-Search-Logs durch Team-Nutzung verzerrt
- **Keine Conversion-Value-Qualität** — Lead-Conversions mit fester Value-Zuweisung statt Lead-Score-basierter Variabilität, E-Commerce-Conversions ohne korrekte Shipping-und-Tax-Separation

Diese Muster sind oft Resultat von Quick-Setups, bei denen GA4 einmal aktiviert wurde, ohne dass danach eine strukturelle Revision stattfand.

## Was kostet Google Analytics 4 Beratung bei StarkRank?

Die Beratung wird in drei Modellen angeboten: als Einmal-Setup-Projekt (Festpreis, typisch für Greenfield oder Migration), als punktueller Audit plus Fix (Festpreis für bestehende Setups mit konkretem Problem) oder als laufender Retainer-Baustein (im Rahmen unserer Retainer-Bänder auf der [Preisseite](/preise/seo/)).

Die Preis-Variablen sind: Scope der Events (Standard GA4-Defaults vs. komplexes E-Commerce-Setup mit Custom-Events), Mehrsprachigkeit und Multi-Domain (ein Stream vs. mehrere), Integrationen (nur GA4 vs. GA4 plus BigQuery plus CRM-Offline-Import) und Training-Umfang. Den genauen Scope klären wir in der [kostenlosen Erstberatung](/kontakt/).

## Für wen lohnt sich Google Analytics 4 Beratung?

Die GA4-Beratung lohnt sich typischerweise für:

- **Unternehmen mit Universal-Analytics-Migration-Rückstau** — die auf GA4 umgestellt, aber den Setup nicht strukturell überarbeitet haben
- **Firmen nach iOS-14 oder Consent-Mode-Rollout** — wo die Attribution plötzlich brüchig geworden ist und die Ursache nicht klar ist
- **E-Commerce-Shops mit komplexen Conversion-Pfaden** — Shipping-Kosten, Rabatte, Variants, Subscription-Renewals, die im Standard-GA4-Setup falsch oder gar nicht erfasst werden
- **B2B-Unternehmen mit langen Sales-Cycles** — wo Offline-Conversion-Import, Lead-Scoring und CRM-GA4-Brücken die Kampagnen-Attribution überhaupt erst ermöglichen
- **Unternehmen mit Datenresidenz-Anforderungen** — besonders Schweizer Firmen mit revDSG-Compliance oder DE-Firmen mit sensiblen Branchen, die Server-Side-Tagging oder EU-Data-Residency brauchen
- **Firmen mit mehreren Marketing-Kanälen** — die Google Ads, Meta, LinkedIn, E-Mail und Direktverkehr sauber attribuieren wollen, statt jedem Kanal seine eigene Attribution-Story zu lassen
- **Unternehmen vor BigQuery-Aktivierung** — die aus der GA4-UI herauswollen und rohdaten-basierte Analysen fahren möchten

Für sehr kleine Sites mit geringem Traffic und einfachen Conversion-Pfaden ist die Standard-GA4-Konfiguration mit Enhanced Measurement oft ausreichend — dort lohnt sich ein einmaliger Setup-Check, kein tiefer Beratungs-Prozess.

## Was bekommen Sie am Ende der GA4-Beratung?

Am Ende der GA4-Beratung erhalten Sie ein vollständig konfiguriertes GA4-Setup mit validem Consent Mode v2, sauberen Event- und Conversion-Definitionen, aktivierter BigQuery-Anbindung (falls Scope-relevant), verknüpften Google-Ads- und Search-Console-Daten, zielgruppenspezifischen Looker-Studio-Dashboards und einer dokumentierten Setup-Beschreibung für Ihre Datenschutz-Erklärung.

Zusätzlich bekommt Ihr Team eine strukturierte Einführung in GA4-Interpretation (was ist modelled, was ist gemessen; wie lese ich Attribution-Reports; wie erkenne ich Consent-Mode-Artefakte). Für laufenden Analytics-Support ist der Anschluss an einen schlanken Retainer-Baustein möglich — oder Sie führen das System mit eigenen Kapazitäten weiter und konsultieren uns punktuell bei strategischen Fragen wie Attribution-Modell-Wechsel oder Multi-Touch-Roll-out.
