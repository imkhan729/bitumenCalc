# SEO recovery status — 8 September 2026

## Published and tested

Published the static release to https://github.com/imkhan729/bitumenCalc on main, commit 0fef5bc7f81f053fcf28a710108306f285483bef. The release contains 84 public files and 52 index pages; private GSC exports, local settings, tools and source Git history were excluded.

Completed: rewritten four excluded guides, corrected square-foot conversion tables and binder-density guidance, priority keyword titles/answers/internal links, visible FAQ/schema parity, accessible keyboard FAQs, input labels and heading/contrast fixes, social image repair, exact legacy redirects, sitemap dates, shared script minification and removal of the duplicate early ad loader.

Final source audit: 52 pages / 52 sitemap URLs; zero metadata, duplicate title/description, schema JSON or local route-link failures. Final Edge audit: all 52 routes at 320, 375, 390, 414, 768 and 1280 px; zero page-level overflow, missing images, broken fragments, JavaScript errors or FAQ/schema mismatches. Calculator fixtures, reverse conversion, invalid inputs, resets and keyboard FAQ activation passed. Wide tables scroll inside their containers. Source syntax and git diff checks passed.

Latest mobile Lighthouse: performance 53, accessibility 95, SEO 100; LCP 4.3 s, TBT 4,510 ms, CLS 0.06. The remaining ARIA finding was subsequently corrected and keyboard-tested; no revised Lighthouse score is claimed. CLI wrote the report but failed on temporary-profile cleanup. Third-party analytics/ads remain a performance concern. This localhost lab result is not field Core Web Vitals; PageSpeed public API quota prevented a field check.

## Deployment and indexing remain pending

After the Git push, production still returned the old homepage title, 404 for /js/app.min.js?v=9, and 404 for both newly redirected legacy blog paths. Hostinger has not yet deployed this release. User requested a deployment walkthrough.

Google inspection found 48 of 52 URLs indexed. The four excluded guides remain unresolved until deployment and recrawl: asphalt-density-guide, asphalt-millings-calculator-guide, asphalt-thickness-guide, tons-of-asphalt-per-cubic-yard. Source changes do not prove Google recovery.

After deployment: verify all exact live URLs, Apache redirects, real 404 response and sitemap; then request indexing for those four pages in Search Console and monitor outcomes. Rankings and AI search inclusion are not guaranteed.

## Keyword research

See SEO-KEYWORD-RESEARCH-2026-09-08.md: all 851 disclosed GSC query rows examined. Priority targets include 1 ton asphalt m2 calculator, m2 to tonnes, tack coat spray rate, ton to square feet and density of bitumen. GSC impressions are site visibility, not market-wide monthly volume. No verified market-volume or organic keyword-difficulty data was available.

## Production verification after deployment

User confirmed Hostinger deployment. Verified all 83 publicly fetchable release files match the published content; .htaccess verified through runtime behavior. Homepage aliases and both legacy article URLs return correct 301 redirects. Nonexistent route returns 404. Sitemap and public pages match release; no unexpected noindex found (the error template intentionally has noindex).

Live Edge audit covered all 52 routes at six widths. Calculator arithmetic, reverse conversion, validation and reset fixtures passed. One initial About Us navigation returned a Hostinger browser-check 403. Targeted fresh-browser retry reproduced an initial challenge, followed by two successful 200 responses with correct canonical/schema and no overflow. This hosting protection behavior remains a caveat; it is not a missing deployed file. Third-party requests were blocked during browser functional tests, so these tests do not validate advertising performance.

Evidence: SEO-LIVE-RELEASE-QA.json, SEO-RECOVERY-BROWSER-QA.json (live origin), SEO-LIVE-ABOUT-RETRY.json. Deployment is now verified. Google indexing/ranking recovery and field Core Web Vitals remain unverified.
