(function () {
  'use strict';
  var video = document.getElementById('ctv-video');
  if (!video) return;
  var play = document.getElementById('ctv-play');
  var status = document.getElementById('ctv-player-status');
  var sent = new Set();

  function event(name) {
    if (sent.has(name)) return;
    sent.add(name);
    video.setAttribute('data-last-event', name);
    if (typeof window.clarity === 'function') window.clarity('event', name);
  }

  function start() {
    status.textContent = '';
    var result = video.play();
    if (result && result.catch) result.catch(function () {
      play.hidden = false;
      status.textContent = 'Use the player’s play button to start the video.';
    });
  }

  function seek(seconds, shouldPlay) {
    function apply() {
      video.currentTime = Math.max(0, Math.min(seconds, video.duration || 77.5));
      if (shouldPlay) start();
    }
    if (video.readyState >= 1) apply();
    else {
      video.addEventListener('loadedmetadata', apply, { once: true });
      video.load();
    }
  }

  play.hidden = false;
  play.addEventListener('click', start);
  video.addEventListener('playing', function () { play.hidden = true; event('ct_process_video_start'); });
  video.addEventListener('ended', function () {
    play.hidden = false;
    if (video.duration && watchedTime() >= video.duration * .95) event('ct_process_video_complete');
  });
  video.addEventListener('error', function () {
    play.hidden = true;
    status.textContent = 'The video could not load. You can read the full transcript below.';
  });

  // Native ranges count each watched section once, including across chapter jumps.
  function watchedTime() {
    var ranges = video.played;
    var watched = 0;
    for (var i = 0; i < ranges.length; i++) watched += ranges.end(i) - ranges.start(i);
    return watched;
  }
  video.addEventListener('timeupdate', function () {
    var watched = watchedTime();
    [25, 50, 75].forEach(function (percent) {
      if (video.duration && watched >= video.duration * percent / 100) event('ct_process_video_' + percent);
    });
  });

  document.querySelectorAll('[data-video-time]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      var seconds = Number(link.getAttribute('data-video-time'));
      seek(seconds, true);
      video.scrollIntoView({ block: 'center', behavior: 'auto' });
      video.focus({ preventScroll: true });
      if (typeof window.clarity === 'function') window.clarity('event', 'ct_process_video_chapter');
    });
  });

  var requested = new URLSearchParams(window.location.search).get('t');
  if (requested !== null && /^\d+(?:\.\d+)?$/.test(requested)) seek(Number(requested), false);

  document.querySelectorAll('a[href="#transcript"]').forEach(function (link) {
    link.addEventListener('click', function () { document.querySelector('.ctv-transcript').open = true; });
  });
}());
