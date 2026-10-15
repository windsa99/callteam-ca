(function () {
  'use strict';
  const doc = document;
  const byId = (id) => doc.getElementById(id);
  const tool = byId('sc-tool');
  const model = window.CallTeamScriptCheckModel;
  if (!tool || !model) return;
  const localPreview = Boolean(window.CALLTEAM_LOCAL_PREVIEW) || location.protocol === 'file:';
  const fields = ['buyer', 'offer', 'script'];
  const draftFields = ['opening', 'followup', 'meeting'];
  let catalog = [], examples = [], current = null, draft = null, dirty = false, pending = null, revision = 0;
  function parseData(id) { try { const value = JSON.parse(byId(id).textContent); return Array.isArray(value) ? value : []; } catch (_) { return []; } }
  catalog = parseData('sc-catalog');
  examples = parseData('sc-examples');
  function setText(id, value) { if (byId(id)) byId(id).textContent = value || ''; }
  function show(id, visible) { if (byId(id)) byId(id).hidden = !visible; }
  function event(name) { if (!localPreview && typeof window.clarity === 'function') window.clarity('event', name); }
  function node(parent, tag, text, className) {
    const el = doc.createElement(tag);
    if (className) el.className = className;
    el.textContent = text;
    parent.appendChild(el);
    return el;
  }
  function safeUrl(url) { return typeof url === 'string' && /^\/(?:resources|articles)\/[a-z0-9/-]+\/$/.test(url); }
  function link(parent, text, url, className) {
    if (!safeUrl(url)) return null;
    const a = node(parent, 'a', text, className);
    a.href = localPreview ? 'https://www.callteam.ca' + url : url;
    if (localPreview) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
    return a;
  }
  function inputValues() { return Object.fromEntries(fields.map((key) => [key, byId('sc-' + key).value.trim()])); }
  function clearErrors() {
    setText('sc-error', ''); show('sc-error', false);
    fields.forEach((key) => byId('sc-' + key).removeAttribute('aria-invalid'));
  }
  function clearDraft() {
    revision++;
    draft = null; dirty = false; pending = null;
    draftFields.forEach((key) => { byId('sc-draft-' + key).value = ''; });
    show('sc-draft-panel', false); show('sc-replace-confirm', false);
    setText('sc-draft-status', '');
    doc.querySelectorAll('[data-sc-template]').forEach((button) => button.setAttribute('aria-pressed', 'false'));
  }
  function invalidate() {
    current = null; clearDraft(); clearErrors();
    show('sc-results', false); show('sc-copy-fallback', false);
    setText('sc-copy-status', ''); setText('sc-status', '');
    setText('sc-script-count', byId('sc-script').value.length + ' / 4,000 characters');
  }
  function renderFindings(kind, items) {
    const list = byId('sc-' + kind); list.replaceChildren();
    (items || []).forEach((item) => {
      const li = node(list, 'li', '', 'sc-finding');
      li.dataset.scFinding = item.id;
      node(li, 'strong', item.label);
      if (item.quote) node(li, 'blockquote', item.quote);
      node(li, 'p', item.detail);
      if (item.action) node(li, 'p', item.action, 'sc-action-copy');
    });
    show('sc-' + kind + '-block', Boolean(items && items.length));
  }
  function renderResources(items) {
    const container = byId('sc-resources'); container.replaceChildren();
    (items || []).filter((item) => item && safeUrl(item.url)).slice(0, 3).forEach((item) => {
      const a = link(container, '', item.url, 'sc-resource');
      node(a, 'span', item.type || 'CallTeam resource', 'sc-resource-type');
      node(a, 'strong', item.title);
      node(a, 'span', item.reason || 'Read the guidance and adapt it to your offer.');
    });
  }
  function renderMetrics(metrics) {
    const container = byId('sc-metrics'); container.replaceChildren();
    const values = [
      [String(metrics.wordCount), 'Words in your draft'],
      [String(metrics.sentenceCount), 'Sentences detected'],
      [metrics.wordsBeforeResponse === null ? 'Review below' : String(metrics.wordsBeforeResponse), metrics.wordsBeforeResponse === null ? 'Buyer response point' : 'Words before the first response prompt']
    ];
    values.forEach(([value, label]) => { const card = node(container, 'div', '', 'sc-metric'); node(card, 'strong', value); node(card, 'span', label); });
  }
  function renderTemplateOptions(templates) {
    const parent = byId('sc-template-options'); parent.replaceChildren();
    if (!templates.length) {
      node(parent, 'p', 'No close example was found for this combination. Keep your own opening or choose the general structure below.', 'sc-notice');
      return;
    }
    templates.forEach((template) => {
      const card = node(parent, 'article', '', 'sc-template-card');
      node(card, 'h4', template.title, 'sc-template-heading');
      node(card, 'p', template.reason, 'sc-template-reason');
      const excerpt = String(template.opening || '');
      node(card, 'blockquote', excerpt.length > 300 ? excerpt.slice(0, 297) + '…' : excerpt);
      const actions = node(card, 'div', '', 'sc-actions');
      const button = node(actions, 'button', 'Use this example', 'sc-button sc-button-secondary');
      button.type = 'button'; button.dataset.scTemplate = template.slug; button.setAttribute('aria-pressed', 'false');
      button.addEventListener('click', () => replaceDraft(() => chooseDraft('template', template)));
      link(actions, 'Read the full script', template.url, 'sc-text-link');
    });
  }
  function focusResults() {
    const result = byId('sc-results'); result.hidden = false; result.focus({ preventScroll: true });
    if (typeof result.scrollIntoView === 'function') result.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  function check(sampleLabel) {
    clearErrors(); clearDraft(); show('sc-results', false); show('sc-copy-fallback', false); setText('sc-copy-status', ''); current = null;
    const checked = model.validateInput(inputValues());
    if (!checked.valid) {
      fields.forEach((key) => { if (checked.errors[key]) byId('sc-' + key).setAttribute('aria-invalid', 'true'); });
      setText('sc-error', fields.map((key) => checked.errors[key]).filter(Boolean).join(' ')); show('sc-error', true);
      byId('sc-' + fields.find((key) => checked.errors[key])).focus(); return;
    }
    const analysis = model.analyze(checked.value);
    const templates = analysis.needsClarification ? [] : model.suggestTemplates(checked.value, catalog);
    const resources = model.matchResources(checked.value, catalog);
    current = { input: checked.value, analysis, templates, resources };
    setText('sc-result-mode', 'Your draft / CallTeam’s written checks');
    setText('sc-summary', analysis.summary);
    renderMetrics(analysis.metrics);
    ['found', 'review', 'confirm'].forEach((kind) => renderFindings(kind, analysis[kind]));
    renderTemplateOptions(templates); renderResources(resources);
    setText('sc-status', sampleLabel ? 'Sample draft checked using the same rules as your own text: ' + sampleLabel + '.' : 'Your review is ready. Choose whether to keep your opening or adapt a working draft below.');
    focusResults(); event(sampleLabel ? 'script_check_example_loaded' : 'script_check_completed');
  }
  function makeConfirmBox() {
    let box = byId('sc-replace-confirm');
    if (box) return box;
    box = doc.createElement('div'); box.id = 'sc-replace-confirm'; box.className = 'sc-notice'; box.hidden = true;
    box.setAttribute('role', 'group'); box.setAttribute('aria-label', 'Replace your edited draft');
    node(box, 'p', 'You have edited this working draft. Replace those edits with the selected starting point?');
    const actions = node(box, 'div', '', 'sc-actions');
    const yes = node(actions, 'button', 'Replace draft', 'sc-button'); yes.type = 'button'; yes.id = 'sc-replace-yes';
    const no = node(actions, 'button', 'Keep editing', 'sc-text-button'); no.type = 'button'; no.id = 'sc-replace-no';
    yes.addEventListener('click', () => { const action = pending; pending = null; show('sc-replace-confirm', false); if (action) action(); });
    no.addEventListener('click', () => { pending = null; show('sc-replace-confirm', false); byId('sc-draft-opening').focus(); });
    byId('sc-draft-panel').prepend(box); return box;
  }
  function replaceDraft(action) {
    if (dirty) { pending = action; makeConfirmBox().hidden = false; byId('sc-replace-yes').focus(); return; }
    action();
  }
  function chooseDraft(mode, template) {
    if (!current) return;
    const next = model.makeDraft(current.input, mode === 'template' ? template : null);
    if (mode === 'keep') {
      next.opening = current.input.script; next.source = null;
      next.notes = ['Your original opening is preserved exactly. The other fields are optional prompts you can edit or remove.'];
    }
    revision++;
    draft = { ...next, mode }; dirty = false; pending = null;
    byId('sc-draft-opening').value = draft.opening;
    byId('sc-draft-followup').value = draft.followUpQuestion;
    byId('sc-draft-meeting').value = draft.meetingRequest;
    const source = byId('sc-draft-source'); source.replaceChildren();
    if (draft.source && safeUrl(draft.source.url)) {
      node(source, 'span', 'Library example to adapt: '); link(source, draft.source.title, draft.source.url);
    } else source.textContent = mode === 'keep' ? 'Starting point: your original opening.' : 'Starting point: CallTeam’s general conversation structure.';
    const notes = byId('sc-draft-notes'); notes.replaceChildren();
    (draft.notes || []).forEach((text) => node(notes, 'li', text));
    show('sc-draft-panel', true); show('sc-replace-confirm', false); show('sc-copy-fallback', false);
    doc.querySelectorAll('[data-sc-template]').forEach((button) => button.setAttribute('aria-pressed', String(mode === 'template' && button.dataset.scTemplate === template.slug)));
    if (mode === 'template') { current.resources = model.matchResources(current.input, catalog, template.slug); renderResources(current.resources); }
    setText('sc-copy-status', ''); updateDraftStatus(); byId('sc-draft-opening').focus({ preventScroll: true });
    event('script_check_draft_selected');
  }
  function updateDraftStatus() {
    const text = draftFields.map((key) => byId('sc-draft-' + key).value).join('\n');
    const placeholders = [...new Set(text.match(/\[[^\]\n]{1,100}\]|\{\{[^}\n]{1,100}\}\}/g) || [])];
    setText('sc-draft-status', placeholders.length ? placeholders.length + ' fields still need your details: ' + placeholders.join(', ') + '. Check all statements before using the draft.' : 'Your edits are ready to copy. Check that the facts, questions and meeting purpose fit your business.');
  }
  function reviewText() {
    if (!current) return '';
    const input = current.input, analysis = current.analysis;
    const lines = ['CallTeam Cold Call Script Check', 'Written checks applied to your draft. No performance score or booking prediction.', '', 'Buyer: ' + input.buyer, 'Offer: ' + input.offer, '', 'Original draft:', input.script, '', analysis.summary, '', 'Word count: ' + analysis.metrics.wordCount];
    [['found', 'Found in your draft'], ['review', 'Wording to review'], ['confirm', 'Check in context']].forEach(([kind, heading]) => {
      if (!(analysis[kind] || []).length) return;
      lines.push('', heading);
      analysis[kind].forEach((item) => { lines.push('', item.label); if (item.quote) lines.push('“' + item.quote + '”'); lines.push(item.detail); if (item.action) lines.push(item.action); });
    });
    if (draft) {
      lines.push('', 'YOUR EDITABLE WORKING DRAFT', draft.source ? 'Adapted from: ' + draft.source.title + '\nhttps://www.callteam.ca' + draft.source.url : draft.mode === 'keep' ? 'Starting point: your original opening.' : 'Starting point: a general conversation structure.');
      (draft.notes || []).forEach((note) => lines.push(note));
      [['opening', 'Opening'], ['followup', 'Follow-up question'], ['meeting', 'Meeting request']].forEach(([key, label]) => { const value = byId('sc-draft-' + key).value.trim(); if (value) lines.push('', label + ':', value); });
    }
    (current.resources || []).forEach((item) => { if (safeUrl(item.url)) lines.push('', item.title, 'https://www.callteam.ca' + item.url); });
    lines.push('', 'https://www.callteam.ca/cold-call-script-checker/'); return lines.join('\n');
  }
  function fallbackCopy(text) {
    let area = byId('sc-copy-fallback');
    if (!area) {
      area = doc.createElement('textarea'); area.id = 'sc-copy-fallback'; area.className = 'sc-copy-fallback'; area.readOnly = true;
      area.setAttribute('aria-label', 'Your review and draft, ready to select and copy'); area.setAttribute('data-clarity-mask', 'true'); byId('sc-copy-status').after(area);
    }
    area.value = text; area.hidden = false; area.focus(); area.select(); setText('sc-copy-status', 'Select and copy your review and draft below.');
  }
  async function copy() {
    const text = reviewText(); if (!text) return;
    const copiedCurrent = current, copiedDraft = draft, copiedRevision = revision;
    try {
      if (!navigator.clipboard || !navigator.clipboard.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(text);
      if (current === copiedCurrent && draft === copiedDraft && revision === copiedRevision) setText('sc-copy-status', 'Copied. Your review and latest draft edits are included.');
    } catch (_) { if (current === copiedCurrent && draft === copiedDraft && revision === copiedRevision) fallbackCopy(text); }
    event('script_check_copied');
  }
  function download() {
    const text = reviewText(); if (!text) return;
    try {
      const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
      const a = doc.createElement('a'); a.href = url; a.download = 'callteam-script-review.txt'; doc.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000); setText('sc-copy-status', 'Your review and latest draft edits are in the text download.'); event('script_check_downloaded');
    } catch (_) { fallbackCopy(text); }
  }
  fields.forEach((key) => byId('sc-' + key).addEventListener('input', invalidate));
  draftFields.forEach((key) => byId('sc-draft-' + key).addEventListener('input', () => { revision++; dirty = true; show('sc-copy-fallback', false); setText('sc-copy-status', ''); updateDraftStatus(); }));
  byId('sc-check').addEventListener('click', () => check());
  byId('sc-clear').addEventListener('click', () => { fields.forEach((key) => { byId('sc-' + key).value = ''; }); invalidate(); byId('sc-buyer').focus(); });
  byId('sc-keep').addEventListener('click', () => replaceDraft(() => chooseDraft('keep')));
  byId('sc-general').addEventListener('click', () => replaceDraft(() => chooseDraft('general')));
  byId('sc-copy').addEventListener('click', copy);
  byId('sc-download').addEventListener('click', download);
  doc.querySelectorAll('[data-sc-example]').forEach((button) => button.addEventListener('click', () => {
    const example = examples.find((item) => item.id === button.dataset.scExample); if (!example) return;
    invalidate(); fields.forEach((key) => { byId('sc-' + key).value = example.input[key] || ''; });
    setText('sc-script-count', byId('sc-script').value.length + ' / 4,000 characters'); check(example.label);
  }));
  doc.querySelectorAll('.sc-page a[href*="calendly.com/hello-callteam/new-meeting"]').forEach((a) => a.addEventListener('click', () => event('script_check_booking_clicked')));
  byId('sc-check').disabled = false;
})();
