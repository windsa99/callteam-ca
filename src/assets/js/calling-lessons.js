(() => {
  document.querySelectorAll('[data-copy-target]').forEach(button => {
    const target = document.getElementById(button.dataset.copyTarget);
    if (!target) return;
    button.hidden = false;
    button.addEventListener('click', async () => {
      const status = button.nextElementSibling;
      try {
        if (!navigator.clipboard || !window.isSecureContext) throw new Error('Manual copy');
        await navigator.clipboard.writeText(target.innerText.trim());
        status.textContent = 'Copied. Make the wording your own.';
      } catch (_) {
        const range = document.createRange(); range.selectNodeContents(target);
        const selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range);
        status.textContent = 'Text selected. Use Copy or Ctrl/Cmd+C.';
      }
    });
  });
})();
