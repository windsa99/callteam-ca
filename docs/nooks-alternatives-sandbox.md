# Nooks alternatives sandbox

Built 8 November 2026 for review. Production has not been changed.

Proposed URL: `/resources/nooks-alternatives/`.
Title: **8 Best Nooks Alternatives for Small Sales Teams**.

The page covers Trellus, Apollo, Close, CloudTalk, JustCall, PhoneBurner,
Salesfinity and Orum, with Nooks as the baseline. It includes monthly subscription
examples for one, five and ten callers, eight sourced verdicts, five copyable
buying questions, eight FAQs and two existing Calendly booking CTAs.

## Verification

- Two final `npm run build` runs passed, followed by two `npm run check:library` runs.
- `test:nooks` covers 27 cost cells, 12 clipboard/fallback/mount scenarios,
  nine comparison rows, eight FAQs, 133 links, schema and three incoming pages.
- Browser checks covered desktop and 390/320 px mobile layouts, horizontal cost
  scrolling, the actual clipboard, FAQ disclosures and both article booking links.
- Calendly reached available dates, times and the details form; no booking submitted.
- 58 unique destinations checked: 57 returned 200. PhoneBurner pricing returned
  403 in this environment. Its support source loaded and official indexed pricing
  supplied the stated figures. Recheck its pricing link before publication.
- `git diff --check` passed.

## Release scope

New page and scoped CSS/JS, two data files, one test and build-script wiring.
Three incoming links are prepared in the broad cold-calling-dialler guide,
outbound CRM guide and Outbound Sales Library. Generated scope is only the new
page and two assets, those three existing pages and the sitemap. No other output
changed; no files were removed.

Keep the distinct Nooks switching intent. The broad dialler page owns the category
comparison. Apollo alternatives covers data sources. Quote-only prices remain
unknown. The Apollo team add-on is separate from paid seats and usage.

Before a later authorised publication, fetch the latest production source and
reconcile only these changes, rerun the checks and review price changes.
