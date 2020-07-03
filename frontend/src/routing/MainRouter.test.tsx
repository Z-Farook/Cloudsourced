import React from "react";
import { Router } from "react-router";
import App from "../App";
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";
import { MainSwitch } from "./MainRouter";
import DataContext from "../core/DataContext";
import AuthStore from "../stores/AuthStore";

test("landing on a bad page shows the NotFoundPage with 'Whoops!' on it", () => {
  const history = createMemoryHistory();
  history.push("/some/bad/route");
  const { container } = render(
    <DataContext.Provider value={{} as any}>
      <AuthStore.Provider>
        <Router history={history}>
          <MainSwitch />
        </Router>
      </AuthStore.Provider>
    </DataContext.Provider>
  );
  expect(container).toHaveTextContent("Whoops");
});
