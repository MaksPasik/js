const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const timerElement = document.getElementById('timeCounter');

let time = 0;
let timerInterval;

const player = {
  x: canvas.width / 2 - 25,
  y: canvas.height - 50,
  width: 50,
  height: 50,
  speed: 5,
  dx: 0,
  image: new Image()
};

const blocks = [];
const blockSpeed = 2;
const blockImage = new Image();

player.image.src = 'img/car.png';
blockImage.src = 'img/police car.png';

function drawPlayer() {
  ctx.drawImage(player.image, player.x, player.y, player.width, player.height);
}

function drawBlock(block) {
  ctx.drawImage(blockImage, block.x, block.y, block.width, block.height);
}

function updateGameArea() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const numberOfNewBlocks = 5;
  for (let i = 0; i < numberOfNewBlocks; i++) {
    if (Math.random() < 0.025) {
      const block = {
        x: Math.random() * (canvas.width - 50),
        y: canvas.height,
        width: 50,
        height: 50
      };
      blocks.push(block);
    }
  }

  for (let i = 0; i < blocks.length; i++) {
    blocks[i].y -= blockSpeed;
    drawBlock(blocks[i]);

    if (
      player.x < blocks[i].x + blocks[i].width &&
      player.x + player.width > blocks[i].x &&
      player.y < blocks[i].y + blocks[i].height &&
      player.y + player.height > blocks[i].y
    ) {
      clearInterval(timerInterval);
      alert(`Game Over! Your time: ${time.toFixed(2)} seconds`);
      resetGame();
    }

    if (blocks[i].y + blocks[i].height < 0) {
      blocks.splice(i, 1);
      i--;
    }
  }

  player.x += player.dx;

  if (player.x < 0) {
    player.x = 0;
  } else if (player.x + player.width > canvas.width) {
    player.x = canvas.width - player.width;
  }

  drawPlayer();

  requestAnimationFrame(updateGameArea);
}

function movePlayer(event) {
  if (event.key === 'ArrowLeft') {
    player.dx = -player.speed;
  } else if (event.key === 'ArrowRight') {
    player.dx = player.speed;
  }
}

function stopPlayer(event) {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    player.dx = 0;
  }
}

function startTimer() {
  timerInterval = setInterval(function() {
    time += 0.01;
    timerElement.textContent = time.toFixed(2);
  }, 10);
}

function resetGame() {
  clearInterval(timerInterval);
  time = 0;
  timerElement.textContent = '0.00';
  blocks.length = 0;
  player.x = canvas.width / 2 - 25;
  startTimer();
  updateGameArea();
}

window.addEventListener('keydown', movePlayer);
window.addEventListener('keyup', stopPlayer);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

startTimer();
updateGameArea();