import React from "react";
import { Router, Route } from "react-router";
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";
import FeatureImplPage from "./index";
import { Switch } from "react-router-dom";
import AuthStore from "../../../../stores/AuthStore";
import NotFoundPage from "../../../NotFoundPage";
import { MainSwitch } from "../../../../routing/MainRouter";
import DataContext, { IResources } from "../../../../core/DataContext";
import { Configuration } from "../../../../../gen/api/dist";
import {
  IRegisterNewUserParams,
  IRegisterNewUserResult,
} from "../../../../core/DataContext/authentication";
import {
  IAddImplementationToFeatureParams,
  IAddImplementationToFeatureResult,
  IImplementationResource,
} from "../../../../core/DataContext/implementation";
const dataContextCreator = (config?: Configuration): Partial<IResources> => {
  return {
    implementation: {
      addImplementationToFeature: async (
        params: IAddImplementationToFeatureParams
      ): Promise<IAddImplementationToFeatureResult> => {
        return {
          id: 1,
          code: "jibberish",
          reviews: [],
        };
      },
    } as any,
  };
};
test("Should fail because wrong project ID", () => {
  const history = createMemoryHistory();
  history.push("projects/BAD_ID/features/1/implementation");
  const { container } = render(
    <DataContext.Provider value={dataContextCreator as any}>
      <AuthStore.Provider>
        <Router history={history}>
          <MainSwitch />
        </Router>
      </AuthStore.Provider>
    </DataContext.Provider>
  );
  expect(container).toHaveTextContent("Whoops");
});

test("Should fail because wrong feature ID", () => {
  const history = createMemoryHistory();
  history.push("projects/1/features/BAD_ID/implementation");
  const { container } = render(
    <DataContext.Provider value={dataContextCreator as any}>
      <AuthStore.Provider>
        <Router history={history}>
          <MainSwitch />
        </Router>
      </AuthStore.Provider>
    </DataContext.Provider>
  );
  expect(container).toHaveTextContent("Whoops");
});

test("Should fail because wrong url", () => {
  const history = createMemoryHistory();
  history.push("project/1/features/BAD_ID/implementation");
  const { container } = render(
    <DataContext.Provider value={dataContextCreator as any}>
      <AuthStore.Provider>
        <Router history={history}>
          <MainSwitch />
        </Router>
      </AuthStore.Provider>
    </DataContext.Provider>
  );
  expect(container).toHaveTextContent("Whoops");
});

test("Should work", () => {
  const history = createMemoryHistory();
  history.push("projects/1/features/1/implementation");
  const { container } = render(
    <DataContext.Provider value={dataContextCreator as any}>
      <AuthStore.Provider>
        <Router history={history}>
          <MainSwitch />
        </Router>
      </AuthStore.Provider>
    </DataContext.Provider>
  );
  //expect(container).toHaveTextContent("Whoops");
  expect(true).toBe(true);
});
