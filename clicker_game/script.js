const state = {
    score: 0,
    spc: 1, // Score per click
    sps: 0, // Score per second
};

const scoreEl = document.getElementById('current-score');
const spsEl = document.getElementById('sps-display');
const cookieBtn = document.getElementById('cookie-btn');
const particlesContainer = document.getElementById('particles-container');

// Update UI
function updateDisplay() {
    scoreEl.textContent = Math.floor(state.score);
    spsEl.textContent = state.sps;
    
    // Disable buttons the user can't afford
    document.querySelectorAll('.buy-btn').forEach(btn => {
        btn.disabled = state.score < parseInt(btn.dataset.cost);
    });
}

// Click Effect
function createParticle(x, y) {
    const p = document.createElement('div');
    p.classList.add('floating-text');
    p.textContent = `+${state.spc}`;
    p.style.left = `${x}px`;
    p.style.top = `${y}px`;
    particlesContainer.appendChild(p);
    setTimeout(() => p.remove(), 800);
}

// Event Listeners
cookieBtn.addEventListener('click', (e) => {
    state.score += state.spc;
    createParticle(e.offsetX, e.offsetY);
    updateDisplay();
});

document.querySelector('.shop').addEventListener('click', (e) => {
    if (!e.target.classList.contains('buy-btn')) return;

    const btn = e.target;
    const cost = parseInt(btn.dataset.cost);
    const amount = parseInt(btn.dataset.amount);
    const type = btn.dataset.type;

    if (state.score >= cost) {
        state.score -= cost;
        
        if (type === 'click') state.spc += amount;
        if (type === 'passive') state.sps += amount;

        // Increase price for next purchase (Exponential growth)
        btn.dataset.cost = Math.ceil(cost * 1.2);
        btn.textContent = `${btn.dataset.cost} pts`;
        
        updateDisplay();
    }
});

// Game Loop
setInterval(() => {
    state.score += state.sps;
    updateDisplay();
}, 1000);