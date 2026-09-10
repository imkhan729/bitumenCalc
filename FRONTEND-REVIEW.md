# BitumenCalc local frontend review — 9 September 2026

Local preview: http://127.0.0.1:4173/

No GitHub push, commit, or deployment was performed. Existing unrelated changes and release mirrors were preserved.

## Implemented

- Shared static navigation with grouped desktop calculator menu and keyboard-accessible mobile drawer on all 52 routes.
- Two-column homepage with clearly labelled example estimate, trust strip, popular tools, feature grid, restored engineering guide links, dark methodology, reference tables, educational explanation, FAQ and final CTA.
- Shared calculator presentation with integrated number/unit fields, readable results, yellow/charcoal composition bar, optional cost toggle, and full results in the mobile page flow.
- Blog reading layout, responsive contents navigation, shared footer styling, and light-touch static-page styling.
- One compiled, minified local stylesheet. System fonts avoid external font requests. No new production framework or library.
- Accessible reference tabs, specialist mode labels, native FAQ disclosures, and visible keyboard focus.

## Verification

- Source audit: 52 pages and 52 sitemap routes; no missing pages, broken page links, invalid JSON-LD, metadata issues, or duplicate titles/descriptions.
- All existing meta tags, titles, canonical/alternate tags and JSON-LD were compared with the start-of-task snapshot and preserved.
- One existing broken link, `/calculators/asphalt-density-guide/`, was corrected to the existing `/blog/asphalt-density-guide/` route. Root formula/reference navigation now uses absolute root fragments to work from every page.
- Standard calculator suite: 19 calculator routes plus homepage produce 12.000 tonnes for 10 m × 10 m × 50 mm at 2,400 kg/m³, including metric/imperial round trips. Cost, copy, share restoration, print and directory filters passed.
- Specialist checks: circular, tack coat, temperature, three application-rate modes, four measurement conversions, removal, three repair modes, road layers, roofing and reverse thickness passed.
- All mix presets and seven currency displays passed; mobile menu, FAQ disclosure and keyboard reference tabs passed.
- Responsive checks use 320, 360, 390, 430, 768, 1024, 1280 and 1440 pixels. See `FRONTEND-final.json` for all-page evidence and `FRONTEND-interactions.json` for populated-result checks.
- Final local Lighthouse: performance 63, accessibility 100, best practices 77, SEO 100. LCP 2.7 seconds, CLS 0, TBT 2,570 ms. Performance targets are not fully met; the existing advertising and analytics scripts account for substantial startup work. These are local laboratory results, not deployed field Core Web Vitals. INP requires interaction/field measurement and is not established by this run.

## Main files

- `css/frontend.css`: final component styling and responsive rules.
- `css/site.css`: generated minified stylesheet used by all 52 pages.
- `partials/header.html`: generated shared navigation markup.
- `tools/build-frontend.cjs`: repeatable static navigation/CSS build (uses esbuild when available).
- `js/product.js`: presentation enhancements; core calculation engine files unchanged by this task.
- `index.html`: homepage refinements and restored guide/context content.
- `.local-static-server.cjs`: disables local asset caching so preview edits are visible.

The existing source styles are retained as build inputs. The deployment mirrors and ZIP releases have not been rebuilt or published.
