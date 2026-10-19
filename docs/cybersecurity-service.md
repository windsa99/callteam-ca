# Cybersecurity service — sandbox handoff

Prepared October 19, 2026. **Sandbox only. No deployment or remote push authorised in this task.**

## Source and purpose

- Production base: `b2c5d80e7eafcb9904d90b323a3c463aa90a31dc` in `windsa99/callteam-ca`.
- Sandbox branch: `sandbox/cybersecurity-service-20261019`.
- New route: `/services/cybersecurity-lead-generation/`.
- SEO title: Cybersecurity Lead Generation Services | CallTeam.
- H1: Put your cybersecurity offer in front of the right buyers.
- Primary intent: hiring CallTeam to manage cybersecurity prospecting and appointment setting.

The existing cybersecurity playbook remains the detailed strategy owner. The script remains the call-writing resource; the manufacturing case study remains the record of a past campaign. This page explains the commercial service, deliverables, qualification, responsibilities, scope and next step. It does not replace any of them.

## New page

The page uses the current base layout, shared navigation, registered Harj Singh byline, existing contact form and booking destination. The new CSS is scoped to `.cs-page` and loaded only on this route. Archivo and Inter, ivory `#f5f4f2`, orange `#ff5a1f` and black follow the recent CallTeam pages.

Content includes:

- The approved headline and direct planning CTA.
- The published manufacturing cybersecurity result: nine qualified appointments in 90 days, three meaningful opportunities. Two required longer-term follow-up and one entered near-term provider-change discussions. No closed-customer claim is added.
- Four illustrative offer/buyer/meeting-purpose examples.
- Four service stages, with named work products and a clear client/CallTeam responsibility split.
- A seven-field sample meeting brief, explicitly illustrative and separate from the published case.
- The existing US$4,000 monthly starting price, campaign-readiness assumptions, additional data/research scope and usual initial three-month engagement.
- Links to Campaign Preview, ROI Calculator, First 60 Days, Meeting Quality Check, Pricing, the playbook, script and case study.
- Eight buyer FAQs generated from the same data as the visible answers.
- Self-canonical, social metadata, sitemap entry, WebPage, Service, Person, BreadcrumbList and FAQPage structured data. Dates use ISO datetimes with timezones.

All substantive content is server-rendered. The page adds no JavaScript, AI dependency, paid service, data collection workflow or new form endpoint. Search visibility and AI citations are not guaranteed.

## Inbound links — exactly six

| Existing page | Placement | Reason |
| --- | --- | --- |
| `/services/` | Separate cybersecurity card after the ten core service paths | Gives service buyers an industry-specific application of managed outbound while preserving the core service grid |
| `/services/b2b-appointment-setting/` | After Who this service is for | Routes security buyers to the more specific scope |
| `/articles/cybersecurity-outbound-sales-playbook/` | After campaign-quality guidance, before the final section | Gives readers who want execution a relevant hiring route |
| `/resources/cold-call-scripts/cybersecurity-risk-assessment-cold-call-script/` | After supporting guides, before Relevant CallTeam services | Connects the assessment script to a team that can run outreach |
| `/case-studies/manufacturing-cybersecurity-appointment-setting/` | After results, before lessons | Connects proven past work to the current service |
| `/resources/outbound-sales-library/` | Execution card below the resource finder, before the final CTA | Makes the service findable alongside the existing learning resources without changing resource counts |

No header, footer or top-level navigation addition. The new page inherits the existing header/footer. No automatic insertion into other articles or future Article Engine output.

The shared script template has one conditional insertion restricted to the exact cybersecurity-assessment slug. The other 99 script outputs must remain byte-identical. The article receives one marked HTML callout; its original words, headings, metadata and booking CTA are preserved.

## Validation and release boundary

Baseline built from production before edits at `../callteam-cybersecurity-service-baseline`.

Run each complete validation pass from this checkout:

```sh
npm run build
npm run check:library
npm run check:scripts
NODE_PATH=/workspace/scratch/bb92714b7ed1/roi-qa-tools/node_modules node scripts/test-cybersecurity-service.js
NODE_PATH=/workspace/scratch/bb92714b7ed1/roi-qa-tools/node_modules node scripts/check-cybersecurity-service-release.js
```

The build includes the Article Engine, contextual CTA policy, ROI model, campaign-preview model, meeting-quality model, article authorship and contact markup gates. The whole-site validation checks internal destinations, anchors, canonicals, structured data, sitemap entries and booking links.

The release audit requires:

- 271 original pages preserved: 265 byte-identical and six changed only by their approved insertions.
- One new page, for 272 total HTML pages.
- All 39 existing non-HTML assets/output files byte-identical, excluding the sitemap.
- All 271 old sitemap entries preserved, with one new URL.
- Original sources recoverable exactly by removing the marked insertions and the one script conditional wrapper.
- No shared CSS, navigation, author profile, article policy, form endpoint or deployment configuration changes.

An early rendering check caught Markdown treating the heading after the new article callout as plain text. A blank line within the insertion fixed it. Both final passes run after that correction.

Browser-control capability is unavailable in this managed environment. Responsive breakpoints, scope, CSS parsing, IDs, anchors and DOM structure are checked, but desktop/mobile browser rendering and real email delivery are not claimed. Existing form server settings are unchanged and not independently retested.

Both final validation passes completed successfully on October 19, after the Markdown correction. Each included 138 article checks, all 100 script pages, all 272 rendered pages, 24,813 script-library internal links, the 27 ROI checks, 25,740 campaign-preview answer combinations and 69 meeting-quality model checks. The strict source/output preservation audit passed in both runs. The packaged preview separately passed two DOM checks for content parity, menu toggling, valid local anchors, six placement samples, blocked form submission and zero script errors.

## Review preview

Package with:

```sh
NODE_PATH=/workspace/scratch/bb92714b7ed1/roi-qa-tools/node_modules node scripts/package-cybersecurity-service-preview.js /absolute/path/CallTeam-Cybersecurity-Service-Sandbox.html
```

The separate HTML artifact embeds local styles and images, removes analytics/canonical indexing, disables contact submission and adds an appendix containing the exact six inserted cards/buttons. The delivered preview also embeds the actual Archivo and Inter font files; an optional third command argument accepts that embedded-font stylesheet. Other resource and booking links open the live site. Never deploy this preview file or its review appendix.

Before any later production release: obtain the user's deployment instruction, check remote main has not advanced, rebase/review narrowly if needed, rerun required gates and deploy only the approved page and six insertions. Do not include unrelated sandbox work.
