const quizzes = [
  {
    question: "What is the capital of Norway?",
    answers: ["Oslo", "Stavanger", "Bergen", "Kristiansand"],
    correct: 0,
  },
  {
    question: "What is the capital of Sweden?",
    answers: ["Oslo", "Stockholm", "Bergen", "Kristiansand"],
    correct: 1,
  },
  {
    question: "What is the largest city in Norway",
    answers: ["Ålesund", "Stavanger", "Oslo", "Kristiansand"],
    correct: 2,
  },
  {
    question: "What is not a city in Norway",
    answers: ["Oslo", "Stavanger", "Gøteborg", "Kristiansand"],
    correct: 2,
  },
  {
    question: "What is country dose not share a land border with norway?",
    answers: ["Russia", "Sweden", "Finland", "Denmark"],
    correct: 3,
  },
];
export function addQuiz(quiz) {
  quizzes.push(quiz);

  quizzes.forEach((e) => console.log(e));
}
export function isCorrectAnswer(index, answer) {
  return quizzes[index].answers.indexOf(answer) === quizzes[index].correct;
}

function QuestionCard({ quiz }) {
  return (
    <div>
      <h1>{quiz.question}</h1>
      {quiz.answers.map((a, key) => (
        <div key={key}>{a}</div>
      ))}
    </div>
  );
}

export function GetAllQuestions(event) {
  return quizzes.map((quiz, key) => {
    return <QuestionCard key={key} quiz={quiz} />;
  });
}
export function getRandomQuestion() {
  const newQ = Math.trunc(Math.random() * quizzes.length);

  return {
    index: newQ,
    question: quizzes[newQ].question,
    answers: quizzes[newQ].answers,
  };
}
