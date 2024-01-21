let randomNum = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let gameActive = true; 

const guess = document.getElementById("guess");
const submit = document.getElementById("submit");
const newGameButton = document.getElementById("newGame");
const hint = document.getElementById("hint");
const attemptsText = document.getElementById("attempts");

submit.addEventListener("click", checkGuess);
newGameButton.addEventListener("click", newGame);
guess.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    checkGuess();
  }
});

function checkGuess() {
  if (!gameActive) return;

  const userValue = Number(guess.value);
  attempts++;

  if (userValue === randomNum) {
    hint.textContent = "Brawo!!! Udało ci się zgadnąć.";
    newGameButton.style.display = "block";

    submit.disabled = true;

    gameActive = false;
  } else if (userValue < randomNum) {
    hint.textContent = "Za mała liczba. Spróbuj ponownie.";
    clearGuessInput();
  } else {
    hint.textContent = "Za duża liczba. Spróbuj ponownie.";
    clearGuessInput();
  }

  attemptsText.textContent = "Próby: " + attempts;
}

function newGame() {
  randomNum = Math.floor(Math.random() * 100) + 1;
  attempts = 0;

  hint.textContent = "";
  attemptsText.textContent = "Próby: " + attempts;
  clearGuessInput();
  submit.disabled = false; 
  newGameButton.style.display = "none"; 
  gameActive = true;
}

function clearGuessInput() {
  guess.value = "";
}
