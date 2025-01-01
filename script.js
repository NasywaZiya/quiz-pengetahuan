const questions = [
  {
    question: "Apa benua terbesar di dunia?",
    answers: [
      { text: "Asia", correct: true },
      { text: "Amerika", correct: false },
      { text: "Eropa", correct: false },
      { text: "Afrika", correct: false },
    ],
  },
  {
    question: "Apa negara terluas di dunia?",
    answers: [
      { text: "China", correct: false },
      { text: "Indonesia", correct: false },
      { text: "India", correct: false },
      { text: "Rusia", correct: true },
    ],
  },
  {
    question: "Apa nama samudra terluas di dunia?",
    answers: [
      { text: "Hindia", correct: false },
      { text: "Pasifik", correct: true },
      { text: "Atlantik", correct: false },
      { text: "Antartika", correct: false },
    ],
  },
  {
    question: "Apa nama sungai terpanjang di dunia?",
    answers: [
      { text: "Amazon", correct: false },
      { text: "Mississippi", correct: false },
      { text: "Nil", correct: true },
      { text: "Yangtze", correct: false },
    ],
  },
  {
    question: "Negara apa yang memiliki penduduk terbanyak di dunia?",
    answers: [
      { text: "China", correct: false },
      { text: "Amerika", correct: false },
      { text: "India", correct: true },
      { text: "Indonesia", correct: false },
    ],
  },
  {
    question: "Apa nama gurun pasir terluas di dunia?",
    answers: [
      { text: "Gobi", correct: false },
      { text: "Arabia", correct: false },
      { text: "Kalahari", correct: false },
      { text: "Sahara", correct: true },
    ],
  },
  {
    question: "Apa negara terkecil di dunia?",
    answers: [
      { text: "Vatikan", correct: true },
      { text: "Kamboja", correct: false },
      { text: "Luksemburg", correct: false },
      { text: "Afghanistan", correct: false },
    ],
  },
  {
    question: "Apa negara tertua di dunia?",
    answers: [
      { text: "India", correct: false },
      { text: "Afghanistan", correct: false },
      { text: "Mesir", correct: true },
      { text: "Inggris", correct: false },
    ],
  },
  {
    question: "Negara apa yang memiliki pulau terbanyak di dunia?",
    answers: [
      { text: "Indonesia", correct: false },
      { text: "Filipina", correct: false },
      { text: "Swedia", correct: true },
      { text: "Hongkong", correct: false },
    ],
  },
  {
    question: "Di mana letak gunung Everest?",
    answers: [
      { text: "Asia", correct: true },
      { text: "Eropa", correct: false },
      { text: "Afrika", correct: false },
      { text: "Australia", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `Skor Anda adalah ${score} dari ${questions.length} soal!`;
  nextButton.innerHTML = "Main lagi";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
