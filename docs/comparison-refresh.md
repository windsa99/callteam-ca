# Six comparison pages: sandbox refresh

Prepared October 26, 2026 from production commit `cfd4ef655269414725c2e86e4b3c49675e79bbba`.
Scope: the six existing comparison articles. No new SalesHive alternatives page, route, remote branch update or deployment.

## Decisions from the supplied report

- Adopted: refresh material competitor statements from official sources; give readers source links, an actual verification date and commercial context; separate CallTeam's offer from competitor profiles; explain fit and proof; give readers a useful next action.
- Adapted: compare other providers alphabetically and present CallTeam in a dedicated service-and-proof section. Keep the original provider counts, with the structured list explicitly unordered. The report's suggested separate publisher section is implemented without representing the guide as an independent test or score.
- Adapted: pricing columns distinguish a quoted program, published starting figure and a form's budget-screening threshold. Currency or billing details absent from the source are identified as matters for the final proposal.
- Adopted for the US lead-generation article: a title and description explaining costs and fit. Retained the original URL and publication date.
- Deferred: the SalesHive alternatives pilot and later single-competitor pages.
- Excluded: Martal, consistent with the user's earlier direction. No new directories, review accounts, location pages, company-history claims or speculative ranking promises.
- The report's historical search metrics guided the choice of scope; they were not presented as current analytics or as a forecast of results.

## Page-by-page changes

| Article | Research and editorial change | CallTeam fit and next action |
| --- | --- | --- |
| `best-b2b-lead-generation-agencies` | Corrected Belkins' advertised starting figure, removed the unsupported current CIENCE setup amount, clarified modular costs, current memoryBlue identity and SalesHive's plan options. Reduced repeated generic explanations. | Defines the campaign-ready scope and commercial assumptions; links three relevant cases; explains the sales brief; directs readers to Campaign Preview, ROI, Proposal Comparison and an agency brief. |
| `best-b2b-lead-generation-companies-canada` | Distinguishes Canadian headquarters, assigned team, market and language coverage. Clarifies DMT channel tiers, LGI's budget screen and conditional guarantee, and the other providers' actual delivery models. | Makes research, calling, follow-up and CRM context concrete. Connects the payment-platform method to the buyer's own market and preserves the existing Campaign Preview and agency-brief placements. |
| `best-b2b-lead-generation-companies-usa` | Reworked title/description around costs and fit. Adds EBQ's published half/full-time fees and annual condition; distinguishes enterprise sales, technology SDRs, nurturing and focused calling. | Explains the US campaign brief, sales readiness, service scope and SaaS proof. Keeps the worked US campaign and brief-builder blocks, with Proposal Comparison and Meeting Quality Check in relevant sections. |
| `best-b2b-cold-calling-companies-canada` | Separates project calling from managed sales development. Adds source-backed commercial details, staffing questions and the Canadian calling-rule distinction. | Shows practical technical-offer and services use cases, current starting assumptions, SaaS proof and an illustrative handoff. Links the brief, proposal tool and CRM/meeting-quality guidance. |
| `best-b2b-cold-calling-companies-usa` | Flags SalesRoads' conflicting public figures and four-week billing; adds Superhuman's package prices and extras; distinguishes Abstrakt's continued-work remedy from Cleverly's SDR replacement. | States the managed calling responsibilities, price assumptions and professional-services result. Retains existing campaign/example blocks and adds a clear procurement and meeting-quality path. |
| `best-b2b-appointment-setting-companies` | Updates the provider table, package differences, prices and billing context. Defines the difference between bookings, attendance and accepted meetings; includes a clearly illustrative cost calculation. | Uses three linked cases with their timeframes, a defined scope, a sample meeting brief and a staged path through quality review, proposal comparison, campaign planning and a call. |

## Research and factual limits

Nineteen distinct competitors were checked against 32 distinct official source pages, including relevant regulator pages. The accompanying research ledger records the source-to-decision mapping. Competitor results were not independently tested. Unnecessary self-published performance statistics and numerical review rankings were omitted.

CallTeam pricing follows the current live Pricing page, rather than older sales quotations. Existing case-study figures and dates were checked against the published case sources. Illustrative handoffs and cost examples are labeled as examples. The copy does not promise external call recordings, unconfirmed bilingual staffing, a specific caller location or unconfirmed data-ownership terms.

## Scope preservation

- Six article source files change. Shared layouts, CSS, JavaScript, form configuration and Article Engine rules remain identical.
- All six original URLs, original publication dates and registered authors are retained. The genuine revision date is October 26, 2026.
- The clean build has 282 HTML pages. Of the 276 other pages, 273 are byte-identical; three hubs receive only the six articles' date changes and the US article's new title/description where those fields are displayed.
- All 58 other non-HTML assets are byte-identical. The sitemap retains all URLs and changes only the six revision dates.
- Previously approved marked CTA insertions remain exactly intact. The existing Calendly attribution script is unchanged.

## Validation workflow

Run each final round from a fresh generated `_site` directory, retaining the prior output outside the checkout:

1. `npm run build` (includes 31 attribution checks, article validation, ROI, Campaign Preview, meeting-quality model, rendered tool checks, authorship and form checks).
2. `npm run check:library` and `npm run check:scripts`.
3. `node scripts/verify-comparison-refresh.js BASELINE_CHECKOUT REPORT_JSON`.
4. Recreate and verify the portable review, then inspect all six desktop and mobile pages in the browser.

The preservation verifier permits only the specified six articles, exact metadata-derived hub differences and six sitemap dates. It does not weaken any existing validator.

The self-contained review embeds fonts, styles and images, removes analytics, and disables contact sending. Its original Calendly links remain available; the unchanged attribution script is checked separately by its 31 existing attribution tests. The review wrapper is never production source and must not be deployed.

Before any later release, obtain the user's deployment instruction, check the then-current main branch, reconcile only this scope and repeat the release checks. Never deploy a review wrapper or replace newer work from another conversation.

## Completed sandbox verification

Both final clean validation rounds passed on October 26, 2026. All six pages were inspected in desktop and mobile modes in each round, for 24 browser checks. The portable review was byte-identical between rounds. See `comparison-refresh-verification.json` for the preserved evidence. No remote branch update or website deployment was performed.
