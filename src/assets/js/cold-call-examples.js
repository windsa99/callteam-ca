(() => {
  const page = document.querySelector('.ce-page');
  if (!page) return;

  function track(name) {
    if (typeof window.clarity === 'function') window.clarity('event', name);
  }

  page.querySelectorAll('[data-ce-event]').forEach(link => {
    link.addEventListener('click', () => track(link.dataset.ceEvent));
  });

  page.querySelectorAll('[data-ce-controls]').forEach(controls => {
    const button = controls.querySelector('[data-ce-copy]');
    const words = document.getElementById(button.dataset.ceCopy);
    if (!words) return;
    const status = controls.querySelector('[role="status"]');
    const manual = controls.querySelector('.ce-manual');
    const field = manual.querySelector('textarea');
    button.hidden = false;

    button.addEventListener('click', async () => {
      const text = words.textContent.trim();
      try {
        await navigator.clipboard.writeText(text);
        manual.hidden = true;
        status.textContent = 'Response copied.';
        track('script_examples_response_copied');
      } catch {
        field.value = text;
        manual.hidden = false;
        field.focus();
        field.select();
        status.textContent = 'The response is selected for manual copying.';
      }
    });

    manual.querySelector('[data-ce-close]').addEventListener('click', () => {
      manual.hidden = true;
      status.textContent = '';
      button.focus();
    });
  });
})();
