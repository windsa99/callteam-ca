# Three evergreen landing pages: sandbox handoff

Prepared October 25, 2026. Production release was approved after the sandbox review; see the release section below.

Base: 35009823eecbf51cc3c1e1f20080cc87fc934ce7. This includes the Small Business and Professional Services pages published in the other chat. Worktree: callteam-evergreen-three. Branch: sandbox/evergreen-three-20261025.

## New pages

- /services/fintech-lead-generation/: buying a managed fintech campaign, with two buyer routes, illustrative handoffs, published payments and lending case studies, responsibilities, pricing/ROI context, checklist and booking links.
- /b2b-lead-generation-audit/: six pre-booking checks with Yes/No/Not sure answers. Known gaps precede unanswered checks; up to three actions are shown while all six answers remain available. No invented score or causal diagnosis. All Yes reports no flagged gaps.
- /b2b-lead-generation-rfp-template/: six short fields assemble an agency buying brief. Five required fields, optional timing/budget. Copy/print and editable plain-text documents. This prepares requirements before the existing Proposal Comparison tool is used.

All use production Archivo/Inter, orange #ff5a1f, ivory and a #1b1b1b hero panel matching the two recently published service pages. No visible author byline. No Article Engine changes. FAQ copy and schema share one data source. No visitor-facing SEO/LLM claims. No AI API, account, document upload or manual report-delivery dependency.

Both tools run locally. They use safe text insertion and explicit input validation; inputs/results are masked from Clarity session replay. No persistence or answer values sent by the tool code. The ordinary inherited contact form is unchanged. Booking a call does not attach tool entries.

Four downloadable TXT documents: fintech handoff checklist, outbound self-audit checklist, blank agency RFP and fictional completed brief. Formats are honestly labelled as editable plain text. The brief is not a contract.

## Staged cross-links

Exact source blocks, IDs, labels and placements are recorded in scripts/data/evergreen-three-placements.json.

Fintech (4): All Services audience card grid; FinTech playbook before end-to-end execution; payment-platform case before related services; lending case before FAQs.

Self-audit (3): metrics guide before decision section; calls-to-meeting guide before forecasting; switching-agencies guide before provider comparison.

Agency brief (4): service buying guide inside the final scorecard, after the opening advice; US and Canadian agency comparisons before final vendor questions; Proposal Comparison between proof and method.

No header/footer, About or library-overview additions. The three non-article host callouts carry CSS scoped to their new ID, copied from the existing contextual component; it does not alter other elements. Existing host source is exactly recoverable by removing the recorded blocks. Markdown insertions end with a blank line so existing headings still render normally.

## Preservation and verification

Baseline output: ../callteam-evergreen-three-baseline, built before changes, 276 HTML pages.

Required: 265 unrelated HTML pages byte-identical; eleven hosts changed only inside approved blocks; all 49 existing non-HTML assets identical; 276 old sitemap entries and metadata retained; exactly three pages and seven assets added. Total 279 HTML pages.

Two final full passes must include:
npm run build
npm run check:library
npm run check:scripts
NODE_PATH=/tmp/callteam-starter-kit-webqa/node_modules node scripts/test-evergreen-three.js
NODE_PATH=/tmp/callteam-starter-kit-webqa/node_modules node scripts/check-evergreen-three-release.js

Package the self-contained preview with scripts/package-evergreen-three-preview.js and run scripts/test-evergreen-three-preview.js. The preview embeds fonts, styles, scripts, images and downloads, removes analytics/canonical indexing and disables contact sending. Its eleven-link appendix is not production content.

Tests exhaust all 729 audit answer combinations, check 28 brief scenarios/validation cases, missing and overlong fields, unknown answers, unfamiliar offers, Unicode, unsafe-text handling, dirty/reset states, copy fallback, full print text, 21 FAQ/schema pairs, links and downloads. UI print dispatch is checked with a stub; native print dialogs are not automated.

Before a future approved deployment, fetch current main and reconcile only this scope. Never overwrite changes from the other chat. Rebuild and compare against a fresh baseline if production advanced.

Browser review also found and resolved a late field-change event hiding a freshly built brief. The result now remains visible when field values still match its inputs; actual edits still invalidate it. A regression case exercises that event order. The agency brief card in the buying guide is separated from the existing campaign card by the scorecard heading and advice.

## Completed review

Two clean final full passes completed successfully. Each ran the production build, library/script checks, 729 audit combinations, 28 brief scenario/validation checks, UI state and late-blur regression, strict release preservation and self-contained preview tests.

Browser review confirmed Archivo typography, orange rgb(255,90,31), charcoal panel rgb(27,27,27), desktop layout and 360px inner phone documents with no horizontal overflow on all three pages. Fintech route expansion, audit example/all-Yes states, blank brief validation, completed ERP example and a custom banking brief were exercised. The corrected banking brief remained visible after a late field-change event, and native browser clipboard feedback confirmed copying. Native printer dialogs were not exercised; full print text and dispatch are tested separately.

An incremental generated CSS copy was incomplete once. The preservation audit caught the output mismatch while the source remained unchanged. Final passes were rebuilt from an empty sandbox _site directory; all 49 old assets matched the baseline in both clean builds. Future deployment should use a fresh checkout/build output and retain the preservation check.

Preview: ../callteam-three-preview/dist/CallTeam-Three-Landing-Pages-Sandbox.html. One file contains the three selectable pages, embedded fonts/assets, downloads and eleven placement samples. Do not deploy this review wrapper or its appendix.

## Approved production release

User approved these three landing pages and their previously agreed contextual placements on October 25, 2026. Release is based on 5168527b683c1a8f9e99af130079f8bbe66a9840, preserving the three case studies published in the other chat. Fresh baseline: ../callteam-evergreen-release-baseline-5168527, 279 HTML pages. Expected: 268 unrelated pages identical, eleven hosts with only marked additions, three new pages for 282 total. No bylines on the new landing pages. The updated release audit uses this production baseline; the earlier review results above describe the original sandbox baseline.
