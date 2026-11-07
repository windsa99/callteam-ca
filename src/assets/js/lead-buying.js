(function () {
  'use strict';
  var names = {mobile: 'mobile', direct: 'work direct line', company: 'company or local branch number'};
  function recommendNextCall(input) {
    var person = input.person, outcome = input.outcome, last = input.last || '';
    if (!['known_mobile', 'known_desk', 'known_unknown', 'unknown'].includes(person) || !['new', 'unanswered', 'screened', 'wrong', 'callback', 'stop'].includes(outcome)) return {error: 'Choose the buyer situation and the latest outcome.'};
    if (outcome === 'stop') return {id: 'stop', route: null, title: 'Stop the calling sequence.', why: 'The latest outcome is a request not to call.', next: 'Record the request and apply it to the contact or account as requested. Keep it out of the calling queue. Do not switch numbers to work around it.'};
    if (outcome === 'callback') return {id: 'callback', route: null, title: 'Keep the agreed callback.', why: 'A requested callback takes priority over a generic calling order.', next: 'Record the agreed time, time zone and preferred number. Check the notes before calling. Do not add the contact to an unrelated retry queue.'};
    if (['unanswered', 'screened', 'wrong'].includes(outcome) && !Object.hasOwn(names, last)) return {error: 'Choose which route produced the last outcome.'};
    var available = ['mobile', 'direct', 'company'].filter(function (route) { return input[route] === true; });
    if (outcome === 'wrong') available = available.filter(function (route) { return route !== last; });
    if (person === 'unknown') {
      if (available.includes('company')) return {id: 'identify', route: 'company', title: 'Find the buyer through the company.', why: 'You still need to establish who handles this decision.', next: (outcome === 'wrong' ? 'Remove the confirmed wrong ' + names[last] + '. ' : '') + 'Use the relevant branch or company line to ask for the responsible role. If this route was just tried, schedule a later attempt. Save the name and extension you learn.'};
      return {id: 'research', route: null, title: 'Identify the buyer first.', why: 'There is no usable company route selected and the responsible person is still unknown.', next: (outcome === 'wrong' ? 'Remove the confirmed wrong number. ' : '') + 'Research the role and operating location, or find an appropriate company number. Confirm who the contact is before spending on another personal-number reveal.'};
    }
    if (outcome === 'screened' && available.includes(last)) return {id: 'screened', route: last, title: 'Prepare a clear screening response.', why: 'An automated screen answered on the ' + names[last] + '. That does not establish that the number is wrong.', next: 'At the next planned attempt, state your name, company and specific business reason, then follow the prompt. Record the final outcome. Keep any decline or stop request separate from screening.'};
    var order = person === 'known_mobile' ? ['mobile', 'direct', 'company'] : ['direct', 'mobile', 'company'];
    var route = order.find(function (key) { return available.includes(key) && !(outcome === 'unanswered' && key === last); });
    if (!route) route = order.find(function (key) { return available.includes(key); });
    if (!route) return {id: 'coverage', route: null, title: 'Fill this account’s contact gap.', why: outcome === 'wrong' ? 'The wrong number is excluded and no alternative route is available.' : 'No available route is selected for the intended buyer.', next: 'Confirm the account still fits. Research the current role and company contact details, then buy or enrich the specific missing field if needed. Start with a small sample.'};
    var fallback = order.find(function (key) { return key !== route && available.includes(key); });
    if (outcome === 'unanswered' && route === last) return {id: 'retry', route: route, title: 'Plan a later attempt on the ' + names[route] + '.', why: 'No answer or voicemail is not proof of a bad number, and no alternate route is selected.', next: 'Use another suitable business-time window within your campaign’s attempt policy. Keep the person’s preferences and scheduled callbacks. Review repeated outcomes before buying replacement data.'};
    var why = route === 'company' ? 'This is the available route into the account. Ask for the named buyer or confirm the responsible role.' : route === 'mobile' ? (person === 'known_mobile' ? 'You know the buyer and their work takes them away from a desk.' : 'You know the buyer and have a mobile selected, without a preferred work direct route available for this attempt.') : 'You know the buyer and have a specific work route available.';
    if (outcome === 'unanswered') why = 'The ' + names[last] + ' produced no answer or voicemail. A different suitable route is available for a later scheduled attempt.';
    if (outcome === 'wrong') why = 'Exclude the confirmed wrong ' + names[last] + '. The ' + names[route] + ' gives you another route to check.';
    return {id: outcome === 'new' ? 'first' : 'alternate', route: route, title: (outcome === 'new' ? 'Try the ' : 'Use the ') + names[route] + (outcome === 'new' ? ' first.' : ' on the next planned attempt.'), why: why, next: 'Confirm you reached the right person and record the outcome.' + (fallback ? ' If there is no conversation, consider the ' + names[fallback] + ' on a later scheduled attempt.' : ' If there is no conversation, set a later attempt or research another suitable route.') + ' Honour any callback or stop request.'};
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = {recommendNextCall: recommendNextCall};
  if (typeof document === 'undefined') return;
  var page = document.getElementById('lead-buying-guide');
  if (!page) return;
  var header = document.querySelector('.site-header');
  function offset() { if (header) page.style.setProperty('--lp-header-offset', Math.ceil(header.getBoundingClientRect().height) + 'px'); }
  offset();
  if (header && typeof ResizeObserver !== 'undefined') new ResizeObserver(offset).observe(header);
  else window.addEventListener('resize', offset);
  page.querySelectorAll('.lb-js-only').forEach(function (node) { node.hidden = false; });
  var form = document.getElementById('lb-route-form'), outcomeField = document.getElementById('lb-outcome'), lastWrap = document.getElementById('lb-last-wrap'), lastField = document.getElementById('lb-last');
  function update() {
    lastWrap.hidden = !['unanswered', 'screened', 'wrong'].includes(outcomeField.value);
    lastField.disabled = lastWrap.hidden;
    var result = recommendNextCall({person: document.getElementById('lb-person').value, outcome: outcomeField.value, last: lastWrap.hidden ? '' : lastField.value, mobile: document.getElementById('lb-mobile').checked, direct: document.getElementById('lb-direct').checked, company: document.getElementById('lb-company').checked});
    document.getElementById('lb-route-error').textContent = result.error || '';
    document.getElementById('lb-result-title').textContent = result.error ? 'Choose the last route.' : result.title;
    document.getElementById('lb-result-why').textContent = result.error ? 'The next step depends on which number you already tried.' : result.why;
    document.getElementById('lb-result-next').textContent = result.error ? 'Select the route above to get a recommendation.' : result.next;
    document.getElementById('lb-route-copy-status').textContent = '';
    page.querySelector('[data-copy="lb-result-copy"]').disabled = !!result.error;
  }
  form.addEventListener('submit', function (event) { event.preventDefault(); update(); });
  form.addEventListener('change', update);
  update();
  page.querySelectorAll('[data-copy]').forEach(function (button) { button.addEventListener('click', async function () {
    var target = document.getElementById(button.getAttribute('data-copy')), status = document.getElementById(button.getAttribute('data-status'));
    var text = target.innerText.trim();
    try { if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable'); await navigator.clipboard.writeText(text); status.textContent = 'Copied. Replace any bracketed details before use.'; }
    catch (_) { var selection = window.getSelection(), range = document.createRange(); range.selectNodeContents(target); selection.removeAllRanges(); selection.addRange(range); status.textContent = 'Text selected. Use your browser’s Copy command.'; }
  }); });
}());
