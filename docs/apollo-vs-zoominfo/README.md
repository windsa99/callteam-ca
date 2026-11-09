# Apollo vs ZoomInfo sandbox build — 9 November 2026

Status: final checks passed and publication authorised. The release is prepared for the existing callteam-ca production Git integration. No indexing submission.
Base production commit: 0c18ad086676b1d61da962167bffbd8ffaefc03a.
Proposed route: /resources/apollo-vs-zoominfo/.

## Scope

New buying comparison (2,148 words after the final editorial pass), data module, scoped CSS, matching Article/WebPage/Breadcrumb/FAQ schema and rendered-page checks. Shared typography, orange colours, FAQ presentation, copy behaviour and booking attribution are reused without changes.

Four incoming links are prepared: the existing two-provider paragraph in B2B lead databases, ZoomInfo's review in Apollo alternatives, Apollo's review in ZoomInfo alternatives, and one Outbound Sales Library card. The broad database and alternatives pages retain their existing search intent. This page owns the direct two-provider decision: price, useful phone data, credits, exports and team fit.

Outgoing links point to those three buying guides, mobile/company calling guidance, the existing 25-contact test, CRM/dialler/email comparisons, calling-list template, free scripts, script checker, campaign planner, relevant case study, cold calling service and the existing Calendly event.

## Current pricing evidence

Apollo's visible pricing cards were reviewed with annual billing selected and then Monthly billing selected on 9 November 2026: https://www.apollo.io/pricing . Basic $49 annual-equivalent / $65 monthly; Professional $79 / $99; Organization $119 annual-equivalent with three-seat minimum. The Monthly view still labels Organization Annual Only, so the page offers no month-to-month Organization price. Annual credits per seat: 30,000 / 48,000 / 72,000. Monthly Basic/Professional: 2,500 / 4,000. Advanced dialler add-on $119 per team/month annual or $149 monthly. The annual five-Professional-seat example plus annual add-on is $6,168 before extra usage.

Primary Apollo rules:
- https://knowledge.apollo.io/hc/en-us/articles/9527776320781-Review-Credit-Usage-in-Apollo
- https://knowledge.apollo.io/hc/en-us/articles/4738396786701-Request-Contact-Data-in-Apollo
- https://knowledge.apollo.io/hc/en-us/articles/4677130104333-Customize-and-Manage-Your-Apollo-Plan
- https://www.apollo.io/product/dialer

ZoomInfo's sales-platform pricing is quote-based; no estimated starting dollar figure is invented. Its pricing FAQ describes export credits while its sales FAQ promotes platform access without per-credit constraints. The page tells buyers to obtain their package's exact terms.
- https://www.zoominfo.com/pricing
- https://www.zoominfo.com/products/sales
- https://www.zoominfo.com/features/contact-company-search
- November 4, 2026 filing, page 39: https://zoominfotechnologiesinc.gcs-web.com/static-files/6c350fee-34b0-40f1-a15f-c81353e40350#page=39

The November filing supersedes the June planning reference: the hybrid annual-platform/prepaid-credit model was introduced in Q3 alongside other arrangements. It describes typical noncancelable one-to-three-year subscription terms. The article attributes this to the filing and does not assert identical terms for every buyer.

## Validation

Two full npm build passes, two rendered-page audits, and two Outbound Sales Library validations passed. The site audit covers 330 HTML pages, 138 articles and 110 scripts. New-page checks cover 113 link instances, 50 unique HTTP destinations, local anchors, assets, metadata, one H1, canonical, sitemap, nine team-cost cells, eight matching FAQs, five quote questions, two main booking CTAs and four incoming links. Both HTTP audits returned success for all 50 destinations.

Browser review: 320/390/768/1024-pixel frames plus full desktop; no page or table-cell overflow. All eight FAQs opened by click and closed with Enter. Pricing and quotes remain visible without JavaScript; FAQ disclosures still open; copy button is appropriately hidden without JavaScript. Copy button returns its success message in the rendered page and standalone preview. The browser tool's virtual clipboard does not expose the real clipboard, so an end-to-end paste assertion was unavailable; the existing shared-copy automated tests cover clipboard access, denial, fallback and mounting, and the new audit checks the exact rendered quote text.

Both main booking buttons open the correct Calendly event. The final CTA was followed through selecting an available date/time to the details form. No personal details submitted and no meeting created.

The compiled scope comparison confirms only the new page/CSS, four intended referring pages and sitemap changed; no existing output was removed. No shared CSS, scripts, layout or unrelated page source was edited.

Review copy excludes vendor-use disclosures, fabricated testing claims, generic benchmark disclaimers, repeated long sentences and the user's banned stock phrases. Static HTML contains the substantive comparisons and prices; JavaScript only enhances copying and sticky navigation offsets. No special AI schema or search-rank guarantee.

Standalone preview: CallTeam-Apollo-vs-ZoomInfo-Preview.html. It embeds page styles, images and the copy script; internal links point to live existing pages, preview robots are noindex/nofollow and analytics scripts are removed. Production source retains normal canonical/indexing settings for eventual publication.

Before publication, rebase on then-current production, re-run the build and link checks, and deploy this bounded source set only.

## Final editorial and colour pass

Publication authorised by the user on 9 November 2026 after the sandbox review. Replaced the staccato hero with “Compare Apollo and ZoomInfo on pricing, phone data and credit limits to decide which fits your sales team.” Rewrote fragmented comparison rows, repeated phone descriptions, canned verdict wording, quote heading, selected FAQs and the final CTA. Retained every source, link, price and resource.

The two named heading styles originally used #A83910. They now inherit the shared --lp-accent colour, #FF5A1F, matching the other comparison guides. Browser computed styles confirm rgb(255,90,31), Archivo heading font and #FF9168 on dark-panel headings. Small decision labels use the normal black text colour. Shared CSS and all other pages' styles remain unchanged.

Final npm build and library validation passed after the copy changes. The dedicated comparison validation is now included in the production build. Vercel project inspection is unavailable through the connected hosting account; the existing repository's Vercel commit status confirms its callteam-ca integration. Release verification uses that exact commit status plus direct production HTML/CSS checks and the public browser.

Final release checks: full build, 330-page library validation, all 50 HTTP destinations, all eight browser FAQ open/keyboard-close checks, copy success and 320px layout passed. Generated output remains limited to the new page/CSS, four referring pages and sitemap.
