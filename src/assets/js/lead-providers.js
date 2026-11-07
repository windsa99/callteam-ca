(function () {
  'use strict';
  function calculateContactCost(costText, exportedText, usableText) {
    if ([costText, exportedText, usableText].some(function (v) { return String(v).trim() === ''; })) return { error: 'Enter the cost, exported count and usable count.' };
    var cost = Number(costText), exported = Number(exportedText), usable = Number(usableText);
    if (![cost, exported, usable].every(Number.isFinite) || cost < 0 || !Number.isSafeInteger(exported) || exported < 1 || !Number.isSafeInteger(usable) || usable < 0) return { error: 'Use a cost of zero or more, at least one exported contact, and whole-number contact counts.' };
    if (usable > exported) return { error: 'Usable contacts cannot exceed contacts exported.' };
    return { costPerContact: usable === 0 ? null : cost / usable, usableShare: usable / exported, exported: exported, usable: usable };
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = { calculateContactCost: calculateContactCost };
  if (typeof document === 'undefined') return;
  var page = document.getElementById('lead-provider-guide');
  if (!page) return;
  var header = document.querySelector('.site-header');
  function setHeaderOffset() { if (header) page.style.setProperty('--lp-header-offset', Math.ceil(header.getBoundingClientRect().height) + 'px'); }
  setHeaderOffset();
  if (header && typeof ResizeObserver !== 'undefined') new ResizeObserver(setHeaderOffset).observe(header);
  else window.addEventListener('resize', setHeaderOffset);
  var providers = JSON.parse(document.getElementById('lp-provider-data').textContent);
  page.querySelectorAll('.lp-js-only').forEach(function (el) { el.hidden = false; });
  var left = document.getElementById('lp-left'), right = document.getElementById('lp-right'), pair = document.getElementById('lp-pair');
  function el(tag, text, className) { var n = document.createElement(tag); if (text) n.textContent = text; if (className) n.className = className; return n; }
  function renderPair(changed) {
    var adjusted = false;
    if (left.value === right.value) {
      var other = changed === left ? right : left;
      other.value = providers.find(function (p) { return p.id !== changed.value; }).id;
      adjusted = true;
    }
    pair.replaceChildren();
    [left.value, right.value].forEach(function (id) {
      var p = providers.find(function (item) { return item.id === id; });
      var card = el('article', '', 'lp-pair-card');
      card.appendChild(el('h3', p.name));
      [['Consider it when', p.fit], ['How you pay', p.billing], ['Check before buying', p.catch]].forEach(function (row) { card.appendChild(el('h4', row[0])); card.appendChild(el('p', row[1])); });
      var link = el('a', 'Read the ' + p.name + ' verdict →'); link.href = '#' + p.id; card.appendChild(link); pair.appendChild(card);
    });
    document.getElementById('lp-selection-status').textContent = (adjusted ? 'The other selection changed so you can compare two different providers. ' : '') + left.options[left.selectedIndex].text + ' and ' + right.options[right.selectedIndex].text + ' selected.';
  }
  left.addEventListener('change', function () { renderPair(left); });
  right.addEventListener('change', function () { renderPair(right); });
  renderPair(left);
  var form = document.getElementById('lp-cost-form'), error = document.getElementById('lp-cost-error'), costResult = document.getElementById('lp-cost-result'), yieldResult = document.getElementById('lp-yield-result');
  function calculate() {
    var result = calculateContactCost(document.getElementById('lp-cost').value, document.getElementById('lp-exported').value, document.getElementById('lp-usable').value);
    error.textContent = result.error || '';
    if (result.error) { costResult.textContent = 'Check your inputs'; yieldResult.textContent = 'No result calculated.'; return; }
    var currency = document.getElementById('lp-currency').value;
    costResult.textContent = result.costPerContact === null ? 'No usable contacts' : currency + ' ' + result.costPerContact.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    yieldResult.textContent = result.usable + ' of ' + result.exported + ' contacts usable · ' + (result.usableShare * 100).toLocaleString('en-CA', { maximumFractionDigits: 1 }) + '%';
  }
  form.addEventListener('submit', function (event) { event.preventDefault(); calculate(); });
  form.addEventListener('input', calculate);
  form.addEventListener('change', calculate);
  calculate();
  document.getElementById('lp-copy').addEventListener('click', async function () {
    var text = Array.from(document.querySelectorAll('#lp-supplier-copy p')).map(function (p) { return p.textContent; }).join('\n\n');
    var status = document.getElementById('lp-copy-status');
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(text);
      status.textContent = 'Questions copied.';
    } catch (_) {
      var selection = window.getSelection(), range = document.createRange();
      range.selectNodeContents(document.getElementById('lp-supplier-copy'));
      selection.removeAllRanges(); selection.addRange(range);
      status.textContent = 'Questions selected. Use your browser’s Copy command.';
    }
  });
}());
