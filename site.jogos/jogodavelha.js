const tabuleiro = document.getElementById('tabuleiro');
const mensagem = document.getElementById('mensagem');
const linha = document.getElementById('linha-vitoria');
const modoSelect = document.getElementById('modo');
const canvas = document.getElementById('confete');
const ctx = canvas.getContext('2d');
const pontosXEl = document.getElementById('pontosX');
const pontosOEl = document.getElementById('pontosO');

const pontosPlayerEl = document.getElementById('pontosPlayer');
const pontosBotEl = document.getElementById('pontosBot');

const placar2p = document.getElementById('placar2p');
const placarBot = document.getElementById('placarBot');

let pontosX = Number(localStorage.getItem('pontosX')) || 0;
let pontosO = Number(localStorage.getItem('pontosO')) || 0;

let pontosPlayer = Number(localStorage.getItem('pontosPlayer')) || 0;
let pontosBot = Number(localStorage.getItem('pontosBot')) || 0;

pontosXEl.textContent = pontosX;
pontosOEl.textContent = pontosO;

pontosPlayerEl.textContent = pontosPlayer;
pontosBotEl.textContent = pontosBot;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let jogadorAtual = 'X';
let jogoAtivo = true;
let modoJogo = '2p';
const celulas = ['', '', '', '', '', '', '', '', ''];
const particulas = [];

const combinacoesVitoria = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

modoSelect.addEventListener('change', () => {
  modoJogo = modoSelect.value;

  if (modoJogo === '2p') {
    placar2p.style.display = 'block';
    placarBot.style.display = 'none';
  } else {
    placar2p.style.display = 'none';
    placarBot.style.display = 'block';
  }

  reiniciar();
});

function criarTabuleiro() {
  tabuleiro.querySelectorAll('.celula').forEach(c => c.remove());

  celulas.forEach((_, i) => {
    const celula = document.createElement('div');
    celula.classList.add('celula');
    celula.addEventListener('click', () => jogar(i));
    tabuleiro.appendChild(celula);
  });

  linha.style.opacity = '0';
  linha.style.width = '0';
}

function jogar(i) {
  if (celulas[i] || !jogoAtivo) return;

  celulas[i] = jogadorAtual;
  tabuleiro.children[i + 1].textContent = jogadorAtual;

  const vitoria = verificarVitoria();

  if (vitoria) {
    desenharLinha(vitoria);
    animarCoresFundo();
    destacarVencedoras(vitoria);
    soltarConfete();

    if (modoJogo === '2p') {
      if (jogadorAtual === 'X') {
        pontosX++;
        localStorage.setItem('pontosX', pontosX);
        pontosXEl.textContent = pontosX;
      } else {
        pontosO++;
        localStorage.setItem('pontosO', pontosO);
        pontosOEl.textContent = pontosO;
      }
    } else {
      if (jogadorAtual === 'X') {
        pontosPlayer++;
        localStorage.setItem('pontosPlayer', pontosPlayer);
        pontosPlayerEl.textContent = pontosPlayer;
      } else {
        pontosBot++;
        localStorage.setItem('pontosBot', pontosBot);
        pontosBotEl.textContent = pontosBot;
      }
    }

    mensagem.textContent = `🏆 Jogador ${jogadorAtual} venceu!`;
    jogoAtivo = false;
    return;
  }

  if (!celulas.includes('')) {
    mensagem.textContent = '😐 Empate!';
    jogoAtivo = false;
    return;
  }

  jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X';
  mensagem.textContent = `Vez do jogador: ${jogadorAtual}`;

  if (modoJogo === 'bot' && jogadorAtual === 'O') {
    setTimeout(jogadaRobo, 600);
  }
}

function jogadaRobo() {
  if (!jogoAtivo) return;

  for (const [a, b, c] of combinacoesVitoria) {
    if (celulas[a] === 'O' && celulas[b] === 'O' && !celulas[c]) return jogar(c);
    if (celulas[a] === 'O' && celulas[c] === 'O' && !celulas[b]) return jogar(b);
    if (celulas[b] === 'O' && celulas[c] === 'O' && !celulas[a]) return jogar(a);
  }

  for (const [a, b, c] of combinacoesVitoria) {
    if (celulas[a] === 'X' && celulas[b] === 'X' && !celulas[c]) return jogar(c);
    if (celulas[a] === 'X' && celulas[c] === 'X' && !celulas[b]) return jogar(b);
    if (celulas[b] === 'X' && celulas[c] === 'X' && !celulas[a]) return jogar(a);
  }

  if (!celulas[4]) return jogar(4);

  const livres = celulas.map((v,i)=>v===''?i:null).filter(v=>v!==null);
  jogar(livres[Math.floor(Math.random() * livres.length)]);
}

function verificarVitoria() {
  for (const combo of combinacoesVitoria) {
    const [a,b,c] = combo;
    if (celulas[a] && celulas[a] === celulas[b] && celulas[a] === celulas[c]) {
      return combo;
    }
  }
  return null;
}

function desenharLinha([a,b,c]) {
  const celA = tabuleiro.children[a+1];
  const celC = tabuleiro.children[c+1];

  const rectA = celA.getBoundingClientRect();
  const rectC = celC.getBoundingClientRect();
  const tabRect = tabuleiro.getBoundingClientRect();

  const x1 = rectA.left + rectA.width/2 - tabRect.left;
  const y1 = rectA.top + rectA.height/2 - tabRect.top;
  const x2 = rectC.left + rectC.width/2 - tabRect.left;
  const y2 = rectC.top + rectC.height/2 - tabRect.top;

  const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
  const width = Math.hypot(x2 - x1, y2 - y1);
  const alturaLinha = linha.offsetHeight || 6;

  linha.style.left = `${x1}px`;
  linha.style.top = `${y1 - alturaLinha / 2}px`;
  linha.style.width = `${width}px`;
  linha.style.transform = `rotate(${angle}deg)`;
  linha.style.opacity = '1';
}

function destacarVencedoras(combo) {
  combo.forEach(i => tabuleiro.children[i+1].classList.add('vencedora'));
}

function animarCoresFundo() {
  let hue = 270;
  const anim = setInterval(() => {
    document.body.style.background = `radial-gradient(circle at top, hsl(${hue},50%,10%), #0d001a)`;
    hue += 2;
    if (!jogoAtivo) clearInterval(anim);
  }, 80);
}

function soltarConfete() {
  for (let i=0; i<150; i++) {
    particulas.push({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height - canvas.height,
      vx: (Math.random()-0.5)*3,
      vy: Math.random()*3 + 2,
      tamanho: Math.random()*6+2,
      cor: `hsl(${Math.random()*360}, 70%, 60%)`
    });
  }
  animarConfete();
}

function animarConfete() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particulas.forEach(p=>{
    p.x += p.vx;
    p.y += p.vy;
    ctx.fillStyle = p.cor;
    ctx.fillRect(p.x,p.y,p.tamanho,p.tamanho);
  });
  requestAnimationFrame(animarConfete);
}

/* =========================
   🔥 REINICIAR CORRIGIDO
========================= */

function reiniciar() {
  jogadorAtual = 'X';
  jogoAtivo = true;

  pontosX = 0;
  pontosO = 0;
  pontosPlayer = 0;
  pontosBot = 0;

  localStorage.setItem('pontosX', pontosX);
  localStorage.setItem('pontosO', pontosO);
  localStorage.setItem('pontosPlayer', pontosPlayer);
  localStorage.setItem('pontosBot', pontosBot);

  pontosXEl.textContent = pontosX;
  pontosOEl.textContent = pontosO;
  pontosPlayerEl.textContent = pontosPlayer;
  pontosBotEl.textContent = pontosBot;

  for (let i = 0; i < celulas.length; i++) {
    celulas[i] = '';
  }

  criarTabuleiro();

  mensagem.textContent = `Vez do jogador: ${jogadorAtual}`;

  particulas.length = 0;
  ctx.clearRect(0,0,canvas.width,canvas.height);
}

// 🔥 ESSA LINHA GARANTE O BOTÃO FUNCIONANDO
window.reiniciar = reiniciar;

criarTabuleiro();
