'use strict';
const guide = require('./outreachSalesloft.json');
const dollars = value => '$' + value.toLocaleString('en-US');
const plans = [
  ['Apollo Professional', 79],
  ['Close Growth', 99],
  ['lemlist Multichannel', 87]
];
guide.alternativeCostRows = plans.map(([name, rate]) => [
  name,
  ...[1, 3, 5].map(users => dollars(users * rate)),
  dollars(5 * rate * 12)
]);
module.exports = guide;
