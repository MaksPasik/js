const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
const pingwinImage = new Image();
pingwinImage.src = 'img/linux.png';

let isGameStarted = false;

let birdX = canvas.height / 2;
let birdY = canvas.height / 3;
let birdSpeedY = 0;
const gravity = 0.2;
const jump = -5;

let pipes = [];
const pipeWidth = 50;
const pipeGap = 150;
const pipeSpeed = 2;

let score = 0;

function drawBird() {
    context.drawImage(pingwinImage, 50, birdY, 30, 30);
  }
  

function drawPipe(pipeX, openingY) {
    context.fillStyle = '#00FF00'; 
    context.fillRect(pipeX, 0, pipeWidth, openingY);
    context.fillRect(pipeX, openingY + pipeGap, pipeWidth, canvas.height - openingY - pipeGap);
  }
  
  
  function getCodeExample() {
    return `
  #include <iostream>
  
  int main() {
      std::cout << "Hello, World!" << std::endl;
      return 0;
  }
    `.trim();
  }
function drawScore() {
  context.fillStyle = '#000';
  context.font = '20px Arial';
  context.fillText(`Wynik: ${score}`, 10, 30);
}

function update() {
  if (!isGameStarted) return; 

  birdSpeedY += gravity;
  birdY += birdSpeedY;

  if (birdY > canvas.height - 30) {
    gameOver();
  }

  if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 200) {
    const openingY = Math.floor(Math.random() * (canvas.height - pipeGap));
    pipes.push({ x: canvas.width, openingY });
  }

  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].x -= pipeSpeed;

    if (pipes[i].x < -pipeWidth) {
      pipes.splice(i, 1);
      score++;
    }

    if (
      (50 + 30 > pipes[i].x && 50 < pipes[i].x + pipeWidth) &&
      (birdY < pipes[i].openingY || birdY + 30 > pipes[i].openingY + pipeGap)
    ) {
      gameOver();
    }
  }
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawBird();

  for (const pipe of pipes) {
    drawPipe(pipe.x, pipe.openingY);
  }

  drawScore();
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', function (event) {
  if (event.code === 'Space') {
    isGameStarted = true; 
    birdSpeedY = jump;
  }
});

function gameOver() {
  alert(`Koniec Gry! Twój Wynik: ${score}`);
  isGameStarted = false; 
  birdY = canvas.height / 2;
  birdSpeedY = 0;
  pipes = [];
  score = 0;
}

gameLoop();
