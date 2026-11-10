'use strict';
const guide = require('./apolloClay.json');
const dollars = value => '$' + value.toLocaleString('en-US');
guide.planRows = guide.plans.map(p => [
  p.name + '<br><small>' + p.basis + '</small>',
  '<strong>' + dollars(p.monthly) + '</strong>',
  '<strong>' + dollars(p.annualRate) + '</strong>',
  p.monthlyCredits,
  p.fit
]);
guide.teamRows = guide.plans.map(p => [
  p.name,
  ...[1, 3, 5].map(users => dollars(p.monthly * (p.basis === 'Per user' ? users : 1)))
]);
guide.combinedMonthly = 3 * guide.plans[1].monthly + guide.plans[2].monthly;
guide.combinedGrowthMonthly = 3 * guide.plans[1].monthly + guide.plans[3].monthly;
module.exports = guide;
