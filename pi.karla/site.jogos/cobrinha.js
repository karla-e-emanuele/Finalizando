const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");
const bestEl = document.getElementById("best");
const statusEl = document.getElementById("status");
const restartBtn = document.getElementById("restart");

const gridCount = 24;
const size = canvas.width / gridCount;
const bestKey = "snake_best_score";

let snake = [];
let direction = { x: 1, y: 0 };
let nextDirection = { x: 1, y: 0 };
let food = { x: 10, y: 10 };
let score = 0;
let best = Number(localStorage.getItem(bestKey) || 0);
let started = false;
let gameOver = false;

bestEl.textContent = String(best);

function randomCell() {
  return Math.floor(Math.random() * gridCount);
}

function placeFood() {
  do {
    food = { x: randomCell(), y: randomCell() };
  } while (snake.some((p) => p.x === food.x && p.y === food.y));
}

function resetGame() {
  snake = [
    { x: 8, y: 12 },
    { x: 7, y: 12 },
    { x: 6, y: 12 },
  ];
  direction = { x: 1, y: 0 };
  nextDirection = { x: 1, y: 0 };
  score = 0;
  started = false;
  gameOver = false;
  scoreEl.textContent = "0";
  statusEl.textContent = "Pressione uma direção para começar.";
  placeFood();
  draw();
}

function drawBoard() {
  ctx.fillStyle = "#0a1328";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "rgba(157, 176, 226, 0.08)";
  for (let i = 0; i <= gridCount; i += 1) {
    ctx.beginPath();
    ctx.moveTo(i * size, 0);
    ctx.lineTo(i * size, canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, i * size);
    ctx.lineTo(canvas.width, i * size);
    ctx.stroke();
  }
}

function drawSnake() {
  snake.forEach((part, index) => {
    const cx = part.x * size + size / 2;
    const cy = part.y * size + size / 2;
    const radius = size * (index === 0 ? 0.45 : 0.4);

    // Corpo em estilo minhoca: segmentos arredondados com contorno suave
    ctx.fillStyle = index === 0 ? "#79d957" : index % 2 === 0 ? "#8eea6f" : "#74d657";
    ctx.strokeStyle = "#4f9e3f";
    ctx.lineWidth = Math.max(1.5, size * 0.06);
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Brilho leve para dar aparência de personagem/cartoon
    ctx.fillStyle = "rgba(255,255,255,0.18)";
    ctx.beginPath();
    ctx.arc(cx - radius * 0.28, cy - radius * 0.28, radius * 0.35, 0, Math.PI * 2);
    ctx.fill();

    if (index === 0) {
      const lookOffset = radius * 0.35;
      let lookX = 0;
      let lookY = 0;

      if (direction.x === 1) lookX = lookOffset;
      if (direction.x === -1) lookX = -lookOffset;
      if (direction.y === 1) lookY = lookOffset;
      if (direction.y === -1) lookY = -lookOffset;

      const eyeDistance = radius * 0.38;
      const eyeRadius = radius * 0.25;
      const pupilRadius = eyeRadius * 0.45;

      const eyes = [
        { x: cx - eyeDistance * 0.55, y: cy - eyeDistance * 0.35 },
        { x: cx + eyeDistance * 0.55, y: cy - eyeDistance * 0.35 },
      ];

      eyes.forEach((eye) => {
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(eye.x, eye.y, eyeRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#1f2937";
        ctx.beginPath();
        ctx.arc(eye.x + lookX * 0.18, eye.y + lookY * 0.18, pupilRadius, 0, Math.PI * 2);
        ctx.fill();
      });
    }
  });
}

function drawFood() {
  ctx.fillStyle = "#f97316";
  ctx.beginPath();
  ctx.arc(food.x * size + size / 2, food.y * size + size / 2, size * 0.35, 0, Math.PI * 2);
  ctx.fill();
}

function draw() {
  drawBoard();
  drawFood();
  drawSnake();
}

function endGame() {
  gameOver = true;
  statusEl.textContent = "Fim de jogo. Clique em Reiniciar.";
}

function update() {
  if (!started || gameOver) {
    draw();
    return;
  }

  direction = { ...nextDirection };
  const head = snake[0];
  const newHead = { x: head.x + direction.x, y: head.y + direction.y };

  if (
    newHead.x < 0 ||
    newHead.y < 0 ||
    newHead.x >= gridCount ||
    newHead.y >= gridCount ||
    snake.some((p) => p.x === newHead.x && p.y === newHead.y)
  ) {
    endGame();
    draw();
    return;
  }

  snake.unshift(newHead);

  if (newHead.x === food.x && newHead.y === food.y) {
    score += 1;
    scoreEl.textContent = String(score);
    statusEl.textContent = "Boa! Continue.";

    if (score > best) {
      best = score;
      localStorage.setItem(bestKey, String(best));
      bestEl.textContent = String(best);
    }

    placeFood();
  } else {
    snake.pop();
  }

  draw();
}

function setDirection(x, y) {
  if (gameOver) return;

  if (!started) {
    started = true;
    statusEl.textContent = "Jogo em andamento...";
  }

  if (direction.x === -x && direction.y === -y) return;
  nextDirection = { x, y };
}

document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  if (["arrowup", "arrowdown", "arrowleft", "arrowright", "w", "a", "s", "d"].includes(key)) {
    event.preventDefault();
  }

  if (key === "arrowup" || key === "w") setDirection(0, -1);
  if (key === "arrowdown" || key === "s") setDirection(0, 1);
  if (key === "arrowleft" || key === "a") setDirection(-1, 0);
  if (key === "arrowright" || key === "d") setDirection(1, 0);
});

restartBtn.addEventListener("click", resetGame);

resetGame();
setInterval(update, 120);


