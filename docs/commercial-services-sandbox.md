# First two commercial service pages

Sandbox work for Task 3 of the agreed CallTeam roadmap. No production deployment or remote branch update is authorised in this task.

Production source checked against `52637cc506dd35cbb3383e0581e14a9f634cf2cc`. Its tree is `cf71d097f138a88caf681bbfb882a1a5c26d92d9`, identical to the retained local source at `4997a9cca6f4bd598382eedbf965da6e5503d8c8`. Recheck current production before any later release.

## Intent map and overlap decision

| Destination | Visitor's decision | Role retained or added |
| --- | --- | --- |
| `/` | Who is CallTeam and what does it do? | Existing brand and outbound introduction. No edits. |
| `/services/` | Which part of CallTeam's offering fits? | Existing service selection hub. One new lead-generation card; the existing calling card now points to the proposed calling service. Counts updated from ten to eleven main paths. |
| `/articles/b2b-lead-generation-services/` | How should I choose a provider? | Existing educational buying guide. Its selection-focused title is retained. One contextual link to the managed service. |
| `/services/b2b-lead-generation/` | What would I hire CallTeam to deliver? | New managed outbound buying page: responsibilities, outputs, handoff, fit, evidence and investment. |
| `/articles/b2b-cold-calling-strategy/` | How do I design a calling campaign? | Existing operating guide. One contextual link for readers who want a managed team. |
| `/services/b2b-cold-calling/` | How would CallTeam run the phone campaign? | New execution detail: preparation, calls, callbacks, referrals, sample dialogue, qualification and reporting. |

The cold-calling page proceeds because it answers operational buying questions in greater depth than the homepage. This is an editorial distinction, not a guarantee that Google will select a particular URL for every query. The homepage, global navigation, shared header/footer and existing guide titles remain unchanged. No new location or near-identical keyword-variant pages are added.

## Evidence used

The supplied [CallTeam Landing Page Strategy](https://chatgpt.com/library?file_id=libfile_9200b9568f84819197779bac3923ea70&account_id=personal), dated October 26, 2026, identifies 205 impressions for the exact B2B lead-generation-services query and 165 for B2B cold-calling-services in its three-month export. It maps the former to a guide and the latter to the homepage. Those are historical report observations, not new search-volume estimates or current ranking measurements. Broader cluster counts in the report are not added to these figures.

Research also inspected current provider pages to assess commercial buying questions, including https://leadsatscale.com/b2b-cold-calling-services and the B2B definition at https://www.sap.com/resources/b2b-lead-generation. No competitor prices, benchmarks or performance claims are copied into the new service pages.

Google primary guidance applied:

- https://developers.google.com/search/docs/essentials
- https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- https://developers.google.com/search/docs/crawling-indexing/links-crawlable

Implementation uses original service-specific detail, descriptive titles/headings, readable server-rendered text, useful contextual links, canonical/social metadata, responsive layouts and sitemap discovery. Visible FAQs and their JSON-LD share one data source. WebPage, Service and BreadcrumbList data identify CallTeam and each service without ratings or Article markup. Commercial FAQ markup does not promise a Google FAQ rich result. No special AI files or ranking guarantees are introduced.

## Facts and public scope

Pricing follows the current `/pricing/` source and https://www.callteam.ca/pricing/: campaign-ready managed programs from US$4,000/month, usual initial three-month engagement, with fresh research/data and extra resources scoped as required. Older private sales quotations are not used to rewrite public terms.

The published SaaS, FinTech payments and manufacturing cybersecurity cases supply the exact outcomes and periods shown. The 500,000 calls, 1,000 sellers coached, 150 companies and Fortune 100/500 background are labelled as combined professional experience behind CallTeam. Landing pages have no article byline. Illustrative handoff and dialogue examples are explicitly distinguished from client records and quotations.

## Draft inbound links

| Source | Proposed destination | Placement |
| --- | --- | --- |
| Services hub | Both service pages | New lead-generation card; existing calling card retargeted. |
| Lead-generation buying guide | Lead-generation service | Campaign-provider explanation. |
| Outbound lead-generation guide | Lead-generation service | After the campaign-brief discussion. |
| Cold-calling strategy guide | Cold-calling service | Introduction distinguishing strategy from execution. |
| Cold-call script library | Cold-calling service | Hero paragraph for visitors who need a calling team. |

The two pages link to each other at the relevant scope decision. They connect readers to pricing, established case studies, appropriate free tools and related service options. Four contextual paragraphs are added across the existing resources; original content, metadata, bylines and CTA blocks are preserved.

## Verification and preview

Build from a clean `_site`, run `npm run build`, `npm run check:library` and `npm run check:scripts`, then `node scripts/verify-commercial-services.js BASE_SOURCE BASE_OUTPUT REPORT_JSON`. Repeat from a second clean output directory and compare all 346 production output files. Exclude any local `__review__` wrapper from packaging and production comparisons.

The custom check enforces the exact five-page cross-link diff, preservation of 278 unrelated HTML pages and 59 existing assets, two new sitemap records, metadata/schema consistency, nonempty buttons, functional destinations, seven FAQs per page and 18 attribution cases. Copy checks cover exact duplicated long sentences in the editorial body; intentionally shared evidence cards are excluded.

Package the self-contained preview with `scripts/package-commercial-preview.js OUTPUT_HTML EMBEDDED_FONT_CSS`; verify it with `scripts/check-commercial-preview.js OUTPUT_HTML`. It embeds both pages and their assets, disables contact sending, removes analytics, labels review bookings and switches between the two new pages locally. Actual source-page attribution is checked separately using the unchanged production script. No meetings or contact messages are created for this review.

## Completed sandbox result

Two clean builds passed, with all 346 production output files matching exactly. The final portable preview was packaged and validated twice with identical bytes. Two desktop/mobile rounds covered eight viewport states, all ten main buttons, fourteen FAQ answers and 48 section-link activations. Six tool buttons and all four page booking buttons were activated in the actual sandbox; the original Calendly calendar and page/button/campaign tags were verified. All six inbound links and both directions of the reciprocal page links reached their intended pages. No meetings or contact messages were created.

[Review both service pages](https://chatgpt.com/library?file_id=libfile_2ab231f4820c8191b98e33d98bd90d79&account_id=personal). Use the page and viewport controls. The review file is self-contained; production remains unchanged. See `commercial-services-verification.json` for recorded checks.
