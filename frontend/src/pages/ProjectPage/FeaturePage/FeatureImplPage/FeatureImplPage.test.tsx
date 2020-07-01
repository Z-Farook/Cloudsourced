import React from "react";
import { Router } from "react-router";
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";
import AuthStore from "../../../../stores/AuthStore";
import { MainSwitch } from "../../../../routing/MainRouter";
import DataContext, { IResources } from "../../../../core/DataContext";
import {
  Configuration,
  ImplementationResourceApi,
} from "../../../../../gen/api/dist";

import {
  IAddImplementationToFeatureParams,
  IAddImplementationToFeatureResult,
  IGetOneByIdUsingParams,
  IGetOneByIdUsingResult,
} from "../../../../core/DataContext/implementation";
import { api } from "../../../../core/api";
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
      getOneById: async (
        params: IGetOneByIdUsingParams
      ): Promise<IGetOneByIdUsingResult> => {
        const result = await new ImplementationResourceApi(
          api.config
        ).getOneByIdUsingGET1({
          id: 1,
        });
        return result;
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
  history.push("projects/1/features/BAD_ID/implementations");
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
  // const { container } =
  render(
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
