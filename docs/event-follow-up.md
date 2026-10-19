# Trade show lead follow-up — sandbox handoff

Prepared October 19, 2026. Sandbox only; no production deployment or remote push in this task.

## Purpose and scope

- Production base: `aadb7eaac4fba97a359605a7eca7d85350a0a087` in `windsa99/callteam-ca`.
- Local branch: `sandbox/trade-show-follow-up-20261019`.
- Route: `/services/trade-show-lead-follow-up/`.
- Title: Trade Show Lead Follow-Up Services | CallTeam.
- H1: Turn your trade-show conversations into qualified sales meetings.

This service page owns follow-up for a recent event cohort: recorded conversations, explicit requests and badge-only records. Lead Reactivation continues to own dormant contacts. The inbound follow-up guide continues to own a steady flow of new website enquiries. Links explain those distinctions. This reduces content overlap; future search performance still needs monitoring.

The page uses CallTeam's base layout, shared navigation, registered Harj Singh byline, current booking destination and existing contact form. The route-specific stylesheet uses Archivo, Inter, ivory, orange and black. All substantive content is rendered without JavaScript. No shared CSS, form, navigation or Article Engine changes are included.

## What visitors receive

- Three contact situations with different calling approaches and possible next steps.
- Seven inputs for preparing an event list and a free, ungated CSV template with 17 columns. The template contains headers only; visitors complete it in their own systems.
- An illustrative two-week workflow, subject to actual scoping. This is neither a fixed package nor a volume promise.
- An opening based on confirmed event notes, and an illustrative five-field sales handoff.
- Six reporting outcomes, with attempts, conversations, meetings booked and meetings held kept distinct.
- The client/CallTeam responsibility split, scope factors, eight buyer FAQs and three booking CTAs.
- Useful links to Meeting Quality Check, First 60 Days, Pricing and the published case-study hub.

The existing cold-outbound ROI model and Campaign Preview are still inherited in navigation. They are not forced into the main event workflow because this page covers a different lead source and does not quote a recurring cold-outbound price as an event package.

No invented event client outcomes, financial returns, fixed start SLA, meeting guarantee or multilingual coverage are claimed. Example records are labelled. Pricing and duration come from the scoped proposal. Search visibility and AI citations cannot be promised.

## Five contextual inbound links

| Page | Placement |
| --- | --- |
| `/services/` | Event follow-up card after the core service paths and existing cybersecurity card |
| `/services/lead-reactivation/` | After the lead-source cards, routing recent event contacts to the focused service |
| `/services/b2b-appointment-setting/` | A small contextual link inside the existing CRM and lead reactivation use-case card |
| `/articles/outsourced-inbound-lead-follow-up/` | After the source guidance, before the speed-to-lead section |
| `/resources/outbound-sales-library/` | Resource/service card below the finder and cybersecurity card, before the final CTA |

All five are marked insertions. Removing the markers and their contents restores the original source exactly. No extra header/footer entry or automatic insertion into other articles is included. The new page inherits the current header/footer.

## Discoverability

The page has a descriptive title and metadata, a self-canonical, internal links, a sitemap entry, linked author and WebPage, Service, Person, BreadcrumbList and FAQPage structured data. FAQ answers and schema share the same data source. Schema dates use ISO datetimes with timezones. The page answers what the service does, who it is for, what inputs it needs, how follow-up works and how scope is agreed. It does not include visitor-facing search-engine or LLM commentary.

## Validation

Baseline: `../callteam-trade-show-baseline`, built from production before changes.

Run each full pass:

```sh
npm run build
npm run check:library
npm run check:scripts
NODE_PATH=/workspace/scratch/bb92714b7ed1/roi-qa-tools/node_modules node scripts/test-event-follow-up.js
NODE_PATH=/workspace/scratch/bb92714b7ed1/roi-qa-tools/node_modules node scripts/check-event-follow-up-release.js
```

The release audit requires 272 existing HTML pages preserved: 267 byte-identical and five with only the contextual insertions. All 40 existing non-HTML outputs must remain identical, excluding the sitemap. Existing sitemap entries and metadata stay unchanged; one URL is added. New production output consists of the page, its CSS and the CSV download. The preceding cybersecurity release remains unchanged.

The page checks cover links/assets/anchors, metadata, schema/visible FAQ agreement, author, distinct contact situations, example labels, download integrity, repeated headings/paragraphs, booking destinations and scoped CSS. The full build also runs the existing Article Engine, calculator, campaign preview, meeting quality, authorship and contact-markup gates. Library and script-library checks run separately.

Browser control is unavailable in this managed environment. DOM/CSS checks and responsive rules are verified, but desktop/mobile visual rendering is not claimed. Existing form server settings and real email delivery are unchanged and not independently retested.

Both full passes completed successfully on October 19, 2026. Each checked 138 articles, 100 script pages, all 273 rendered pages and 24,900 script-library internal links. Existing model tests passed: 27 ROI checks, 31 campaign-preview checks plus 25,740 answer combinations, and 69 meeting-quality checks. The new page validated 74 local links/assets, eight matching FAQs, the 17-column download and all content/metadata assertions. The source/output preservation audit passed twice with the counts above.

The standalone preview separately passed two DOM checks: exact page-copy parity, embedded fonts/images, identical CSV download, five placement samples, eight FAQ toggles, mobile-menu checkbox behaviour, blocked form submission and zero script errors. These are functional DOM checks, not rendered visual tests.

## Review artifact

Package with:

```sh
NODE_PATH=/workspace/scratch/bb92714b7ed1/roi-qa-tools/node_modules node scripts/package-event-follow-up-preview.js /absolute/path/CallTeam-Event-Follow-Up-Sandbox.html /absolute/path/fonts-embedded.css
```

The standalone preview embeds styles, images, fonts and the CSV download. It removes analytics and canonical indexing, blocks contact submission, and adds an appendix showing the five inserted elements. Other resource/booking links open the live site. The appendix is for review only and must never be deployed.

Any later release requires the user's deployment instruction, a fresh remote-main check, narrow reconciliation if main advanced, and the validation gates again. Do not include unrelated work.
