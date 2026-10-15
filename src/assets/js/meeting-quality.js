(function () {
  'use strict';
  var model = window.MeetingQualityModel;
  var get = function (id) { return document.getElementById('mq-' + id); };
  if (!model || !get('check')) return;
  var fields = ['booked', 'held', 'accepted', 'opportunities'];
  var labels = ['Booked meetings', 'Held meetings', 'Sales-accepted meetings', 'Meetings that created an opportunity'];
  var metricDefs = [
    { key: 'heldRate', label: 'Held rate', numerator: 'held', denominator: 'booked' },
    { key: 'acceptanceRate', label: 'Sales acceptance rate', numerator: 'accepted', denominator: 'held' },
    { key: 'opportunityRate', label: 'Held meeting-to-opportunity rate', numerator: 'opportunities', denominator: 'held' },
    { key: 'bookedOpportunityRate', label: 'Booked meeting-to-opportunity rate', numerator: 'opportunities', denominator: 'booked' }
  ];
  var outcomeLabels = { complete: 'Completed outcomes', pending: 'Still in progress', unknown: 'Outcome timing not confirmed' };
  var examples = JSON.parse(get('examples').textContent);
  var sampleLabel = '', lastResult = null, lastInput = null, revision = 0;
  var countFormat = function (value) { return value === null ? 'Unknown' : value.toLocaleString('en-US'); };
  var rateFormat = function (value) { return value === null ? 'Not available' : Number(value.toFixed(1)).toLocaleString('en-US') + '%'; };
  function event(name) {
    if (!window.CALLTEAM_LOCAL_PREVIEW && typeof window.clarity === 'function') window.clarity('event', 'meeting_quality_' + name);
  }
  function node(tag, text, className) {
    var el = document.createElement(tag);
    if (text !== undefined) el.textContent = text;
    if (className) el.className = className;
    return el;
  }
  function input() {
    var data = { outcomes: get('outcomes').value };
    fields.forEach(function (key) { data[key] = get(key).disabled ? null : get(key).value; });
    return data;
  }
  function clearErrors() {
    get('errors').hidden = true; get('errors').replaceChildren();
    fields.concat('outcomes').forEach(function (key) { get(key).removeAttribute('aria-invalid'); get(key).removeAttribute('aria-errormessage'); });
  }
  function resetExport() {
    get('copy-status').textContent = '';
    get('copy-fallback-wrap').hidden = true;
    get('copy-fallback').value = '';
  }
  function invalidate() {
    revision++; sampleLabel = ''; lastResult = null; lastInput = null;
    var wasVisible = !get('results').hidden;
    get('results').hidden = true; resetExport(); clearErrors();
    get('status').textContent = wasVisible ? 'Your entries changed. Check again to update the results.' : '';
  }
  function formula(def, result) {
    var n = result.counts[def.numerator], d = result.counts[def.denominator];
    if (n === null || d === null) return 'A count needed for this rate is unknown.';
    if (d === 0) return 'No ' + (def.denominator === 'held' ? 'held' : 'booked') + ' meetings to use as the denominator.';
    return countFormat(n) + ' ÷ ' + countFormat(d) + ' × 100';
  }
  function render(result) {
    var counts = result.counts;
    get('result-mode').textContent = sampleLabel ? 'Illustrative example / ' + sampleLabel : 'Your numbers / Your next steps';
    get('completeness').textContent = outcomeLabels[lastInput.outcomes];
    get('stages').replaceChildren();
    fields.forEach(function (key, i) {
      var stage = node('div', undefined, 'mq-stage');
      var value = node('strong', countFormat(counts[key]));
      if (counts[key] !== null && counts[key] >= 10000) value.className = 'mq-count-compact';
      stage.append(value, node('span', labels[i]));
      var bar = node('div', undefined, 'mq-bar'), fill = node('span'); bar.setAttribute('aria-hidden', 'true');
      fill.style.width = (counts[key] !== null && counts.booked > 0 ? counts[key] / counts.booked * 100 : 0) + '%';
      bar.append(fill); stage.append(bar); get('stages').append(stage);
    });
    get('metrics').replaceChildren();
    metricDefs.forEach(function (def) {
      var card = node('div', undefined, 'mq-metric'); card.dataset.metric = def.key;
      card.append(node('strong', rateFormat(result.metrics[def.key])), node('span', def.label), node('small', formula(def, result)));
      get('metrics').append(card);
    });
    get('focus-title').textContent = result.focus.title;
    get('focus-summary').textContent = result.focus.summary;
    get('checks').replaceChildren(); result.focus.checks.forEach(function (text) { get('checks').append(node('li', text)); });
    get('notes').replaceChildren(); result.notes.forEach(function (text) { get('notes').append(node('li', text)); });
    get('resource').textContent = result.focus.resource.label + ' →';
    get('resource').href = (window.CALLTEAM_LOCAL_PREVIEW ? 'https://www.callteam.ca' : '') + result.focus.resource.href;
    if (window.CALLTEAM_LOCAL_PREVIEW) { get('resource').target = '_blank'; get('resource').rel = 'noopener noreferrer'; }
    get('results').hidden = false; get('status').textContent = 'Results updated. Your figures have not been submitted.';
    get('results').focus();
    if (typeof get('results').scrollIntoView === 'function') get('results').scrollIntoView({ block: 'start', behavior: 'auto' });
  }
  function check() {
    revision++; resetExport(); clearErrors();
    var data = input(), result = model.evaluate(data);
    lastResult = null; lastInput = null;
    if (!result.valid) {
      get('results').hidden = true; get('status').textContent = '';
      get('errors').append(node('p', 'Check these entries:'));
      var list = node('ul');
      result.errors.forEach(function (error) {
        list.append(node('li', error.message)); var field = get(error.field);
        if (field) { field.setAttribute('aria-invalid', 'true'); field.setAttribute('aria-errormessage', 'mq-errors'); }
      });
      get('errors').append(list); get('errors').hidden = false;
      var first = get(result.errors[0].field); if (first) first.focus();
      return;
    }
    lastResult = result; lastInput = data; render(result); event(sampleLabel ? 'example_checked' : 'checked');
  }
  function reportText() {
    if (!lastResult) return '';
    var lines = ['CALLTEAM | MEETING QUALITY CHECK', sampleLabel ? 'Illustrative example: ' + sampleLabel : 'Your meeting results', outcomeLabels[lastInput.outcomes], '', 'COUNTS'];
    fields.forEach(function (key, i) { lines.push(labels[i] + ': ' + countFormat(lastResult.counts[key])); });
    lines.push('', 'CONVERSION RATES');
    metricDefs.forEach(function (def) { lines.push(def.label + ': ' + rateFormat(lastResult.metrics[def.key]) + ' (' + formula(def, lastResult) + ')'); });
    lines.push('', 'WHERE TO START', lastResult.focus.title, lastResult.focus.summary, '', 'YOUR CHECKLIST');
    lastResult.focus.checks.forEach(function (text) { lines.push('[ ] ' + text); });
    lines.push('', 'CONTEXT'); lastResult.notes.forEach(function (text) { lines.push(text); });
    lines.push('The counts show progression. They do not establish why a meeting stopped or who caused it.', '', lastResult.focus.resource.label + ': https://www.callteam.ca' + lastResult.focus.resource.href, '', 'Review your campaign: https://calendly.com/hello-callteam/new-meeting', 'Tool: https://www.callteam.ca/b2b-meeting-quality-check/');
    return lines.join('\n');
  }
  function fallback(text, message) {
    get('copy-fallback').value = text; get('copy-fallback-wrap').hidden = false;
    get('copy-fallback').focus(); get('copy-fallback').select(); get('copy-status').textContent = message;
  }
  get('check').disabled = false;
  get('check').addEventListener('click', check);
  fields.concat('outcomes').forEach(function (key) {
    get(key).addEventListener('input', invalidate);
    if (key === 'outcomes') get(key).addEventListener('change', invalidate);
    else get(key).addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); check(); } });
  });
  document.querySelectorAll('[data-mq-unknown]').forEach(function (checkbox) {
    checkbox.addEventListener('change', function () { get(checkbox.dataset.mqUnknown).disabled = checkbox.checked; invalidate(); });
  });
  document.querySelectorAll('[data-mq-example]').forEach(function (button) {
    button.addEventListener('click', function () {
      var example = examples.find(function (item) { return item.id === button.dataset.mqExample; }); if (!example) return;
      invalidate();
      fields.forEach(function (key) {
        var unknown = key !== 'booked' && example.input[key] === null;
        get(key).value = example.input[key] === null ? '' : example.input[key]; get(key).disabled = unknown;
        if (key !== 'booked') get(key + '-unknown').checked = unknown;
      });
      get('outcomes').value = example.input.outcomes; sampleLabel = example.label; check();
    });
  });
  get('clear').addEventListener('click', function () {
    invalidate(); fields.forEach(function (key) { get(key).value = ''; get(key).disabled = false; if (key !== 'booked') get(key + '-unknown').checked = false; });
    get('outcomes').value = 'unknown'; get('status').textContent = 'Entries cleared.'; get('booked').focus();
  });
  get('copy').addEventListener('click', async function () {
    var text = reportText(), currentRevision = revision; if (!text) return;
    resetExport();
    if (!navigator.clipboard || !navigator.clipboard.writeText) { fallback(text, 'Clipboard access is unavailable here. Your results are selected below so you can copy them.'); return; }
    try {
      await navigator.clipboard.writeText(text);
      if (currentRevision !== revision) return;
      get('copy-status').textContent = 'Results and checklist copied.'; event('copied');
    } catch (e) {
      if (currentRevision !== revision) return;
      fallback(text, 'Clipboard access is unavailable here. Your results are selected below so you can copy them.');
    }
  });
  get('download').addEventListener('click', function () {
    var text = reportText(); if (!text) return;
    var url;
    try {
      url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
      var a = node('a'); a.href = url; a.download = 'callteam-meeting-results.txt'; document.body.append(a); a.click(); a.remove();
      get('copy-status').textContent = 'Your results file is ready to save.'; event('downloaded');
      setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    } catch (e) { if (url) URL.revokeObjectURL(url); fallback(text, 'Download is unavailable here. Copy your results from the selected text below.'); }
  });
  document.querySelectorAll('[data-mq-booking]').forEach(function (link) { link.addEventListener('click', function () { event('booking_clicked'); }); });
})();
