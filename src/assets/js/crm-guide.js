(function (root, factory) {
  "use strict";
  var api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root && root.document) api.mount(root);
})(typeof window !== "undefined" ? window : null, function () {
  "use strict";
  var KEY = "callteam.crm-trial.v1";
  function cleanState(raw, ids, count) {
    var input = raw && typeof raw === "object" && !Array.isArray(raw) && raw.version === 1 ? raw : {};
    var states = {};
    ids.forEach(function (id) {
      var arr = input.states && Object.prototype.hasOwnProperty.call(input.states, id) && Array.isArray(input.states[id]) ? input.states[id] : [];
      states[id] = Array.from({ length: count }, function (_, index) { return arr[index] === true; });
    });
    return { version: 1, selected: ids.indexOf(input.selected) !== -1 ? input.selected : ids[0], states: states };
  }
  function checklistText(provider, checks, flags) {
    return "CALLTEAM CRM TRIAL CHECKLIST\nCRM: " + provider.name +
      "\nDate: ____________________\nPlan and quote: ____________________\n\n" +
      checks.map(function (check, index) {
        return (flags[index] === true ? "[TRIED] " : "[TO TEST] ") + (index + 1) + ". " + check.title +
          "\n" + check.text + "\nResult / issue / next question: ____________________";
      }).join("\n\n") +
      "\n\nDECISION: Keep / shortlist / rule out / test again\nReason: ____________________" +
      "\nSubscription, billing term and extras: ____________________" +
      "\nA tick records a check tried, not a passing result or product score." +
      "\nhttps://www.callteam.ca/resources/best-crm-for-outbound-sales/\n";
  }
  async function copyText(win, text) {
    try {
      if (win.navigator.clipboard && typeof win.navigator.clipboard.writeText === "function") {
        await win.navigator.clipboard.writeText(text);
        return true;
      }
    } catch (_) {}
    var input = win.document.createElement("textarea");
    var prior = win.document.activeElement;
    input.value = text;
    input.setAttribute("readonly", "");
    input.style.cssText = "position:fixed;left:-9999px;top:0;";
    win.document.body.appendChild(input);
    try {
      input.select();
      return win.document.execCommand("copy") === true;
    } catch (_) {
      return false;
    } finally {
      input.remove();
      if (prior && typeof prior.focus === "function") prior.focus({ preventScroll: true });
    }
  }
  function mount(win) {
    var doc = win.document;
    var page = doc.getElementById("crm-guide");
    var source = doc.getElementById("crm-trial-data");
    if (!page || !source || page.getAttribute("data-crm-ready") === "true") return;
    var data;
    try { data = JSON.parse(source.textContent); } catch (_) { return; }
    if (!data || !Array.isArray(data.providers) || !data.providers.length || !Array.isArray(data.checks)) return;
    var ids = data.providers.map(function (p) { return p.id; });
    var picker = doc.getElementById("crm-trial-vendor");
    var boxes = Array.from(page.querySelectorAll("[data-crm-check]"));
    var output = doc.getElementById("crm-trial-count");
    var storageNote = doc.getElementById("crm-storage-note");
    var copyStatus = doc.getElementById("crm-copy-status");
    var copyButton = doc.getElementById("crm-copy-checklist");
    var reset = doc.getElementById("crm-reset-checklist");
    var fieldsButton = doc.getElementById("crm-copy-fields");
    if (!picker || !output || !storageNote || !copyButton || !reset || !fieldsButton || boxes.length !== data.checks.length) return;
    var raw;
    var storageAvailable = true;
    try { raw = JSON.parse(win.localStorage.getItem(KEY)); } catch (_) { storageAvailable = false; }
    var state = cleanState(raw, ids, data.checks.length);
    function save() {
      try {
        win.localStorage.setItem(KEY, JSON.stringify(state));
        storageAvailable = true;
      } catch (_) { storageAvailable = false; }
      storageNote.textContent = storageAvailable ? "Progress saved for each CRM on this browser." : "Progress lasts for this visit only. Copy it to keep a record.";
    }
    function render() {
      picker.value = state.selected;
      var flags = state.states[state.selected];
      boxes.forEach(function (box, index) { box.checked = flags[index]; box.disabled = false; });
      output.textContent = flags.filter(Boolean).length + " of " + data.checks.length + " checks tried";
      copyStatus.textContent = "";
    }
    picker.addEventListener("change", function () {
      if (ids.indexOf(picker.value) === -1) { picker.value = state.selected; return; }
      state.selected = picker.value;
      render();
      save();
    });
    boxes.forEach(function (box, index) {
      box.addEventListener("change", function () {
        state.states[state.selected][index] = box.checked === true;
        output.textContent = state.states[state.selected].filter(Boolean).length + " of " + data.checks.length + " checks tried";
        copyStatus.textContent = "";
        save();
      });
    });
    reset.addEventListener("click", function () {
      state.states[state.selected] = data.checks.map(function () { return false; });
      render();
      save();
      copyStatus.textContent = "Checks cleared for " + data.providers.find(function (p) { return p.id === state.selected; }).name + ".";
    });
    copyButton.addEventListener("click", async function () {
      var provider = data.providers.find(function (p) { return p.id === state.selected; });
      var ok = await copyText(win, checklistText(provider, data.checks, state.states[state.selected]));
      copyStatus.textContent = ok ? "Copied. Paste it into your notes and record the findings." : "Copy was blocked. Use the blank checklist download instead.";
    });
    fieldsButton.addEventListener("click", async function () {
      var ok = await copyText(win, doc.getElementById("crm-fields-copy").textContent.trim());
      doc.getElementById("crm-fields-status").textContent = ok ? "Follow-up fields copied." : "Copy was blocked. Select the field list above and copy it.";
    });
    page.querySelectorAll(".crm-js-only").forEach(function (el) { el.hidden = false; });
    page.setAttribute("data-crm-ready", "true");
    render();
    save();
    var header = doc.getElementById("site-header");
    function headerOffset() {
      if (header) page.style.setProperty("--lp-header-offset", Math.ceil(header.getBoundingClientRect().height) + "px");
    }
    headerOffset();
    win.addEventListener("resize", headerOffset);
  }
  return { storageKey: KEY, cleanState: cleanState, checklistText: checklistText, copyText: copyText, mount: mount };
});
