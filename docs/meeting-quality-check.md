# Meeting Quality Check: sandbox handoff

Date: 2026-10-15. Status: built for review only. No GitHub push, Vercel deployment or production mutation.

## Scope

New route: `/b2b-meeting-quality-check/`. Based on the CallTeam release whose production commit is `90ebd02f29539edbce8e0873444a1cf70c52546c`; isolated local source baseline is `2b18ff4` with the same release content.

The page calculates actual booking progression. The existing ROI calculator remains the forecasting tool; the existing campaign preview remains the planning tool. The Article Engine's policy, validators, templates, historical exemptions, existing article bodies and contact form configuration are unchanged. The only edits inside existing content are the six approved contextual insertions and four references to the existing contextual CTA stylesheet. Shared header and footer receive one link each. `package.json` adds the model checks to the build.

## Visitor experience

Four counts describe the same group: booked, held, held meetings accepted by sales, and accepted meetings that created an opportunity. The last input counts each meeting once even if it produces several deals. A timing selector distinguishes completed outcomes from a campaign still in progress or unknown timing. Untracked stages can remain blank or be marked explicitly.

The default form is empty. The visible illustration is 8 booked, 6 held, 4 accepted and 2 opportunity-producing meetings, without a monthly volume assumption. Three optional examples cover a small completed group, pending outcomes and missing acceptance tracking. Every example passes through the same model as typed entries.

Results show four counts, four transparent rates, a matched investigation checklist, a relevant existing guide, context notes and a booking link. Visitors can copy or download the current report. Changing any input invalidates old results and exports. The calculator runs locally without an AI API, database, account or paid backend.

## Math and interpretation

- Held rate = held / booked × 100.
- Sales acceptance rate = accepted / held × 100.
- Held meeting-to-opportunity rate = opportunity-producing meetings / held × 100.
- Booked meeting-to-opportunity rate = opportunity-producing meetings / booked × 100.
- Percentages display at up to one decimal place. Null or zero denominators return “Not available.” An explicit zero numerator with a valid denominator returns 0%.
- All known later counts must be no greater than all known earlier counts. Inputs must be whole numbers from 0 to 1,000,000. Blank is unknown, never an invented zero.
- The model identifies the largest observed count difference. Ties remain ties, pending gaps stay provisional, and equal progression does not manufacture a problem.
- Booked minus held is never automatically a no-show count. Causes and responsibility cannot be inferred from totals.
- The 8/6/4/2 illustration yields 75%, 66.7%, 33.3% and 25%, with three equal gaps of two.

## Search and credibility

The initial generated HTML includes the H1, explanatory copy, four definitions, counting conventions, worked formulas, stage-specific investigation advice, eight FAQs, author byline, relevant case-study links and booking CTAs. These are readable without completing the calculator. Structured data includes WebPage, WebApplication, BreadcrumbList and the registered Person, alongside existing site Organization/WebSite data. Canonical, social metadata and valid ISO datetimes are included. The sitemap adds only the new URL; existing entries and dates are preserved. No hidden SEO copy, invented campaign results, universal benchmarks, duplicate result URLs or fabricated reviews are used.

## Prepared cross-links

| Location | Placement / ID |
| --- | --- |
| Header Resources | Meeting Quality Check |
| Footer Outbound Library | Meeting Quality Check |
| Cold Calling Metrics | `cta-metrics-meeting-check`, after stage definitions and formulas |
| Outbound Appointment Setting | `cta-outbound-meeting-check`, after measuring beyond bookings |
| Qualified Appointment Standard | `cta-qualified-meeting-check`, beside post-booking measurement |
| SDR-to-Sales Handoff | `cta-handoff-meeting-check`, after the feedback loop |
| CRM Integration | `cta-crm-meeting-check`, after outcome reporting |
| Appointment Setting service | `cta-appointment-meeting-check`, after the Qualified Meeting Standard |

Contextual label: “Check Your Meeting Results.” Existing site ivory, black and orange palette and existing CTA component are reused. No shared stylesheet was edited.

## Privacy and preview

Input, results and copy fallback areas are masked from Clarity session replay. The calculator has no fetch, XHR, beacon, form submission or storage path. Existing analytics receive fixed event names only, without entered counts. Bookings do not receive the visitor's results automatically.

The self-contained review HTML embeds its assets, removes analytics, disables contact form sending, blocks external connections and has noindex/nofollow. Navigation and booking links to other pages open the live site. Its review-only section displays the six exact contextual inserts. This preview is separate from the production source and must not be published as the real page.

## Verification

Run against the pre-change production build:

```sh
npm run build
npm run check:library
node scripts/test-meeting-quality-model.js
NODE_PATH=/workspace/scratch/bb92714b7ed1/roi-qa-tools/node_modules node scripts/test-meeting-quality-interface.js
NODE_PATH=/workspace/scratch/bb92714b7ed1/roi-qa-tools/node_modules node scripts/check-meeting-quality-release.js /workspace/scratch/bb92714b7ed1/meeting-quality-baseline
```

The model suite has 69 checks including 1,820 valid small-group combinations. The interface suite has 31 scenarios covering entry, invalid input, missing and pending outcomes, examples, repeated checks, clearing, keyboard operation, copy/download fallback, async clipboard races, privacy and preview behavior. Completion requires the explicit final completion marker, not only a zero exit code.

The site comparison verifies 268 original HTML pages after excluding only the approved inserts and stylesheet references, plus 32 identical original non-HTML assets. All 138 articles, 100 scripts and 269 total sandbox HTML pages pass the library validator. The existing ROI and campaign model suites remain part of the build, as do article authorship, contextual-tool and form guards.

Visual browser QA was unavailable because the supported managed-browser capability was not present. Responsive CSS, accessible markup and DOM behavior were reviewed; real desktop/mobile rendering remains an explicit review limitation. The interactive preview is provided for the user's visual approval. No ranking, indexing, citation or booking outcome is guaranteed by these checks.

## Release boundary

User approval for this sandbox does not yet authorize production deployment. Before a later release, compare against the current remote main and carry forward only this page, its assets/tests, and the approved links. Do not replace newer production work or publish the offline preview artifact. After explicit deployment approval, run the same checks on the final release tree and verify production responses and the deployed assets.

## Final recorded result

Both full build/library/preservation rounds passed. Two guarded interface reruns each completed all 31 scenarios with exit code 0 and the explicit final marker. The harness now rejects an early exit even when the process would otherwise exit 0; a forced-early-exit check confirmed the guard. The earlier incomplete log was not accepted as a completed run. No product code changed during this verification correction.

Review artifact: `callteam-meeting-quality-check.html`; all assets embedded, three examples and a custom calculation verified twice. Production remains untouched.
