import * as React from "react";

import { createRoot } from "react-dom/client";

import { act } from "react-dom/test-utils";
import { StartPage } from "../start.jsx";
import { GetAllQuestions } from "../questions.jsx";
global.IS_REACT_ACT_ENVIRONMENT = true;
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
});
