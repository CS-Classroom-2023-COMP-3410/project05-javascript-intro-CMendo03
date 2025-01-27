const gameContainer = document.getElementById('game-container');
const statsElement = document.getElementById('stats');
const restartButton = document.getElementById('restart-button');

let cards = [];
let flippedCards = [];
let matches = 0;
let moves = 0;
let timer = 0;
let timerInterval = null;

const symbols = ['🍎', '🍌', '🍒', '🍇', '🍉', '🍍', '🥝', '🍓'];

// Shuffle the array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Initialize the game
function initializeGame() {
    cards = shuffle([...symbols, ...symbols]); // Create pairs
    gameContainer.innerHTML = '';
    flippedCards = [];
    matches = 0;
    moves = 0;
    timer = 0;
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);

    cards.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.index = index;
        card.dataset.symbol = symbol;
        card.addEventListener('click', flipCard);
        gameContainer.appendChild(card);
    });

    updateStats();
}

// Flip a card
function flipCard(event) {
    const card = event.currentTarget;
    if (card.classList.contains('flipped') || flippedCards.length === 2) return;

    card.classList.add('flipped');
    card.textContent = card.dataset.symbol;
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

// Check for a match
function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.symbol === card2.dataset.symbol) {
        matches += 1;
        card1.style.backgroundColor = 'lightgreen'; // Highlight matching cards
        card2.style.backgroundColor = 'lightgreen'; // Highlight matching cards
        flippedCards = [];

        if (matches === symbols.length) {
            clearInterval(timerInterval);
            alert(`You won! Moves: ${moves}, Time: ${timer}s`);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card1.textContent = '';
            card2.classList.remove('flipped');
            card2.textContent = '';
            flippedCards = [];
        }, 1000);
    }

    moves += 1;
    updateStats();
}

// Update stats display
function updateStats() {
    statsElement.textContent = `Moves: ${moves} | Time: ${timer}s`;
}

// Update timer
function updateTimer() {
    timer += 1;
    updateStats();
}

// Restart the game
restartButton.addEventListener('click', initializeGame);

// Start the game
initializeGame();
