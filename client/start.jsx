import { Link } from "react-router-dom";

export function StartPage({ totalQ, correct }) {
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
