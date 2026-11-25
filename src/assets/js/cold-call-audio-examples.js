const examplePlayers = document.querySelectorAll('.cae-page video');

for (const player of examplePlayers) {
  player.addEventListener('play', () => {
    for (const other of examplePlayers) {
      if (other !== player) other.pause();
    }
  });
}
