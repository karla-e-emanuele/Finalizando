const frases = [
    "Desafie sua mente!",
    "Mostre o quanto você sabe!",
    "Memorize, descubra e vença!",
    "Divirta-se com seus jogos favoritos!"
  ];

  let i = 0;
  setInterval(() => {
    document.getElementById('frase').textContent = frases[i];
    i = (i + 1) % frases.length;
  }, 3000);

  const temaBtn = document.getElementById('temaBtn');
  temaBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    temaBtn.textContent =
      document.body.classList.contains('dark')
        ? '☀️ Modo Claro'
        : '🌙 Modo Escuro';
  });