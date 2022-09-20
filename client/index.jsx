import { createRoot, useEffect } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  createRoutesFromChildren,
} from "react-router-dom";
import { useState } from "react";

// get the root element in index.html
const container = document.getElementById("app");
//creat a react root from that id
const root = createRoot(container);

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

function ShowQuiz() {
  return <h1>THis is the QUIZ</h1>;
}

function AddQuiz() {
  return null;
}

function QuzApp() {
  return (
    <Routes>
      <Route path={"/"} element={<ShowQuiz />} />
      <Route path={"/new"} element={<AddQuiz />} />
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
