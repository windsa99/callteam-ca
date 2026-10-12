(function (root, factory) {
  'use strict';
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.CallTeamCampaign = factory();
})(typeof window !== 'undefined' ? window : this, function () {
  'use strict';

  var fieldLabels = { offer: 'What you sell', industry: 'Target industry', buyer: 'Target buyer', region: 'Target market', goal: 'Campaign goal' };
  function uniqueResources(resources) {
    var seen = new Set();
    return resources.filter(function (resource) {
      if (!resource || seen.has(resource.url)) return false;
      seen.add(resource.url);
      return true;
    }).map(function (resource) { return Object.assign({}, resource); });
  }

  function buildPreview(data, answers) {
    if (!data || !data.options || !Array.isArray(data.routes)) throw new Error('Campaign preview data is unavailable. Please refresh the page.');
    if (!answers || typeof answers !== 'object' || Array.isArray(answers)) throw new Error('Choose your campaign answers to build a preview.');
    var labels = {};
    Object.keys(fieldLabels).forEach(function (key) {
      if (typeof answers[key] !== 'string' || !answers[key]) throw new Error('Choose an answer for ' + fieldLabels[key].toLowerCase() + '.');
      var selected = data.options[key].find(function (item) { return item.value === answers[key]; });
      if (!selected) throw new Error('Choose a valid option for ' + fieldLabels[key].toLowerCase() + '.');
      labels[key] = selected.label;
    });

    var route = data.routes.find(function (entry) { return entry.id === answers.offer; });
    var other = answers.offer === 'other';
    if (!route && !other) throw new Error('This campaign route is unavailable. Choose another offer.');
    var industry = data.industryProfiles[answers.industry];
    var supportedIndustry = !!route && (answers.industry === 'any' || (answers.industry !== 'other' && (route.industry === '*' || route.industry.indexOf(answers.industry) !== -1)));
    var supportedBuyer = !!route && (answers.buyer === 'auto' || route.buyers.indexOf(answers.buyer) !== -1);
    var specific = !!route && supportedIndustry && supportedBuyer;
    var buyerKey = answers.buyer === 'auto' ? (route ? route.primaryBuyer : 'executive') : answers.buyer;
    var buyer = data.buyerProfiles[buyerKey];
    var goal = data.goals[answers.goal];
    var regionNote = data.regions[answers.region];
    var selectedIndustry = answers.industry === 'any' ? 'a focused target segment' : labels.industry.toLowerCase();
    var goalNote = goal.note;
    if (answers.goal === 'demos' && (!route || !route.productDemo)) goalNote = 'For this offer, confirm whether there is a product to demonstrate. Otherwise use a scoped working call or process review. Agree the problem, participants and what the session should establish.';

    var matchNote;
    if (other) matchNote = 'Your offer needs a more specific match. This starting plan helps define the account, buyer and first conversation before selecting a specialised script.';
    else if (!supportedIndustry && !supportedBuyer) matchNote = 'The selected industry and buyer are outside this script’s reviewed fit. Use the broader starting plan below; confirm the use case and responsible buyer before adapting the linked offer resources.';
    else if (!supportedIndustry) matchNote = 'The selected industry is outside this script’s reviewed fit. Start by confirming that your offer solves a relevant problem in this sector. The linked offer resources need adaptation.';
    else if (!supportedBuyer) matchNote = 'Your selected buyer is outside this script’s usual decision roles. First confirm their involvement or find the responsible owner. The opening below tests that route.';
    else matchNote = 'Matched to your offer' + (answers.industry === 'any' ? '; the account criteria below help you choose the first segment.' : ', selected industry and buyer focus.') + (route.scope ? ' ' + route.scope : '');

    var criteria = [];
    if (specific) criteria.push(route.criteria);
    else criteria.push('Define the problem ' + labels.offer.toLowerCase() + ' can solve for ' + selectedIndustry + ', and confirm evidence that the account can use and buy the offer.');
    if (industry) criteria.push(industry.criteria);
    else criteria.push('Select one customer segment with a repeatable use case, delivery fit and a clear reason for a conversation.');
    criteria.push(answers.goal === 'reactivate' ? 'Use existing lead records with a verified original topic and current contact status; prioritise accounts where the situation may have changed.' : 'Research a verifiable business change or operating condition, then test its relevance with the buyer. A public signal does not prove buying intent.');
    criteria.push('Target market: ' + labels.region + '. Confirm delivery coverage before building the list.');

    var opening = specific ? route.opening : 'Hi [First Name], this is [Your Name] with [Company]. I am calling about [one specific business problem your offer addresses]. Is that something you are responsible for, or is there a better person to speak with?';
    if (answers.goal === 'reactivate') opening = 'Hi [First Name], this is [Your Name] with [Company]. I am getting in touch about [the verified topic in your earlier enquiry]. Is that still something your team is working on, or has the situation changed?';
    var questions = specific ? route.questions.slice(0, 2) : ['Which business problem is worth addressing, and how does the team handle it today?', 'Who owns this workflow, and what would make a different approach worth considering?'];
    questions.push(buyer.question);
    questions.push(answers.goal === 'demos' && (!route || !route.productDemo) ? 'What should a focused working session establish, and who needs to be involved?' : goal.question);

    var plan = specific ? route.plan : {
      listFocus: 'Confirm one target segment, a relevant problem, the offer’s delivery limits and the person responsible for evaluating it.',
      callAround: 'Research one verifiable reason for a conversation, and check it with the buyer without assuming a need.',
      meetingReady: 'Establish account fit, a recognised business problem, buyer ownership and a useful next-step purpose.',
      handoff: 'Record the account, buyer’s own words, current approach, constraints, stakeholders and agreed next step.'
    };
    var steps = [
      { title: answers.goal === 'reactivate' ? 'Review and segment the old leads' : 'Define the first account list', text: (answers.goal === 'reactivate' ? 'Check the original enquiry, previous outcome and current contact status. ' : '') + plan.listFocus },
      { title: 'Prepare the opening and buyer context', text: plan.callAround },
      { title: answers.goal === 'demos' && (!route || !route.productDemo) ? 'Agree a focused working session' : goal.action, text: plan.meetingReady },
      { title: 'Follow up, learn and hand over', text: plan.handoff + ' ' + goal.handoff }
    ];
    var resources = route ? route.resources.slice() : [data.resources.scripts, data.resources.plan];
    if (industry) resources.push(industry.guide);
    resources.push(buyer.guide);
    if (answers.goal === 'reactivate') resources.push(data.resources.reactivate);
    else if (answers.goal === 'demos' && route && route.productDemo) resources.push(data.resources.demos);
    else if (answers.goal === 'market-entry') resources.push(data.resources.global);
    else resources.push(data.resources.qualify);
    if (answers.region === 'uk' || answers.region === 'other') resources.push(data.resources.global);

    var caseStudy = null;
    if (specific && route.id === 'saas') caseStudy = Object.assign({}, data.caseStudies.saas);
    if (specific && (route.id === 'ot-security' || route.id === 'cybersecurity') && answers.industry === 'manufacturing') caseStudy = Object.assign({}, data.caseStudies.manufacturing);
    var targetBuyers = specific ? (answers.buyer === 'auto' ? (route.recommendedBuyerTitles || route.buyerTitles).slice(0, 4) : buyer.titles.slice()) : buyer.titles.slice();
    if (!specific && route && !supportedBuyer) criteria.push('Treat ' + labels.buyer.toLowerCase() + ' as an unconfirmed route. The linked offer script usually starts with ' + route.buyerTitles.slice(0, 3).join(', ') + '.');

    return {
      routeId: route ? route.id : 'other',
      title: specific ? route.title : 'Your B2B campaign starting plan',
      matchLevel: specific ? 'specific' : 'broad',
      matchNote: matchNote,
      summary: (specific ? 'Build around ' + labels.offer.toLowerCase() : 'Define a focused approach for ' + labels.offer.toLowerCase()) + ', targeting ' + selectedIndustry + ' in ' + labels.region + '. Use the preview to prepare the first conversation, then validate the fit before launch.',
      selections: Object.keys(fieldLabels).map(function (key) { return { label: fieldLabels[key], value: labels[key] }; }),
      targets: { criteria: criteria, buyers: targetBuyers },
      angle: specific ? route.angle + ' ' + buyer.focus : 'Lead with one useful business question. Confirm the problem and the responsible owner before developing a specialised pitch. ' + buyer.focus,
      opening: opening,
      questions: questions,
      objection: specific ? Object.assign({}, route.objection) : { objection: 'We already have this covered.', response: 'Understood. Is the current approach meeting the need, or is there a specific gap worth discussing? If everything is covered, we should leave it there.' },
      steps: steps,
      resources: uniqueResources(resources),
      caseStudy: caseStudy,
      regionNote: regionNote,
      goalNote: goalNote
    };
  }
  return { buildPreview: buildPreview };
});
