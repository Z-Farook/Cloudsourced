import React from "react";
import { Router, Route } from "react-router";
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";
import { Switch } from "react-router-dom";
import AuthStore from "../../../stores/AuthStore";
import { MainSwitch } from "../../../routing/MainRouter";
import DataContext, { IResources } from "../../../core/DataContext";
import { Configuration, AuthenticationResourceApi } from "cloudsourced-api";
import {
  IRegisterNewUserParams,
  IRegisterNewUserResult,
  IAuthenticationResource,
} from "../../../core/DataContext/authentication";

test("Should pass", () => {
  const dataContextCreator = (config?: Configuration): Partial<IResources> => {
    return {
      authentication: {
        registerNewUser: async (
          params: IRegisterNewUserParams
        ): Promise<IRegisterNewUserResult> => {
          return {
            user: {},
          };
        },
      } as any,
    };
  };
  const history = createMemoryHistory();
  history.push("auth/register");
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
