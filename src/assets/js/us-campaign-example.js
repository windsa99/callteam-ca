(function () {
  "use strict";
  const page = document.querySelector(".uce-page");
  if (!page || page.dataset.uceReady) return;
  page.dataset.uceReady = "true";
  function track(name) {
    if (window.CALLTEAM_LOCAL_PREVIEW || location.protocol === "file:") return;
    try { if (typeof window.clarity === "function") window.clarity("event", "us_campaign_example_" + name); } catch (_) { /* Analytics never blocks reading. */ }
  }
  const controls = document.getElementById("uce-branch-controls");
  const buttons = Array.from(page.querySelectorAll("[data-uce-branch]"));
  const panels = Array.from(page.querySelectorAll("[data-uce-panel]"));
  const status = document.getElementById("uce-branch-status");
  function choose(id, announce) {
    const selected = panels.find(panel => panel.dataset.ucePanel === id);
    if (!selected) return;
    panels.forEach(panel => { panel.hidden = panel !== selected; });
    buttons.forEach(button => button.setAttribute("aria-pressed", String(button.dataset.uceBranch === id)));
    if (announce && status) { status.textContent = "Showing: " + selected.querySelector("h3").textContent; track("reply_selected"); }
  }
  if (controls && buttons.length && buttons.every(button => panels.some(panel => panel.dataset.ucePanel === button.dataset.uceBranch))) {
    buttons.forEach(button => button.addEventListener("click", () => choose(button.dataset.uceBranch, true)));
    choose(buttons[0].dataset.uceBranch, false);
    controls.hidden = false;
  }
  const copy = document.getElementById("uce-copy");
  const text = document.getElementById("uce-brief-text");
  const details = document.getElementById("uce-brief-details");
  const copyStatus = document.getElementById("uce-copy-status");
  let copying = false;
  if (copy && text && details && copyStatus) {
    copy.hidden = false;
    copy.addEventListener("click", async () => {
      if (copying) return;
      copying = true;
      copy.disabled = true;
      copyStatus.textContent = "Copying the example brief…";
      try {
        if (!navigator.clipboard || typeof navigator.clipboard.writeText !== "function") throw new Error("Clipboard unavailable");
        await navigator.clipboard.writeText(text.value);
        copyStatus.textContent = "Example brief copied. Replace the sample assumptions before using it for your campaign.";
        track("brief_copied");
      } catch (_) {
        details.open = true;
        text.focus();
        text.select();
        copyStatus.textContent = "Select and copy the brief below, or use the download link.";
      } finally { copying = false; copy.disabled = false; }
    });
  }
  page.querySelectorAll("[data-uce-download]").forEach(link => link.addEventListener("click", () => track("brief_download")));
  page.querySelectorAll("[data-uce-booking]").forEach(link => link.addEventListener("click", () => track("booking_click")));
  page.querySelectorAll("[data-uce-resource]").forEach(link => link.addEventListener("click", () => track("resource_click")));
}());
