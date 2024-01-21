const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

let ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  speedX: 5,
  speedY: 5,
};

let player = {
  x: 10,
  y: canvas.height / 2 - 50,
  width: 10,
  height: 100,
  speed: 7,
};

let ai = {
  x: canvas.width - 20,
  y: canvas.height / 2 - 50,
  width: 10,
  height: 100,
  speed: 3,
};

let playerScore = 0;
let aiScore = 0;

const keyState = {};

window.addEventListener("keydown", (e) => {
  keyState[e.key] = true;
});

window.addEventListener("keyup", (e) => {
  keyState[e.key] = false;
});

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.closePath();
}

function drawPlayer() {
  ctx.fillStyle = "#fff";
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawAI() {
  ctx.fillStyle = "#fff";
  ctx.fillRect(ai.x, ai.y, ai.width, ai.height);
}

function drawScore() {
  ctx.font = "30px Arial";
  ctx.fillText(playerScore + " - " + aiScore, canvas.width / 2 - 50, 30);
}

function updatePlayer() {
  if (keyState.ArrowUp && player.y > 0) {
    player.y -= player.speed;
  }
  if (keyState.ArrowDown && player.y + player.height < canvas.height) {
    player.y += player.speed;
  }
}

function updateAI() {
  if (ai.y + ai.height / 2 < ball.y) {
    ai.y += ai.speed;
  } else {
    ai.y -= ai.speed;
  }
}

function updateBall() {
  ball.x += ball.speedX;
  ball.y += ball.speedY;

  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.speedY = -ball.speedY;
  }

  if (ball.x - ball.radius < player.x + player.width && ball.y > player.y && ball.y < player.y + player.height) {
    ball.speedX = -ball.speedX;
  }

  if (ball.x + ball.radius > ai.x && ball.y > ai.y && ball.y < ai.y + ai.height) {
    ball.speedX = -ball.speedX;
  }

  if (ball.x - ball.radius < 0) {
    aiScore++;
    resetBall();
  } else if (ball.x + ball.radius > canvas.width) {
    playerScore++;
    resetBall();
  }
}

function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.speedX = -ball.speedX;
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  drawPlayer();
  drawAI();
  drawScore();

  updatePlayer();
  updateAI();
  updateBall();

  requestAnimationFrame(gameLoop);
}

window.addEventListener("load", () => {
  gameLoop();
});
