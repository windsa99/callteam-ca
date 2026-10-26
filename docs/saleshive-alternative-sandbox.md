# SalesHive alternative pilot

Sandbox only. Prepared October 26, 2026 from production commit `b87f1f02073665f696a40f463aa6927f3ba6af9d`. No deployment or remote branch update is part of this task.

## Search intent and scope

The new destination is `/compare/saleshive-alternatives/`, as proposed in the supplied CallTeam landing-page strategy. It answers a single-vendor comparison task: whether CallTeam belongs beside SalesHive on the buyer's shortlist. The six existing provider lists retain their broader purpose. No third-party search volume, current rankings or independent performance testing is claimed.

The page uses the existing base layout, Archivo and Inter fonts, shared contact form, header, footer and booking-attribution script. A new stylesheet is scoped to this page. It has a direct answer, six-row comparison, fit guidance for both providers, a sample meeting brief, three linked campaign cases, practical tools, seven questions and visible source links. Landing-page format is retained without an article byline.

Three contextual inbound links are added inside existing SalesHive discussions: the lead-generation agencies article, US cold-calling comparison and appointment-setting comparison. Each article's existing prose, metadata, CTA blocks and other links remain intact.

## Official research checked October 26, 2026

| Primary source | Use |
| --- | --- |
| https://saleshive.com/pricing/ | Plan channels, US/offshore options, included program components, custom quotes and annual-price context. |
| https://saleshive.com/cold-calling | Published calling starting figures and advertised monthly terms. Currency notation is preserved and the written quote is requested. |
| https://saleshive.com/appointment-setting/ | Qualification, calendars, CRM context, confirmation and attendance follow-up. |
| CallTeam `/pricing/` and `/services/outsourced-sdr/` | Current live starting assumptions, scope and delivery responsibilities. Older private sales quotations are not substituted. |
| Three linked CallTeam case-study source pages | Exact campaign outcomes, timeframes and anonymized industry context. |

Buyer-fit assessments and the meeting-brief illustration are editorial analysis. The page does not assert unverified team locations, external recording access, data-ownership terms, a lower like-for-like price or guaranteed results. It does not reproduce competitor self-reported performance totals.

## Search implementation

Google Search Essentials: https://developers.google.com/search/docs/essentials

Google AI-feature guidance: https://developers.google.com/search/docs/appearance/ai-features

The implementation applies a descriptive title, one clear H1, original buying guidance, crawlable contextual links, server-rendered text, canonical and social metadata, sitemap discovery, mobile layout and structured data matching visible content. WebPage, BreadcrumbList and FAQPage data are used without ratings or review markup. FAQ markup does not imply eligibility for a commercial FAQ rich result. No special AI files or ranking promises are added.

## Verification

Run from a clean `_site` directory:

1. `npm run build`.
2. `npm run check:library` and `npm run check:scripts`.
3. `node scripts/verify-saleshive-sandbox.js BASE_SOURCE_CHECKOUT BASE_OUTPUT_DIRECTORY REPORT_JSON`.
4. Package the portable preview with `node scripts/package-saleshive-preview.js ABSOLUTE_PREVIEW_HTML EMBEDDED_FONT_CSS`.
5. Inspect desktop and mobile layout, every main action, FAQs, comparison-table scrolling and the real booking destination. Verify page, button and campaign tracking in the original sandbox page as well as the pre-labelled portable preview.

The preservation check permits only the new page and stylesheet, one sitemap URL and one contextual paragraph in each of the three specified articles. All 279 other HTML pages and 58 existing assets must be identical. Blank links, duplicate IDs, schema/content mismatch and changes to the prior article CTAs must fail validation.

The portable preview embeds its fonts, styles and images; removes analytics; disables contact sending; and retains the original Calendly event with explicit preview tracking. It is review material, not production source. Recheck current production before any later authorized release.

## Completed sandbox checks

Two clean validation rounds passed. All 343 output files and both portable previews matched exactly across builds. Desktop and mobile checks covered five main actions, seven FAQs, ten section jumps and table scrolling. Three tool buttons were clicked, and both booking buttons opened the original Calendly event with the correct page and placement tags. No meetings were created. See `saleshive-alternative-verification.json`.
