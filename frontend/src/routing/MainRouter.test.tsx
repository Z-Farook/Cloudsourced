import React from "react";
import ReactDOM from "react-dom";
import { Route, Router } from "react-router";
import { mount, shallow } from "enzyme";
import { MemoryRouter } from "react-router";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import App from "../App";
import toJson from "enzyme-to-json";
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";

import MainRouter from "./MainRouter";

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
