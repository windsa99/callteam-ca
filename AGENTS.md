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
