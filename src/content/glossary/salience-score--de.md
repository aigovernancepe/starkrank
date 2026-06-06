---
term: "Salience-Score"
slug: "salience-score"
locale: "de"
bucket: "methodology"
aliases:
  - "Entity Salience"
related:
  - "entity-anchor"
  - "5-element-methodologie"
sources:
  - label: "Google Cloud — Natural Language API: Analyzing Entities"
    url: "https://docs.cloud.google.com/natural-language/docs/analyzing-entities"
---

Der **Salience-Score** ist eine Zahl zwischen 0 und 1, die die Google Cloud Natural Language API jedem in einem Text erkannten Entitäts-Vorkommen zuweist — sie misst, wie zentral die Entität für den Text als Ganzes ist.

Bei StarkRank dient der Salience-Score als Qualitäts-Gate für Inhaltsoptimierung: pro Seite werden 1–3 Ziel-Entitäten ausgewählt (Marken-Entität, Service-Entität, ggf. Geo-Entität), und der gemessene Salience-Wert post-Veröffentlichung wird gegen einen Mindestbar geprüft. Bandbreite: ≥ 0,30 stark, 0,18–0,30 brauchbar, &lt; 0,18 schwach.

Der Score ist kein Ranking-Faktor — Google nutzt ihn intern in der NLP-Pipeline, der direkte Suchmaschinen-Effekt ist Korrelations-, nicht Kausalsignal. Wir nutzen ihn als verifizierbaren Zwischenmesswert für entitätszentriertes Schreiben.
