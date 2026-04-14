const board = document.getElementById("game-board");
const matchDisplay = document.getElementById("match-count");
const winModal = document.getElementById("win-modal");
const resetBtn = document.getElementById("reset-btn");

let firstCard = null;
let secondCard = null;
let boardLocked = false;
let matchesFound = 0;

const images = [
    "cyberpunk.jpeg", "gtaSA.avif", "point_blank.jpg", "pubg.jpeg",
    "rdr2.jpeg", "skyrim.jpeg", "witcher.jpeg", "wot.jpeg"
];

// Double the images to create pairs
let deck = [...images, ...images];

function initGame() {
    // Reset state
    board.innerHTML = "";
    matchesFound = 0;
    matchDisplay.textContent = "0";
    boardLocked = false;
    firstCard = null;
    secondCard = null;
    
    shuffle(deck);

    // Create cards dynamically
    deck.forEach(imgName => {
        const card = document.createElement("div");
        card.classList.add("card_container");
        card.innerHTML = `
            <div class="item"></div>
            <div class="hidden">
                <img src="./imgs/${imgName}" data-name="${imgName}">
            </div>
        `;
        card.addEventListener("click", handleCardClick);
        board.appendChild(card);
    });
}

function handleCardClick() {
    if (boardLocked) return; 
    if (this === firstCard) return; 

    this.classList.add("flipped");

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    const name1 = firstCard.querySelector('img').dataset.name;
    const name2 = secondCard.querySelector('img').dataset.name;

    if (name1 === name2) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    matchesFound++;
    matchDisplay.textContent = matchesFound;
    
    firstCard.removeEventListener("click", handleCardClick);
    secondCard.removeEventListener("click", handleCardClick);
    
    resetBoard();
    
    if (matchesFound === 8) {
        setTimeout(() => { winModal.style.display = "flex"; }, 500);
    }
}

function unflipCards() {
    boardLocked = true; // Prevents clicking a 3rd card

    setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    boardLocked = false;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

resetBtn.addEventListener("click", initGame);

// Start the game on load
initGame();