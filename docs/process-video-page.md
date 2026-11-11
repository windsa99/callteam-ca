# CallTeam process video page

Sandbox implementation on 11 November 2026. Based on main commit `f8f823685a2bb6416e045c18aa2a4f2a5882ecf2`. Approved for production publication on 11 November 2026. An owner-private review Site is available separately.

## Scope

- New watch page: `/videos/callteam-process-demo/`.
- Reuses `layouts/base.njk`, shared navigation, header, footer, contact form, Archivo/Inter fonts, orange buttons and existing Calendly attribution.
- New page-scoped CSS/JS and three video assets only. Existing templates and pages are unchanged.
- Prominent native MP4 player with no autoplay, six chapters and deep links, captions, full HTML transcript, a useful handoff example, evidence links and booking actions.
- Metadata: canonical, social image, Organization/WebSite references, WebPage, VideoObject, Clip and BreadcrumbList. The first-publication timestamp is set for the approved 11 November launch.
- The watch page's intent is branded process demonstration. The US example, 60-day campaign guide and appointment-setting service retain their separate purposes.

## Sources reviewed

The live homepage, shared source/templates, existing US campaign example and first-60-days guide. The 15 latest resource pages reviewed for content structure and presentation:

1. Apollo vs Clay
2. Outreach vs Salesloft
3. Gong alternatives
4. Instantly vs Smartlead
5. Orum alternatives
6. Salesforce alternatives
7. Apollo vs ZoomInfo
8. Best cold email software
9. PhantomBuster alternatives
10. Best LinkedIn automation tools
11. Auto dialer vs predictive dialer
12. Best CRM for small businesses
13. HubSpot alternatives
14. Nooks alternatives
15. LinkedIn Sales Navigator vs Apollo

## Validation

- Full `npm run build` passes. `npm run check:library` passes for 138 articles, 110 scripts and 338 HTML pages.
- Existing rendered output matches the pre-change baseline except the sitemap's new watch-page entry.
- New page has one H1, valid JSON-LD, existing internal destinations and video assets. Header, footer and contact form are byte-identical to the current shared output.
- Browser checks: native video plays and reports 77.5 seconds; chapter selection seeks; transcript opens. Phone-width iframe uses a 375px content viewport with no horizontal overflow; embedded-file preview playback also works.
- The contact form has not been submitted. The downloadable preview disables it and removes analytics, while the production source keeps the exact shared form and existing analytics integration.
- Final prelaunch review: shared header, footer and contact form match the homepage byte for byte. Body paragraphs contain no duplicate sentences, contrast framing or sentences longer than 25 words. The verbatim video transcript is preserved.
- Player fix: the play overlay now honours its hidden state during playback. Analytics uses unique played ranges; a full 77.5-second play records completion, while watching only 57–77.5 seconds records 25% without completion. Both paths verified in Chrome.
- Progress events use Clarity: `ct_process_video_start`, `_25`, `_50`, `_75`, `_complete` and `_chapter`. Confirm reporting after launch. No completed booking was created for testing.

## Before publishing

1. Confirm page/content approval and refresh against current production main to preserve concurrent work.
2. Set `videoUploadDate` to the actual first-publication ISO timestamp. Validate the completed VideoObject.
3. Deploy only the page and its five CSS/JS/media asset files. The normal build automatically includes the page in the sitemap.
4. Confirm public MP4/poster/caption accessibility and test playback, chapter URL, mobile layout and booking destination on the published page.
5. Add homepage thumbnail and the single footer link as the next separately reviewable website change; then selected service/resource links.
6. Distribute through existing Substack and relevant Notion templates. The MP4 is hosted directly; no YouTube or Medium account is needed. Keep Product Hunt for the usable Chrome extension and its separate demo.

The updated launch roadmap is the existing `CallTeam-Video-Launch-Package.md`. The preview HTML contains the actual MP4 for review and is noindex. Do not deploy the preview HTML or mobile QA wrapper; deploy the source template and assets.
