(function () {
  'use strict';
  var names = {mobile: 'mobile', direct: 'work direct line', company: 'company number'};
  function recommendNextCall(input) {
    input = input || {};
    var person = input.person, outcome = input.outcome, last = input.last || '';
    if (!['known_mobile', 'known_desk', 'known_unknown', 'unknown'].includes(person) || !['new', 'unanswered', 'screened', 'wrong', 'callback', 'stop'].includes(outcome)) return {error: 'Choose the buyer situation and the latest outcome.'};
    if (outcome === 'stop') return {id: 'stop', route: null, title: 'Stop the calling sequence.', why: 'They asked you not to call.', next: 'Record the request and remove the contact or account from the calling queue as requested. Do not switch numbers to try again.'};
    if (outcome === 'callback') return {id: 'callback', route: null, title: 'Keep the agreed callback.', why: 'Their requested time and number take priority.', next: 'Save the time, time zone and preferred number. Call as agreed and keep them out of other retry queues.'};
    if (['unanswered', 'wrong'].includes(outcome) && !Object.hasOwn(names, last)) return {error: 'Choose which number you tried.'};
    if (outcome === 'screened') return {id: 'screened', route: null, title: 'Give the screen a clear reason.', why: 'A screening assistant answered. That does not mean the number is wrong.', next: 'State your name, company and business reason. Follow the prompt and record what happens next.' + (person === 'unknown' ? ' Once connected, ask who handles the decision.' : '')};
    if (person === 'unknown') {
      if (outcome === 'wrong' && last === 'company') return {id: 'research', route: null, title: 'Find a correct company number.', why: 'The company number you tried is confirmed wrong.', next: 'Remove it. Check the right business or branch, find its current number and ask who handles this decision.'};
      if (outcome === 'unanswered' && last === 'company') return {id: 'retry', route: 'company', title: 'Try the company again later.', why: 'You still need to identify the right buyer.', next: 'Use another suitable calling window and ask for the responsible role. Research the name first if you can.'};
      return {id: 'identify', route: 'company', title: 'Find the buyer through the company.', why: 'You need to identify who handles this decision.', next: (outcome === 'wrong' ? 'Remove the wrong ' + names[last] + '. ' : '') + 'Ask the relevant company or branch for the responsible role.' + (outcome === 'unanswered' ? ' Plan this for a later calling window.' : '') + ' No company number? Research it first.'};
    }
    if (outcome === 'new') {
      if (person === 'known_mobile') return {id: 'first', route: 'mobile', title: 'Try the mobile first.', why: 'This buyer usually works away from a desk.', next: 'No mobile? Try their work direct line. If you only have the company number, ask for them by name.'};
      return {id: 'first', route: 'direct', title: 'Try a work direct line first.', why: person === 'known_desk' ? 'A direct line or extension is a sensible start for an office-based buyer.' : 'You know who to reach, but not where they work.', next: 'No direct line? Try their mobile. If you only have the company number, ask to be connected.'};
    }
    var order = person === 'known_mobile' ? ['mobile', 'direct', 'company'] : ['direct', 'mobile', 'company'];
    var alternatives = order.filter(function (route) { return route !== last; });
    var route = alternatives[0], fallback = alternatives[1];
    var title = route === 'mobile' ? 'Try the mobile next.' : 'Try a work direct line next.';
    var missing = route === 'mobile' ? 'No mobile?' : 'No direct line?';
    var next = missing + ' Try the ' + names[fallback] + '.';
    if (outcome === 'wrong') return {id: 'alternate', route: route, title: title, why: 'Remove the confirmed wrong ' + names[last] + '. Do not retry it.', next: next + ' If neither is available, research a replacement number for this buyer.'};
    return {id: 'alternate', route: route, title: title, why: 'No answer or voicemail does not prove the ' + names[last] + ' is bad.', next: 'Use a later calling window. ' + next + ' If you have neither, retry the original number later.'};
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
    lastWrap.hidden = !['unanswered', 'wrong'].includes(outcomeField.value);
    lastField.disabled = lastWrap.hidden;
    lastField.required = !lastWrap.hidden;
    var result = recommendNextCall({person: document.getElementById('lb-person').value, outcome: outcomeField.value, last: lastWrap.hidden ? '' : lastField.value});
    lastField.setAttribute('aria-invalid', String(!!result.error && !lastWrap.hidden));
    document.getElementById('lb-route-error').textContent = result.error || '';
    document.getElementById('lb-result-title').textContent = result.error ? 'Which number did you try?' : result.title;
    document.getElementById('lb-result-why').textContent = result.error ? 'Choose the number type to see your next step.' : result.why;
    document.getElementById('lb-next').hidden = !!result.error;
    document.getElementById('lb-result-next').textContent = result.error ? '' : result.next;
    document.getElementById('lb-route-copy-status').textContent = '';
    page.querySelector('[data-copy="lb-result-copy"]').disabled = !!result.error;
  }
  form.addEventListener('submit', function (event) { event.preventDefault(); update(); });
  form.addEventListener('change', function (event) {
    if (event.target === outcomeField) lastField.value = '';
    update();
  });
  update();
  page.querySelectorAll('[data-copy]').forEach(function (button) { button.addEventListener('click', async function () {
    var target = document.getElementById(button.getAttribute('data-copy')), status = document.getElementById(button.getAttribute('data-status'));
    var text = target.innerText.trim();
    try { if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable'); await navigator.clipboard.writeText(text); status.textContent = 'Copied. Replace any bracketed details before use.'; }
    catch (_) { var selection = window.getSelection(), range = document.createRange(); range.selectNodeContents(target); selection.removeAllRanges(); selection.addRange(range); status.textContent = 'Text selected. Use your browser’s Copy command.'; }
  }); });
}());
