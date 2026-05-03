---
term: "LLM (Grosses Sprachmodell)"
slug: "llm"
locale: "ch-de"
bucket: "ai-search"
abbreviation: "LLM"
aliases:
  - "Large Language Model"
  - "Grosses Sprachmodell"
related:
  - "ki-suche"
  - "generative-suche"
sources:
  - label: "Wikipedia (DE) — Large Language Model"
    url: "https://de.wikipedia.org/wiki/Large_Language_Model"
---

Ein **LLM** (Large Language Model, Grosses Sprachmodell) ist ein neuronales Netz mit mehreren Milliarden Parametern, das auf grossen Textkorpora trainiert wurde und natürlichsprachige Eingaben in zusammenhängende, kontext-sensitive Ausgaben übersetzt.

Bekannte LLMs (Stand 2026): Anthropic Claude (Opus, Sonnet, Haiku), OpenAI GPT, Google Gemini, Meta Llama, Mistral. Suchmaschinen-Anwendungen nutzen LLMs typischerweise im Retrieval-Augmented-Generation-Verfahren (RAG): das Modell holt vor der Antwort externe Quellen aus dem Index und nutzt sie als Grundlage statt nur auf Trainingsdaten zurückzugreifen.

Für Inhaltsoptimierung relevant: LLMs sind nicht "Webseiten-Leser", sie verarbeiten Tokens. Inhalt, der in HTML steckt, aber nach Token-Pipeline schwach strukturiert ankommt (z. B. Inhalte in Bildern oder mehrstufig geladenes JS), bleibt für LLM-basierte Suche unsichtbar.
