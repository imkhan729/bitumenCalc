# BitumenCalc GSC and SEO audit — 8 September 2026

Property: https://www.bitumencalc.com/
Source: authenticated GSC Wizard, live Search Console API, live 52-page on-page crawl, direct HTTP checks, and local source audit.
Performance window: 9 August–5 September 2026; comparison: 12 July–8 August 2026. Data after 5 September is not settled.
This is an analysis; no website content, redirects, or deployment were changed.

## Executive assessment

There is no detected sitewide noindex or crawl block. However, Google currently excludes four blog pages. Ranking and click-through deterioration are the main measured performance problems, particularly on the homepage and two major conversion calculators. These measurements do not establish an algorithm penalty or the cause of the decline.

| Metric | Previous 28 days | Latest 28 days | Change |
|---|---:|---:|---:|
| Clicks | 754 | 731 | -23 (-3.1%) |
| Impressions | 36,986 | 40,291 | +3,305 (+8.9%) |
| CTR | 2.04% | 1.81% | -0.22 percentage points |
| Average position | 7.70 | 10.65 | 2.94 positions worse |

Average position reflects changing query, country, and device mixes; it is not a fixed-keyword rank tracker. Dedicated analytics results were used for performance because the on-page audit incorrectly attached tiny no-slash variant totals to some slash URLs.

## Google indexing: 48 of 52 sitemap URLs verified

44 URLs returned PASS / Submitted and indexed. Four blog URLs returned non-indexed states. Four utility URLs remain unverified because GSC Wizard returned internal errors: /disclaimer/, /editorial-policy/, /privacy-policy/, /terms-and-conditions/. Their live technical crawl passed, but that is not proof of indexing.

| Blog URL | Latest Google state | Last crawl |
|---|---|---|
| /blog/asphalt-density-guide/ | Crawled - currently not indexed | 23 June 2026 |
| /blog/asphalt-millings-calculator-guide/ | Discovered - currently not indexed | None reported |
| /blog/asphalt-thickness-guide/ | Discovered - currently not indexed | None reported |
| /blog/tons-of-asphalt-per-cubic-yard/ | Discovered - currently not indexed | None reported |

The millings guide initially returned “URL is unknown to Google”; a later inspection returned “Discovered - currently not indexed.” This report uses the latest result. Inspections report Google's stored index state, not a new live Googlebot test.

Priority: high. All four pages currently return 200 and have indexable directives and self-canonicals, so removing noindex is not the remedy. Improve prominent contextual links from the corresponding calculators and relevant indexed guides. Review each article for a distinct purpose, accurate sourced tables/formulas, worked examples, and overlap with calculator content. For density, investigate why Google has not refreshed the page since June. Then use Search Console's live URL test and request indexing after meaningful improvements. Acceptance: successful crawl followed by indexed status; neither a sitemap submission nor an indexing request guarantees inclusion.

Six sitemap pages had zero impressions. Two of those—/blog/asphalt-driveway-cost-calculator/ and /blog/how-much-asphalt-do-i-need/—are nevertheless confirmed indexed. Zero impressions is not proof of non-indexing.

Sitemap: 52 submitted URLs, zero errors, zero warnings, last downloaded 5 September. 46 sitemap URLs recorded impressions in the performance window. The API's “indexed: 0” field is obsolete: Google stopped populating it.
Reference: https://developers.google.com/search/blog/2019/08/minor-cleaning-up-in-search-console-api

## Performance priorities

| Page | Clicks before → now | Average position before → now | Priority |
|---|---:|---:|---|
| Homepage | 28 → 7 | 8.62 → 24.42 | High |
| Square feet to tons calculator | 222 → 179 | 4.05 → 4.55 | High |
| Square meters calculator | 115 → 85 | 5.49 → 7.96 | High |
| Bitumen temperature converter | 17 → 6 | 7.69 → 9.95 | Medium |
| Tack coat guide | 37 → 28 | 6.01 → 6.29 | Medium |
| Square yards calculator | 16 → 7 | 9.18 → 10.75 | Medium |

These first three pages lost 94 clicks combined; gains elsewhere offset much of that. The tack coat calculator rose from 38 to 61 clicks, Australia calculator from 6 to 26, and chip-seal spray-rate article from 23 to 41.

Actions:
1. Review homepage query and device changes first; give it clear ownership of “bitumen calculator,” with explanatory content distinguishing binder quantity from asphalt-mixture quantity.
2. Preserve the square-feet converter's functioning calculator and successful intent. Review lost queries and snippets before broad rewrites.
3. Refine the square-meters page around area, thickness, density and tonnes, including reverse conversion where already supported.
4. Track query-level movement after changes, using comparable settled windows.

Desktop: 340 clicks, 21,704 impressions, position 13.70. Mobile: 385 clicks, 18,420 impressions, position 5.66. This difference merits segmentation, but does not prove a desktop usability defect. The USA supplies 367 clicks, approximately half of all clicks.

The millings calculator has 1 click from 1,466 impressions (0.068% CTR), with aggregate position 6.98. However, its visible exact query “asphalt millings calculator” ranks 58.35 over 26 impressions. Most page impressions are not explained by disclosed query rows. Do not treat aggregate position 7 as evidence that the main target keyword ranks seventh, or promise gains from a title edit alone.

## Query overlap

“Bitumen calculator” appears across 12 URLs in query/page data; “asphalt calculator” across five. The tack coat calculator and its guide both appear for tool-intent searches. These are overlap candidates, not proof that pages are harming each other.

Priority: medium. Assign primary intent to each page in the keyword map. Use the homepage for the broad bitumen tool, specific calculators for task intent, and guides for explanation. Add clear contextual links from guides to tools. Preserve useful pages and established URLs; do not merge or redirect them solely because a tool reports a cannibalization score. Query/page impression sums differ from property-level query totals.

## Two legacy URL 404s

Both URLs appeared in current GSC performance with one impression and zero clicks each, and direct live checks returned 404:

| Old URL | Relevant existing destination |
|---|---|
| /blog/how-to-calculate-quantity-of-bitumen-for-road/ | /blog/how-to-calculate-bitumen-quantity-for-road/ |
| /blog/modified-bitumen-roof-calculator/ | /blog/modified-bitumen-roofing-calculator/ |

Priority: medium as a small cleanup, not an explanation for the overall decline. Confirm the intended old-to-new article equivalence and add exact 301 redirects to the corresponding existing articles. Verify a single redirect ending at 200. Do not redirect unrelated missing URLs to the homepage.

## Live technical and on-page checks

All 52 sitemap URLs:
- HTTP 200, indexable by the crawler, no detected noindex.
- Self-referencing canonical, one H1, unique titles.
- Structured data detected and viewport present.

Direct checks: robots.txt and sitemap.xml return 200; robots.txt allows public pages and names the correct sitemap. HTTP/www and a tested no-slash calculator alias return 301 to canonical URLs. A deliberately nonexistent URL returns a proper 404.

Local source audit: 52 pages and 52 sitemap entries; no metadata, duplicate title/description, JSON-LD syntax, sitemap coverage, or local same-origin link errors. Local link existence is not a full live broken-link or fragment audit.

Automated on-page audit: 42 warnings—34 Organization logo warnings, six long titles, two long descriptions. The logo warnings are overstated by the tool: Google says Organization has no required properties. Treat consistent logo markup as optional cleanup, not an indexing blocker. Title and description lengths are truncation heuristics, not fixed Google limits or proof of ranking loss.
Reference: https://developers.google.com/search/docs/appearance/structured-data/organization

## Limits and next steps

1. Resolve the four blog indexing cases, using the distinct remedies above.
2. Investigate homepage and major calculator losses at query/device level; make targeted intent and snippet improvements.
3. Add the two appropriate legacy redirects.
4. Clarify overlapping calculator/guide targets.
5. Finish the four failed utility inspections and obtain Core Web Vitals data.

GSC Wizard has no indexing tracker configured; no tracker was created. CrUX is not configured, so LCP/INP/CLS are unverified. A fast crawler fetch does not establish good Core Web Vitals. No full browser/mobile interaction audit or Google rich-result eligibility test was performed in this review. Manual actions, security issues, backlinks and GA4 engagement were not verified through the available reports. The connected property is the www HTTPS URL prefix, not an entire domain-property audit.

Raw results and per-URL evidence: GSC-SEO-EVIDENCE-2026-09-08.json.

