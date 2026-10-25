# Evergreen service pages: sandbox handoff

Prepared October 25, 2026. Production has not been changed.

## Deployable scope

- /services/small-business-b2b-lead-generation/
- /services/professional-services-lead-generation/
- Shared new template, content data and isolated stylesheet.
- Two audience cards immediately after the existing Services catalogue and existing campaign links, before the diagnostic section. Core service categories retain their existing URLs.
- One contextual paragraph added to the small business guide and professional services playbook.
- One contextual link added before the final CTA in the professional services case study.
- Existing sitemap template automatically includes the two new URLs.

Both landing pages link to pricing, relevant campaign evidence, supporting services, company and sales-experience pages. Each main page contains two booking buttons. The existing shared header, footer and contact form remain in use.

## Validation

Two full build and library-validation rounds passed; a final build also passed after adding visible market coverage. Article guards, ROI model, campaign model, meeting-quality model, article authorship, rendered article CTAs and contact form markup checks passed through npm run build. npm run check:library checked 276 HTML pages, all internal links, anchors, canonicals, JSON-LD, sitemap entries and booking links.

Targeted final checks: one H1 per new page, two main booking links, six FAQs with matching JSON-LD, valid schema JSON, no duplicate IDs, no unresolved template markup, no duplicated paragraphs and no broken main-content local links. Compare against the initial build: only Services, the two named guides, the professional services case study and sitemap change among existing output files; 318 other output files remain identical before preview-only transformations.

Browser checks: both desktop layouts reviewed; FAQ interaction checked on both pages; mobile iframe review at 390px with no horizontal overflow (375px available after scrollbar). Preview navigation was rechecked after a sandbox asset-serving truncation was resolved by splitting preview-only shared CSS. This workaround is not included in production source. No contact message or booking was submitted. External scheduling completion and real lead conversion were not tested.

## Deployment

Apply only the provided source patch to the CallTeam production checkout after reviewing current branch changes. This patch is based on 50de428 and excludes the earlier starter-kit work already in that baseline. Rebuild in the production checkout; use the repository's normal release procedure. Do not upload the sandbox _site directory or preview HTML files as production output.

Production source uses indexable metadata and self-referencing live canonicals. Preview exports use noindex and disable contact submission. Runtime sandbox noindex, CSS split and review wrapper are excluded from the patch. No claims about actual ranking positions or traffic outcomes have been made.

## Brand correction

Matched against the live outsourced SDR service page: shared --orange (#FF5A1F), --black (#111111), --white (#FFFFFF) and --grey-bg (#F5F4F2) variables; Archivo 900 headings (54px desktop hero); Inter body copy and global btn-primary buttons (15px, black text on orange, matching that service template). Removed burnt orange, cream paper colours and rotated cards. White hero, black summary panels, grey supporting sections and black closing CTA now follow the existing service template. Copy, SEO intent and cross-link placements are unchanged.

## Final panel adjustment

The live SDR hero uses #111111. The two new hero summary panels use the existing #1B1B1B panel shade, with #242424 inner cards, white titles and #DDDDDD secondary text. Shared brand tokens and all other pages remain unchanged.
