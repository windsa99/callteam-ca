# Tool buttons for future CallTeam articles

The editor chooses the useful next step while writing. The build checks that it was included correctly. Existing published articles and standalone pages are not changed by this policy.

| Reader's task | `toolCtaIntent` | Button |
| --- | --- | --- |
| Plan targeting, messaging, scripts or execution | `campaign` | See How We’d Run Your Campaign |
| Assess costs, budget, customer economics or returns | `roi` | Calculate Your Campaign ROI |
| Work through both campaign planning and economics | `both` | One of each in separate relevant sections |

Place a button after useful advice in its corresponding H2 section. Introduce it with a concise sentence connecting the reader's problem to the tool. Keep the article's final Book a Free Call invitation. Do not promise campaign results or force both buttons into an unrelated article.

## Campaign example

Add these fields to the article's existing front matter. Retain the other required fields, including the author and editorial profile:

```yaml
editorialProfile: "flexible-v1"
authorKey: "harjSingh"
toolCtaIntent: "campaign"
pageStyles: ["/assets/css/contextual-tools.css"]
contextualTools:
  campaign:
    id: "cta-market-selection-campaign"
    accessibleName: "Preview your target-market campaign"
    copy: "Put that target market into a working starting point. Choose your offer and buyers to see how CallTeam would approach the campaign."
    href: "/b2b-outbound-campaign-planner/"
    label: "See How We’d Run Your Campaign"
```

Insert the existing component after substantive prose within the relevant H2 section:

```njk
{% set contextToolCta = contextualTools.campaign %}{% include "components/contextual-tool-cta.njk" %}
```

## ROI example

For an economics article use `toolCtaIntent: "roi"`, the same stylesheet, and this configuration:

```yaml
contextualTools:
  roi:
    id: "cta-campaign-budget-roi"
    accessibleName: "Calculate your campaign economics"
    copy: "Test your campaign budget against your customer value and sales assumptions. See the estimated return and break-even point."
    href: "/b2b-lead-generation-roi-calculator/"
    label: "Calculate Your Campaign ROI"
```

Place this after the cost or return discussion:

```njk
{% set contextToolCta = contextualTools.roi %}{% include "components/contextual-tool-cta.njk" %}
```

For `both`, keep both configuration entries and place each component once in its own relevant section. Use different IDs and introductory copy. Section choice is an editorial decision; the engine does not infer relevance from a keyword count.

## Existing-page protection

The frozen legacy manifest records the 138 articles published before this rule. An article is exempt only when its source path and permalink match that record. New files cannot opt out by omitting the editorial profile, copying an old date, or reusing an existing URL. New articles stay under the rule on later edits.

The existing article layout, reusable button component, shared CSS, header, footer, booking links and form code are unchanged. The policy adds publishing checks; it does not append buttons to every rendered page.

Preview fixtures live under `tests/fixtures/article-tool-ctas/`, outside the website input directory. Build them only in an isolated QA copy. Never move test articles into the production source tree or publish the preview build.
