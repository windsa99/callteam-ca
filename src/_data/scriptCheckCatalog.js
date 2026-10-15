const scripts = require('./callScripts');
const articleLinks = require('./scriptArticleLinks');

// Read-only projection of published resources. Never alter the source scripts.
module.exports = scripts.map(script => ({
  slug: script.slug,
  title: script.title,
  url: `/resources/cold-call-scripts/${script.slug}/`,
  category: script.category,
  industry: script.industry,
  buyers: [...script.buyers],
  terms: [script.category, script.subindustry, script.serviceCategory, script.primaryKeyword, script.icp, script.scenario].filter(Boolean).join(' '),
  // Keep the service separate from buyer industries and campaign scenarios.
  serviceTerms: [script.serviceCategory, script.primaryKeyword, script.title].filter(Boolean).join(' '),
  opening: script.opening,
  questions: [...script.questions],
  cta: script.cta,
  personalization: [...script.personalization],
  guides: (articleLinks[script.slug] || []).map(link => ({title: link.title, url: link.url, description: link.description}))
}));
