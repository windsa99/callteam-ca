const scripts = require("./callScriptsWaveThirteen");
const industries = [
  ["IT Services Outbound Sales Playbook", "it-services-outbound-sales-playbook", "Build the account and service strategy around this IT conversation."],
  ["Staffing and Recruiting Outbound Sales Playbook", "staffing-recruiting-outbound-sales-playbook", "Define employer fit, recruiting coverage and staffing qualification."],
  ["Retail Technology Outbound Sales Playbook", "retail-technology-outbound-sales-playbook", "Plan the retail buying group, software evaluation and campaign."],
  ["Marketing Agency Outbound Sales Playbook", "marketing-agency-outbound-sales-playbook", "Connect a defined agency or implementation offer to a relevant client."],
  ["Hospitality Technology Outbound Sales Playbook", "hospitality-technology-outbound-sales-playbook", "Understand hotel account selection, operating constraints and technology decisions."]
];
const buyers = {
  cio: ["CIO Outbound Sales Playbook", "get-meetings-with-cios-it-leaders", "Understand technical ownership and what makes an executive review useful."],
  cfo: ["CFO Outbound Sales Playbook", "get-meetings-with-cfos-b2b", "Frame the financial question and evidence needed for a decision."],
  chro: ["CHRO Outbound Sales Playbook", "chro-outbound-sales-playbook", "Connect workforce requirements to the people responsible for hiring decisions."],
  coo: ["COO Outbound Sales Playbook", "coo-outbound-sales-playbook", "Prepare an operations conversation around a defined process and owner."],
  revenue: ["Revenue Leader Outbound Sales Playbook", "revenue-leader-outbound-sales-playbook", "Understand commercial priorities, decision ownership and useful sales handoffs."]
};
const buyerKeys = ["cio", "cfo", "chro", "coo", "coo", "revenue", "revenue", "revenue", "coo", "revenue"];
const incumbent = ["How to Cold Call Prospects Who Already Have a Vendor", "cold-call-prospects-existing-vendor", "Check coverage respectfully before suggesting an additional provider or product."];
const internal = ["How to Sell Outsourced Services When the Buyer Plans to Hire Internally", "sell-outsourced-services-vs-hiring", "Discuss outside support without dismissing the internal team."];
const integration = ["How to Handle Integration Concerns in a Software Sales Call", "integration-concerns-software-sales-call", "Clarify required systems and evidence before promising technical compatibility."];
const link = ([title, slug, description]) => ({ title, url: `/articles/${slug}/`, description });
module.exports = Object.fromEntries(scripts.map((s, i) => [s.slug, [
  industries[Math.floor(i / 2)],
  buyers[buyerKeys[i]],
  [5, 7, 8].includes(i) ? integration : [0, 1, 2, 3, 6, 9].includes(i) ? internal : incumbent,
  ["What Makes a B2B Appointment Qualified?", "what-makes-b2b-appointment-qualified-practical-standard", "Agree on buyer fit and meeting purpose before putting time on the calendar."],
  ["Cold Calling Metrics That Measure Campaign Quality", "cold-calling-metrics-campaign-quality", "Separate bookings, attendance and opportunity quality in reporting."],
  ["How to Launch a 90-Day B2B Outbound Campaign", "launch-90-day-b2b-outbound-campaign", "Turn the talk track into a planned, reviewed outbound campaign."],
  ["B2B Cold Calling Compliance for Global Campaigns", "b2b-cold-calling-compliance-global", "Check the calling market, contact rules and separate follow-up requirements before launch."]
].map(link)]));
