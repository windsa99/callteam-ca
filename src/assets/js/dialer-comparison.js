(function () {
  'use strict';
  function callerCount(value) {
    if (value === null || value === undefined || String(value).trim() === '') throw new Error('Enter the number of callers.');
    var n = Number(value);
    if (!['string','number'].includes(typeof value) || !Number.isSafeInteger(n) || n < 1 || n > 10000) throw new Error('Use a whole number from 1 to 10,000 for callers.');
    return n;
  }
  function calculateCost(providers, input) {
    try {
      var provider = providers.find(function (p) { return p.id === input.provider; });
      if (!provider) throw new Error('Choose a provider.');
      var plan = provider.plans.find(function (p) { return p.id === input.plan; });
      if (!plan || !Object.prototype.hasOwnProperty.call(plan.rates, input.billing)) throw new Error('Choose an available plan and billing option.');
      var reps = callerCount(input.reps), rate = plan.rates[input.billing];
      var result = { kind:'quote', reps:reps, minimum:plan.min, seats:null, licences:0, monthly:null, annual:null, currency:provider.currency, billing:input.billing };
      if (rate === null) return result;
      if (rate.seat === null) {
        result.kind = rate.team > 0 ? 'partial' : 'unconfirmed';
        if (result.kind === 'partial') result.monthly = rate.team;
        return result;
      }
      // Do not invent a total when the required seat purchase is unknown.
      if (plan.min === null) { result.kind = 'unconfirmed'; return result; }
      result.kind = 'estimate';
      result.seats = Math.max(reps, plan.min);
      // Simple Mojo setup: one access account and one concurrent dialler licence per caller.
      result.licences = provider.id === 'mojo' ? reps : 0;
      result.monthly = result.seats * rate.seat + rate.team + (rate.dialer || 0) * result.licences;
      result.annual = input.billing === 'annual' ? result.monthly * 12 : null;
      return result;
    } catch (e) { return { kind:'error', error:e.message, monthly:null, annual:null }; }
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
  function current() {
    var p = providers.find(function (p) { return p.id === $('provider').value; });
    return { provider:p, plan:p.plans.find(function (t) { return t.id === $('plan').value; }) };
  }
  function options(select, items) {
    select.replaceChildren();
    items.forEach(function (item) { var opt=document.createElement('option'); opt.value=item[0]; opt.textContent=item[1]; select.appendChild(opt); });
  }
  function updatePlans(billing) {
    var p = providers.find(function (p) { return p.id === $('provider').value; });
    options($('plan'),p.plans.map(function (t) { return [t.id,t.name]; }));
    updateBilling(billing);
  }
  function updateBilling(preferred) {
    var plan=current().plan, previous=preferred || $('billing').value;
    options($('billing'),Object.keys(plan.rates).map(function (key) { return [key,key==='annual'?'Annual pricing':'Monthly pricing']; }));
    $('billing').value=Object.prototype.hasOwnProperty.call(plan.rates,previous)?previous:'monthly';
    configure();
  }
  function configure() {
    var c=current();
    $('note').textContent=c.plan.note;
    $('source').href=c.provider.sources[0].url;
    $('source').textContent='Check '+c.provider.name+' pricing ↗';
    calculate();
  }
  function money(n,currency) { return (currency==='vendor $'?'Vendor $ ':'USD ') + n.toLocaleString('en-CA',{minimumFractionDigits:2,maximumFractionDigits:2}); }
  function calculate() {
    var c=current(), r=calculateCost(providers,{provider:c.provider.id,plan:c.plan.id,billing:$('billing').value,reps:$('reps').value});
    $('error').textContent=r.error || '';
    $('reps').setAttribute('aria-invalid',String(r.kind==='error'));
    $('annual-wrap').hidden=true;
    $('budget').textContent='—';
    $('monthly').classList.toggle('dc-message',r.kind==='quote' || r.kind==='unconfirmed' || r.kind==='error');
    $('result-label').textContent='Base subscription estimate';
    $('result-note').textContent='';
    if (r.kind==='error') {
      $('monthly').textContent='Check caller count'; $('basis').textContent=''; $('breakdown').textContent='Enter a valid team size to see the result.'; return;
    }
    if (r.kind==='quote' || r.kind==='unconfirmed') {
      $('monthly').textContent=r.kind==='quote'?'Custom quote required':'Price needs confirmation';
      $('basis').textContent=r.kind==='quote'?'No public subscription price.':'We have not verified this billing rate.';
      $('breakdown').textContent=r.minimum===null?'Seat minimum also needs confirmation.':'Published minimum: '+r.minimum+' paid seats.'+(r.reps<r.minimum?' That minimum still applies to your '+r.reps+(r.reps===1?' caller.':' callers.'):'');
      $('result-note').textContent='Check the current offer with '+c.provider.name+'.'; return;
    }
    $('monthly').textContent=money(r.monthly,r.currency);
    $('basis').textContent=r.billing==='annual'?'per month on annual pricing':'per month on monthly pricing';
    if (r.kind==='partial') {
      $('result-label').textContent='Advanced Dialer add-on only';
      $('breakdown').textContent='One team add-on, regardless of the '+r.reps+(r.reps===1?' caller selected.':' callers selected.');
      $('result-note').textContent='Paid Apollo plan and usage are extra. This is not the total subscription price.'; return;
    }
    var rate=c.plan.rates[r.billing];
    $('breakdown').textContent=r.licences ? 'Assumes one access account and one dialler licence per caller. Sharing licences changes the cost.' : r.seats+' paid '+(r.seats===1?'seat':'seats')+' × '+money(rate.seat,r.currency)+'.'+(r.seats>r.reps?' The '+r.minimum+'-seat minimum applies.':'');
    if (r.annual!==null) { $('annual-wrap').hidden=false; $('budget').textContent=money(r.annual,r.currency); }
    $('result-note').textContent='Before tax. Usage and optional extras are excluded.'+(r.currency==='vendor $'?' Confirm billing currency.':'');
  }
  $('provider').addEventListener('change',function () { updatePlans(); });
  $('plan').addEventListener('change',function () { updateBilling(); });
  $('billing').addEventListener('change',configure);
  $('reps').addEventListener('input',calculate);
  form.addEventListener('submit',function (e) { e.preventDefault(); calculate(); });
  form.addEventListener('reset',function (e) { e.preventDefault(); $('provider').value='close'; $('reps').value='3'; updatePlans('annual'); });
  page.querySelectorAll('[data-dc-copy]').forEach(function (button) { button.addEventListener('click',async function () {
    var content=document.getElementById(button.dataset.dcCopy), status=document.getElementById(button.dataset.dcStatus);
    try { if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable'); await navigator.clipboard.writeText(content.innerText); status.textContent='Copied. Paste it into your notes or a document.'; }
    catch (_) { var range=document.createRange(); range.selectNodeContents(content); var s=window.getSelection(); s.removeAllRanges(); s.addRange(range); status.textContent='Text selected. Use your browser’s Copy command.'; }
  }); });
  updatePlans('annual');
}());
