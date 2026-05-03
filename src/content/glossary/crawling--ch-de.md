---
term: "Crawling"
slug: "crawling"
locale: "ch-de"
bucket: "industry-seo"
aliases:
  - "Webcrawler"
  - "Bot"
related:
  - "onpage-seo"
  - "interne-verlinkung"
sources:
  - label: "Google Search Central — Übersicht der Google-Crawler"
    url: "https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers"
---

**Crawling** ist der erste Schritt der Suchmaschinen-Verarbeitung: ein automatisierter Bot (Crawler) folgt Links von Seite zu Seite, lädt den HTML-Inhalt herunter und übergibt ihn an die Indexierungs-Pipeline. Googles primärer Crawler ist der **Googlebot** in mehreren Varianten (Smartphone, Desktop, Image, News).

Crawling ist nicht garantiert. Crawler-Budget pro Domain ist endlich und wird priorisiert nach Domain-Autorität, Aktualisierungs-Frequenz und Server-Performance. Grosse Sites mit vielen Low-Value-URLs verbrennen Crawl-Budget, das auf wichtigeren Seiten fehlen kann.

Steuerung: `robots.txt` (Erlaubnis pro User-Agent), Sitemap (XML-Liste der wichtigen URLs), `noindex`-Meta-Tag (Seite vom Index ausschliessen ohne Crawl-Sperre), Crawler-Statistiken in der Google Search Console.
