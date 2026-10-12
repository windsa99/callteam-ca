const campaignCtas = {
  "ai-voice-agent-cold-call-script": {
    id: "cta-ai-voice-campaign",
    label: "Preview your outbound campaign",
    text: "Explore a human-led outbound campaign for your offer, with buyer roles, qualification questions and relevant resources."
  },
  "cybersecurity-risk-assessment-cold-call-script": {
    id: "cta-cybersecurity-script-campaign",
    label: "Preview your cybersecurity campaign",
    text: "Turn your cybersecurity offer and target buyer into a campaign starting point, with qualification questions and matched resources."
  }
};

function campaignCtaFor(data) {
  const slug = data.resource && data.resource.slug;
  return Object.prototype.hasOwnProperty.call(campaignCtas, slug) ? campaignCtas[slug] : null;
}

module.exports = {
  eleventyComputed: {
    contextToolCta: campaignCtaFor,
    pageStyles: (data) => campaignCtaFor(data) ? ["/assets/css/contextual-tools.css"] : []
  }
};
