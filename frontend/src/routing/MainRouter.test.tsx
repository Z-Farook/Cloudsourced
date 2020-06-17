import React from "react";
import { Router } from "react-router";
import App from "../App";
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";

test("landing on a bad page shows 404 page", () => {
  const history = createMemoryHistory();
  history.push("/some/bad/route");
  const { getByRole } = render(
    <Router history={history}>
      <App />
    </Router>
  );
  expect(getByRole("heading")).toHaveTextContent("404 Not Found");
});
