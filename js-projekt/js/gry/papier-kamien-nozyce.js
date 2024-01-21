let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'Przegrałeś.';
    } else if (computerMove === 'paper') {
      result = 'Wygrałeś.';
    } else if (computerMove === 'scissors') {
      result = 'Remis.';
    }

  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'Wygrałeś.';
    } else if (computerMove === 'paper') {
      result = 'Remis.';
    } else if (computerMove === 'scissors') {
      result = 'Przegrałeś.';
    }
    
  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Remis.';
    } else if (computerMove === 'paper') {
      result = 'Przegrałeś.';
    } else if (computerMove === 'scissors') {
      result = 'Wygrałeś.';
    }
  }

  if (result === 'Wygrałeś.') {
    score.wins += 1;
  } else if (result === 'Przegrałeś.') {
    score.losses += 1;
  } else if (result === 'Remis.') {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML = `TY
<img src="img/${playerMove}-emoji.png" class="move-icon">
<img src="img/${computerMove}-emoji.png" class="move-icon">
AI`;
}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wygrane: ${score.wins}, Przegrane: ${score.losses}, Remis: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}