---
term: "Entity Anchor (Entitätsanker)"
slug: "entity-anchor"
locale: "ch-de"
bucket: "methodology"
aliases:
  - "Entitätsanker"
related:
  - "5-element-methodologie"
  - "strukturierte-daten"
  - "themenautoritaet"
sources:
  - label: "schema.org — Thing"
    url: "https://schema.org/Thing"
---

Ein **Entity Anchor** (Entitätsanker) ist die explizite Bindung eines Inhalts an eine oder mehrere benannte Entitäten — Personen, Organisationen, Orte, Konzepte mit eigenem Wikidata- oder Knowledge-Graph-Eintrag. Element 4 der [5-Element-Methodologie](#5-element-methodologie).

Bindung erfolgt zweispurig: einmal im sichtbaren Text durch Erstnennung, Definition und konsistente Nachverwendung des kanonischen Entitäts-Namens, einmal im JSON-LD-Schema über `about` (zentrale Entitäten der Seite) und `mentions` (peripher relevante Entitäten).

Wirkung: Suchmaschinen ordnen den Inhalt nicht über Keywords zu, sondern über Entitäts-Cluster. Das macht den Inhalt widerstandsfähig gegen Synonym-Drift, mehrsprachig auffindbar und für KI-Antwortgenerierung sauber zitierbar.
