import * as Interface from "./interface.js";
console.log(Interface.randomGenerator());

const roll = document.querySelector(".roll");
const hold = document.querySelector(".hold");
const new_game = document.querySelector(".new_game");

roll.addEventListener("click", () => {
  if (!Interface.is_game_over) {
    roll.style.transform = "translateY(10px)";
    setTimeout(() => {
      roll.style.transform = "translateY(0px)";
    }, 300);
    let dice_number = Interface.randomGenerator();
    Interface.changeDice(dice_number);
    Interface.currentScoreComputation(dice_number);
  }
});

hold.addEventListener("click", () => {
  if (!Interface.is_game_over) {
    hold.style.transform = "translateY(10px)";
    setTimeout(() => {
      hold.style.transform = "translateY(0px)";
    }, 300);
    Interface.parsingPointsAndTurn();
  }
});
new_game.addEventListener("click", () => {
  new_game.style.transform = "translateY(10px)";
  setTimeout(() => {
    new_game.style.transform = "translateY(0px)";
  }, 300);
  Interface.resetGame();
});
