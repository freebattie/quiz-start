import {
  addQuiz,
  GetAllQuestions,
  isCorrectAnswer,
  getRandomQuestion,
} from "./question.jsx";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";

function ShowError() {
  return <GetAllQuestions />;
}
export const QuestionContext = createContext({ getRandomQuestion });
export function ShowQuiz({ onAddScore, onAddTotal }) {
  const wrong = "/quiz/answer/wrong";
  const correct = "/quiz/answer/correct";
  function handelClick(answer) {
    onAddTotal((t) => t + 1);
    if (isCorrectAnswer(index, answer)) {
      onAddScore((s) => s + 1);
      navigate(correct, { state: { type: "CORRECT" } });
    } else {
      navigate(wrong, { state: { type: "WRONG" } });
    }
  }

  const { getRandomQuestion } = useContext(QuestionContext);
  const [rndQ] = useState(getRandomQuestion());
  const navigate = useNavigate();
  const [index, setIndex] = useState(rndQ.index);
  const [question, setQuestion] = useState(rndQ.question);
  const [answers, setAnswers] = useState(rndQ.answers);

  return (
    <div>
      <div>{question}</div>
      {answers.map((a) => {
        return (
          <button key={a} onClick={() => handelClick(a)}>
            {a}
          </button>
        );
      })}
    </div>
  );
}

export function AddQuiz() {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("Bjarte");
  const [answer1, setAnswer1] = useState("answer1");
  const [answer2, setAnswer2] = useState("answer2");
  const [answer3, setAnswer3] = useState("answer3");
  const [answer4, setAnswer4] = useState("answer4");
  const [correct, setCorrect] = useState(1);
  const [newQuiz, setNewQuiz] = useState({
    question: "",
    answers: ["one", "two", "three", "four"],
    correct: 0,
  });
  useEffect(() => {
    setNewQuiz({
      question,
      answers: [answer1, answer2, answer3, answer4],
      correct,
    });
  }, [question, answer1, answer2, answer3, answer4, correct]);

  function handelOnSubmit(event) {
    event.preventDefault();
    addQuiz(newQuiz);

    navigate("..");
  }

  return (
    <form onSubmit={handelOnSubmit}>
      <h1>create new movie question</h1>
      <div>
        Question:
        <input
          value={question}
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
        />
      </div>
      <div>
        Answer1:
        <input
          value={answer1}
          onChange={(e) => {
            setAnswer1(e.target.value);
          }}
        />
      </div>
      <div>
        Answer2:
        <input
          value={answer2}
          onChange={(e) => {
            setAnswer2(e.target.value);
          }}
        />
      </div>
      <div>
        Answer3:
        <input
          value={answer3}
          onChange={(e) => {
            setAnswer3(e.target.value);
          }}
        />
      </div>
      <div>
        Answer4:
        <input
          value={answer4}
          onChange={(e) => {
            setAnswer4(e.target.value);
          }}
        />
      </div>
      <div>
        Correct:
        <input
          type="number"
          min="0"
          max="4"
          value={correct}
          onChange={(e) => {
            if (e.target.value >= 4) {
              setCorrect(3);
            } else {
              if (e.target.value !== "") {
                setCorrect(parseInt(e.target.value));
              } else setCorrect(e.target.value);
            }
          }}
        />
      </div>
      <button>Save</button>
      <pre>{JSON.stringify(newQuiz)}</pre>
    </form>
  );
}

function ReturnAnswer() {
  const navigate = useNavigate();
  const { state } = useLocation();
  if (state != null) {
    const { type } = state;
    return (
      <div>
        <h1>{type}</h1>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          BACK
        </button>
      </div>
    );
  } else return <ShowError />;
}

export function QuzApp({ onAddScore, onAddTotal }) {
  return (
    <Routes>
      <Route
        path={"/"}
        element={<ShowQuiz onAddScore={onAddScore} onAddTotal={onAddTotal} />}
      />
      <Route path={"new"} element={<AddQuiz />} />
      <Route path={"answer/:path"} element={<ReturnAnswer />} />
      <Route path={"*"} element={<ShowError />} />
    </Routes>
  );
}
