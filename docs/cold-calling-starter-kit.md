# Cold calling starter kit - sandbox handoff

Prepared October 25, 2026. Sandbox only. The user has not authorised deployment. No remote branch update, Vercel deployment or Sites publication is part of this task.

## Release scope

Base: `19c7e01cc0dcd8e5e03a1acde9f81a8d1e572cf2` in `windsa99/callteam-ca`.
Branch: `sandbox/cold-calling-starter-kit-20261025`.
Route: `/b2b-cold-calling-starter-kit/`.
Title: Free B2B Cold Calling Starter Kit | CallTeam.
Headline: Get your next B2B cold calling campaign ready.

The page owns a download task: complete the working documents for a B2B calling campaign. The 100-script hub remains the script collection, the writing guide teaches script construction, and the checker reviews an opening. The new page references these resources without copying their full content. About and the Outbound Sales Library are unchanged.

## Files and content

- Editable XLSX with Campaign Brief (nine fields), Script Worksheet (eight prompts), Call Tracker and Worked Example.
- Tracker: 200 blank prepared rows, eleven columns, seven outcome choices, four summary formulas, table filtering and frozen header rows. One row represents one call attempt. Totals count selected outcome entries, not unique prospects. The user must extend the summary ranges when adding rows.
- Three-page PDF quick-start guide with a fictional ERP example.
- Plain eleven-column CSV without formulas or dropdowns.
- ZIP containing XLSX, PDF, CSV and README. Downloaded files stay within the visitor's own systems.
- No email gate, AI API, account system, server processing or additional form endpoint.
- Three curated resource paths: ERP/finance, managed IT services, logistics/operations.
- Links to existing Campaign Preview, Script Checker, ROI Calculator, scripts, playbooks and appointment-setting service.
- A published FinTech campaign case study, a linked Harj Singh byline and two planning-call links.

The completed ERP campaign is fictional and clearly labelled in the page, workbook and PDF. It illustrates the documents and does not represent client results. The separate FinTech case study reports 15 qualified demos in 90 days and three closed deals. No claim is made that the kit produced or predicts those results.

## Three contextual links, sandbox only

| Existing page | Placement |
| --- | --- |
| `/resources/cold-call-scripts/` | After how to use the library, before the calling-system guides |
| `/articles/how-to-write-a-b2b-cold-call-script/` | Before the final script checklist |
| `/services/sdr-training/` | A small link in the scripts and talk-tracks section |

No header/footer addition. All 100 individual script pages are unchanged. The original words and metadata of the three host pages remain intact; only marked insertions are added in the sandbox.

## Search and discovery

The title, H1, description and URL focus on a free B2B cold calling starter kit. The page explains the deliverable, audience, file formats, practical use and next step in rendered HTML. Files are directly accessible and the new route enters the sitemap.

WebPage, CreativeWork, SpreadsheetDigitalDocument, DigitalDocument, Person, BreadcrumbList and FAQPage describe the actual page and downloads. Visible FAQ answers and schema share one data source. Dates use ISO datetimes with timezones. The static resource is not marked as a software application and no ratings or reviews are invented. These measures support crawlability and accurate interpretation; rankings and AI citations are not promised.

CSS is scoped to `.sk-page`, using the current CallTeam Archivo/Inter typography, ivory, orange and black. The page introduces no JavaScript. The normal shared header, footer and protected contact form are inherited.

## Preservation baseline

`../callteam-starter-kit-baseline` contains the production build before edits: 273 HTML pages and 42 other output files excluding the sitemap. The release audit requires:

- 270 old pages byte-identical.
- Three pages changed only by their marked insertions, with exact original source recoverable after removing those blocks.
- All 42 existing non-HTML files byte-identical.
- All 273 old sitemap entries preserved, with one new URL.
- One new page and six new assets, for 274 total HTML pages.
- No shared templates, CSS, Article Engine, About, library overview, pricing, existing tools, form configuration or dependency-manifest changes.

The Markdown host renders its original headings correctly. An early audit difference was caused only by the audit removing a separator newline from rendered HTML; the stripping routine now distinguishes source and rendered whitespace. No existing article prose or headings were changed.

## Validation commands

Run from this checkout, once per full pass:

```sh
npm run build
npm run check:library
npm run check:scripts
NODE_PATH=/tmp/callteam-starter-kit-webqa/node_modules node scripts/test-starter-kit-page.js
python3 scripts/test-starter-kit-files.py
NODE_PATH=/tmp/callteam-starter-kit-webqa/node_modules node scripts/check-starter-kit-release.js
```

Workbook authoring and reimport checks use the Codex primary Node runtime with `@oai/artifact-tool`. The single builder is linked into `/tmp/callteam-starter-kit-20261025` beside a symlink to the primary runtime's node_modules and invoked with `--preserve-symlinks-main`. Do not install artifact-tool into the production repository or change its package manifest. Reimport checks modify only the in-memory test workbook and never export over the deliverable.

The tracker scenarios cover blank input, no answer, repeated calls using one Contact ID, a stop request and row 210. Export checks inspect the four formulas, dropdown range, frozen headers, blank input areas, lack of macros/external workbook links, PDF page count, CSV headers and matching ZIP members.

All four workbook sheets and all three PDF pages were rendered and visually inspected. The bundled pdftoppm override produced distorted text, so the saved PDF was checked with system Poppler 24.02.0; the actual PDF text and layout are readable. Native Excel and Google Sheets are not exercised. The page asks Google Sheets users to check dropdowns and counts after importing.

## Preview and browser review

The self-contained review HTML embeds the real fonts, images and downloads, removes analytics/canonical indexing, disables sending and adds an appendix containing the three proposed links. It is a review artifact only, not a deployable source page. The normal page and its substantive content are available without JavaScript.

Managed Sites preview is internal QA. Desktop and a phone-width iframe were inspected in the cloud browser. The desktop viewport was 1348px and the phone document 375px after its scrollbar. Both had matching page and viewport widths, with the expected desktop/two-column and phone/one-column layouts. FAQ open/close and mobile menu open/close succeeded twice. Browser download-completion events timed out for embedded and normal HTTP links; this does not verify a completed browser download. File contents, ZIP extraction, download targets and preview-embedded bytes are checked separately, and direct download files accompany the review.

Before any later release: obtain the user's deployment instruction, check remote main, reconcile only this scope if it advanced, rerun the required checks, then deploy only the approved page/assets and three insertions.

## Final results

Both full validation passes completed successfully on October 25, 2026. Each included the production build gates, whole-site library and script-library validation, page metadata/content/link checks, native file-structure and ZIP checks, strict source/output preservation and reimport/recalculation of the delivered XLSX across five scenarios. The preview separately passed two complete checks for copy parity, embedded download bytes, images/fonts, anchors, three placement samples, native FAQ/menu behaviour, blocked contact submission and zero application script errors in JSDOM.

The browser also confirmed a 753px tablet document with no horizontal overflow and a two-column hero. The phone's completed-example anchor settled at the intended 110px scroll offset. Desktop, tablet and phone checks use actual browser rendering; the smaller documents were rendered in fixed-width same-origin iframes. This is responsive layout testing, not native mobile-device or mobile-browser testing.

The cloud browser logged extension metadata errors from its own chrome-extension content script; no application error was returned in the inspected logs. Its download-completion event remained unconfirmed. The prepared preview and direct ZIP are delivered separately so review does not depend on that event bridge. The desktop review screenshot is `CallTeam-Starter-Kit-Desktop-1792963862459.jpg` in the shared scratch directory. No browser screenshot is saved to Library.
