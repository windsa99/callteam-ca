(function () {
  'use strict';
  const root = document.getElementById('roi-calculator');
  const model = window.CallTeamROI;
  if (!root || !model) return;

  const fields = Object.keys(model.DEFAULTS);
  const controls = Object.fromEntries(fields.map(key => [key, document.getElementById('roi-' + key)]));
  const byId = id => document.getElementById('roi-' + id);
  const actions = ['copy', 'print', 'inquiry'];
  const number = (value, decimals = 2) => new Intl.NumberFormat('en-US', { maximumFractionDigits: decimals }).format(value);
  const money = value => (value < 0 ? '−US$' : 'US$') + number(Math.abs(value));
  const percent = value => value === null ? 'Not applicable' : Math.abs(value) > 0 && Math.abs(value) < 0.1 ? (value < 0 ? '−' : '') + '<0.1%' : number(value, 1) + '%';
  const wins = value => value > 0 && value < 0.01 ? '<0.01' : number(value);
  let current = null;
  let announcement;
  let started = false;
  let inquirySummary = '';

  function track(event) {
    // Only named actions are sent. Never send financial inputs or contact details.
    if (typeof window.clarity === 'function') window.clarity('event', event);
  }

  function announce(message) {
    window.clearTimeout(announcement);
    announcement = window.setTimeout(() => { byId('status').textContent = message; }, 350);
  }

  function setOutput(key, value) {
    root.querySelectorAll('[data-roi-output="' + key + '"]').forEach(node => { node.textContent = value; });
  }

  function summaryText(result) {
    const i = result.inputs;
    return [
      'CallTeam outbound campaign scenario (USD)',
      'Illustrative estimate, not a quote or guaranteed outcome.',
      'Campaign: ' + i.months + ' months × ' + money(i.monthlyCost) + '/month; additional acquisition costs ' + money(i.extraCosts) + '.',
      'Qualified meetings held across the campaign: ' + number(i.meetings) + '; held-meeting close rate: ' + percent(i.closeRate) + '.',
      'First-year revenue per customer: ' + money(i.customerRevenue) + '; gross margin: ' + percent(i.grossMargin) + '.',
      'Total campaign cost: ' + money(result.totalCost) + '.',
      'Modelled customers: ' + wins(result.expectedWins) + '; first-year customer revenue: ' + money(result.revenue) + '.',
      'Gross profit before campaign cost: ' + money(result.grossProfit) + '.',
      'Gross profit after campaign cost: ' + money(result.contribution) + '; projected campaign ROI: ' + percent(result.roiPercent) + '.',
      'Whole customers to cover campaign cost: ' + (result.breakEvenCustomers === null ? 'No finite break-even at these inputs' : number(result.breakEvenCustomers)) + '.',
      'Revenue covers each acquired customer’s first 12 months. Deals and payments can arrive after the campaign. Other overhead and taxes are excluded.',
      'https://www.callteam.ca/b2b-lead-generation-roi-calculator/'
    ].join('\n');
  }

  function renderScenarios(result) {
    const container = byId('scenarios');
    const table = document.createElement('table');
    const caption = document.createElement('caption');
    caption.textContent = 'Change only the close rate. All other inputs stay the same.';
    table.append(caption);
    const thead = document.createElement('thead');
    const heading = document.createElement('tr');
    ['Scenario', 'Close rate', 'Customers', 'After campaign cost', 'ROI'].forEach(label => {
      const th = document.createElement('th'); th.scope = 'col'; th.textContent = label; heading.append(th);
    });
    thead.append(heading); table.append(thead);
    const tbody = document.createElement('tbody');
    [ ['Half your close rate', result.inputs.closeRate * 0.5], ['Your inputs', result.inputs.closeRate], ['1.5× your close rate (max 100%)', Math.min(100, result.inputs.closeRate * 1.5)] ].forEach(([label, closeRate]) => {
      const scenario = model.calculate({ ...result.inputs, closeRate });
      const row = document.createElement('tr');
      if (label === 'Your inputs') row.className = 'roi-scenario-current';
      [label, percent(closeRate), wins(scenario.expectedWins), money(scenario.contribution), percent(scenario.roiPercent)].forEach((value, index) => {
        const cell = document.createElement(index === 0 ? 'th' : 'td');
        if (index === 0) cell.scope = 'row';
        cell.textContent = value; row.append(cell);
      });
      tbody.append(row);
    });
    table.append(tbody); container.replaceChildren(table);
  }

  function renderImprovement(result) {
    const container = byId('improvement');
    container.hidden = false;
    const title = document.createElement('h3');
    title.textContent = result.contribution >= 0 ? 'Know the numbers that make it work.' : 'What would need to improve?';
    const note = document.createElement('p');
    note.textContent = 'Each target below changes one input while keeping the others fixed. These are planning thresholds, not delivery commitments.';
    const list = document.createElement('ul');
    const targets = [
      result.breakEvenCloseRate === null ? 'A close-rate target needs meetings and positive gross profit per customer.' : result.breakEvenCloseRate > 100 ? 'The required close rate exceeds 100%. Increase meeting volume or gross profit per customer, or reduce campaign cost.' : 'Close-rate target to cover spend: ' + percent(result.breakEvenCloseRate) + '.',
      result.breakEvenRevenuePerCustomer === null ? 'A deal-value target needs expected customers and a positive gross margin.' : 'First-year revenue needed per customer: ' + money(result.breakEvenRevenuePerCustomer) + '.',
      result.breakEvenMarginPercent === null ? 'A margin target needs positive projected customer revenue.' : result.breakEvenMarginPercent > 100 ? 'Margin alone cannot cover this scenario: the required margin exceeds 100%.' : 'Gross-margin target to cover spend: ' + percent(result.breakEvenMarginPercent) + '.'
    ];
    if (result.totalCost === 0) targets.splice(0, targets.length, 'Enter the full campaign investment to make this a useful purchasing decision. Percentage ROI is undefined at zero cost.');
    targets.forEach(text => { const item = document.createElement('li'); item.textContent = text; list.append(item); });
    container.replaceChildren(title, note, list);
  }

  function update(interacted) {
    const input = {};
    let error = '';
    fields.forEach(key => {
      const control = controls[key];
      const valid = control.value.trim() !== '' && Number.isFinite(control.valueAsNumber) && control.checkValidity();
      control.setAttribute('aria-invalid', valid ? 'false' : 'true');
      if (!valid && control.closest('details')) control.closest('details').open = true;
      if (!valid && !error) error = 'Check ' + (control.labels[0]?.textContent.trim() || key) + '. Enter ' + (control.step === '1' ? 'a whole number' : 'a number in increments of ' + control.step) + ' from ' + number(Number(control.min)) + ' to ' + number(Number(control.max)) + '.';
      input[key] = control.valueAsNumber;
    });
    try {
      if (error) throw new Error(error);
      current = model.calculate(input);
    } catch (failure) {
      current = null;
      byId('error').hidden = false;
      byId('error').textContent = error || failure.message;
      root.querySelectorAll('[data-roi-output]').forEach(node => { node.textContent = '—'; });
      byId('result-summary').textContent = 'Complete the highlighted inputs to see your result.';
      byId('result-cta-copy').textContent = 'Need help choosing your assumptions? Book a time with CallTeam and let’s work through your campaign.';
      byId('scenarios').replaceChildren();
      byId('improvement').replaceChildren();
      byId('improvement').hidden = true;
      byId('results').dataset.state = 'invalid';
      actions.forEach(id => { byId(id).disabled = true; });
      byId('copy-text').hidden = true;
      announce('Calculation paused. ' + byId('error').textContent);
      return;
    }
    const r = current;
    byId('error').hidden = true;
    byId('error').textContent = '';
    actions.forEach(id => { byId(id).disabled = false; });
    byId('copy-text').hidden = true;
    setOutput('cost', money(r.totalCost));
    setOutput('wins', wins(r.expectedWins));
    setOutput('revenue', money(r.revenue));
    setOutput('grossProfit', money(r.grossProfit));
    setOutput('contribution', money(r.contribution));
    setOutput('roi', percent(r.roiPercent));
    setOutput('breakEvenCustomers', r.breakEvenCustomers === null ? 'No finite target' : number(r.breakEvenCustomers));
    const state = r.totalCost === 0 ? 'zero-cost' : r.contribution > 0 ? 'positive' : r.contribution < 0 ? 'negative' : 'break-even';
    byId('results').dataset.state = state;
    byId('result-summary').textContent = r.totalCost === 0 ? 'Add your campaign investment to calculate percentage ROI.' : r.breakEvenCustomers === null ? 'These inputs produce no gross profit per customer. Update your deal value or margin to find a break-even point.' : number(r.breakEvenCustomers) + ' new ' + (r.breakEvenCustomers === 1 ? 'customer would' : 'customers would') + ' cover your campaign investment under these assumptions.';
    byId('result-cta-copy').textContent = state === 'positive' ? 'Your numbers show room for a profitable campaign. Book a time with CallTeam. Let us show you how we can help you get there.' : state === 'break-even' ? 'Your scenario covers the campaign cost. Book a time with CallTeam and let’s build a plan with more room for return.' : state === 'negative' ? 'Now you know the target. Book a time with CallTeam. Let’s sharpen the market, offer and campaign economics before you invest.' : 'Put a clear investment behind your growth plan. Book a time with CallTeam and let’s scope the right campaign.';
    renderScenarios(r);
    renderImprovement(r);
    if (interacted) {
      announce('Results updated. ' + byId('result-summary').textContent + ' Projected ROI ' + percent(r.roiPercent) + '.');
      if (!started) { track('roi_calculator_started'); track('roi_scenario_calculated'); started = true; }
    }
  }

  fields.forEach(key => {
    controls[key].addEventListener('input', () => update(true));
    controls[key].addEventListener('change', () => update(true));
  });
  byId('reset').disabled = false;
  byId('reset').addEventListener('click', () => {
    fields.forEach(key => { controls[key].value = model.DEFAULTS[key]; });
    update(true); announce('Example restored.'); track('roi_example_reset');
  });
  byId('copy').addEventListener('click', async () => {
    if (!current) return;
    const text = summaryText(current);
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(text);
      announce('Your scenario has been copied.');
    } catch (_) {
      const area = byId('copy-text');
      area.value = text; area.hidden = false; area.focus(); area.select();
      announce('Your scenario is selected below. Use your device’s Copy command.');
    }
    track('roi_summary_copy');
  });
  byId('print').addEventListener('click', () => { if (current) { track('roi_summary_print'); window.print(); } });
  byId('inquiry').addEventListener('click', () => {
    if (!current) return;
    const message = document.querySelector('.contact-form textarea[name="message"]');
    if (!message) return;
    let existing = message.value;
    if (inquirySummary && existing.includes(inquirySummary)) existing = existing.replace(inquirySummary, '').trim();
    inquirySummary = 'I’d like to discuss this campaign with CallTeam.\n\n' + summaryText(current);
    message.value = existing ? existing + '\n\n' + inquirySummary : inquirySummary;
    message.dispatchEvent(new Event('input', { bubbles: true }));
    document.getElementById('contact').scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    message.focus({ preventScroll: true });
    announce('Your scenario is in the inquiry form. Add your contact details and choose Send Message when ready.');
    track('roi_inquiry_prepared');
  });
  document.querySelectorAll('[data-roi-booking]').forEach(link => link.addEventListener('click', () => track('roi_booking_clicked')));
  update(false);
})();
