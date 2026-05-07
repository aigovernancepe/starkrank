---
term: "AISO Score"
slug: "aiso-score"
locale: "de"
bucket: "methodology"
abbreviation: "AISO"
aliases:
  - "AI Search Optimization Score"
  - "AISO-Score"
related:
  - "ki-suche"
  - "generative-suche"
  - "5-element-methodologie"
sources:
  - label: "StarkRank — AISO-Check"
    url: "https://starkrank.com/aiso-check/"
---

Der **AISO Score** (AI Search Optimization Score) ist eine StarkRank-eigene 6-Dimensionen-Diagnostik von 0 bis 100, die misst, wie gut eine Website für KI-Antwortmaschinen wie ChatGPT, Perplexity, Google AI Overviews und Microsoft Copilot zitierbar ist.

Die sechs Dimensionen:

- **Crawlability** (0–20) — können AI-Crawler wie GPTBot, ClaudeBot und PerplexityBot die Site überhaupt erreichen, oder blockiert eine WAF-Default-Regel den Zugriff?
- **Structure** (0–20) — Schema-Knotengraph mit Entity-Verlinkung, hreflang, kanonische URLs, BreadcrumbList
- **Authority** (0–15) — externe Erwähnungen, Wikipedia/Wikidata-Anker, Branchen-Citations
- **Citability** (0–20) — Capsule-Format der Antworten, Quellen-Tiefe, Stat-Genauigkeit
- **Freshness** (0–10) — `dateModified`-Konsistenz, aktive Content-Pflege, keine Stale-Inhalte
- **Measurability** (0–15) — saubere GSC-/Bing-Webmaster-Tools-Anbindung, AI-Citation-Tracking

Tier-Schema: 0–30 „Kritisch", 31–55 „Schwach", 56–75 „Solide", 76–100 „Stark". Ein Score unter 30 bei einer mittelständischen Facharzt-Praxis ist die Norm, nicht die Ausnahme — Yoast-Default-Schema und blockierte AI-Crawler treffen die Mehrheit auditierter Praxen.

Quartalsweises Re-Scoring im Mandat verankert die Diagnostik als laufende Messung statt als einmalige Erhebung.
