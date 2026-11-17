const providers = [
  {
    id: 'map-my-customers',
    name: 'Map My Customers',
    fit: 'B2B territories and account visits',
    field: 'Territory maps, route planning and offline access to field records.',
    plan: 'Industry Leader',
    annualRate: 99,
    qualifier: 'Five-seat minimum.',
    good: 'Reps can open account records, add notes and log check-ins offline.',
    weak: 'Enterprise starts at ten seats. If you keep another CRM, confirm which fields sync and which system takes priority.',
    verdict: 'Demo it first if five or more reps cover established B2B territories. Skip it if you work alone.',
    sources: [
      ['Plans and seat minimums', 'https://mapmycustomers.com/pricing'],
      ['Offline field work', 'https://mapmycustomers.com/learning-center/does-sales-territory-mapping-software-work-offline'],
    ],
  },
  {
    id: 'spotio',
    name: 'SPOTIO',
    fit: 'Managers tracking team visits',
    field: 'Territory coverage and field activity tracking. Test your offline workflow.',
    plan: 'B2B',
    price: 'Quote required',
    qualifier: 'Ask for licence, setup and integration costs.',
    good: 'Managers can see who visited each account and spot gaps in territory coverage.',
    weak: 'API access requires Custom. Ask which fields SPOTIO can update in your CRM.',
    verdict: 'Shortlist it if you struggle to track visits across territories. Skip it if you just need better routes.',
    sources: [
      ['Plans and API access', 'https://spotio.com/plans/'],
      ['Field sales features', 'https://spotio.com/features/'],
    ],
  },
  {
    id: 'repmove',
    name: 'RepMove',
    fit: 'Small B2B teams with repeat stops',
    field: 'Route planning and follow-up. Test offline note capture.',
    plan: 'Sales Pro',
    annualRate: 54,
    qualifier: 'Published rounded rate. One-way integration on Sales Pro.',
    good: 'Reps can set callbacks from their phones. Sales Pro covers up to ten users and 10,000 records.',
    weak: 'Two-way sync and teams over ten need Sales Accelerate.',
    verdict: 'Try Sales Pro if a small team needs to plan repeat visits and stay on top of callbacks.',
    sources: [
      ['Published plans', 'https://repmove.app/pricing-plans/'],
      ['Plan limits and integrations', 'https://repmove.app/get-started/'],
    ],
  },
  {
    id: 'skynamo',
    name: 'Skynamo',
    fit: 'Distributors taking orders on visits',
    field: 'Offline field work and order capture with ERP options.',
    plan: 'Field sales and ordering',
    price: 'Quote required',
    qualifier: 'Price ERP connection and onboarding with the seats.',
    good: 'Reps can capture repeat orders offline and send them to the back office when service returns.',
    weak: 'Connecting your order system takes setup. Have the vendor demo your product codes, discounts and stock fields.',
    verdict: 'Demo it if staff keep retyping orders. Skip it if reps only log visits.',
    sources: [
      ['Pricing and offline sales operations', 'https://skynamo.com/pricing'],
      ['Skynamo platform', 'https://skynamo.com/'],
    ],
  },
  {
    id: 'leadbeam',
    name: 'Leadbeam',
    fit: 'Reps who dictate notes between stops',
    field: 'Voice and photo capture. Pro adds routing and territory mapping.',
    plan: 'Pro',
    annualRate: 149,
    monthlyRate: 229,
    qualifier: 'Add the cost of your CRM where applicable.',
    good: 'Voice notes and photos can go straight into CRM fields. Pro also adds Atlas lead scoring.',
    weak: 'Test whether dictated notes get product names and dates right before relying on them.',
    verdict: 'Try Starter at $59 per rep per month on annual billing if notes are the problem. Upgrade to Pro when you need routes and territory maps.',
    sources: [
      ['Starter and Pro prices', 'https://www.leadbeam.ai/pricing'],
      ['Voice and image capture', 'https://www.leadbeam.ai/features/pulse'],
    ],
  },
  {
    id: 'badger-maps',
    name: 'Badger Maps',
    fit: 'Teams keeping their CRM and fixing routes',
    field: 'Multi-stop routing. Core features require an internet connection.',
    plan: 'Business',
    annualRate: 58,
    monthlyRate: 69,
    qualifier: 'Add the CRM cost and confirm connector pricing.',
    good: 'Reps can map stops using the account records they already have.',
    weak: 'A downloaded map gives limited offline access. Check which fields the connector can update in your CRM.',
    verdict: 'Try it when driving eats up the day. Pass if reps must reliably change records in areas with poor coverage.',
    sources: [
      ['Business and Enterprise pricing', 'https://www.badgermapping.com/pricing/'],
      ['Offline limits', 'https://www.badgermapping.com/knowledgebase/does-badger-work-offline/'],
    ],
  },
  {
    id: 'salesforce-maps',
    name: 'Salesforce Sales Cloud + Maps',
    fit: 'Established Salesforce teams',
    field: 'Routing and account maps in the Salesforce workflow.',
    plan: 'Maps add-on',
    monthlyRate: 75,
    qualifier: 'List rate for Maps alone. Salesforce licences and setup can add cost.',
    addOn: true,
    good: 'Managers can see account coverage on a map using the records their team already maintains.',
    weak: 'Salesforce offers Maps in some bundles. It lists no standalone Maps trial. Ask what setup costs.',
    verdict: 'Shortlist Maps if you already run Salesforce and have an admin to set it up. For a new CRM, price simpler options first.',
    sources: [
      ['Salesforce Maps pricing and bundles', 'https://www.salesforce.com/sales/mapping-software/pricing/'],
      ['Sales Cloud plans', 'https://www.salesforce.com/sales/pricing/'],
    ],
  },
  {
    id: 'pipedrive',
    name: 'Pipedrive',
    fit: 'Small teams with occasional visits',
    field: 'Nearby addresses and offline mobile CRM. Price routing separately if needed.',
    plan: 'Lite',
    annualRate: 14,
    qualifier: 'Base CRM. Any separate route planner costs extra.',
    good: 'Reps can manage deals from a simple pipeline and find nearby accounts with valid addresses.',
    weak: 'Nearby shows accounts on a map. Budget for separate software to order your stops. Full email sync starts on Growth.',
    verdict: 'Buy Lite to track deals and follow-ups. Compare dedicated route planners if reps spend most days driving.',
    sources: [
      ['Pipedrive pricing', 'https://www.pipedrive.com/en/pricing'],
      ['How Nearby works', 'https://support.pipedrive.com/en/article/the-nearby-feature'],
    ],
  },
  {
    id: 'zoho-routeiq',
    name: 'Zoho CRM + RouteIQ',
    fit: 'Zoho teams adding route planning',
    field: 'CRM records on a map and multi-stop routes. Test offline in RouteIQ.',
    plan: 'Zoho CRM Standard',
    annualRate: 14,
    qualifier: 'CRM base only. Confirm the separate RouteIQ rate for your region.',
    good: 'RouteIQ Standard optimizes routes of up to 25 stops using your Zoho CRM records.',
    weak: 'Check how many address credits you get. Test RouteIQ offline separately from the Zoho CRM app.',
    verdict: 'Try RouteIQ first if your team already uses Zoho. If you’re starting from scratch, compare the combined price with a tool built for field reps.',
    sources: [
      ['Zoho CRM plan comparison', 'https://www.zoho.com/crm/complete-feature-list.html'],
      ['RouteIQ pricing and route limits', 'https://www.zoho.com/routeiq/pricing.html'],
    ],
  },
  {
    id: 'salesrabbit',
    name: 'SalesRabbit',
    fit: 'Door-to-door and canvassing crews',
    field: 'Lead pins, territories and offline lead capture.',
    plan: 'Team',
    monthlyRate: 59,
    qualifier: 'Monthly billing. Price any add-ons with the team.',
    good: 'Canvassers can log attempts, mark doors to revisit and sync new leads when they reconnect.',
    weak: 'Load DataGrid information while online. Ask for a demo if you track multiple buyers at each account.',
    verdict: 'Pick it for door-to-door work. Distributors taking repeat orders should start with Skynamo.',
    sources: [
      ['Team pricing and feature chart', 'https://salesrabbit.com/features/'],
      ['Offline mode', 'https://help.salesrabbit.com/hc/en-us/articles/14156689268375-Offline-Mode'],
    ],
  },
];

const dollars = amount => '$' + amount.toLocaleString('en-US');

function seatPrice(provider) {
  const rates = [];
  if (provider.annualRate) rates.push(dollars(provider.annualRate) + '/rep/month, billed annually');
  if (provider.monthlyRate) {
    const basis = provider.addOn ? ' list rate' : ', monthly billing';
    rates.push(dollars(provider.monthlyRate) + '/rep/month' + basis);
  }
  return rates.join(' or ') || provider.price;
}

function teamPrice(provider, seats) {
  if (provider.annualRate) {
    return dollars(provider.annualRate * seats) + '/mo equivalent · ' + dollars(provider.annualRate * seats * 12) + '/yr';
  }
  if (provider.monthlyRate) return dollars(provider.monthlyRate * seats) + '/mo' + (provider.addOn ? ' for the add-on' : '');
  return provider.price;
}

module.exports = {
  providers: providers.map(provider => ({
    ...provider,
    price: provider.plan + ' · ' + seatPrice(provider),
  })),
  comparisonRows: providers.map(provider => [
    '<a href="#' + provider.id + '">' + provider.name + '</a>',
    provider.fit,
    provider.field,
    '<strong>' + teamPrice(provider, 5) + '</strong><br>' + provider.qualifier,
  ]),
  reviewed: 'November 17, 2026',
  faqs: [
    { q: 'What is the best CRM for outside sales reps?', a: 'Start with Map My Customers for five or more reps covering B2B territories. Try RepMove for a smaller team that makes repeat visits.' },
    { q: 'What is the cheapest outside sales CRM in this comparison?', a: 'Pipedrive Lite and Zoho CRM Standard each cost $14 USD per user per month on annual billing. Route planning costs extra with both setups.' },
    { q: 'Which field sales tools work offline?', a: 'Map My Customers, Skynamo, SalesRabbit and Pipedrive document offline features. Test the action your rep needs most, such as saving a note or taking an order.' },
    { q: 'What should I buy if we already have a CRM?', a: 'Check Salesforce Maps for Salesforce or RouteIQ for Zoho. Try Badger Maps if all you need is better routing. Make sure visit notes reach the correct record.' },
    { q: 'What is the difference between a field sales CRM and a route planner?', a: 'A field sales CRM keeps your accounts, visit history and follow-ups. A route planner puts the day’s stops in order. Some products combine both.' },
    { q: 'Can CallTeam call leads from our existing CRM?', a: 'Yes. We agree on CRM access, the fields to update and what qualifies a lead for a meeting before calling.' },
  ],
};
