'use strict';
const money = n => '$' + n.toLocaleString('en-US',{maximumFractionDigits:2});
const sf = require('./salesforceComparison.json');
sf.comparisonRows = sf.providers.map(p => [
  `<a href="#${p.id}">${p.name}</a><small>${p.plan}</small>`,
  `<strong>${money(p.annualRate)}</strong><small>per user/month, annual billing</small>`,p.fit,
  p.id==='hubspot'?'$1,500 required onboarding; other hubs cost extra.':p.id==='monday'?'Three-seat minimum and seat groups; 250 automations/month.':p.id==='copper'?'15,000 contacts; email series need Business.':p.id==='close'?'Calls and numbers extra; Scale for predictive.':p.id==='freshsales'?'Sequences start on Pro; advanced controls need Enterprise.':p.id==='dynamics'?'Budget configuration and administration.':p.id==='pipedrive'?'Include a separate calling tool if needed.':'Check the edition needed for advanced controls.'
]);
sf.costRows=[['Salesforce Core',... [1,3,5].map(n=>money(n*195*12))],...sf.providers.map(p=>[`${p.name} ${p.plan}`, ...[1,3,5].map(n=>money(Math.max(n,p.minimum)*p.annualRate*12+p.onboarding)+(p.minimum>n?'<small>3 paid seats</small>':''))])];
module.exports={salesforce:sf,orum:require('./orumComparison.json'),email:require('./emailComparison.json')};
