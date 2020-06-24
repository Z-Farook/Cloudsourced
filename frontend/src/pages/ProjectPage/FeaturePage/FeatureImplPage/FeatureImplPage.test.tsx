import React from "react";
import { Router, Route } from "react-router";
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";
import FeatureImplPage from "./index";
import { Switch } from "react-router-dom";
import AuthStore from "../../../../stores/AuthStore";
import NotFoundPage from "../../../NotFoundPage";

test("Should fail because wrong project ID", () => {
  const history = createMemoryHistory();
  history.push("projects/BAD_ID/features/1/implementation");
  const { container } = render(
    <AuthStore.Provider>
      <Router history={history}>
        <Route
          exact
          path="/projects/:projectId/features/:featureId/implementation"
          component={FeatureImplPage}
        />
      </Router>
    </AuthStore.Provider>
  );
  expect(container).toHaveTextContent("Whoops");
});

test("Should fail because wrong feature ID", () => {
  const history = createMemoryHistory();
  history.push("projects/1/features/BAD_ID/implementation");
  const { container } = render(
    <AuthStore.Provider>
      <Router history={history}>
        <Route
          exact
          path="/projects/:projectId/features/:featureId/implementation"
          component={FeatureImplPage}
        />
      </Router>
    </AuthStore.Provider>
  );
  expect(container).toHaveTextContent("Whoops");
});

test("Should fail because wrong url", () => {
  const history = createMemoryHistory();
  history.push("project/1/features/BAD_ID/implementation");
  const { container } = render(
    <AuthStore.Provider>
      <Router history={history}>
        <Route
          exact
          path="/projects/:projectId/features/:featureId/implementation"
          component={FeatureImplPage}
        />

        <Route component={NotFoundPage} />
      </Router>
    </AuthStore.Provider>
  );
  expect(container).toHaveTextContent("Whoops");
});

test("Should work", () => {
  const history = createMemoryHistory();
  history.push("projects/1/features/1/implementation");
  const { container } = render(
    <AuthStore.Provider>
      <Router history={history}>
        <Route
          exact
          path="/projects/:projectId/features/:featureId/implementation"
          component={FeatureImplPage}
        />
      </Router>
    </AuthStore.Provider>
  );
  expect(container).toHaveTextContent("Whoops");
});
