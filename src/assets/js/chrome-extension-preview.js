(() => {
  const dialog = document.getElementById('ctce-screenshot-dialog');
  if (!dialog) return;
  document.querySelectorAll('[data-ctce-enlarge]').forEach(button => button.addEventListener('click', () => dialog.showModal()));
  dialog.querySelector('[data-ctce-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
})();
