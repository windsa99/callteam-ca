const sections = {
  scripts: {
    id: "scripts",
    label: "Cold-Call Scripts",
    shortLabel: "Scripts",
    url: "/resources/cold-call-scripts/",
    description: "Sixty complete B2B call scripts with ICP guidance, buyer signals, qualification questions, objection responses and campaign notes."
  },
  industries: {
    id: "industries",
    label: "Industry Outbound Playbooks",
    shortLabel: "Industry playbooks",
    url: "/resources/outbound-playbooks/industries/",
    description: "Market-specific plays for software, financial services, healthcare, logistics, professional services and complex B2B offers."
  },
  buyers: {
    id: "buyers",
    label: "Buyer Playbooks",
    shortLabel: "Buyer playbooks",
    url: "/resources/outbound-playbooks/buyers/",
    description: "Practical guidance for reaching CFOs, CIOs, CISOs, operations leaders, procurement, technical evaluators and buying committees."
  },
  objections: {
    id: "objections",
    label: "Cold-Call Objection Database",
    shortLabel: "Objection database",
    url: "/articles/cold-call-objection-handling/",
    description: "Responses for common resistance, plus deeper guides for timing, budget, incumbents, access, trust and change risk."
  },
  strategy: {
    id: "strategy",
    label: "Qualification and Campaign Strategy",
    shortLabel: "Campaign strategy",
    url: "/resources/outbound-campaign-strategy/",
    description: "Build the ICP, calling system, qualification standard, appointment process, metrics, compliance and 90-day operating plan."
  }
};

const industrySlugs = [
  "3pl-prospect-ecommerce-brands-existing-fulfillment",
  "b2b-appointment-setting-saas-companies",
  "b2b-lead-generation-software-companies",
  "b2b-saas-outbound-sales-playbook",
  "cloud-migration-discovery-questions",
  "companies-outgrown-accounting-software",
  "cybersecurity-outbound-sales-playbook",
  "displace-incumbent-erp-without-attacking-vendor",
  "erp-modernization-business-case-cfos",
  "fintech-outbound-sales-playbook",
  "healthcare-technology-outbound-sales-playbook",
  "hr-technology-outbound-sales-playbook",
  "how-event-software-companies-can-find-accounts-with-a-real-buying-window",
  "how-to-sell-ai-recruiting-software-without-triggering-the-wrong-objection",
  "how-to-sell-outsourced-accounting-without-leading-with-cheap-labor",
  "how-to-sell-outsourced-legal-support-without-blurring-the-line-with-legal-advice",
  "how-to-sell-private-credit-software-to-investment-and-operations-teams",
  "logistics-win-accounts-existing-carriers",
  "logistics-sales-prospecting-playbook",
  "manufacturing-outbound-sales-playbook",
  "ai-software-outbound-sales-playbook",
  "commercial-real-estate-outbound-sales-playbook",
  "professional-services-outbound-sales-playbook",
  "security-guard-backup-vendor-coverage-opportunities",
  "sell-ai-voice-agents-with-human-escalation",
  "sell-booking-software-tour-operators-attractions",
  "sell-cloud-migration-to-cios",
  "sell-corporate-training-business-outcomes",
  "sell-cybersecurity-assessment-existing-msp",
  "sell-engineering-software-medical-device-quality",
  "sell-field-inspection-software-operations-quality",
  "sell-frontline-workforce-software-existing-erp",
  "sell-identity-protection-credit-unions",
  "sell-income-verification-software-lending-leaders",
  "sell-industrial-alarm-software-operations-leaders",
  "sell-itsm-software-existing-service-desk",
  "sell-ot-security-without-alienating-plant-operations",
  "sell-outsourced-pmo-existing-project-tools",
  "sell-parcel-lockers-property-managers",
  "sell-payment-processing-differentiate",
  "sell-software-development-regulated-healthcare"
];

const buyerSlugs = [
  "ceo-outbound-sales-playbook",
  "ciso-outbound-sales-playbook",
  "cloud-migration-discovery-questions",
  "cold-call-operations-leaders",
  "erp-modernization-business-case-cfos",
  "executive-discovery-questions-for-cfos-cios-and-coos",
  "get-meetings-with-cfos-b2b",
  "get-meetings-with-cios-it-leaders",
  "how-to-hand-off-qualified-appointment-from-sdr-to-sales",
  "how-to-sell-private-credit-software-to-investment-and-operations-teams",
  "map-b2b-buying-committee",
  "multi-thread-b2b-deal-finance-it-operations",
  "negative-qualification-questions-that-improve-b2b-meetings",
  "reach-enterprise-software-buyers-before-renewal",
  "reach-procurement-before-buying-process",
  "sell-cloud-migration-to-cios",
  "sell-corporate-training-business-outcomes",
  "sell-engineering-software-medical-device-quality",
  "sell-field-inspection-software-operations-quality",
  "sell-identity-protection-credit-unions",
  "sell-income-verification-software-lending-leaders",
  "sell-industrial-alarm-software-operations-leaders",
  "sell-itsm-software-existing-service-desk",
  "sell-ot-security-without-alienating-plant-operations",
  "technical-discovery-questions-for-complex-b2b-software-sales"
];

const objectionSlugs = [
  "cold-call-objection-handling",
  "cold-call-prospects-existing-vendor",
  "create-urgency-b2b-sales",
  "how-to-answer-how-did-you-get-my-number-b2b-cold-call",
  "how-to-get-past-b2b-gatekeeper-without-sounding-deceptive",
  "how-to-handle-bad-timing-without-killing-b2b-opportunity",
  "how-to-handle-price-questions-before-sales-discovery-is-complete",
  "integration-concerns-software-sales-call",
  "not-looking-to-add-anything-cold-call-objection",
  "not-the-right-person-cold-call-objection",
  "no-budget-objection-b2b-cold-call",
  "not-a-priority-sales-objection",
  "sell-against-status-quo-b2b",
  "sell-automation-manual-process-still-works",
  "sell-complex-software-implementation",
  "sell-outsourced-services-vs-hiring",
  "sell-regulated-technology-compliance-claims",
  "sell-software-switching-too-disruptive",
  "send-me-information-sales-objection",
  "we-tried-outsourcing-before-cold-call-objection",
  "were-not-interested-cold-call-objection"
];

const trackSets = {
  industries: new Set(industrySlugs),
  buyers: new Set(buyerSlugs),
  objections: new Set(objectionSlugs)
};

function primarySectionFor(slug) {
  if (trackSets.objections.has(slug)) return sections.objections;
  if (trackSets.buyers.has(slug)) return sections.buyers;
  if (trackSets.industries.has(slug)) return sections.industries;
  return sections.strategy;
}

function hasTrack(slug, track) {
  if (track === "strategy") {
    return primarySectionFor(slug).id === "strategy";
  }
  return Boolean(trackSets[track] && trackSets[track].has(slug));
}

function industryGroupFor(slug) {
  if (/fintech|credit|income|payment|private-credit|accounting|finance|lending/.test(slug)) return "financial-services";
  if (/health|medical|regulated/.test(slug)) return "healthcare-regulated";
  if (/3pl|logistics|manufacturing|parcel|field|industrial|plant|operations/.test(slug)) return "operations-logistics";
  if (/legal|training|security-guard|pmo/.test(slug)) return "professional-services";
  if (/tourism|event|ecommerce|workforce|recruiting/.test(slug)) return "commerce-workforce";
  return "technology-software";
}

function buyerGroupFor(slug) {
  if (/cfo|finance|private-credit|income|payment/.test(slug)) return "finance";
  if (/cio|ciso|cloud|software|technical|itsm|security/.test(slug)) return "technology";
  if (/operations|industrial|field|plant|logistics/.test(slug)) return "operations";
  if (/hr|recruiting|training|workforce/.test(slug)) return "people";
  if (/procurement|renewal|buying-committee|multi-thread/.test(slug)) return "committee";
  if (/handoff|qualification|appointment|sales-leader/.test(slug)) return "sales-leadership";
  return "executive";
}

function objectionGroupFor(slug) {
  if (/send-me|not-interested|busy|information/.test(slug)) return "brush-offs";
  if (/budget|priority|timing|price|urgency/.test(slug)) return "timing-budget";
  if (/vendor|provider|contract|status-quo|manual|hiring|outsourc|not-looking-to-add/.test(slug)) return "incumbent-status-quo";
  if (/risk|switch|implementation|integration|compliance/.test(slug)) return "change-risk";
  if (/number|gatekeeper|right-person/.test(slug)) return "access-trust";
  return "core-method";
}

function strategyGroupFor(slug) {
  if (/compliance/.test(slug)) return "compliance";
  if (/appointment|meeting|handoff|qualified/.test(slug)) return "appointment-quality";
  if (/lead-generation|prospect|target|account|buyer-signal/.test(slug)) return "targeting-lead-generation";
  if (/metric|coaching|cost|sdr-vs|tools|company-comparison|companies/.test(slug)) return "management-buying";
  if (/cold-call|outbound|voicemail|script|discovery/.test(slug)) return "calling-conversations";
  return "campaign-planning";
}

function groupFor(slug, track) {
  if (track === "industries") return industryGroupFor(slug);
  if (track === "buyers") return buyerGroupFor(slug);
  if (track === "objections") return objectionGroupFor(slug);
  return strategyGroupFor(slug);
}

module.exports = {
  sections,
  industrySlugs,
  buyerSlugs,
  objectionSlugs,
  primarySectionFor,
  hasTrack,
  groupFor
};
