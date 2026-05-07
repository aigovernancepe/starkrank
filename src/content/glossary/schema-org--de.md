---
term: "Schema.org"
slug: "schema-org"
locale: "de"
bucket: "industry-seo"
aliases:
  - "Structured Data"
  - "Strukturierte Daten"
  - "JSON-LD-Schema"
related:
  - "entity-anchor"
  - "eeat"
sources:
  - label: "Schema.org — Vokabular"
    url: "https://schema.org/"
  - label: "Google — Strukturierte Daten in der Suche"
    url: "https://developers.google.com/search/docs/appearance/structured-data"
---

**Schema.org** ist ein gemeinsam von Google, Microsoft, Yahoo und Yandex gepflegtes Vokabular zur Auszeichnung strukturierter Daten auf Webseiten. Es definiert Typen (zum Beispiel `Service`, `Dentist`, `Person`, `MedicalOrganization`) und deren Eigenschaften, damit Suchmaschinen und KI-Antwortmaschinen den Inhalt einer Seite eindeutig interpretieren können.

Die heute praktisch eingesetzte Schreibweise ist **JSON-LD** im `<head>` der Seite — empfohlen von Google, einfacher zu pflegen als Microdata oder RDFa. Mehrere Schema-Knoten werden über `@id`-Verweise zu einem Knotengraphen verbunden (zum Beispiel `Service` mit `provider: Organization`, `audience: Audience`, `mentions: Legislation`).

Für Facharzt- und Zahnarztpraxen ist die Schema-Schicht oft die größte ungenutzte SEO-Fläche: Yoast-Default liefert nur `WebPage + BreadcrumbList + WebSite + Organization`, kein `Dentist`, kein `Person` für Behandler, kein `Service` für Behandlungen. Ohne diese Knoten sind Praxen für KI-Antwortmaschinen strukturell unsichtbar — egal wie gut der Content ist.

**Schema-Content-Parität** ist Pflicht: Was im JSON-LD steht, muss wortgleich oder semantisch identisch im gerenderten HTML auffindbar sein. Andernfalls droht eine manual action durch Google.
