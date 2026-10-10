# Article publishing

For newly created articles in `src/articles/`, include this quoted front-matter field:

```yaml
editorialProfile: "flexible-v1"
```

This profile changes only two Article Engine requirements:

- There is no minimum body word count. The existing 3,200-word maximum remains.
- The body must contain 4–14 H2 sections, instead of 7–14.

Keep 5–8 FAQs and all other existing checks, including metadata, sources, related links, takeaway cards, paragraph rules and repeated-sentence checks. Editorial review must still confirm a complete answer to the reader's question, practical guidance, supported claims and a useful next step. Four sections are a minimum, not a target for every article.

Do not add this profile to previously published articles unless the user explicitly requests that migration. Articles without the field retain their original 1,000–3,200-word and 7–14-section rules. Do not change existing article content, URLs or templates to adopt the new profile.

For changes to the profile or its validator, run `node scripts/test-article-editorial-profiles.js` and `npm run check:articles`. Build the site and run `npm run check:library`. Compare existing generated output against the pre-change build when the work is intended to leave published pages unchanged.

## Article authorship

Every CallTeam article must declare a registered author using a quoted `authorKey`. For Harj Singh's articles, include `authorKey: "harjSingh"` in the front matter and obtain his editorial approval before publication. The user has explicitly authorised this byline on all 138 existing articles. Future articles must also include the field; the Article Engine rejects missing or unknown author keys.

The article template displays a linked "Written by Harj Singh" byline and Person author data, with CallTeam retained as publisher. The author profile is `/authors/harj-singh/`. Keep existing article content, dates, URLs and other metadata unchanged when adding the byline. Do not describe Harj as founder or host, add unrelated projects, company names or LinkedIn links to this profile, or imply that the editorial approach is a patented or independently validated invention.

For authorship changes, run `node scripts/test-article-editorial-profiles.js`, `npm run check:articles`, build the site, then run `node scripts/test-article-authorship.js` and `npm run check:library`. Verify that any rendered differences are limited to the authorised author information.

The production build runs article validation before rendering and authorship verification afterwards. Missing or unknown author keys, broken author profiles, or mismatched visible and structured author data must block the build. Keep the author profile's AI explanation brief and focused on research support.

Keep the author profile independent of the About page. Link to it through article bylines; do not add a profile link to About or shared site navigation without explicit user instruction.
