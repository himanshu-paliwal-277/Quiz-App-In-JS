const quizData = [
    {
        question: "Which HTML tag is used to define an internal style sheet?",
        options: ["<script>", "<css>", "<style>", "<link>"],
        correct: "<style>"
    },
    {
        question: "How do you add a comment in CSS?",
        options: ["/* This is a comment */", "// This is a comment", "<!-- This is a comment -->", "' This is a comment"],
        correct: "/* This is a comment */"
    },
    {
        question: "Which attribute is used to provide an alternative text for an image in HTML?",
        options: ["title", "alt", "src", "href"],
        correct: "alt"
    },
    {
        question: "Which CSS property is used to change the text color of an element?",
        options: ["text-color", "background-color", "font-color", "color"],
        correct: "color"
    },
    {
        question: "Which method is used to add an element at the end of an array in JavaScript?",
        options: [".push()", ".pop()", ".shift()", ".unshift()"],
        correct: ".push()"
    },
    {
        question: "What does the 'var' keyword do in JavaScript?",
        options: [
            "Declares a variable",
            "Defines a function",
            "Creates a constant",
            "Adds an event listener"
        ],
        correct: "Declares a variable"
    },
    {
        question: "Which HTML element is used to define the title of a document?",
        options: ["<meta>", "<head>", "<title>", "<h1>"],
        correct: "<title>"
    },
    {
        question: "Which CSS property is used to create space between an element's border and its content?",
        options: ["margin", "padding", "border-spacing", "content-spacing"],
        correct: "padding"
    },
    {
        question: "In JavaScript, which operator is used to assign a value to a variable?",
        options: ["=>", "==", "===", "="],
        correct: "="
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        options: ["<href>", "<link>", "<a>", "<nav>"],
        correct: "<a>"
    }
];

let currentQuestionIndex = 0;
let score = 0;
const currentQuestion = document.getElementById("current-question");
const currentScore = document.getElementById("current-score");

function loadQuestion() {
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');

    questionElement.innerText = quizData[currentQuestionIndex].question;
    optionsElement.innerHTML = '';

    quizData[currentQuestionIndex].options.forEach(option => {
        const optionButton = document.createElement('button');
        optionButton.className = 'block w-full text-left px-4 py-3 mt-2 bg-gray-200 rounded bg-opacity-70 hover:bg-opacity-100';
        optionButton.innerText = option;
        // optionButton.onclick = () => selectOption(option);
        optionButton.addEventListener("click", (event) => {
            selectOption(option, event.target);
        });
        optionsElement.appendChild(optionButton);
    });
}

function selectOption(selectedOption, clickedButton) {
    if (selectedOption === quizData[currentQuestionIndex].correct) {
        score+=5;
        currentScore.textContent = score;
        clickedButton.classList.add('bg-green-500', 'text-white');
        clickedButton.classList.remove("bg-opacity-70", "hover:bg-opacity-100");
    }
    else {
        clickedButton.classList.add('bg-red-500', 'text-white');
        clickedButton.classList.remove("bg-opacity-70", "hover:bg-opacity-100");
    }

    document.querySelectorAll('#options button').forEach(button => {
        button.disabled = true;
        if(button.innerText === quizData[currentQuestionIndex].correct) {
            button.classList.add('bg-green-500', 'text-white');
            button.classList.remove("bg-opacity-70", "hover:bg-opacity-100");
        }
    });
}

function nextQuestion() {
    currentQuestionIndex++;
    currentQuestion.textContent = currentQuestionIndex+1;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById('quiz-container').classList.add('hidden');
    document.getElementById('result-container').classList.remove('hidden');
    document.getElementById('score').innerText = score;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    currentQuestion.textContent = currentQuestionIndex;
    score = 0;
    currentScore.textContent = score;
    document.getElementById('quiz-container').classList.remove('hidden');
    document.getElementById('result-container').classList.add('hidden');
    loadQuestion();
}

// Initialize quiz
loadQuestion();
