# Hamburg Spoke Prune Evaluation — 2026-06-13

**Status: Awaiting GSC data export — automated evaluation blocked.**

No GSC export was found in the repository (`data/gsc/`, `tmp/`, `docs/`) at runtime.
This file contains the manual export procedure, an empty results table, and the pruning decision logic so the human reviewer can fill it in and apply the pruning rules.

The 13 Hamburg spokes shipped in PR #26 (commit `3c6d86c`, 2026-04-25) are now 7–8 weeks old — inside the target evaluation window.

---

## 1. How to export GSC data

### Property
`https://starkrank.com/`

### Date range
**Last 28 days** (e.g. 2026-05-16 → 2026-06-12 — adjust to the most recent full 28-day window available in GSC).

### Dimensions required
`Page`, `Query`, `Country` (filter Country = Germany for DE spokes).

### Hamburg export steps

1. Open **Google Search Console → Performance → Search results**.
2. Set date range: Last 28 days.
3. Click **+ New** → **Page** → **URL contains** → enter `-hamburg/`.
4. Ensure **Clicks**, **Impressions**, **CTR**, **Average position** are all checked.
5. Click **Export → Download CSV**.
6. Save as `data/gsc/hamburg-28d-YYYY-MM-DD.csv`.

### Hannover export steps (control group)

Repeat the above with filter **URL contains** → `-hannover/`.
Save as `data/gsc/hannover-28d-YYYY-MM-DD.csv`.

### Indexation note

GSC only surfaces URLs that Google has crawled. A URL with 0 impressions **and** absent from the export entirely is likely not indexed. Cross-check against **Google Search Console → URL Inspection** or the Coverage report for the 13 Hamburg paths.

---

## 2. URL reference table

Service slug → Hamburg URL → Hannover control URL (for parallel comparison):

| # | Service | Hamburg URL | Hannover URL |
|---|---------|-------------|--------------|
| 1 | ai-search-optimization | `/ki-suchoptimierung-hamburg/` | `/ki-suchoptimierung-hannover/` |
| 2 | technical-seo-audit | `/seo-audit-hamburg/` | `/seo-audit-hannover/` |
| 3 | local-seo-consulting | `/lokale-seo-beratung-hamburg/` | `/lokale-seo-beratung-hannover/` |
| 4 | google-ads-management | `/google-ads-hamburg/` | `/google-ads-hannover/` |
| 5 | google-ads-audit | `/google-ads-audit-hamburg/` | `/google-ads-audit-hannover/` |
| 6 | paid-social-strategy | `/paid-social-hamburg/` | `/paid-social-hannover/` |
| 7 | authority-link-building | `/linkaufbau-hamburg/` | `/linkaufbau-hannover/` |
| 8 | content-marketing | `/content-marketing-hamburg/` | `/content-marketing-hannover/` |
| 9 | seo-copywriting | `/seo-texterstellung-hamburg/` | `/seo-texterstellung-hannover/` |
| 10 | copywriting-audit | `/text-audit-hamburg/` | `/text-audit-hannover/` |
| 11 | audience-persona-mapping | `/zielgruppenanalyse-hamburg/` | `/zielgruppenanalyse-hannover/` |
| 12 | technical-web-design | `/webdesign-hamburg/` | `/webdesign-hannover/` |
| 13 | google-analytics-consultancy | `/analytics-beratung-hamburg/` | `/analytics-beratung-hannover/` |

> **Note on spoke #14 (performance-web-development):** `performance-web-development--hamburg--de.md` exists in `src/content/spokes/` and has a redirect entry at `_redirects:107` (`/de/webagentur-hamburg/ → /webagentur-hamburg/`). This URL was added as a "slug change backfill" (Phase 3c Part 2b) — separate from the original 13 PR #26 spokes. It is **out of scope** for this prune evaluation, but worth including in the GSC pull for completeness (Hannover parallel: `/webagentur-hannover/`).

---

## 3. Results table (fill in after export)

Replace all `?` values with actuals from the GSC export.

| # | Hamburg URL | HH Clicks | HH Impressions | HH Avg Pos | HH Indexed? | HAN Impressions | Decision |
|---|-------------|-----------|----------------|------------|-------------|-----------------|----------|
| 1 | /ki-suchoptimierung-hamburg/ | ? | ? | ? | ? | ? | pending |
| 2 | /seo-audit-hamburg/ | ? | ? | ? | ? | ? | pending |
| 3 | /lokale-seo-beratung-hamburg/ | ? | ? | ? | ? | ? | pending |
| 4 | /google-ads-hamburg/ | ? | ? | ? | ? | ? | pending |
| 5 | /google-ads-audit-hamburg/ | ? | ? | ? | ? | ? | pending |
| 6 | /paid-social-hamburg/ | ? | ? | ? | ? | ? | pending |
| 7 | /linkaufbau-hamburg/ | ? | ? | ? | ? | ? | pending |
| 8 | /content-marketing-hamburg/ | ? | ? | ? | ? | ? | pending |
| 9 | /seo-texterstellung-hamburg/ | ? | ? | ? | ? | ? | pending |
| 10 | /text-audit-hamburg/ | ? | ? | ? | ? | ? | pending |
| 11 | /zielgruppenanalyse-hamburg/ | ? | ? | ? | ? | ? | pending |
| 12 | /webdesign-hamburg/ | ? | ? | ? | ? | ? | pending |
| 13 | /analytics-beratung-hamburg/ | ? | ? | ? | ? | ? | pending |

---

## 4. Pruning decision logic

Apply these rules row-by-row after filling in the table.

### PRUNE candidate — all three conditions must hold:
- HH Impressions < 5 over 28 days, **AND**
- Hannover equivalent impressions > 50 (proves service has demand, Hamburg specifically does not), **AND**
- HH Avg Pos = 0 (not indexed) or > 50

### KEEP — any one of these overrides prune:
- HH Impressions ≥ 50
- HH Clicks ≥ 1 (any clicks = page has earned some discovery)
- Hannover impressions also < 50 (whole-service-no-demand — don't single Hamburg out; mark "whole-service-weak" instead)

### HUMAN JUDGMENT — mark and keep if:
- Impressions 5–49 with no clicks and Hannover 50+ (borderline: thin signal but technically alive)
- Impressions improving week-over-week (check 7d vs prior 7d in GSC)
- URL has received any backlinks (check Ahrefs/GSC Links report)

### Never prune regardless of rules:
- Any URL with ≥ 1 click in the 28-day window
- Any URL with ≥ 50 impressions

---

## 5. Prune execution checklist (for human or follow-up automated run)

When prune candidates are confirmed, for **each candidate URL**:

1. **Delete spoke file:**
   ```
   src/content/spokes/<service>--hamburg--de.md
   ```

2. **Remove service entry from `src/content/cities/hamburg.md`** — delete the corresponding line from the `services:` array.

3. **Remove redirect line from `public/_redirects`** — the Hamburg block is lines 84–97. Remove the matching `/de/<slug>-hamburg/` → `/<slug>-hamburg/` line.
   - Do NOT touch the separate PR-retirement redirects at lines 137–140 (they point to `/linkaufbau-hamburg/` and should stay).

4. **Branch:** `phase-3c-part-2a-hamburg-prune`

5. **PR body must include:** filled-in results table + per-spoke reasoning for each prune.

### _redirects current state note
As of 2026-06-13, the Hamburg block (`_redirects` lines 84–97) uses root paths (no `/de/` prefix on the destination) — the `localePath` template fix is already in effect. No `/de/` prefix correction needed when editing this block.

---

## 6. File locations for prune execution

| Artifact | Path |
|----------|------|
| Hamburg city config | `src/content/cities/hamburg.md` |
| Hamburg spoke files | `src/content/spokes/<service>--hamburg--de.md` |
| Redirects (Hamburg block) | `public/_redirects` lines 84–97 |
| Redirects (webagentur backfill) | `public/_redirects` line 107 — out of scope, do not touch |
| Redirects (PR retirement) | `public/_redirects` lines 137–140 — keep regardless |

---

*Generated by scheduled routine on 2026-06-13. Re-run once GSC exports are committed to `data/gsc/`.*
