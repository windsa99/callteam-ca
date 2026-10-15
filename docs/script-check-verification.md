# Cold Call Script Checker — browser-only sandbox verification

Date: 2026-10-15. Sandbox branch: `sandbox/cold-call-checker-local-20261015`.

## Scope and status

The checker and editable draft builder run entirely in the visitor's browser. The previous API endpoint, server review module, Redis/AI configuration and mocked backend tests have been removed. No credentials, account, model connection, database or paid API is required. No production deployment or remote push was performed.

The prepared route is `/cold-call-script-checker/`. The existing six link placements remain prepared: Resources in the shared header, Outbound Library in the shared footer, and contextual links in Cold Call Script Library, How to Write a B2B Cold Call Script, Cold Call Coaching Scorecard and SDR Training.

The original 100 published scripts are read as a source catalog. They are not rewritten or reclassified in their published pages. Existing Article Engine rules, published article text, dates, URLs, authorship, contact form protection and booking destinations remain intact.

## How the tool works

1. The visitor enters a buyer, offer and opening. Required fields and length boundaries are checked locally.
2. Fixed wording rules count words and sentences, recognise common introductions and response invitations, and flag observable patterns such as repeated sentences, broad sales phrases, placeholders, long uninterrupted text and claims needing evidence.
3. Every quoted finding must be an exact substring of the visitor's text. The tool distinguishes observations, possible wording problems and matters requiring the visitor's judgement. Missing pattern recognition is described cautiously.
4. Resource matching considers the offer's topic, with buyer role used to rank relevant candidates. It explains related examples and falls back to general guidance when a useful match is unavailable. A customer's industry must not be mistaken for the service being sold.
5. The visitor explicitly chooses to keep the original opening, use a published example or start from a general structure. Published examples retain their source wording and attribution; the general structure uses placeholders rather than invented details. Nothing is presented as an AI rewrite.
6. Opening, follow-up question and meeting request are editable. The visitor can copy the review and current draft or download a text file. Replacing an edited draft requires a local confirmation. Editing the original inputs invalidates stale results. Delayed clipboard responses cannot overwrite a newer editing state.

There is no numerical quality score, booking prediction or automatic claim verification. Technical terms are not automatically treated as weak language. No issues detected means only that these checks found no issues. These English rules cannot fully understand every possible script or reliably assess other languages.

## Privacy and isolation

The checker has no fetch, XHR, beacon or backend submission path. Buyer, offer, opening, generated display and draft editing areas are masked from session replay. Existing analytics receive only named interaction events, without draft text. The visitor's work is not saved to an account or attached to a booking.

The offline preview additionally removes analytics, embeds its assets, prevents network connections, disables contact form submission and includes a noindex directive. Other-page and booking links point to the existing live site. Opening those links does not submit the draft.

## Verification commands

Run the build before the rendered-page checks. The DOM suite needs `jsdom` available on the Node module path.

```sh
npm run build
npm run check:library
node scripts/test-script-check-model.js
node scripts/test-script-check-interface.js
```

The model suite checks independently judged inputs, deterministic results, exact quotes, validation boundaries, safe resources and source fidelity across all 100 published templates. The interface suite checks all five real sample inputs, custom input, invalid entries, safe rendering, explicit template selection, editing, replacement protection, copy/download, stale clipboard responses, privacy masks and zero network submission.

A separate rendered-output comparison removes only the six approved link additions and three contextual stylesheet references before comparing every existing page with the pre-checker production baseline. It also compares the original non-HTML assets, except the expected sitemap addition.

## Verification results

Two final executions passed on the frozen browser-only implementation:

| Verification | Pass 1 | Pass 2 |
| --- | --- | --- |
| Full site build, Article Engine, ROI/Campaign Preview, authorship and form guards | Passed | Passed |
| Library validation: 268 HTML pages, 138 articles, 100 scripts; links, anchors, canonical URLs, JSON-LD, sitemap and booking destinations | Passed | Passed |
| Model scenarios: 32 hand-judged inputs plus 11 validation, matching and source-fidelity checks | 43 passed | 43 passed |
| Rendered-page interaction scenarios, including delayed clipboard changes and downloads | 26 passed | 26 passed |
| Original page preservation, after removing only approved link/style additions | 267 pages preserved | 267 pages preserved |
| Original non-HTML assets, apart from the expected sitemap addition | 30 preserved | 30 preserved |

All 100 selectable templates retained their published opening, first question and meeting request. Every quoted finding matched the original input text. No fetch, XHR or beacon requests occurred in the interaction tests. The test harness enforces a completion count and per-test timeout; exit status alone is not treated as a completed run.

An independent manual review used 12 additional novel inputs. It caught and led to fixes for broad-word matching, service-versus-customer-industry confusion, guarantee nouns, written performance claims and common meeting phrasings. The final tests retain regressions for the discovered matching issues. No buyer-only template fallback remains.

The standalone preview passed its own offline checks: all five samples produce computed results, a custom review works, the original opening can be retained, edits are protected from accidental replacement, copy fallback contains the current edits, input changes invalidate stale results, the general structure uses explicit placeholders, all four contextual inserts are present, and contact forms cannot submit. It made zero network requests.

Observed sample results:

- Broad SaaS pitch: quotes “industry-leading” as broad wording and asks the visitor to review the immediate demo request.
- Clear shipment-tracking opening: no forced wording criticism.
- SAML/access-management opening: recognises the question without treating technical terminology as weak language.
- Finance question without a question mark: recognises the response invitation.
- Ceramic-kiln offer: checks observable wording and uses general resources when no useful published match is available.

## Limits and release boundary

The available environment supports rendered-DOM and functional testing, but not a permitted visual browser. Desktop/mobile appearance has not been browser-verified here. The standalone preview is provided for that review.

These tests cover the stated scenarios and identified edge cases; they do not prove understanding of every possible script. The page discloses the same limits. Public deployment requires a separate user instruction. There is no remaining AI or rate-limiter setup gate.
