const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const inputField = document.getElementById('input-field');
const textToType = document.getElementById('text-to-type');
const wpmDisplay = document.getElementById('wpm');
const accuracyDisplay = document.getElementById('accuracy');
const difficultySelect = document.getElementById('difficulty');

let targetText = '';
let userInput = '';
let startTime = 0;
let typingInterval;
let errors = 0;
let totalCharacters = 0;
let wpm = 0;
let accuracy = 100;

const easyText = "The quick brown fox jumps over the lazy dog.";
const mediumText = "JavaScript is a versatile and powerful programming language.";
const hardText = "In the midst of chaos, there is also opportunity for growth and learning.";

function startGame() {
    resetStats();
    inputField.disabled = false;
    inputField.focus();
    errors = 0;
    totalCharacters = 0;
    userInput = '';
    startTime = Date.now();

    // Set target text based on difficulty
    switch (difficultySelect.value) {
        case 'easy':
            targetText = easyText;
            break;
        case 'medium':
            targetText = mediumText;
            break;
        case 'hard':
            targetText = hardText;
            break;
    }

    textToType.textContent = targetText;
    inputField.value = '';
    typingInterval = setInterval(calculateWPM, 1000);
}

function calculateWPM() {
    const timeElapsedInMinutes = (Date.now() - startTime) / 60000;
    const typedWords = inputField.value.split(' ').length;

    wpm = Math.round(typedWords / timeElapsedInMinutes);
    wpmDisplay.textContent = wpm;

    totalCharacters = inputField.value.length;
    accuracy = calculateAccuracy();
    accuracyDisplay.textContent = `${accuracy}%`;

    if (inputField.value === targetText) {
        clearInterval(typingInterval);
    }
}

function calculateAccuracy() {
    let correctCharacters = 0;
    for (let i = 0; i < totalCharacters; i++) {
        if (inputField.value[i] === targetText[i]) {
            correctCharacters++;
        }
    }
    return Math.round((correctCharacters / totalCharacters) * 100);
}

function resetStats() {
    wpm = 0;
    accuracy = 100;
    wpmDisplay.textContent = wpm;
    accuracyDisplay.textContent = `${accuracy}%`;
}

function resetGame() {
    clearInterval(typingInterval);
    inputField.disabled = true;
    inputField.value = '';
    textToType.textContent = 'Press Start to begin.';
}

startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);

inputField.addEventListener('input', (event) => {
    userInput = event.target.value;
});
