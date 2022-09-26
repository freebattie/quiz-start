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
import {
  isCorrectAnswer,
  getRandomQuestion,
  addQuiz,
  GetAllQuestions,
} from "./question.jsx";
import { QuzApp } from "./quiz.jsx";
import { StartPage } from "./start.jsx";

// get the root element in index.html
const container = document.getElementById("app");
//creat a React root from that id
const root = createRoot(container);

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
        <Route path={"*"} element={<GetAllQuestions />} />
      </Routes>
    </BrowserRouter>
  );
}

// render a h1 tag with "hello world"
root.render(<Application />);
