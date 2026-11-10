'use strict';
const guide = require('./gongGuide.json');
const dollars = n => '$' + n.toLocaleString('en-US');
guide.costRows = guide.costPlans.map(plan => [
  plan.name,
  ...[1, 3, 5].map(users => dollars(Math.max(users, plan.minimum) * plan.rate) + (users < plan.minimum ? '<small>' + plan.minimum + ' paid users</small>' : '')),
  dollars(Math.max(5, plan.minimum) * plan.rate * 12)
]);
module.exports = guide;
