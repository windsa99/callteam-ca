(function () {
  'use strict';
  function number(value, label, min, max, whole) {
    if (value === null || value === undefined || String(value).trim() === '') throw new Error('Enter ' + label + '.');
    var n = Number(value);
    if (!Number.isFinite(n) || n < min || n > max || (whole && !Number.isSafeInteger(n))) throw new Error('Use ' + (whole ? 'a whole number' : 'a number') + ' from ' + min + ' to ' + max.toLocaleString('en-CA') + ' for ' + label + '.');
    return n;
  }
  function calculateCost(providers, input) {
    try {
      var provider = providers.find(function (p) { return p.id === input.provider; });
      if (!provider) throw new Error('Choose a provider.');
      var plan = provider.plans.find(function (p) { return p.id === input.plan; });
      if (!plan || !Object.prototype.hasOwnProperty.call(plan.rates, input.billing)) throw new Error('Choose an available plan and billing option.');
      var rate = plan.rates[input.billing], quoted = rate === null;
      var reps = number(input.reps, provider.id === 'mojo' ? 'access users' : 'active callers', 1, 10000, true);
      var minimum = number(input.minimum, 'minimum paid seats', plan.min || 1, 10000, true);
      var seats = Math.max(reps, minimum), months = quoted ? number(input.months, 'quote commitment in months', input.billing === 'annual' ? 12 : 1, 60, true) : input.billing === 'annual' ? 12 : 1;
      var seatRate, teamRate;
      if (quoted) {
        if (!['seat','team'].includes(input.quoteUnit)) throw new Error('Choose whether the quote is per seat or for the whole team.');
        var quote = number(input.quotePrice, 'quoted monthly equivalent', 0, 1000000, false);
        seatRate = input.quoteUnit === 'seat' ? quote : 0;
        teamRate = input.quoteUnit === 'team' ? quote : 0;
      } else {
        seatRate = rate.seat === null ? number(input.seatPrice, 'paid plan price per seat per month', 0, 1000000, false) : rate.seat;
        teamRate = rate.team;
      }
      var licences = provider.id === 'mojo' ? number(input.licences, 'simultaneous dialler licences', 1, reps, true) : 0;
      var seatAddon = number(input.seatAddon, 'extra cost per paid seat', 0, 1000000, false);
      var teamAddon = number(input.teamAddon, 'extra cost for the team', 0, 1000000, false);
      var phoneCost = number(input.phoneCost, 'total extra number cost', 0, 1000000, false);
      var usageMode = input.usageMode;
      if (!['total','units'].includes(usageMode)) throw new Error('Choose a usage cost method.');
      var usage = usageMode === 'total' ? number(input.usageCost, 'monthly usage cost', 0, 10000000, false) : number(input.units, 'billable units', 0, 10000000, false) * number(input.unitPrice, 'cost per billable unit', 0, 1000, false);
      var setup = number(input.setup, 'one-time fees', 0, 10000000, false);
      var base = seats * seatRate + teamRate + (rate && rate.dialer || 0) * licences;
      var recurring = base + seats * seatAddon + teamAddon + phoneCost;
      var monthly = recurring + usage;
      return { seats:seats, reps:reps, licences:licences, months:months, base:base, extras:recurring-base, usage:usage, setup:setup, monthly:monthly, fixedTerm:recurring*months, budget:monthly*months+setup, currency:provider.currency, quoted:quoted, minimum:minimum };
    } catch (e) { return { error:e.message }; }
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = { calculateCost:calculateCost };
  if (typeof document === 'undefined') return;
  var page = document.getElementById('dialer-guide');
  if (!page) return;
  var header = document.querySelector('.site-header');
  function offset() { if (header) page.style.setProperty('--lp-header-offset', Math.ceil(header.getBoundingClientRect().height) + 'px'); }
  offset(); if (header && typeof ResizeObserver !== 'undefined') new ResizeObserver(offset).observe(header);
  var providers = JSON.parse(document.getElementById('dc-provider-data').textContent);
  var form = document.getElementById('dc-form'), $ = function (id) { return document.getElementById('dc-' + id); };
  page.querySelectorAll('.dc-js-only').forEach(function (n) { n.hidden = false; });
  function current() { var p = providers.find(function (p) { return p.id === $('provider').value; }); return { provider:p, plan:p.plans.find(function (t) { return t.id === $('plan').value; }) }; }
  function options(select, items) { select.replaceChildren(); items.forEach(function (item) { var opt=document.createElement('option'); opt.value=item[0]; opt.textContent=item[1]; select.appendChild(opt); }); }
  function updatePlans() { var p = providers.find(function (p) { return p.id === $('provider').value; }); ['seat-addon','team-addon','phone-cost','usage-cost','units','unit-price','setup'].forEach(function (id) { $(id).value='0'; }); options($('plan'),p.plans.map(function (t) { return [t.id,t.name]; })); updateBilling(); }
  function updateBilling() { var p=current().plan, old=$('billing').value; options($('billing'),Object.keys(p.rates).map(function (key) { return [key, key==='annual'?'Annual price basis':'Monthly price basis']; })); if (Object.prototype.hasOwnProperty.call(p.rates,old)) $('billing').value=old; else $('billing').value='monthly'; configure(); }
  function configure() {
    var c=current(), rate=c.plan.rates[$('billing').value], quote=rate===null;
    $('minimum').value=c.plan.min===null?'':c.plan.min; $('minimum').min=c.plan.min || 1;
    $('quote-fields').hidden=!quote; $('seat-price-field').hidden=quote || rate.seat!==null;
    $('licences-field').hidden=c.provider.id!=='mojo'; $('reps-label').textContent=c.provider.id==='mojo'?'Access users':'Active callers';
    $('licences').value=$('reps').value;
    ['quote-price','seat-price','months'].forEach(function (id) { $(id).value=''; });
    $('note').textContent=c.plan.note;
    $('currency').textContent=c.provider.currency==='quote'?'Use the same currency as your quote for every input. No currency conversion.':c.provider.currency==='vendor $'?'Published vendor dollars. Confirm billing currency; use it for all extras. No currency conversion.':'All amounts in USD. No currency conversion.';
    var label=quote?'Enter the quoted rate below.':rate.seat===null?'Paid seat rate required'+(rate.team?' + USD '+rate.team+'/team/month':''):(c.provider.currency==='USD'?'USD ':'$ ')+rate.seat+'/paid seat/month'+(rate.dialer?' + $ '+rate.dialer+'/dialler licence/month':'');
    $('preset').textContent=label; $('source').href=c.provider.sources[0].url; $('source').textContent='Check the '+c.provider.name+' source ↗';
    calculate();
  }
  function read() { var values={}; ['provider','plan','billing','reps','minimum','months','licences','seat-price','quote-unit','quote-price','seat-addon','team-addon','phone-cost','usage-mode','usage-cost','units','unit-price','setup'].forEach(function (key) { values[key.replace(/-([a-z])/g,function (_,v) { return v.toUpperCase(); })]=$(key).value; }); return values; }
  function money(n,currency) { return (currency==='quote'?'Quote currency ':currency==='vendor $'?'Vendor $ ':'USD ') + n.toLocaleString('en-CA',{minimumFractionDigits:2,maximumFractionDigits:2}); }
  function calculate() {
    $('usage-total-field').hidden=$('usage-mode').value!=='total'; $('usage-units-fields').hidden=$('usage-mode').value!=='units';
    var r=calculateCost(providers,read()); $('error').textContent=r.error || '';
    if (r.error) { $('monthly').textContent='Inputs needed'; $('term').textContent='No estimate yet'; $('breakdown').textContent='Complete the fields above. A missing quote is never treated as free.'; $('budget').textContent='—'; return; }
    $('monthly').textContent=money(r.monthly,r.currency);
    $('term').textContent=r.months+'-month planning term';
    $('budget').textContent=money(r.budget,r.currency);
    $('breakdown').textContent=r.seats+' paid seats for '+r.reps+(r.licences?' access users · '+r.licences+' dialler licences':' active callers')+'. Base '+money(r.base,r.currency)+'/month. Recurring extras '+money(r.extras,r.currency)+'/month. Usage '+money(r.usage,r.currency)+'/month. One-time fees '+money(r.setup,r.currency)+'. Fixed recurring cost over '+r.months+(r.months===1?' month: ':' months: ')+money(r.fixedTerm,r.currency)+'.'+(r.usage===0?' Usage is set to zero; add expected charges if your allowance does not cover them.':'');
  }
  $('provider').addEventListener('change',updatePlans); $('plan').addEventListener('change',updateBilling); $('billing').addEventListener('change',configure);
  form.addEventListener('input',calculate); form.addEventListener('change',calculate); form.addEventListener('submit',function (e) { e.preventDefault(); calculate(); });
  page.querySelectorAll('[data-dc-reps]').forEach(function (button) { button.addEventListener('click',function () { $('reps').value=button.dataset.dcReps; $('licences').value=button.dataset.dcReps; calculate(); }); });
  form.addEventListener('reset',function (event) { event.preventDefault(); $('provider').value='close'; $('reps').value='3'; $('quote-unit').value='seat'; $('usage-mode').value='total'; updatePlans(); $('billing').value='annual'; configure(); });
  page.querySelectorAll('[data-dc-copy]').forEach(function (button) { button.addEventListener('click',async function () {
    var content=document.getElementById(button.dataset.dcCopy), status=document.getElementById(button.dataset.dcStatus);
    try { if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable'); await navigator.clipboard.writeText(content.innerText); status.textContent='Copied. Paste it into your notes or a document.'; }
    catch (_) { var range=document.createRange(); range.selectNodeContents(content); var s=window.getSelection(); s.removeAllRanges(); s.addRange(range); status.textContent='Text selected. Use your browser’s Copy command.'; }
  }); });
  updatePlans();
}());
