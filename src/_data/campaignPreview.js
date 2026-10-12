// Curated preview matches. Existing articles and scripts remain their source of truth.
const fs = require('fs');
const path = require('path');
const scripts = require('./callScripts');
const scriptGuides = require('./scriptArticleLinks');

const option = (value, label) => ({ value, label });
const options = {
  offer: [
    option('', 'Choose what you sell'),
    option('saas', 'B2B SaaS / business software'),
    option('cybersecurity', 'Cybersecurity assessments'),
    option('ot-security', 'Industrial / OT cybersecurity'),
    option('cloud-migration', 'Cloud migration services'),
    option('erp', 'ERP modernisation'),
    option('customer-support', 'AI customer support software'),
    option('hr-tech', 'Recruiting / HR software'),
    option('payments', 'Merchant payment processing'),
    option('healthcare-tech', 'Healthcare software development'),
    option('logistics', '3PL / ecommerce fulfilment'),
    option('accounting', 'Outsourced accounting'),
    option('maintenance-software', 'Maintenance / CMMS software'),
    option('other', 'Another B2B product or service')
  ],
  industry: [
    option('any', 'Help me choose a target industry'),
    option('technology', 'Software and technology'),
    option('manufacturing', 'Manufacturing and industrial'),
    option('finance', 'Financial services'),
    option('healthcare', 'Healthcare and life sciences'),
    option('commerce', 'Retail and ecommerce'),
    option('logistics', 'Logistics and distribution'),
    option('services', 'Professional and business services'),
    option('property', 'Property and facilities'),
    option('hospitality', 'Hospitality and travel'),
    option('other', 'Another industry')
  ],
  buyer: [
    option('auto', 'Recommend the right buyer'),
    option('executive', 'Owners and chief executives'),
    option('finance', 'Finance leaders (CFO)'),
    option('technology', 'IT and technology leaders (CIO / CTO)'),
    option('security', 'Security leaders (CISO)'),
    option('operations', 'Operations and plant leaders'),
    option('people', 'HR and recruiting leaders'),
    option('revenue', 'Sales and revenue leaders'),
    option('customer', 'Customer service and CX leaders')
  ],
  region: [
    option('north-america', 'United States and Canada'),
    option('canada', 'Canada'),
    option('us', 'United States'),
    option('uk', 'United Kingdom'),
    option('other', 'Another English-speaking market')
  ],
  goal: [
    option('meetings', 'Book qualified sales meetings'),
    option('demos', 'Book better product demos'),
    option('reactivate', 'Restart conversations with old leads'),
    option('market-entry', 'Test a new market')
  ]
};

function article(slug, type = 'Guide') {
  const file = path.join(__dirname, '..', 'articles', `${slug}.md`);
  const raw = fs.readFileSync(file, 'utf8');
  const title = raw.match(/^title:\s*"(.+)"\s*$/m);
  const description = raw.match(/^description:\s*"(.+)"\s*$/m);
  if (!title || !description) throw new Error(`Preview source needs title and description: ${slug}`);
  return { title: title[1], url: `/articles/${slug}/`, description: description[1], type };
}

const buyerProfiles = {
  workflow: { titles: ['Business workflow owner', 'Department head', 'Technical evaluator', 'Budget owner'], focus: 'Identify the business function your product serves, who owns that workflow and who evaluates technical and commercial fit.', question: 'Which function uses the product, who owns the workflow and who needs to assess technical and commercial fit?', guide: article('map-b2b-buying-committee', 'Buyer guide') },
  executive: { titles: ['Owner', 'Chief Executive Officer'], focus: 'Connect the next conversation to a business priority, accountable owner and decision.', question: 'Which business decision would make this worth the leadership team’s time?', guide: article('ceo-outbound-sales-playbook', 'Buyer guide') },
  finance: { titles: ['Chief Financial Officer', 'Controller', 'VP Finance'], focus: 'Start with the financial decision, reporting confidence, cost of the current process and the evidence Finance needs.', question: 'What evidence would Finance need to judge the cost, value and timing of a change?', guide: article('get-meetings-with-cfos-b2b', 'Buyer guide') },
  technology: { titles: ['Chief Information Officer', 'Chief Technology Officer', 'IT Director'], focus: 'Confirm the current environment, technical owner, dependencies and evaluation boundary before offering a solution.', question: 'Who would need to assess integration, security, implementation effort and ongoing ownership?', guide: article('get-meetings-with-cios-it-leaders', 'Buyer guide') },
  security: { titles: ['Chief Information Security Officer', 'Information Security Director'], focus: 'Use an evidence-led security question and agree what an assessment can establish.', question: 'Who owns the security review and what evidence would justify a scoped follow-up?', guide: article('ciso-outbound-sales-playbook', 'Buyer guide') },
  operations: { titles: ['Chief Operating Officer', 'Operations Director', 'Plant Manager'], focus: 'Follow one operating workflow, its owner, its practical constraint and the effect on delivery.', question: 'Which operating constraint would the next conversation need to address, and who owns it?', guide: article('cold-call-operations-leaders', 'Buyer guide') },
  people: { titles: ['Chief Human Resources Officer', 'Talent Acquisition Director'], focus: 'Connect the offer to a hiring or employee workflow, its owner and the decision that needs to improve.', question: 'Who owns the people workflow, its systems and the measure of a useful change?', guide: article('chro-outbound-sales-playbook', 'Buyer guide') },
  revenue: { titles: ['Chief Revenue Officer', 'VP Sales', 'Revenue Operations Leader'], focus: 'Connect the conversation to sales execution, the affected team and a measurable buying decision.', question: 'Where does the sales process lose useful opportunities, and what would a review need to establish?', guide: article('revenue-leader-outbound-sales-playbook', 'Buyer guide') },
  customer: { titles: ['Chief Customer Officer', 'VP Customer Experience', 'Head of Customer Support'], focus: 'Identify the service workflow, customer impact, escalation path and person responsible for improvement.', question: 'Which customer or agent workflow should a focused review address first?', guide: article('cold-call-operations-leaders', 'Buyer guide') }
};

const industryProfiles = {
  technology: { criteria: 'Separate the product team, internal IT environment and customer-facing workflow before building a technology account list.', guide: article('b2b-saas-outbound-sales-playbook', 'Industry guide') },
  manufacturing: { criteria: 'Confirm the production environment, plant or site scope and operating owner; a manufacturing label alone is insufficient.', guide: article('manufacturing-outbound-sales-playbook', 'Industry guide') },
  finance: { criteria: 'Separate banks, credit unions, lenders, insurers and other financial businesses; verify the actual workflow and decision route.', guide: article('fintech-outbound-sales-playbook', 'Industry guide') },
  healthcare: { criteria: 'Identify the provider, life-sciences or health technology segment and the clinical or administrative workflow the offer supports.', guide: article('healthcare-technology-outbound-sales-playbook', 'Industry guide') },
  commerce: { criteria: 'Confirm sales channels, locations or order volume and the operating process your offer can improve.', guide: article('retail-technology-outbound-sales-playbook', 'Industry guide') },
  logistics: { criteria: 'Separate carriers, warehouses, distributors and shippers; match the service to the operating problem and geography.', guide: article('logistics-sales-prospecting-playbook', 'Industry guide') },
  services: { criteria: 'Choose one service-business model, its recurring workflow and the decision-maker accountable for that work.', guide: article('professional-services-outbound-sales-playbook', 'Industry guide') },
  property: { criteria: 'Define the property type, site or portfolio scope and the owner of the building or tenant workflow.', guide: article('commercial-real-estate-outbound-sales-playbook', 'Industry guide') },
  hospitality: { criteria: 'Separate hotels, restaurants, attractions and travel operators; select the exact operating model before outreach.', guide: article('hospitality-technology-outbound-sales-playbook', 'Industry guide') }
};

const routeDefinitions = [
  { id: 'saas', script: 'b2b-saas-cold-call-script', title: 'A use-case-led SaaS campaign', industry: '*', buyers: ['executive', 'technology', 'operations', 'revenue'], primaryBuyer: 'workflow', recommendedBuyerTitles: ['Business workflow owner', 'Department head', 'Technical evaluator', 'Budget owner'], productDemo: true, criteria: 'Target organisations with the workflow your product actually supports, a responsible buyer and a viable implementation path. Confirm company size from your own customer evidence.', angle: 'Lead with one workflow the buyer recognises. Earn a product demonstration by establishing what they need to see.', scope: 'The SaaS route is a starting framework. Your product’s exact workflow and proof still need to be filled in.' },
  { id: 'cybersecurity', script: 'cybersecurity-risk-assessment-cold-call-script', title: 'An independent security assessment campaign', industry: '*', buyers: ['security', 'technology'], primaryBuyer: 'security', criteria: 'Organisations with internal IT or an MSP that may need an independent security review; verify the assessment scope and business reason.', angle: 'Ask how existing controls are independently validated. Respect the current provider and use evidence to earn a focused scoping call.', plan: { listFocus: 'Define the assessment services, account size, technology scope and named security owner your team can support.', callAround: 'Research a publicly evidenced audit, insurance review, infrastructure change or assessment cycle, then confirm its relevance in conversation.', meetingReady: 'Confirm the assessment question, environment boundary, accountable owner and reason for a scoping call.', handoff: 'Pass on scope, current provider, existing testing, requested evidence, stakeholders and timing without collecting sensitive system details.' } },
  { id: 'ot-security', script: 'ot-security-cold-call-script-for-manufacturers', title: 'An OT security campaign built around plant ownership', industry: ['manufacturing'], buyers: ['security', 'technology', 'operations'], primaryBuyer: 'security', criteria: 'Manufacturers with connected plant systems, industrial remote access and a need to coordinate IT, OT and production ownership.', angle: 'Open with who owns the plant-security response. Connect security visibility to production constraints and a scoped technical conversation.' },
  { id: 'cloud-migration', script: 'cloud-migration-cold-call-script-for-cios', title: 'A cloud migration campaign with a clear decision window', industry: '*', buyers: ['technology'], primaryBuyer: 'technology', criteria: 'Organisations with a meaningful infrastructure estate and a specific workload, renewal or modernisation decision your service can support.', angle: 'Find the workload decision behind the cloud discussion. Qualify cost, resilience, dependencies and ownership before proposing a migration conversation.', plan: { listFocus: 'Select organisations with relevant on-premise or virtualised infrastructure and a named technology owner.', callAround: 'Look for a verified infrastructure review, contract window, resilience initiative or modernisation project.', meetingReady: 'Identify the workload decision, current planning stage, business driver and people responsible for risk and delivery.', handoff: 'Document the driver, workload scope, dependencies, decision team, constraints and agreed purpose for technical discovery.' } },
  { id: 'erp', script: 'erp-modernization-cold-call-script-for-cfos', title: 'An ERP campaign centred on a business decision', industry: ['manufacturing', 'logistics', 'services', 'commerce'], buyers: ['finance', 'operations', 'technology'], primaryBuyer: 'finance', productDemo: true, criteria: 'Manufacturers, distributors and multi-entity service businesses whose reporting or operating workflows may justify an ERP review.', angle: 'Start with the decision the current reporting or workflow cannot support. Establish a business case before discussing system replacement.', plan: { listFocus: 'Choose the business model, entity complexity, operating workflow and finance owner that fit your ERP offer.', callAround: 'Research expansion, acquisition, system lifecycle or reporting changes as questions to verify.', meetingReady: 'Confirm the affected decision, current ERP, manual work, sponsor and reason for reviewing options.', handoff: 'Record workflow, entities, current tools, reporting needs, finance and IT owners, constraints and evaluation timing.' } },
  { id: 'customer-support', script: 'ai-customer-support-software-cold-call-script', title: 'A customer support software campaign with a defined use case', industry: ['technology', 'commerce', 'finance', 'healthcare', 'services', 'hospitality'], buyers: ['customer', 'operations', 'technology'], primaryBuyer: 'customer', productDemo: true, criteria: 'Organisations with meaningful support volume, identifiable service ownership and a support workflow your product can handle.', angle: 'Pick a support task, show where people stay involved and qualify the systems a useful demonstration must respect.' },
  { id: 'hr-tech', script: 'ai-recruiting-software-cold-call-script', title: 'A recruiting software campaign focused on hiring work', industry: '*', buyers: ['people'], primaryBuyer: 'people', productDemo: true, criteria: 'Employers or staffing organisations with recurring hiring, an identifiable recruiting team and a specific screening, scheduling or follow-up workflow.', angle: 'Lead with a recruiting bottleneck. Confirm the ATS, hiring volume and human-review boundary before proposing a product conversation.', scope: 'This route covers recruiting workflow software. Other HR products need a separate product-specific match.' },
  { id: 'payments', script: 'payment-processing-cold-call-script', title: 'A merchant payments campaign with a practical review offer', industry: ['commerce', 'hospitality', 'services'], buyers: ['executive', 'finance', 'operations'], primaryBuyer: 'finance', criteria: 'Merchants with meaningful card volume and a payment setup your service supports; distinguish ecommerce, in-person and recurring payments.', angle: 'Offer a practical review of fees, funding, support and equipment. Confirm the merchant’s reason to compare before asking for a meeting.' },
  { id: 'healthcare-tech', script: 'healthcare-software-modernization-cold-call-script', title: 'A healthcare software delivery campaign', industry: ['healthcare'], buyers: ['technology'], primaryBuyer: 'technology', criteria: 'Healthcare, healthtech or life-sciences organisations with an identifiable software project, modernisation need or engineering capacity gap.', angle: 'Ask which software project is blocked and why. Qualify the delivery owner, technical constraints and next project decision.', scope: 'This route covers software development and modernisation services for healthcare. It does not assume clinical buying or medical-device fit.' },
  { id: 'logistics', script: '3pl-fulfillment-cold-call-script', title: 'A fulfilment campaign built around service fit', industry: ['commerce'], buyers: ['operations'], primaryBuyer: 'operations', criteria: 'Established ecommerce and consumer brands with recurring orders, suitable products and volume that your fulfilment operation can serve.', angle: 'Respect the current fulfilment setup. Ask where accuracy, peaks or service create a reason to review backup capacity or alternatives.' },
  { id: 'accounting', script: 'outsourced-accounting-services-cold-call-script', title: 'An accounting services campaign with a defined scope', industry: '*', buyers: ['finance', 'operations', 'executive'], primaryBuyer: 'finance', criteria: 'Growing or multi-entity businesses with a finance owner and enough accounting complexity to justify external capacity.', angle: 'Connect the offer to close, reporting or accounting capacity. Establish work scope, ownership and controls before promising support.' },
  { id: 'maintenance-software', script: 'cmms-cold-call-script-maintenance-plant-leaders', title: 'A maintenance software campaign built around work execution', industry: ['manufacturing', 'logistics', 'property'], buyers: ['operations'], primaryBuyer: 'operations', productDemo: true, criteria: 'Asset-intensive plants, facilities or logistics sites with maintenance ownership and a defined work-order, planning or visibility problem.', angle: 'Follow the path from maintenance request to completed work. Qualify the plant constraint and current system before offering a CMMS demonstration.' }
];

const routes = routeDefinitions.map((route) => {
  const source = scripts.find((entry) => entry.slug === route.script);
  if (!source) throw new Error(`Missing preview script: ${route.script}`);
  const guides = (scriptGuides[source.slug] || []).map((guide) => ({ ...guide, type: 'Guide' }));
  return {
    ...route,
    opening: source.opening,
    questions: source.questions.slice(0, 3),
    objection: { ...source.objections[0] },
    buyerTitles: [...source.buyers],
    plan: route.plan || { ...source.campaignPlan },
    resources: [{ title: source.title, url: `/resources/cold-call-scripts/${source.slug}/`, description: source.metaDescription, type: 'Cold-call script' }, ...guides]
  };
});

const data = {
  version: 1,
  reviewed: '2026-10-12',
  defaults: { offer: '', industry: 'any', buyer: 'auto', region: 'north-america', goal: 'meetings' },
  options,
  buyerProfiles,
  industryProfiles,
  routes,
  resources: {
    plan: article('launch-90-day-b2b-outbound-campaign', 'Campaign guide'),
    qualify: article('negative-qualification-questions-that-improve-b2b-meetings', 'Qualification guide'),
    demos: article('qualify-software-demo-before-booking', 'Demo guide'),
    reactivate: article('reactivate-old-b2b-leads-problem-led-call', 'Reactivation guide'),
    global: article('adapt-b2b-cold-call-global-markets', 'Market guide'),
    scripts: { title: 'CallTeam Cold-Call Script Library', url: '/resources/cold-call-scripts/', description: 'Choose a script once your offer, target account and buyer are defined.', type: 'Script library' }
  },
  regions: {
    'north-america': 'Build separate US and Canadian account lists, local-time calling windows and region-specific delivery criteria. Confirm outreach requirements before launch.',
    canada: 'Filter for Canadian operations and suitable provinces, account for local time zones and confirm outreach requirements before launch. Use the buyer’s working language.',
    us: 'Filter for US operations and the states your offer can serve. Plan local-time outreach and verify market and outreach requirements before launch.',
    uk: 'Confirm UK delivery fit, use UK buyer terminology and local business hours, and review the market’s outreach requirements before launch.',
    other: 'Name the specific country before launch, then confirm delivery coverage, buyer language, business hours and local outreach requirements. This preview does not establish market coverage.'
  },
  goals: {
    meetings: { note: 'Make a held, sales-accepted meeting the next-step standard: relevant account, responsible buyer, recognised need and agreed purpose.', question: 'What would make the next meeting useful enough for both sides to attend?', action: 'Book a focused working conversation', handoff: 'Confirm attendees, purpose and follow-up; distinguish booked meetings from held meetings and sales acceptance.' },
    demos: { note: 'Earn a demonstration by confirming the use case, current approach, evaluation participants and what the buyer needs to see.', question: 'What must a product demonstration prove, and who should take part in evaluating it?', action: 'Qualify the demonstration before booking', handoff: 'Give the presenter the buyer’s workflow, systems, questions and agreed demonstration agenda; confirm attendance.' },
    reactivate: { note: 'Start with your existing lead records: verify the original topic, contact status and previous outcome, then ask what has changed. Stop if there is no current fit.', question: 'Is the original business topic still relevant, and what has changed since the earlier enquiry?', action: 'Review the old lead before restarting contact', handoff: 'Record the old status, the new situation and the reason to reopen the conversation; separate renewed interest from a qualified opportunity.' },
    'market-entry': { note: 'Test a narrow segment before expanding. Use buyer conversations to check local fit, objections and the decision route; review the evidence before scaling.', question: 'What would buyers in this market need to verify before considering a provider like you?', action: 'Run a focused market test', handoff: 'Review account fit, connection quality, objections, held meetings and sales acceptance by segment before increasing outreach.' }
  },
  caseStudies: {
    saas: { title: '11 SaaS demos, four opportunities and two customers', url: '/case-studies/saas-demo-appointment-setting/', summary: 'A location-intelligence SaaS campaign booked 11 qualified demos in 90 days, created four opportunities and won two customers within six months.', relationship: 'A published CallTeam SaaS example from a different product and buyer context. These are historical results, not a forecast for your campaign.' },
    manufacturing: { title: 'Nine manufacturing cybersecurity appointments', url: '/case-studies/manufacturing-cybersecurity-appointment-setting/', summary: 'A manufacturing cybersecurity campaign booked nine qualified appointments and created three meaningful opportunities in its first 90 days.', relationship: 'A published CallTeam cybersecurity campaign targeting manufacturers. This illustrates execution in the sector; it does not establish results for your specific offer.' }
  }
};

// JSON served as JavaScript: escape markup and JavaScript line separators.
data.browserJson = JSON.stringify(data).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
module.exports = data;
