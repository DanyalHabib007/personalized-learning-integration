const questions = [
    {
        question: "Which HTML element is used to define a hyperlink?",
        options: ["<link>", "<a>", "<href>", "<hyperlink>"],
        answer: "<a>"
    },
    {
        question: "Which CSS property controls the text size?",
        options: ["font-size", "text-style", "font-weight", "text-size"],
        answer: "font-size"
    },
    {
        question: "What does DOM stand for in web development?",
        options: ["Document Object Model", "Data Object Manager", "Document Operation Manager", "Data Object Module"],
        answer: "Document Object Model"
    },
    {
        question: "Which JavaScript method is used to access an element by its ID?",
        options: ["getElementById()", "getId()", "querySelector()", "getElement()"],
        answer: "getElementById()"
    },
    {
        question: "Which tag is used to create a table in HTML?",
        options: ["<table>", "<div>", "<td>", "<ul>"],
        answer: "<table>"
    },
    {
        question: "What is the correct syntax for linking an external stylesheet in HTML?",
        options: ["<link rel='stylesheet' href='style.css'>", "<style link='style.css'>", "<stylesheet src='style.css'>", "<css href='style.css'>"],
        answer: "<link rel='stylesheet' href='style.css'>"
    },
    {
        question: "Which HTTP method is used to request data from a server?",
        options: ["GET", "POST", "PUT", "DELETE"],
        answer: "GET"
    },
    {
        question: "What does CSS stand for?",
        options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
        answer: "Cascading Style Sheets"
    },
    {
        question: "Which JavaScript framework is commonly used for building interactive UIs?",
        options: ["React", "Laravel", "Django", "Flask"],
        answer: "React"
    },
    {
        question: "Which tag is used to define an image in HTML?",
        options: ["<img>", "<picture>", "<image>", "<src>"],
        answer: "<img>"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let answered = false;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const scoreElement = document.getElementById('score');
const nextButton = document.getElementById('next-btn');
const feedbackButton = document.getElementById('feedback-btn');
const feedbackContainer = document.getElementById('feedback-container');
const loadingElement = document.getElementById('loading');
const recommendationElement = document.getElementById('recommendation');

function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = '';
    answered = false;
    nextButton.style.display = 'none';

    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(option, button));
        optionsElement.appendChild(button);
    });
}

function checkAnswer(selectedOption, button) {
    if (answered) return; // Prevents changing the answer

    const currentQuestion = questions[currentQuestionIndex];
    const buttons = optionsElement.getElementsByTagName('button');

    Array.from(buttons).forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === currentQuestion.answer) {
            btn.classList.add('correct');
        } else if (btn.textContent === selectedOption) {
            btn.classList.add('incorrect');
        }
    });

    if (selectedOption === currentQuestion.answer) {
        score++;
        scoreElement.textContent = `Score: ${score}`; // Update score dynamically
    }

    answered = true;
    nextButton.style.display = 'block';
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    questionElement.textContent = 'Quiz Completed!';
    optionsElement.innerHTML = '';
    scoreElement.textContent = `Your Score: ${score} / ${questions.length}`;
    nextButton.style.display = 'none';

    // Show "Give Feedback" button after quiz completion
    feedbackButton.style.display = 'block';
}

function showFeedbackForm() {
    // Hide the quiz container and show feedback form
    document.querySelector('.container').style.display = 'none'; // Hides the quiz container (with score and button)
    feedbackContainer.style.display = 'block'; // Shows the feedback form
}

function submitFeedback() {
    const rating = document.querySelector('input[name="rating"]:checked');
    const interest = document.getElementById('interest').value;

    if (rating && interest) {
        // Show loading animation
        loadingElement.style.display = 'block';
        recommendationElement.style.display = 'none'; // Hide previous recommendations

        // Get form data
        const formData = {
            quiz_score: score,
            learning_style: "Text",
            course_selected: "Web Development",
            user_rating: rating.value,
            area_of_interest: interest
        };

        // Call the FastAPI backend
        fetch('http://192.168.31.32:8000/recommend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            const markdown = data.recommendation;

            // Convert Markdown to HTML using Showdown
            const converter = new showdown.Converter();
            const html = converter.makeHtml(markdown);

            // Display the result in the recommendation div
            recommendationElement.innerHTML = html;
            recommendationElement.style.display = 'flex'; // Show the recommendation div
            loadingElement.style.display = 'none'; // Hide loading animation
        })
        .catch(error => {
            console.error('Error:', error);
            recommendationElement.innerHTML = 'Failed to get recommendation';
            recommendationElement.style.display = 'flex'; // Show error message
            loadingElement.style.display = 'none'; // Hide loading animation
        });
    } else {
        alert('Please select a rating and enter your area of interest before submitting your feedback.');
    }
}

displayQuestion();