import React from "react";
import { Router } from "react-router";
import App from "../App";
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";
import { MainSwitch } from "./MainRouter";
import DataContext, {IResources} from "../core/DataContext";
import AuthStore from "../stores/AuthStore";
import {Authentication, FeatureDTO} from "../../gen/api/dist/models";
import {Configuration, ImplementationResourceApi} from "../../gen/api/dist";
import {
    IAddImplementationToFeatureParams,
    IAddImplementationToFeatureResult,
    IGetOneByIdUsingParams, IGetOneByIdUsingResult
} from "../core/DataContext/implementation";
import {api} from "../core/api";
import {IAuthenticateUserParams, IAuthenticateUserResult} from "../core/DataContext/authentication";
import {IArchiveFeatureParams, IGetOneByIdResult} from "../core/DataContext/feature";
import {IGetProjectsByAuthenticatedUserResult} from "../core/DataContext/project";
import {IGettransactionsByAuthenticatedUserResult} from "../core/DataContext/transaction";

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
test("Without auth redirect to home", () => {
  const history = createMemoryHistory();
  history.push("/user/project/create");
  const { container } = render(
      <DataContext.Provider value={{} as any}>
        <AuthStore.Provider>
          <Router history={history}>
            <MainSwitch />
          </Router>
        </AuthStore.Provider>
      </DataContext.Provider>
  );
  expect(container).toHaveTextContent("In need of software components?");
});
const dataContextCreator = (config?: Configuration): Partial<IResources> => {
    return {
        authentication: {
            authenticateUser: async (
                params: IAuthenticateUserParams
            ): Promise<IAuthenticateUserResult> => {
                return {
                    authentication: {
                        id: 1,
                        createdAt: new Date("2020-06-26T18:31:26.078551Z"),
                        token: "rvCVnB28FTKS3sYm0hIAAcDBnQleQgIgcoeOUHGD",
                        expireDate: new Date("2090-07-03T18:45:17.050748Z"),
                        userId: 1,
                    },
                };
            },
        } as any,
    };
};
const setObject = () => {
    Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(), // deprecated
            removeListener: jest.fn(), // deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });
};
const initialAuthState = {
    auth: dataContextCreator().authentication?.authenticateUser({
        email: "test@email.com",
        password: "hengel",
    }) as Authentication,
};
test("With auth redirect to new route", () => {
    setObject();
    const history = createMemoryHistory();
    history.push("/user/project/create");
    const { container } = render(
        <DataContext.Provider value={{} as any}>
            <AuthStore.Provider initialState={initialAuthState}>
                <Router history={history}>
                    <MainSwitch />
                </Router>
            </AuthStore.Provider>
        </DataContext.Provider>
    );
    expect(container).toHaveTextContent("Create");
});