const score1 = document.querySelector(".score1");
let current_score1 = document.querySelector(".current_score1");
const player_one = document.querySelector(".player_one");

const score2 = document.querySelector(".score2");
let current_score2 = document.querySelector(".current_score2");
const player_two = document.querySelector(".player_two");

let isPlayerOne = true;
let is_game_over = false;

function randomGenerator() {
  return Math.floor(Math.random() * 6) + 1;
}
function changeDice(dice_number) {
  document.querySelector(
    "#dice"
  ).src = `./assets/images/dice${dice_number}.png`;
}
function currentScoreComputation(dice_number) {
  if (dice_number === 1) {
    if (isPlayerOne) {
      current_score1.textContent = 0;
      isPlayerOne = false;
      player_one.classList.toggle("active");
      player_two.classList.toggle("active");
    } else {
      current_score2.textContent = 0;
      isPlayerOne = true;
      player_one.classList.toggle("active");
      player_two.classList.toggle("active");
    }
  } else {
    if (isPlayerOne) {
      current_score1.textContent =
        parseInt(current_score1.textContent) + dice_number;
    } else {
      current_score2.textContent =
        parseInt(current_score2.textContent) + dice_number;
    }
  }
}
function checkForWinner() {
  let bool1 = parseInt(score1.textContent) >= 100;
  let bool2 = parseInt(score2.textContent) >= 100;
  if (bool1) {
    player_one.classList.remove("active");
    player_two.classList.remove("active");
    player_one.classList.add("winner");
  } else if (bool2) {
    player_one.classList.remove("active");
    player_two.classList.remove("active");
    player_two.classList.add("winner");
  }
  is_game_over = bool1 || bool2;
  return is_game_over;
}
function parsingPointsAndTurn() {
  if (isPlayerOne) {
    score1.textContent =
      parseInt(score1.textContent) + parseInt(current_score1.textContent);
    current_score1.textContent = 0;
    isPlayerOne = false;
    if (checkForWinner()) {
      return;
    }
    player_one.classList.toggle("active");
    player_two.classList.toggle("active");
  } else {
    score2.textContent =
      parseInt(score2.textContent) + parseInt(current_score2.textContent);
    current_score2.textContent = 0;
    isPlayerOne = true;
    if (checkForWinner()) {
      return;
    }
    player_one.classList.toggle("active");
    player_two.classList.toggle("active");
  }
}
function resetGame() {
  score1.textContent = 0;
  score2.textContent = 0;
  current_score1.textContent = 0;
  current_score2.textContent = 0;
  player_one.classList.remove("active");
  player_two.classList.remove("active");
  player_one.classList.add("active");
  player_one.classList.remove("winner");
  player_two.classList.remove("winner");
  isPlayerOne = true;
  is_game_over = false;
}
export {
  randomGenerator,
  changeDice,
  currentScoreComputation,
  parsingPointsAndTurn,
  resetGame,
  is_game_over,
};
