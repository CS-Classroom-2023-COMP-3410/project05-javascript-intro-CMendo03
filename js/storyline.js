let storyElement = document.getElementById("story");
let progressText = document.getElementById("progress-text");
let choicesElement = document.querySelector(".choices");

let storyState = {
    currentStage: 0,
    choices: []
};

// Function to update the game state and display new choices
function updateStory(text, choices) {
    storyElement.innerHTML = text;
    choicesElement.innerHTML = ''; // Clear previous choices

    choices.forEach(choice => {
        let button = document.createElement("button");
        button.innerText = choice.text;
        button.onclick = () => chooseOption(choice.nextStage);
        choicesElement.appendChild(button);
    });
}

// Function to handle player's choice and progress in the story
function chooseOption(stage) {
    storyState.currentStage = stage;
    
    switch (stage) {
        case 1:
            updateStory(
                "You face Guts, the Black Swordsman. He seems cautious, but ready for anything. Do you challenge him or ask about his past?",
                [
                    { text: "Challenge him", nextStage: 3 },
                    { text: "Ask about his past", nextStage: 4 }
                ]
            );
            break;
        case 2:
            updateStory(
                "Griffith gazes at you with a calculating look. His ambitions are clear in his eyes. Do you ally with him or question his motives?",
                [
                    { text: "Ally with Griffith", nextStage: 5 },
                    { text: "Question Griffith", nextStage: 6 }
                ]
            );
            break;
        case 3:
            updateStory(
                "Guts draws his massive sword. The tension rises. You feel the heat of the moment. The battle is about to begin...",
                []
            );
            break;
        case 4:
            updateStory(
                "Guts tells you of his tragic past, filled with pain and loss. You feel sympathy for him. He nods, recognizing your understanding.",
                []
            );
            break;
        case 5:
            updateStory(
                "Griffith smiles slyly, his charm irresistible. You join him in his quest, aware of the dangerous path ahead.",
                []
            );
            break;
        case 6:
            updateStory(
                "Griffith's expression hardens. He warns you to stay out of his way. His ambitions are too great to be questioned.",
                []
            );
            break;
        default:
            updateStory(
                "You find yourself in a dark forest. A lone figure stands before you. Who is it?",
                [
                    { text: "Guts", nextStage: 1 },
                    { text: "Griffith", nextStage: 2 }
                ]
            );
            break;
    }

    updateProgress();
}

// Function to update the game progress
function updateProgress() {
    progressText.textContent = `You are currently at stage ${storyState.currentStage}`;
}

// Function to reset the game
function resetGame() {
    storyState = {
        currentStage: 0,
        choices: []
    };
    updateStory(
        "You find yourself in a dark forest. A lone figure stands before you. Who is it?",
        [
            { text: "Guts", nextStage: 1 },
            { text: "Griffith", nextStage: 2 }
        ]
    );
    updateProgress();
}

// Initialize the game
updateStory(
    "You find yourself in a dark forest. A lone figure stands before you. Who is it?",
    [
        { text: "Guts", nextStage: 1 },
        { text: "Griffith", nextStage: 2 }
    ]
);
