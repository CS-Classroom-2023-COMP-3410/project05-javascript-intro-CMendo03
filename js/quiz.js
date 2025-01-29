const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Paris", correct: true },
            { text: "London", correct: false },
            { text: "Berlin", correct: false },
            { text: "Rome", correct: false },
        ],
    },
    {
        question: "Which programming language is known as the language of the web?",
        answers: [
            { text: "Python", correct: false },
            { text: "JavaScript", correct: true },
            { text: "C++", correct: false },
            { text: "Java", correct: false },
        ],
    },
    {
        question: "What is the largest planet in our solar system?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: false },
            { text: "Jupiter", correct: true },
            { text: "Saturn", correct: false },
        ],
    },
];

let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

const quizContainer = document.getElementById("quiz");
const nextButton = document.getElementById("nextBtn");
const submitButton = document.getElementById("submitBtn");
const resultsContainer = document.getElementById("results");

function displayQuestion() {
    const question = questions[currentQuestionIndex];
    quizContainer.innerHTML = `
        <div class="question">${question.question}</div>
        <ul class="answers">
            ${question.answers
                .map(
                    (answer, index) =>
                        `<li><label><input type="radio" name="answer" value="${index}" ${
                            userAnswers[currentQuestionIndex] &&
                            userAnswers[currentQuestionIndex].selected === answer.text
                                ? "checked"
                                : ""
                        }> ${answer.text}</label></li>`
                )
                .join("")}
        </ul>
    `;
}

function getSelectedAnswer() {
    const selected = document.querySelector('input[name="answer"]:checked');
    return selected ? parseInt(selected.value, 10) : null;
}

function handleNext() {
    const selectedAnswer = getSelectedAnswer();
    if (selectedAnswer === null) {
        alert("Please select an answer before proceeding.");
        return;
    }

    const correctAnswerIndex = questions[currentQuestionIndex].answers.findIndex(
        (answer) => answer.correct
    );

    userAnswers[currentQuestionIndex] = {
        question: questions[currentQuestionIndex].question,
        selected: questions[currentQuestionIndex].answers[selectedAnswer].text,
        correct: questions[currentQuestionIndex].answers[correctAnswerIndex].text,
        isCorrect: selectedAnswer === correctAnswerIndex,
    };

    if (selectedAnswer === correctAnswerIndex) {
        score++;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        nextButton.style.display = "none";
        submitButton.style.display = "inline-block";
    }
}

function handleSubmit() {
    quizContainer.style.display = "none";
    submitButton.style.display = "none";
    resultsContainer.style.display = "block";

    const resultsHtml = userAnswers
        .map(
            (answer, index) => `
            <div>
                <p><strong>Question ${index + 1}:</strong> ${answer.question}</p>
                <p><strong>Your Answer:</strong> ${
                    answer.selected
                } <span style="color: ${
                answer.isCorrect ? "green" : "red"
            }">${answer.isCorrect ? "(Correct)" : "(Incorrect)"}</span></p>
                <p><strong>Correct Answer:</strong> ${answer.correct}</p>
                ${
                    !answer.isCorrect
                        ? `<button class="edit-btn" onclick="editAnswer(${index})" data-index="${index}">Edit Answer</button>`
                        : ""
                }
                <hr>
            </div>
        `
        )
        .join("");

    resultsContainer.innerHTML = `
        <h2>Quiz Completed!</h2>
        <p>Your Score: ${score} / ${questions.length}</p>
        <div>${resultsHtml}</div>
        <button onclick="restartQuiz()">Restart Quiz</button>
    `;
}

function editAnswer(questionIndex) {
    const question = questions[questionIndex];
    const userAnswer = userAnswers[questionIndex];
    const correctAnswerIndex = question.answers.findIndex(
        (answer) => answer.correct
    );

    // Show the question again for editing
    quizContainer.innerHTML = `
        <div class="question">${question.question}</div>
        <ul class="answers">
            ${question.answers
                .map(
                    (answer, index) =>
                        `<li><label><input type="radio" name="answer" value="${index}" ${
                            userAnswer.selected === answer.text ? "checked" : ""
                        }> ${answer.text}</label></li>`
                )
                .join("")}
        </ul>
        <button id="saveBtn">Save</button>
    `;

    // Wait for the save button click
    document.getElementById("saveBtn").addEventListener("click", function () {
        const selectedAnswer = getSelectedAnswer();
        if (selectedAnswer === null) {
            alert("Please select an answer.");
            return;
        }

        const updatedAnswer = question.answers[selectedAnswer].text;
        const isCorrect = question.answers[selectedAnswer].correct;
        const correctAnswer = question.answers[correctAnswerIndex].text;

        // Update the user answer
        userAnswers[questionIndex] = {
            question: question.question,
            selected: updatedAnswer,
            correct: correctAnswer,
            isCorrect: isCorrect,
        };

        // Update score if needed
        score = userAnswers.reduce((total, answer) => total + (answer.isCorrect ? 1 : 0), 0);

        // Re-render the results after the update
        handleSubmit();
    });
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    resultsContainer.style.display = "none";
    quizContainer.style.display = "block";
    nextButton.style.display = "inline-block";
    submitButton.style.display = "none";
    displayQuestion();
}

nextButton.addEventListener("click", handleNext);
submitButton.addEventListener("click", handleSubmit);

// Initialize the quiz
displayQuestion();


function editAnswer(questionIndex) {
    // Show quiz container and hide results and buttons
    quizContainer.style.display = "block";
    resultsContainer.style.display = "none";
    submitButton.style.display = "none";
    nextButton.style.display = "none";

    const question = questions[questionIndex];
    const userAnswer = userAnswers[questionIndex];
    const correctAnswerIndex = question.answers.findIndex(
        (answer) => answer.correct
    );

    quizContainer.innerHTML = `
        <div class="question">${question.question}</div>
        <ul class="answers">
            ${question.answers
                .map(
                    (answer, index) =>
                        `<li><label><input type="radio" name="answer" value="${index}" ${
                            userAnswer.selected === answer.text ? "checked" : ""
                        }> ${answer.text}</label></li>`
                )
                .join("")}
        </ul>
        <button id="saveBtn">Save</button>
    `;

    document.getElementById("saveBtn").addEventListener("click", function () {
        const selectedAnswer = getSelectedAnswer();
        if (selectedAnswer === null) {
            alert("Please select an answer.");
            return;
        }

        const updatedAnswer = question.answers[selectedAnswer].text;
        const isCorrect = question.answers[selectedAnswer].correct;

        userAnswers[questionIndex] = {
            question: question.question,
            selected: updatedAnswer,
            correct: question.answers[correctAnswerIndex].text,
            isCorrect: isCorrect,
        };

        score = userAnswers.reduce((total, answer) => total + (answer.isCorrect ? 1 : 0), 0);
        handleSubmit(); // Re-render results
    });
}