for (const button of document.querySelectorAll('button[data-inline-start]')) {
  const video = button.previousElementSibling;
  button.hidden = false;
  video.addEventListener('playing', () => {
    if (document.activeElement === button) video.focus({ preventScroll: true });
    button.hidden = true;
  }, { once: true });
}

document.addEventListener('click', (event) => {
  if (event.defaultPrevented || event.button !== 0 ||
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

  const trigger = event.target.closest('summary[data-inline-watch], a[data-inline-play], button[data-inline-start]');
  if (!trigger) return;

  let video;
  if (trigger.tagName === 'SUMMARY') {
    const details = trigger.parentElement;
    video = details.querySelector('video');
    if (!video) return;

    if (details.open) {
      video.pause();
      return;
    }

    event.preventDefault();
    details.open = true;
  } else if (trigger.tagName === 'BUTTON') {
    video = trigger.previousElementSibling;
  } else {
    const player = document.getElementById(trigger.hash.slice(1));
    video = player?.querySelector('video');
    if (!video) return;
  }

  video.play().catch(() => video.focus({ preventScroll: true }));
});
