(function (root, factory) {
  "use strict";
  var api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root && root.document) api.mount(root);
})(typeof window !== "undefined" ? window : null, function () {
  "use strict";
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
    input.style.cssText = "position:fixed;left:-9999px;top:0";
    win.document.body.appendChild(input);
    try {
      input.select();
      return typeof win.document.execCommand === "function" && win.document.execCommand("copy") === true;
    } catch (_) {
      return false;
    } finally {
      input.remove();
      if (prior && typeof prior.focus === "function") prior.focus({ preventScroll: true });
    }
  }
  function mount(win) {
    var doc = win.document;
    var page = doc.getElementById("simple-guide");
    var text = doc.getElementById("sg-resource-text");
    var button = doc.getElementById("sg-copy-resource");
    var status = doc.getElementById("sg-copy-status");
    if (!page || !text || !button || !status || page.getAttribute("data-sg-ready") === "true") return;
    button.hidden = false;
    button.addEventListener("click", async function () {
      if (button.disabled) return;
      button.disabled = true;
      status.textContent = "";
      var ok = await copyText(win, text.textContent.trim());
      button.disabled = false;
      if (ok) {
        status.textContent = "Copied. Paste this into your notes and reuse it.";
      } else {
        try {
          text.focus({ preventScroll: true });
          var range = doc.createRange();
          range.selectNodeContents(text);
          var selection = win.getSelection();
          selection.removeAllRanges();
          selection.addRange(range);
        } catch (_) {}
        status.textContent = "Automatic copy was blocked. Select and copy the text above.";
      }
    });
    page.setAttribute("data-sg-ready", "true");
    var header = doc.getElementById("site-header");
    function headerOffset() {
      if (header) page.style.setProperty("--lp-header-offset", Math.ceil(header.getBoundingClientRect().height) + "px");
    }
    headerOffset();
    win.addEventListener("resize", headerOffset);
  }
  return { copyText: copyText, mount: mount };
});
