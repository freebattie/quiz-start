import * as React from "react";

import { createRoot } from "react-dom/client";

import { act } from "react-dom/test-utils";
import { StartPage } from "../start.jsx";
import { GetAllQuestions, getRandomQuestion } from "../question.jsx";
import { QuzApp, QuestionContext } from "../quiz";
import { MemoryRouter } from "react-router-dom";
import pretty from "pretty";
global.IS_REACT_ACT_ENVIRONMENT = true;
import { Simulate } from "react-dom/test-utils";
const question = {
  index: 0,
  question: "what is the meaning of life",
  answers: ["12", "42", "13", "24"],
};
describe("quiz page", function () {
  it("should show QuizPage", function () {
    const element = document.createElement("div");

    //creat a React root from that id

    act(() => {
      const root = createRoot(element);
      root.render(<GetAllQuestions />);
    });

    expect(element).toMatchSnapshot();
  });
  it("should show answer status", function () {
    const element = document.createElement("div");

    //creat a React root from that id

    act(() => {
      const root = createRoot(element);
      root.render(
        <MemoryRouter>
          <StartPage correct={3} totalQ={8} />
        </MemoryRouter>
      );
    });
    expect(element.querySelector("[data-testid=total]").textContent).toEqual(
      "You have answered 8 questions"
    );
    expect(element.querySelector("[data-testid=correct]").textContent).toEqual(
      "and have 3 correct"
    );
    expect(pretty(element.innerHTML)).toMatchSnapshot();
  });

  it("should show question", function () {
    const element = document.createElement("div");

    //creat a React root from that id

    act(() => {
      const root = createRoot(element);
      root.render(
        <MemoryRouter initialEntries={["/quiz/new"]}>
          <QuestionContext.Provider
            value={{ getRandomQuestion: () => question }}
          >
            <QuzApp />
          </QuestionContext.Provider>
        </MemoryRouter>
      );
    });
    expect(pretty(element.innerHTML)).toMatchSnapshot();
  });
});
