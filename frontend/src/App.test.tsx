import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import {createMemoryHistory} from "history";
import DataContext from "./core/DataContext";
import AuthStore from "./stores/AuthStore";
import {Router} from "react-router";
import {MainSwitch} from "./routing/MainRouter";

test("Should run and show homepage", () => {
   const history = createMemoryHistory();
  const { container } = render(
      <DataContext.Provider value={{} as any}>
        <AuthStore.Provider>
          <Router history={history}>
            <MainSwitch />
          </Router>
        </AuthStore.Provider>
      </DataContext.Provider>
  );
  expect(container).toHaveTextContent("Redistribute to Expand.");
});


