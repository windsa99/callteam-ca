#!/usr/bin/env node
'use strict';

const assert = require('assert/strict');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const data = require('../src/_data/campaignPreview');
const model = require('../src/assets/js/campaign-model');
const originalScripts = require('../src/_data/callScripts');
const base = { ...data.defaults, offer: 'saas' };
const preview = (overrides = {}) => model.buildPreview(data, { ...base, ...overrides });
const checks = [];
function test(name, fn) { fn(); checks.push(name); }

const expectedSources = {
  saas: 'b2b-saas-cold-call-script',
  cybersecurity: 'cybersecurity-risk-assessment-cold-call-script',
  'ot-security': 'ot-security-cold-call-script-for-manufacturers',
  'cloud-migration': 'cloud-migration-cold-call-script-for-cios',
  erp: 'erp-modernization-cold-call-script-for-cfos',
  'customer-support': 'ai-customer-support-software-cold-call-script',
  'hr-tech': 'ai-recruiting-software-cold-call-script',
  payments: 'payment-processing-cold-call-script',
  'healthcare-tech': 'healthcare-software-modernization-cold-call-script',
  logistics: '3pl-fulfillment-cold-call-script',
  accounting: 'outsourced-accounting-services-cold-call-script',
  'maintenance-software': 'cmms-cold-call-script-maintenance-plant-leaders'
};

for (const [offer, slug] of Object.entries(expectedSources)) {
  test(`${offer}: correct script, original opening and useful guide`, () => {
    const result = preview({ offer });
    assert.equal(result.routeId, offer);
    assert.equal(result.matchLevel, 'specific');
    assert.equal(result.resources[0].url, `/resources/cold-call-scripts/${slug}/`);
    assert.equal(result.opening, originalScripts.find((script) => script.slug === slug).opening);
    assert.ok(result.resources.some((resource) => resource.url.startsWith('/articles/')));
    assert.ok(result.steps.every((step) => step.title && step.text && !step.text.includes('undefined')));
  });
}

test('SaaS account criteria do not misread the source seller-size field', () => {
  const result = preview({ industry: 'manufacturing' });
  assert.ok(result.targets.criteria[0].includes('workflow your product actually supports'));
  assert.ok(!JSON.stringify(result.targets).includes('Early growth SaaS companies'));
  assert.ok(result.targets.criteria.some((criterion) => criterion.includes('production environment')));
});

test('Generic SaaS starts with neutral workflow roles and a buying-committee guide', () => {
  const result = preview();
  assert.deepEqual(result.targets.buyers, ['Business workflow owner', 'Department head', 'Technical evaluator', 'Budget owner']);
  assert.ok(result.angle.includes('business function your product serves'));
  assert.ok(result.questions.some((question) => question.includes('Which function uses the product')));
  assert.ok(result.resources.some((resource) => resource.url === '/articles/map-b2b-buying-committee/'));
  assert.ok(!data.options.buyer.some((buyer) => buyer.value === 'workflow'));
  assert.ok(preview({ buyer: 'technology' }).targets.buyers.includes('Chief Information Officer'));
  assert.ok(preview({ buyer: 'revenue' }).targets.buyers.includes('Chief Revenue Officer'));
});

test('Unmatched industry receives a broad owner-finding opener, not an OT plant pitch', () => {
  const result = preview({ offer: 'ot-security', industry: 'commerce' });
  assert.equal(result.matchLevel, 'broad');
  assert.ok(result.matchNote.includes('industry is outside'));
  assert.ok(result.opening.includes('better person'));
  assert.ok(!result.opening.includes('plant environment'));
  assert.equal(result.caseStudy, null);
});

test('Unmatched buyer is explicitly unconfirmed and gets no specialised pitch', () => {
  const result = preview({ offer: 'ot-security', industry: 'manufacturing', buyer: 'people' });
  assert.equal(result.matchLevel, 'broad');
  assert.ok(result.matchNote.includes('outside this script’s usual'));
  assert.ok(result.targets.criteria.some((criterion) => criterion.includes('unconfirmed route')));
  assert.equal(result.caseStudy, null);
});

test('Unsupported industry and buyer are both disclosed', () => {
  const result = preview({ offer: 'logistics', industry: 'finance', buyer: 'people' });
  assert.equal(result.matchLevel, 'broad');
  assert.ok(result.matchNote.includes('industry and buyer'));
});

test('Other offer uses a general script chooser and no invented case', () => {
  const result = preview({ offer: 'other', industry: 'finance', buyer: 'finance' });
  assert.equal(result.routeId, 'other');
  assert.equal(result.matchLevel, 'broad');
  assert.equal(result.resources[0].url, '/resources/cold-call-scripts/');
  assert.equal(result.caseStudy, null);
});

test('Other industry is not silently treated as a reviewed specialised match', () => {
  const result = preview({ offer: 'saas', industry: 'other' });
  assert.equal(result.matchLevel, 'broad');
});

test('Buyer choices alter qualification, target roles and resources', () => {
  const finance = preview({ offer: 'erp', buyer: 'finance' });
  const technology = preview({ offer: 'erp', buyer: 'technology' });
  assert.notDeepEqual(finance.targets.buyers, technology.targets.buyers);
  assert.notDeepEqual(finance.questions, technology.questions);
  assert.ok(finance.resources.some((resource) => resource.url.includes('get-meetings-with-cfos')));
  assert.ok(technology.resources.some((resource) => resource.url.includes('get-meetings-with-cios')));
});

test('All five regions change operating guidance and account market criteria', () => {
  const results = data.options.region.map((region) => preview({ region: region.value }));
  assert.equal(new Set(results.map((result) => result.regionNote)).size, 5);
  assert.equal(new Set(results.map((result) => result.targets.criteria[result.targets.criteria.length - 1])).size, 5);
  assert.ok(results.every((result) => result.targets.criteria.some((criterion) => criterion.startsWith('Target market:'))));
});

test('Reactivation changes the list, opener, question and resource', () => {
  const result = preview({ offer: 'accounting', goal: 'reactivate' });
  assert.ok(result.opening.includes('verified topic'));
  assert.ok(result.targets.criteria.some((criterion) => criterion.includes('existing lead records')));
  assert.ok(result.steps[0].title.includes('old leads'));
  assert.ok(result.resources.some((resource) => resource.url.includes('reactivate-old-b2b-leads')));
});

test('Service offer with demo goal proposes a working session', () => {
  const result = preview({ offer: 'accounting', goal: 'demos' });
  assert.ok(result.goalNote.includes('confirm whether there is a product'));
  assert.equal(result.steps[2].title, 'Agree a focused working session');
  assert.ok(result.questions[result.questions.length - 1].includes('working session'));
  assert.ok(!result.resources.some((resource) => resource.url.includes('qualify-software-demo')));
});

test('Product demo goal includes demonstration qualification', () => {
  const result = preview({ offer: 'maintenance-software', goal: 'demos' });
  assert.ok(result.goalNote.includes('demonstration'));
  assert.ok(result.resources.some((resource) => resource.url.includes('qualify-software-demo')));
});

test('Market-entry goal tests a narrow segment and does not promise coverage', () => {
  const result = preview({ goal: 'market-entry', region: 'other' });
  assert.ok(result.goalNote.includes('Test a narrow segment'));
  assert.ok(result.regionNote.includes('does not establish market coverage'));
  assert.ok(result.resources.some((resource) => resource.url.includes('adapt-b2b-cold-call-global-markets')));
});

test('Case-study figures and relationship stay specific to the published case', () => {
  const saas = preview().caseStudy;
  assert.ok(saas.summary.includes('11 qualified demos in 90 days'));
  assert.ok(saas.summary.includes('two customers within six months'));
  assert.ok(saas.relationship.includes('different product and buyer context'));
  const manufacturing = preview({ offer: 'ot-security', industry: 'manufacturing' }).caseStudy;
  assert.ok(manufacturing.summary.includes('nine qualified appointments'));
  assert.ok(manufacturing.summary.includes('three meaningful opportunities'));
  assert.ok(!manufacturing.summary.includes('customers'));
  assert.equal(preview({ offer: 'payments', industry: 'commerce' }).caseStudy, null);
});

test('Malformed, missing, blank and unknown input values fail clearly', () => {
  for (const value of [undefined, null, [], 'saas', 5]) assert.throws(() => model.buildPreview(data, value), /Choose/);
  for (const key of Object.keys(base)) {
    for (const value of ['', undefined, null, [], {}, 1, '__proto__', '<script>alert(1)</script>', ' SAAS ']) {
      assert.throws(() => preview({ [key]: value }), /Choose/, `${key}: ${JSON.stringify(value)}`);
    }
  }
  assert.throws(() => model.buildPreview(null, base), /data is unavailable/);
});

test('Results do not mutate source data and resource URLs are unique', () => {
  const before = JSON.stringify(data);
  const result = preview({ offer: 'ot-security', industry: 'manufacturing' });
  result.resources[0].title = 'Changed only by this test';
  result.objection.response = 'Changed only by this test';
  result.caseStudy.summary = 'Changed only by this test';
  result.targets.buyers.push('Test');
  assert.equal(JSON.stringify(data), before);
  const resources = preview({ goal: 'market-entry', region: 'uk' }).resources;
  assert.equal(new Set(resources.map((resource) => resource.url)).size, resources.length);
});

test('Every emitted resource URL exists in the source site', () => {
  const resources = [...data.routes.flatMap((route) => route.resources), ...Object.values(data.resources), ...Object.values(data.buyerProfiles).map((profile) => profile.guide), ...Object.values(data.industryProfiles).map((profile) => profile.guide), ...Object.values(data.caseStudies)];
  for (const resource of resources) {
    assert.ok(resource.url.startsWith('/') && !resource.url.startsWith('//'), resource.url);
    let exists = false;
    if (resource.url.startsWith('/resources/cold-call-scripts/') && resource.url !== '/resources/cold-call-scripts/') exists = originalScripts.some((script) => resource.url === `/resources/cold-call-scripts/${script.slug}/`);
    else exists = [resource.url.replace(/\/$/, '.md'), resource.url.replace(/\/$/, '.njk'), resource.url + 'index.njk'].some((file) => fs.existsSync(path.join(__dirname, '../src', file)));
    assert.ok(exists, `Missing source for ${resource.url}`);
  }
});

test('Browser payload executes safely and browser model matches Node', () => {
  assert.ok(!/[<>\u2028\u2029]/.test(data.browserJson));
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(`window.CallTeamCampaignData = ${data.browserJson};`, context);
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../src/assets/js/campaign-model.js'), 'utf8'), context);
  const actual = context.window.CallTeamCampaign.buildPreview(context.window.CallTeamCampaignData, base);
  assert.equal(JSON.stringify(actual), JSON.stringify(preview()));
});

let combinations = 0;
const combinationSummary = { specific: 0, broad: 0, minResources: Infinity, maxResources: 0 };
test('All 25,740 supported answer combinations produce complete finite output', () => {
  const isNonemptyString = (value) => typeof value === 'string' && value.trim().length > 0;
  const isLocalResourcePath = (value) => typeof value === 'string' && /^\/(?:[a-z0-9-]+\/)+$/.test(value);
  for (const offer of data.options.offer.filter((entry) => entry.value)) {
    for (const industry of data.options.industry) for (const buyer of data.options.buyer) for (const region of data.options.region) for (const goal of data.options.goal) {
      const answers = { offer: offer.value, industry: industry.value, buyer: buyer.value, region: region.value, goal: goal.value };
      const result = model.buildPreview(data, answers);
      const context = JSON.stringify(answers);
      for (const field of ['routeId', 'title', 'matchNote', 'summary', 'opening', 'angle', 'goalNote', 'regionNote']) {
        assert.ok(isNonemptyString(result[field]), `${context}: missing ${field}`);
      }
      assert.equal(result.routeId, offer.value, `${context}: incorrect offer route`);
      assert.ok(['specific', 'broad'].includes(result.matchLevel), `${context}: invalid match level`);
      assert.deepEqual(result.selections, [
        { label: 'What you sell', value: offer.label },
        { label: 'Target industry', value: industry.label },
        { label: 'Target buyer', value: buyer.label },
        { label: 'Target market', value: region.label },
        { label: 'Campaign goal', value: goal.label }
      ], `${context}: displayed selections do not match the answers`);
      assert.ok(result.targets.criteria.length >= 3 && result.targets.criteria.every(isNonemptyString), `${context}: incomplete account criteria`);
      assert.ok(result.targets.buyers.length >= 1 && result.targets.buyers.every(isNonemptyString), `${context}: missing buyer roles`);
      assert.ok(result.questions.length >= 3 && result.questions.every(isNonemptyString), `${context}: incomplete qualification questions`);
      assert.ok(isNonemptyString(result.objection.objection) && isNonemptyString(result.objection.response), `${context}: incomplete objection response`);
      assert.equal(result.steps.length, 4, `${context}: expected four execution steps`);
      assert.ok(result.steps.every((step) => isNonemptyString(step.title) && isNonemptyString(step.text)), `${context}: incomplete execution step`);
      assert.ok(result.resources.length >= 3);
      assert.ok(result.resources.every((resource) => ['title', 'url', 'description', 'type'].every((field) => isNonemptyString(resource[field]))), `${context}: incomplete resource`);
      assert.ok(result.resources.every((resource) => isLocalResourcePath(resource.url)), `${context}: invalid resource path`);
      assert.equal(new Set(result.resources.map((resource) => resource.url)).size, result.resources.length, `${context}: duplicate resources`);
      assert.ok(!JSON.stringify(result).includes('undefined'));
      if (result.matchLevel === 'broad') assert.equal(result.caseStudy, null);
      if (result.caseStudy) {
        assert.ok(['title', 'url', 'summary', 'relationship'].every((field) => isNonemptyString(result.caseStudy[field])), `${context}: incomplete campaign evidence`);
        assert.ok(isLocalResourcePath(result.caseStudy.url), `${context}: invalid case-study path`);
      }
      combinationSummary[result.matchLevel] += 1;
      combinationSummary.minResources = Math.min(combinationSummary.minResources, result.resources.length);
      combinationSummary.maxResources = Math.max(combinationSummary.maxResources, result.resources.length);
      combinations += 1;
    }
  }
  assert.equal(combinations, 25740);
});

console.log(`Campaign model: ${checks.length} checks passed; ${combinations.toLocaleString('en-US')} answer combinations validated.`);
console.log(`Campaign matching: ${combinationSummary.specific.toLocaleString('en-US')} specific matches; ${combinationSummary.broad.toLocaleString('en-US')} disclosed broad plans; ${combinationSummary.minResources}–${combinationSummary.maxResources} resources per result.`);
