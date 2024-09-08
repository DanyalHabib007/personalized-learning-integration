const questions = [
    {
        question: "What is a common method used to prevent unauthorized access to a network?",
        options: ["Firewall", "Router", "Switch", "Modem"],
        answer: "Firewall"
    },
    {
        question: "Which type of malware is designed to replicate itself and spread to other computers?",
        options: ["Virus", "Trojan", "Spyware", "Adware"],
        answer: "Virus"
    },
    {
        question: "What is the practice of sending fraudulent emails to steal sensitive information called?",
        options: ["Phishing", "Hacking", "Spamming", "Spoofing"],
        answer: "Phishing"
    },
    {
        question: "Which cryptographic technique ensures that data cannot be altered?",
        options: ["Hashing", "Encryption", "Decryption", "Firewall"],
        answer: "Hashing"
    },
    {
        question: "Which protocol is commonly used to securely transfer files over the internet?",
        options: ["FTP", "SFTP", "HTTP", "SMTP"],
        answer: "SFTP"
    },
    {
        question: "What does the term DDoS stand for?",
        options: ["Distributed Denial of Service", "Direct Denial of Service", "Data Distribution over System", "Digital Data over Systems"],
        answer: "Distributed Denial of Service"
    },
    {
        question: "What is the primary purpose of two-factor authentication (2FA)?",
        options: ["Enhance password security", "Prevent phishing", "Track user activities", "Monitor networks"],
        answer: "Enhance password security"
    },
    {
        question: "Which term refers to an attack where an attacker intercepts communication between two parties?",
        options: ["Man-in-the-middle", "Brute force", "Phishing", "Spoofing"],
        answer: "Man-in-the-middle"
    },
    {
        question: "What kind of attack involves overwhelming a system with traffic?",
        options: ["DDoS", "Phishing", "Brute Force", "Spoofing"],
        answer: "DDoS"
    },
    {
        question: "What is the process of transforming readable data into an unreadable format to protect it?",
        options: ["Encryption", "Decryption", "Hashing", "Phishing"],
        answer: "Encryption"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let answered = false;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const scoreElement = document.getElementById('score');
const nextButton = document.getElementById('next-btn');

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
}

displayQuestion();
