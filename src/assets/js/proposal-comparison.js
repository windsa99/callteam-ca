(function () {
  'use strict';
  const root = document.querySelector('.proposal-page');
  const model = window.CallTeamProposalModel;
  if (!root || !model) return;
  const get = id => document.getElementById('pc-' + id);
  const cards = Array.from(root.querySelectorAll('[data-proposal]'));
  let current = null;
  let example = false;
  let started = false;
  const labels = {
    billing: { monthly: 'Calendar month', fourWeeks: 'Every four weeks', oneTime: 'One-time package' },
    meetingUnit: { booked: 'Meeting booked', held: 'Meeting attended', accepted: 'Meeting accepted by sales', lead: 'Lead or contact', unknown: 'Not stated' },
    volumeType: { target: 'Agency target', minimum: 'Written minimum', estimate: 'Personal scenario', unknown: 'Not stated' },
    qualification: { written: 'Criteria agreed in writing', partial: 'Partly described', unknown: 'Not stated' },
    replacements: { replace: 'Replacement included', credit: 'Refund or credit', reschedule: 'Reschedule only', charged: 'Still charged', unknown: 'Not stated' },
    ownership: { export: 'Export / retain agreed records', limited: 'Limited access or retention', unknown: 'Not stated' },
    reporting: { crm: 'CRM records and activity', report: 'Summary report', unknown: 'Not stated' },
    notice: { none: 'No notice period', '30': '30 days', '60': '60 days', unknown: 'Not stated' },
    channels: { phone: 'Cold calling', email: 'Email outreach', linkedin: 'LinkedIn', research: 'List research', followup: 'Follow-up' }
  };
  const unitLabels = { booked: 'booked meeting', held: 'attended meeting', accepted: 'sales-accepted meeting', lead: 'lead or contact', unknown: 'result' };
  function node(tag, text, cls) {
    const el = document.createElement(tag);
    if (text !== undefined) el.textContent = text;
    if (cls) el.className = cls;
    return el;
  }
  function announce(text) { get('status').textContent = text; }
  function track(event) {
    // Event names only. Never include proposal names, terms, amounts or output.
    if (!window.CALLTEAM_LOCAL_PREVIEW && typeof window.clarity === 'function') window.clarity('event', event);
  }
  function money(value) {
    if (value === null || value === undefined) return 'Not stated';
    return (current.currency === 'CAD' ? 'CA$' : 'US$') + new Intl.NumberFormat('en-US', { minimumFractionDigits: Number.isInteger(value) ? 0 : 2, maximumFractionDigits: 2 }).format(value);
  }
  function readInput() {
    return { currency: get('currency').value, months: get('months').value, proposals: cards.filter(c => !c.hidden).map(card => {
      const proposal = {};
      card.querySelectorAll('[data-field]').forEach(el => { proposal[el.dataset.field] = el.value; });
      proposal.channels = Array.from(card.querySelectorAll('[data-channel]:checked')).map(el => el.dataset.channel);
      return proposal;
    }) };
  }
  function clearErrors() {
    get('error').hidden = true;
    get('error').textContent = '';
    root.querySelectorAll('[aria-invalid]').forEach(el => el.removeAttribute('aria-invalid'));
  }
  function showError(message, field) {
    get('error').textContent = message;
    get('error').hidden = false;
    if (field) {
      field.setAttribute('aria-invalid', 'true');
      const details = field.closest('details');
      if (details) details.open = true;
      field.focus();
    }
    announce(message);
  }
  function invalidate() {
    current = null;
    get('results').hidden = true;
    get('copy-text').hidden = true;
    get('copy-text').value = '';
    clearErrors();
  }
  function markEdited() {
    invalidate();
    example = false;
    get('demo-note').hidden = true;
    if (!started) { track('proposal_comparison_started'); started = true; }
    announce('Entries updated. Select Compare my proposals to refresh the comparison.');
  }
  function periodLabels() {
    const months = get('months').value;
    const phrase = months + (months === '1' ? ' month' : ' months');
    cards.forEach(card => {
      const i = card.dataset.proposal;
      root.querySelector('label[for="pc-' + i + '-units"]').textContent = 'Result count across ' + phrase;
      root.querySelector('label[for="pc-' + i + '-extras"]').textContent = 'Other costs across ' + phrase;
    });
  }
  function addRow(dl, key, value) {
    const row = node('div'); row.append(node('dt', key), node('dd', value)); dl.append(row);
  }
  function makeResultCard(proposal) {
    const el = node('article', undefined, 'pc-result-card');
    el.append(node('h3', proposal.name), node('span', (proposal.billing === 'fourWeeks' ? 'Estimated known cost across ' : 'Known cost across ') + current.months + (current.months === 1 ? ' month' : ' months'), 'pc-cost-label'), node('strong', proposal.knownCost === null ? 'Cost not stated' : money(proposal.knownCost), 'pc-cost'));
    el.append(node('p', proposal.completeCost ? 'All cost fields supplied. Based on your entered scope and volume.' : 'Partial subtotal. Unconfirmed costs are excluded.', 'pc-cost-status'));
    const breakdown = node('dl');
    proposal.breakdown.forEach(item => addRow(breakdown, item.label, money(item.amount)));
    el.append(breakdown);
    const termLabel = proposal.billing === 'oneTime' ? 'Fixed package + setup' : (proposal.billing === 'fourWeeks' ? 'Estimated fixed fee + setup for minimum term' : 'Fixed fee + setup for minimum term');
    if (proposal.fixedTermCost !== null) el.append(node('p', termLabel + ': ' + money(proposal.fixedTermCost) + '. Other and per-result charges excluded.'));
    if (proposal.costPerResult !== null) el.append(node('p', 'Scenario cost per ' + unitLabels[proposal.meetingUnit] + ': ' + money(proposal.costPerResult) + '. ' + (proposal.volumeType === 'unknown' ? 'Based on ' + proposal.units + ' entered results; the volume basis is not stated.' : 'Based on the entered ' + labels.volumeType[proposal.volumeType].toLowerCase() + ' of ' + proposal.units + ' results.')));
    if (proposal.notes.length) {
      const details = node('details'); details.append(node('summary', 'Assumptions and terms to check'));
      const ul = node('ul'); proposal.notes.forEach(text => ul.append(node('li', text))); details.append(ul); el.append(details);
    }
    return el;
  }
  function scopeRows() {
    return [
      ['Billing basis', p => labels.billing[p.billing]],
      ['Minimum term', p => p.minMonths === null ? 'Not stated' : p.minMonths === 0 ? 'No multi-month minimum entered' : p.minMonths + ' months'],
      ['Cancellation notice', p => labels.notice[p.notice]],
      ['Result definition', p => labels.meetingUnit[p.meetingUnit]],
      ['Results for this period', p => p.units === null ? 'Not stated' : p.units + ' (' + labels.volumeType[p.volumeType].toLowerCase() + ')'],
      ['Confirmed activities', p => p.channels.length ? p.channels.map(c => labels.channels[c]).join(', ') : 'Not stated'],
      ['Qualification', p => labels.qualification[p.qualification]],
      ['No-shows / wrong fit', p => labels.replacements[p.replacements]],
      ['Data and notes', p => labels.ownership[p.ownership]],
      ['Reporting and handoff', p => labels.reporting[p.reporting]]
    ];
  }
  function render() {
    get('result-period').textContent = current.currency + ' / ' + current.months + (current.months === 1 ? ' month' : ' months');
    get('result-intro').textContent = example ? 'Fictional example. Compare the costs, then check how the result definitions and terms differ.' : 'Built from the details you entered. Check the open items before treating the totals as a complete budget.';
    get('notices').replaceChildren(...current.notices.map(text => node('p', text)));
    get('result-cards').classList.toggle('pc-has-three', current.proposals.length === 3);
    get('result-cards').replaceChildren(...current.proposals.map(makeResultCard));
    const table = node('table'); table.append(node('caption', 'What each proposal includes'));
    const head = node('thead'); const heading = node('tr'); const criterion = node('th', 'Scope or term'); criterion.scope = 'col'; heading.append(criterion);
    current.proposals.forEach(p => { const th = node('th', p.name); th.scope = 'col'; heading.append(th); }); head.append(heading); table.append(head);
    const body = node('tbody'); scopeRows().forEach(([label, value]) => { const tr = node('tr'); const th = node('th', label); th.scope = 'row'; tr.append(th); current.proposals.forEach(p => tr.append(node('td', value(p)))); body.append(tr); }); table.append(body); get('scope-comparison').replaceChildren(table);
    get('question-cards').classList.toggle('pc-has-three', current.proposals.length === 3);
    get('question-cards').replaceChildren(...current.proposals.map(p => {
      const article = node('article', undefined, 'pc-question-card'); article.append(node('h3', 'Ask ' + p.name));
      if (p.questions.length) { article.append(node('p', 'Priority questions based on your entries')); const ol = node('ol'); p.questions.forEach(text => ol.append(node('li', text))); article.append(ol); }
      else article.append(node('p', 'The main terms are stated. Ask for a relevant campaign example and confirm who owns follow-up after each meeting.'));
      return article;
    }));
    get('results').hidden = false;
    announce('Comparison ready for ' + current.proposals.length + ' proposals.');
    get('result-title').focus({ preventScroll: true });
    get('results').scrollIntoView({ block: 'start', behavior: 'auto' });
  }
  function compare(isExample) {
    clearErrors();
    const bad = Array.from(get('tool').querySelectorAll('input[type="number"]')).find(el => !el.closest('fieldset[data-proposal]').hidden && !el.validity.valid);
    if (bad) {
      invalidate();
      showError('Check ' + root.querySelector('label[for="' + bad.id + '"]').textContent.toLowerCase() + '. Use a valid non-negative number within the displayed limits.', bad);
      return;
    }
    const input = readInput();
    const empty = input.proposals.findIndex(p => !Object.keys(p).some(key => !['name','billing','channels'].includes(key) && p[key] !== '' && p[key] !== 'unknown') && !p.channels.length);
    if (empty !== -1) { invalidate(); showError('Add a price or scope detail for Proposal ' + String.fromCharCode(65 + empty) + ' to start the comparison.', cards[empty].querySelector('[data-field="fee"]')); return; }
    const result = model.analyze(input);
    if (!result.ok) {
      invalidate(); const first = result.errors[0]; const field = first.proposal === null ? get(first.field) : cards[first.proposal].querySelector('[data-field="' + first.field + '"]');
      showError((first.proposal === null ? '' : 'Proposal ' + String.fromCharCode(65 + first.proposal) + ': ') + first.message, field); return;
    }
    current = result;
    render();
    track(isExample ? 'proposal_example_loaded' : 'proposal_comparison_completed');
  }
  function setThird(visible) {
    cards[2].hidden = !visible; cards[2].disabled = !visible;
    get('proposals').classList.toggle('pc-has-three', visible); get('add').hidden = visible;
  }
  function fill(input) {
    get('currency').value = input.currency; get('months').value = String(input.months);
    setThird(input.proposals.length === 3);
    cards.forEach((card, i) => {
      const p = input.proposals[i] || {};
      card.querySelectorAll('[data-field]').forEach(el => {
        if (p[el.dataset.field] !== undefined && p[el.dataset.field] !== null) el.value = p[el.dataset.field];
        else if (el.tagName === 'SELECT') el.selectedIndex = 0;
        else el.value = '';
      });
      card.querySelectorAll('[data-channel]').forEach(el => { el.checked = !!(p.channels || []).includes(el.dataset.channel); });
    });
    periodLabels();
  }
  function textComparison() {
    if (!current) return '';
    const lines = ['CallTeam Agency Proposal Comparison', current.currency + ' | ' + current.months + ' month comparison', example ? 'FICTIONAL EXAMPLE' : 'Based on entered proposal details', ''];
    lines.push(...current.notices, '');
    current.proposals.forEach(p => {
      lines.push(p.name, (p.billing === 'fourWeeks' ? 'Estimated known cost: ' : 'Known cost: ') + money(p.knownCost) + (p.completeCost ? ' (all cost inputs supplied)' : ' (partial subtotal)'), ...p.breakdown.map(row => row.label + ': ' + money(row.amount)));
      if (p.fixedTermCost !== null) lines.push((p.billing === 'fourWeeks' ? 'Estimated fixed minimum-term cost: ' : 'Fixed minimum-term / package cost: ') + money(p.fixedTermCost) + ' (fixed fee and setup only)');
      if (p.costPerResult !== null) lines.push('Scenario cost per ' + unitLabels[p.meetingUnit] + ': ' + money(p.costPerResult));
      scopeRows().forEach(([label, value]) => lines.push(label + ': ' + value(p)));
      lines.push('Questions to ask:', ...(p.questions.length ? p.questions.map((q,i) => (i+1) + '. ' + q) : ['Ask for relevant campaign evidence and confirm post-meeting follow-up.']), 'Assumptions:', ...p.notes, '');
    });
    lines.push('Method: https://www.callteam.ca/lead-generation-proposal-comparison/#pc-method', 'Book a campaign scope call: https://calendly.com/hello-callteam/new-meeting', 'Entries are not automatically sent to CallTeam.');
    return lines.join('\n');
  }
  get('compare').addEventListener('click', () => compare(example));
  get('tool').addEventListener('input', event => { if (event.target.matches('input')) markEdited(); });
  get('tool').addEventListener('change', event => {
    if (event.target.matches('select,input[type="checkbox"]')) markEdited();
    if (event.target.id === 'pc-months') { periodLabels(); get('error').textContent = 'Period changed. Review result counts and other costs so they cover the full selected period.'; get('error').hidden = false; }
  });
  get('tool').addEventListener('keydown', event => { if (event.key === 'Enter' && event.target.matches('input:not([type="checkbox"])')) { event.preventDefault(); compare(example); } });
  get('add').addEventListener('click', () => { markEdited(); setThird(true); cards[2].querySelector('[data-field="name"]').focus(); announce('Proposal C added.'); });
  get('remove').addEventListener('click', () => { markEdited(); setThird(false); get('add').focus(); announce('Proposal C removed from comparison.'); });
  get('clear').addEventListener('click', () => { invalidate(); example = false; started = false; get('demo-note').hidden = true; fill({currency:'USD',months:3,proposals:[{},{}]}); cards.forEach(card => { card.querySelector('details').open = false; }); cards[0].querySelector('[data-field="name"]').focus(); announce('Entries cleared.'); });
  root.querySelectorAll('[data-pc-example]').forEach(button => button.addEventListener('click', () => { invalidate(); fill(model.examples()); example = true; get('demo-note').hidden = false; compare(true); }));
  get('copy').addEventListener('click', async () => {
    if (!current) return;
    const text = textComparison();
    try { if (!navigator.clipboard || !navigator.clipboard.writeText) throw new Error('Clipboard unavailable'); await navigator.clipboard.writeText(text); announce('Comparison and questions copied.'); }
    catch (_) { get('copy-text').value = text; get('copy-text').hidden = false; get('copy-text').focus(); get('copy-text').select(); announce('Select and copy the comparison text below.'); }
    track('proposal_comparison_copy');
  });
  get('print').addEventListener('click', () => {
    if (!current) return;
    const details = Array.from(get('results').querySelectorAll('details'));
    const states = details.map(el => el.open); details.forEach(el => { el.open = true; });
    const restore = () => details.forEach((el,i) => { el.open = states[i]; });
    window.addEventListener('afterprint', restore, {once:true});
    track('proposal_comparison_print'); window.print();
  });
  root.querySelectorAll('[data-pc-booking]').forEach(link => link.addEventListener('click', () => track('proposal_booking_clicked')));
  [get('compare'),get('add'),get('clear'),...root.querySelectorAll('[data-pc-example]')].forEach(button => { button.disabled = false; });
  periodLabels();
})();
