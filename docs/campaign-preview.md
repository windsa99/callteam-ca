# Campaign Preview sandbox

Status: sandbox only; no remote push, deployment, live submission or booking.

Proposed route: `/b2b-outbound-campaign-planner/`.

## Visitor experience

Five native dropdowns ask what the visitor sells, the industry they sell to, the buyer, region and goal. The offer is the only initially unanswered question. The other controls offer clear starting choices, including help choosing a target industry and recommending a buyer. No typing, email gate, company scraping or model API is required.

The page assembles a starting plan with account criteria, buyer roles, a conversation angle, an adaptable opening, qualification questions, an objection response, execution steps and source links. Documented case-study evidence appears only with a relevant match and retains its original context. Unsupported buyer/industry combinations receive a clearly explained broader plan. Generic SaaS recommendations identify the workflow owner and buying committee until the visitor chooses a specific role.

Copy, print and contact-draft actions use the current result. Changing answers clears the result and any untouched generated contact draft. Personally edited drafts are preserved with a visible notice to review their earlier preview. The page never submits a form or books a meeting automatically.

The personalised result is labelled “Your preview — based on your answers”, with “Resources matched to your answers”. The fixed cybersecurity example starts open in the initial HTML. A successful preview collapses it behind the native “See another example” disclosure; visitors can reopen it, and reset restores the open state. The separate proof section is labelled “Real results from past CallTeam campaigns”.

## Content ownership and future maintenance

`src/_data/campaignPreview.js` contains the new curated catalogue. It reads selected existing script fields and guide metadata without changing the source articles or scripts. Twelve offer routes plus an other-offer fallback are available. The browser receives a compact public catalogue through `src/campaign-data.njk`.

To add a future route, define its supported offer, target industries, buyer roles, primary buyer, account criteria and source references. Check whether each metadata field describes the seller or target buyer. Keep documented results separate from proposed scripts. Add meaningful tests for the route and its unsupported combinations.

Future articles automatically inherit shared navigation, footer and form protection. A new article does not automatically become an approved recommendation: review its relevance and add it to the catalogue or an existing source mapping. This preserves editorial control without rewriting article bodies.

## Sandbox integration and preservation

The shared Resources menu and footer contain Campaign Preview. Six contextual additions connect the ROI calculator, pricing, library, appointment setting, outsourced SDR and lead reactivation pages. All additions are marked for exact regression comparison. No article body, existing script, shared stylesheet, existing contact form or editorial validator was edited. Homepage body is unchanged.

The new page inherits the existing protected contact form. Only its own page loads the campaign stylesheet and three scripts. The exact CallTeam orange, black, white and neutral palette is retained.

## Discovery foundations

The page has a stable proposed canonical URL, descriptive title/meta/social metadata, WebPage and BreadcrumbList JSON-LD, crawlable internal links, sitemap inclusion and an indexable production template. A substantive OT-security example, accurate campaign evidence, explanation and six FAQs exist in initial HTML without JavaScript. It does not create indexable URLs for every answer combination. Existing robots rules remain unchanged.

Actual indexing, search/AI referrals and hosting-level bot access are release checks; no visibility guarantee is implied. No external search console or hosting setting was changed.

## Verification

Following the October 12 clarity update, two complete builds and test rounds plus a third final readiness round passed. The second was a clean rebuild. All 290 generated files were byte-identical across all three rounds. Each round covered 31 model checks and 25,740 answer combinations, 34 new-page DOM interaction checks, 27 existing ROI model checks, 21 ROI DOM checks, 21 broken-form cases, all-site link/schema checks and five deliberately corrupted temporary site copies.

The exhaustive check verifies complete targets, buyer roles, openings, questions, objections, four execution steps, exact selection labels and unique resources for every combination. Coverage includes 4,960 specific matches and 20,780 explicitly broader plans, each with 4–7 resources. This does not imply 25,740 independently researched or wholly unique campaigns.

Preservation checks confirmed 265 existing pages, 138 exact article bodies, 100 existing scripts, 19 existing non-HTML assets/robots files, and existing forms/metadata. Only the approved navigation/footer/contextual links and one new sitemap entry differ. The output contains 266 HTML pages.

The HTML preview embeds scripts, styles and logos; public fonts may load when online and use fallbacks offline. It disables contact sending, removes analytics and points resource/booking links to the existing live services. Five packaged scenarios passed executable DOM checks.

The October 12 clarity pass changes only three production source files: the planner template, its controller and its scoped stylesheet. The matching catalogue/model, shared links, existing articles and contact form are unchanged from the previously tested sandbox. A read-only GitHub check still found production main at `decf147f68061d02f262f90c3b0582a54ae3b5e6`; there was no push or deployment. Recheck the production head before any later approved release.

Browser-based visual QA is unavailable in this environment under the Sites workflow. Automated DOM checks are not screenshots or visual-browser verification. No real Formspree submissions or Calendly bookings were performed.

Evidence: `docs/campaign-preview-qa.json`.

Commands (QA jsdom dependency is outside production):

```bash
npm run build
NODE_PATH=/workspace/scratch/bb92714b7ed1/roi-qa-tools/node_modules node tests/campaign-dom-check.js
node scripts/verify-campaign-release.js /workspace/scratch/bb92714b7ed1/callteam-campaign-baseline --self-test
npm run check:library
NODE_PATH=/workspace/scratch/bb92714b7ed1/roi-qa-tools/node_modules node tests/roi-dom-check.js
npm run test:form-guard
```
