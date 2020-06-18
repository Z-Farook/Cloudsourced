import React from "react";
import { Router } from "react-router";
import App from "../App";
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";

test("landing on a bad page shows the NotFoundPage with 'Whoops!' on it", () => {
  const history = createMemoryHistory();
  history.push("/some/bad/route");
  const { getByText } = render(
    <Router history={history}>
      <App />
    </Router>
  );

  expect(getByText("Whoops!")).toBeInTheDocument();
});
