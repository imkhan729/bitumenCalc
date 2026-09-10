# BitumenCalc SEO Audit

## Phase 2 live HTTP verification — 2026-09-07

Requested all 52 URLs from the local sitemap using six concurrent HTTP clients. All returned 200 at the requested URL, with a matching canonical in response HTML, no X-Robots-Tag header, and no detected meta noindex. Live robots.txt allows public routes and matches the source copy. These checks establish HTTP-level crawlability signals, not actual Google indexing or Google-selected canonicals.

Additional probes: HTTP/non-www homepages finish at the preferred HTTPS/www homepage; `/calculators/tonnage/` finishes at the canonical tonnage calculator; an invented path returns a real 404.

Confirmed LOW-priority duplicate: `/index.html` finishes at `/index` with HTTP 200. Added a local, request-guarded 301 for explicit root `/index` and `/index.html` to `/`, before generic extension removal. No directory routes changed. Deployment and Apache runtime validation of this new rule remain pending. Prior broad ranking-loss claims cannot be attributed to this alias without GSC evidence.

## Verified source audit — 2026-09-07

Run `node tools/audit-seo.cjs` to reproduce the local inventory. The public source contains 52 index pages and 52 matching sitemap URLs. The earlier 162 HTML count included generated release mirrors and utility/error HTML; it is not the public page count.

- Every source index page has a title, description, exactly one H1, and exactly one self-referencing canonical.
- No duplicate titles or descriptions were found across these pages.
- No source index page has a meta noindex directive.
- All JSON-LD blocks parse as JSON. This does not establish schema eligibility, factual accuracy, or rendered markup validity.
- All anchor destinations on the same origin resolve to an existing local route or file. Fragment targets, redirect behavior, and live status are separate checks.
- Sitemap coverage matches the source routes exactly.

Correction: the earlier matching counts of 52 schema files and 52 sitemap URLs alone did not establish page-by-page coverage. The new audit explicitly compares routes. Earlier H1 edits are wording changes; their stated Medium/High priorities are provisional and are not demonstrated causes of ranking loss. No historical GSC landing-page ownership has been verified. All changes remain local; deployment and ranking recovery are unverified.

## Audit status

Initial baseline started 2026-09-07. This document records repository evidence before implementation. The master prompt is treated as project requirements; its supplied Search Console metrics are baseline inputs and are not independently verified in this workspace.

## Scope and baseline

- Site: https://www.bitumencalc.com/
- Project type: static HTML/CSS/JavaScript calculator website.
- Repository: 162 HTML files detected.
- Existing `robots.txt` and `sitemap.xml` are present.
- Working tree was clean at audit start.
- Supplied GSC baseline: 737 clicks, 40,311 impressions, 1.83% CTR, average position 10.49.

## Initial findings

### Technical SEO

| Finding | Impact | Evidence | Recommended action | Status |
|---|---|---|---|---|
| Sitemap and robots files exist | Medium | Root `robots.txt` references the HTTPS sitemap; `sitemap.xml` exists | Validate every sitemap URL against local files and live HTTP status | Pending |
| Large static page inventory requires route-level validation | High | 162 HTML files detected | Crawl titles, canonicals, robots directives, headings, links, and sitemap coverage | Pending |
| `/tools/` is disallowed | High | `robots.txt` contains `Disallow: /tools/` | Confirm whether any indexable/public calculator pages live under this path before changing it | Pending |
| `/tools/` currently contains only internal Python utilities | Low | Local inventory found `tools/apply_seo.py` and `tools/md_to_blog.py`; calculator routes are under `/calculators/` | Keep the exclusion unless live routing differs; do not expose internal utilities | Confirmed safe locally |
| Sitemap contains 52 URLs | Medium | Local `sitemap.xml` contains 52 `<loc>` entries | Compare all entries with canonical HTML routes and live status codes | Pending |
| All 52 sitemap-listed pages currently expose JSON-LD locally | Medium | Local scan found `application/ld+json` on 52 HTML files; observed BreadcrumbList, WebApplication, FAQPage, and article/profile schemas | Validate schema syntax and eligibility; avoid duplicate or unsupported markup | Pending |
| Representative live routes return HTTP 200 | High | Live checks returned 200 for homepage, tack-coat calculator, square-feet-to-tons calculator, sitemap, and robots.txt | Continue live checks for sitemap routes and legacy redirects | Confirmed for sample |

### On-page SEO

| Finding | Impact | Evidence | Recommended action | Status |
|---|---|---|---|---|
| Page-level metadata has not yet been systematically inventoried | High | Initial repository inspection only | Build a title, description, canonical, H1, schema, and URL inventory | Pending |
| Priority query-to-page ownership is not yet confirmed | High | Supplied GSC queries have no verified local mapping yet | Map each priority query to the existing ranking/target page before editing | Pending |

### Content and architecture

| Finding | Impact | Evidence | Recommended action | Status |
|---|---|---|---|---|
| Existing pages must be improved before creating overlapping replacements | High | Master prompt identifies ranking losses and cannibalization risk | Audit current URLs and preserve established URLs/backlinks | Pending |
| Priority calculator pages already contain formula, FAQ, and related-content sections | Medium | Local heading/content scan confirms these sections on tack-coat and square-feet-to-tons pages | Focus first changes on intent clarity, CTR, content accuracy, and internal linking rather than wholesale rewrites | Confirmed |
| Square-feet-to-tons H1 used an abbreviated query variant | Medium | `/calculators/square-feet-to-tons-calculator/` had `Sq Ft to Tons Calculator` while the title and supplied opportunity use the full phrase | Align H1 with the established full-intent query without changing the URL or calculator logic | Fixed |
| Tack Coat title led with a secondary descriptor | Medium | `/calculators/tack-coat-calculator/` title used `Emulsion Coverage & Spray Rate` | Lead with the supplied spray-rate opportunity and state the calculator output; preserve URL and page functionality | Fixed |
| Formula-bearing metric page had an H1/title mismatch | Medium | `/calculators/metric-bitumen-calculator/` title targets Metric Bitumen Calculator while H1 said `Metric Asphalt Calculator` | Align H1 with the established bitumen URL/title and preserve calculator logic | Fixed |
| Minnesota page had an H1/title mismatch | Medium | `/calculators/minnesota-asphalt-calculator/` title targets Minnesota Asphalt Calculator while H1 said `Minnesota Bitumen Calculator` | Align H1 with the established URL/title and preserve regional content | Fixed |
| Road calculator had an H1/title mismatch | Medium | `/calculators/road-asphalt-calculator/` title targets Road Asphalt Calculator while H1 said `Road Paving Calculator` | Align H1 with the established URL/title and preserve calculator logic | Fixed |
| North Carolina page had an H1/title mismatch | High | `/calculators/north-carolina-asphalt-calculator/` title targets North Carolina Asphalt Calculator and NCDOT mix estimation while H1 said `North Carolina Bitumen Calculator` | Align H1 with the NCDOT/asphalt title and preserve regional calculator logic | Fixed |
| Virginia page had an H1/title mismatch | Medium | `/calculators/virginia-asphalt-calculator/` title targets Virginia Asphalt Calculator while H1 said `Virginia Bitumen Calculator` | Align H1 with the established title and preserve regional calculator logic | Fixed |
| California page had an H1/title mismatch | Medium | `/calculators/california-asphalt-calculator/` title targets California Asphalt Calculator while H1 said `California Bitumen Calculator` | Align H1 with the established title and preserve Caltrans content | Fixed |
| New Jersey page had an H1/title mismatch | Medium | `/calculators/new-jersey-asphalt-calculator/` title targets New Jersey Asphalt Calculator while H1 said `New Jersey Bitumen Calculator` | Align H1 with the established title and preserve regional content | Fixed |
| Colorado page had an H1/title mismatch | Medium | `/calculators/colorado-asphalt-calculator/` title targets Colorado Asphalt Calculator while H1 said `Colorado Bitumen Calculator` | Align H1 with the established title and preserve CDOT content | Fixed |
| Internal-link and broken-link work exists in recent history | Medium | Latest commit: “Fix 20 broken internal links (404s), add legacy 301s, strengthen author page” | Re-test links and redirects against the current tree/live site | Pending |
| Existing redirects consolidate legacy calculator paths | Medium | `.htaccess` contains HTTPS/www normalization, clean-URL handling, and legacy calculator redirects | Validate representative redirect chains and ensure sitemap uses final canonical URLs | Pending |

## Confirmed priority pages from local route inventory

| Query cluster | Existing URL | Local metadata observation | Initial assessment |
|---|---|---|---|
| tack coat calculator; tack coat spray rate | `/calculators/tack-coat-calculator/` | Title and description explicitly target tack coat, emulsion coverage, and spray rate; H1 is `Tack Coat Calculator` | Strong existing target; optimize only after content, calculator UX, links, and schema review |
| ton to square feet; sf to tons asphalt; square feet to tons asphalt | `/calculators/square-feet-to-tons-calculator/` | Title targets square feet to tons; description states area, thickness, and tonnage; H1 is `Sq Ft to Tons Calculator` | Strong existing target; inspect wording and related conversion links |
| minnesota asphalt calculator | `/calculators/minnesota-asphalt-calculator/` | Title references Minnesota and MnDOT; description claims Minnesota-specific presets and pricing | Existing regional page; check evidence, uniqueness, and intent before adding content |
| asphalt cost per ton | `/calculators/asphalt-cost-calculator/` | Title targets project cost; description includes price per tonne and currencies | Existing cost target; ranking-loss recovery requires historical/live evidence before changes |
| bitumen formula | `/blog/how-to-calculate-bitumen-quantity-for-road/` and related bitumen pages | Existing formula-oriented blog content is present, but ownership is not yet resolved | Requires cannibalization and title/content inventory |

## Required next audit checks

1. Inventory all HTML metadata, headings, canonicals, JSON-LD, and indexability directives.
2. Validate sitemap URLs against local routes and live responses.
3. Crawl internal links and identify orphan/broken routes.
4. Map the supplied GSC opportunities and ranking losses to existing pages.
5. Inspect calculator JavaScript and mobile layout before proposing changes.

No implementation changes are approved from this initial snapshot until the route and metadata inventory is complete.
