const pScoreEl = document.getElementById('player_score');
const cScoreEl = document.getElementById('computer_score');
const resultMsg = document.getElementById('result-message');
const pView = document.getElementById('player-view');
const cView = document.getElementById('cpu-view');

const choices = {
    rock: { icon: 'fa-hand-back-fist', beats: 'scissors' },
    paper: { icon: 'fa-hand', beats: 'rock' },
    scissors: { icon: 'fa-hand-scissors', beats: 'paper' }
};

let scores = { player: 0, computer: 0 };

document.querySelectorAll('.choice-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const playerChoice = btn.dataset.choice;
        playRound(playerChoice);
    });
});

function playRound(player) {
    const computer = Object.keys(choices)[Math.floor(Math.random() * 3)];
    
    // Update Icons
    updateIcon(pView, player);
    updateIcon(cView, computer);

    // Determine Result
    if (player === computer) {
        updateUI('TIE', 'tie');
    } else if (choices[player].beats === computer) {
        scores.player++;
        updateUI('YOU WIN!', 'win');
    } else {
        scores.computer++;
        updateUI('YOU LOST', 'loss');
    }
}

function updateIcon(el, choice) {
    el.innerHTML = `<i class="fa-regular ${choices[choice].icon}"></i>`;
    el.className = 'icon-view'; // Reset classes
}

function updateUI(msg, status) {
    resultMsg.textContent = msg;
    pScoreEl.textContent = scores.player;
    cScoreEl.textContent = scores.computer;

    // Visual feedback
    pView.classList.add(status === 'win' ? 'win-border' : status === 'loss' ? 'loss-border' : '');
    cView.classList.add(status === 'loss' ? 'win-border' : status === 'win' ? 'loss-border' : '');
}