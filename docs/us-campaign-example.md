# US B2B campaign example: sandbox release scope

This is a standalone editorial landing page at `/us-b2b-lead-generation-campaign-example/`. It is an illustrative worked example, not a new calculator, personalized tool, client transcript or reported case study. It follows one AP software offer, US industrial-distribution account and controller through targeting, three sample buyer responses and a completed initial-meeting handoff.

The page uses the existing site layout, shared contact protection, authorship registry, booking destination and orange/ivory/black palette. Its CSS and JavaScript are scoped to this page. Essential examples and all FAQs are rendered in HTML. JavaScript progressively reveals reply controls and clipboard copying; all three replies and the download remain available without it. Dates in the example are explicitly illustrative. No APIs, AI connection, database or new dependency are introduced.

## Approved source scope

New page, `src/_data/usCampaignExample.js`, page-scoped CSS/JS and `src/assets/downloads/us-b2b-campaign-example.txt`, plus release tests and preview packaging. Six existing sources receive insertion-only inbound links:

1. Outbound Sales Library: card after Campaign Preview.
2. US lead-generation comparison: after US-market criteria, before provider profiles.
3. US cold-calling comparison: after meeting-guarantee guidance.
4. Lead-generation service buying guide: after inspecting outreach and calling.
5. 90-day campaign guide: after defining conversation and meeting standards.
6. Appointment Setting: after the handoff example.

The header, footer, article engine, existing tool algorithms, contact protection and shared CSS are unchanged. Existing content and dates are retained. A single new URL is added to the generated sitemap. The resource is discoverable from the library card; it is not registered as a new calculator or injected into every article.

## Verification

Use the existing build and library checks, then `scripts/test-us-campaign-example.js` with the established external QA environment providing jsdom. Run `scripts/check-us-campaign-example-release.js` with the pre-change built-site directory. It checks old pages and assets, the exact six permitted insertions and the single sitemap addition. Complete two rounds after changes are final. These are rendered HTML/DOM checks; they do not constitute real-browser visual QA.

The source baseline tree is `681050392e04846811c5fe440ee032587ad1a9c8`, identical to production commit `c28f5fe0d30475cb90550db453d47ff5496541a5` at sandbox creation. Verify current production again before any later release.

## Preview safety

`scripts/package-us-campaign-example-preview.js` produces a review-only HTML file with local assets embedded, a noindex marker, analytics removed and contact sending disabled. It includes a separate six-placement review appendix that is never part of the production page. Existing resource and booking links open the public site. Never deploy this packaged preview in place of the source build.

The user approved production publication of this page and all six cross-links on October 16, 2026, after reviewing the final copy and sandbox preview. The approved release is limited to the source scope above.

## Completed sandbox checks — October 16, 2026

Two final rounds passed: full production build, outbound-library validation, 25 independent page scenarios and source/output preservation audit. The build also ran the existing ROI, Campaign Preview, meeting-quality, article-engine, authorship and contact-markup checks. The independent page checks covered all three buyer outcomes, repeated switching, exact copy/download parity, clipboard failure and absence, duplicate initialization, analytics failures and local-preview suppression.

Of the 269 original HTML pages, 263 remained byte-identical and six changed only through the approved contextual insertions. All 35 existing non-HTML assets outside the sitemap remained byte-identical. All original sitemap entries and metadata remained intact, with one new URL. The library check validated 138 articles, 100 scripts and 270 total HTML pages.

The packaged preview's three reply paths, clipboard fallback, exact downloadable text, six placement samples, disabled form submission and absent analytics were checked in a DOM environment. Real-browser visual, mobile-rendering and keyboard QA were unavailable and are not claimed. No external form submission, repository push or deployment occurred.

Final copy pass: tightened repeated phrases and illustrative reminders, corrected the third buyer response to match the open question, clarified seller responsibilities and follow-up permission, and shortened the proof and closing copy. Both verification rounds were repeated after these edits, including all 25 scenarios. The public page contains no SEO, LLM or search-engine-impression commentary. The approved six cross-link placements remain unchanged. The preview was refreshed with the final copy and approved for deployment.
