# First 60 Days — sandbox handoff

Built 2026-10-18 on production base `843e6b0b5ece9dab7f5696920f3720e304c2d1bb`.
Branch: `sandbox/first-60-days-20261018`. No push or deployment performed.

## Page

Route: `/b2b-cold-calling-campaign-process/`.
SEO title: B2B Cold Calling Campaign: Your First 60 Days | CallTeam.
H1: See how we work your prospect list, week after week.
Static server-rendered resource; no new backend, external service or JavaScript.
Existing CallTeam ivory, orange, black, typography, header, footer and contact form.

Illustration: 300 prospects, 1,200 call attempts in month one; four attempts on average.
Weekly additions: 150/50/50/50. Month two: 150 continuing +150 new, introduced 40/40/40/30.
450 distinct prospects over two months, with a second 1,200-call plan.
Individual cadence responds to bookings, declines, opt-outs, callbacks and entry dates.
The weekly report is illustrative. The separate SaaS case study is explicitly a past campaign.
The 60 days start after preparation; existing three-month engagement terms remain clear.

## Six inbound placements

- Outbound Sales Library: resource card beside existing campaign resources.
- Pricing: after the campaign progression chart.
- Homepage (also the Outbound Calling destination): Structured follow-up section.
- Outsourced SDR: end of Reporting and campaign improvement.
- Campaign Preview: after the four execution steps.
- US campaign example: after The first review.

No new global navigation item. Outbound links include booking, Campaign Preview, ROI,
US example, meeting-quality check, SaaS case study, pricing and the 90-day guide.

## Verification

Two successful full build and library-validation passes.
Targeted checks: nine mathematical scenarios; eight visible/schema-matched FAQs;
74 page-local links/assets; canonical, metadata, JSON-LD, IDs, no duplicate prose,
booking buttons and no input-dependent content. Responsive CSS/focus/reduced-motion/print rules checked.
Preservation: 270 old HTML pages retained; 264 byte-identical, six with exact isolated
link insertions. 38 existing non-HTML assets byte-identical (sitemap separately checked).
All 270 old sitemap entries preserved; one new entry. 138 articles and 100 scripts
pass existing validators. Shared layouts, assets, article engine and forms unchanged.

Browser visual QA was NOT performed: the managed environment's required control-browser
capability was unavailable. Inspect the supplied standalone preview at desktop and mobile
widths before deployment approval. Contact sending and analytics disabled in that preview;
booking and other existing-resource links still open live destinations.

Commands (jsdom available via the sandbox QA dependency path):
- npm run build
- npm run check:library
- NODE_PATH=/workspace/scratch/bb92714b7ed1/roi-qa-tools/node_modules node scripts/test-campaign-process.js
- NODE_PATH=/workspace/scratch/bb92714b7ed1/roi-qa-tools/node_modules node scripts/check-campaign-process-release.js
- NODE_PATH=/workspace/scratch/bb92714b7ed1/roi-qa-tools/node_modules node scripts/package-campaign-process-preview.js ABSOLUTE_PREVIEW_PATH

Before any later release: obtain deployment authorization, check production main for drift,
retain only this scope, rerun tests and review the visible page. Date metadata currently
reflects sandbox preparation on October 18, 2026.
