import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { isCorrectAnswer, questions, addQuiz } from "./questions";

// get the root element in index.html
const container = document.getElementById("app");
//creat a React root from that id
const root = createRoot(container);
const wrong = "/quiz/answer/wrong";
const correct = "/quiz/answer/correct";
function StartPage({ totalQ, correct }) {
  return (
    <div>
      <h1>Welcome too the start page</h1>
      <h2>
        You have answered {totalQ} {totalQ > 1 ? "questions" : "question"}
      </h2>
      <h2>and have {correct} correct</h2>
      <ul>
        <li>
          <Link to={"/quiz"}>Take Quiz</Link>
        </li>
        <li>
          <Link to={"/quiz/new"}> Add a Quiz</Link>
        </li>
      </ul>
    </div>
  );
}

function ShowError() {
  return <h1>ERROR PAGE</h1>;
}

function ShowQuiz({ onAddScore, onAddTotal }) {
  function handelClick(answer) {
    onAddTotal((t) => t + 1);
    if (isCorrectAnswer(index, answer)) {
      onAddScore((s) => s + 1);
      navigate(correct, { state: { type: "CORRECT" } });
    } else {
      navigate(wrong, { state: { type: "WRONG" } });
    }
  }

  let currentQ;
  currentQ = questions();
  const navigate = useNavigate();
  const [index, setIndex] = useState(currentQ.index);
  const [question, setQuestion] = useState(currentQ.question);
  const [answers, setAnswers] = useState(currentQ.answers);

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

function AddQuiz() {
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
          min="1"
          max="5"
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

function QuzApp({ onAddScore, onAddTotal }) {
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

function Application() {
  const [correct, setCorrect] = useState(0);
  const [totalQ, setTotalQ] = useState(0);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={"/"}
          element={<StartPage correct={correct} totalQ={totalQ} />}
        />
        <Route
          path={"/quiz/*"}
          element={<QuzApp onAddScore={setCorrect} onAddTotal={setTotalQ} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

// render a h1 tag with "hello world"
root.render(<Application />);
