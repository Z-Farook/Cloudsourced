import React from "react";
import { Configuration, Authentication } from "cloudsourced-api";
import DataContext, { IResources } from "../../../core/DataContext";
import { IAuthenticateUserResult } from "../../../core/DataContext/authentication";
import { act } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { mount } from "enzyme";
import AuthStore from "../../../stores/AuthStore";
import { Router } from "react-router";
import { MainSwitch } from "../../../routing/MainRouter";
import { IGetImplementationsFromFeatureResult } from "../../../core/DataContext/implementation";

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
const dataContextCreator = (config?: Configuration): Partial<IResources> => {
  return {
    implementation: {
      getImplementationsFromFeature: async (
        params: 3
      ): Promise<IGetImplementationsFromFeatureResult> => {
        return {
          implementations: [
            {
              id: 1,
              code: "// this is a code preview",
              reviews: [],
              approved: false,
              user: { name: "Hacker", infix: "von", lastName: "Man" },
            },
            {
              id: 2,
              code: "// this is my implementation",
              reviews: [],
              approved: false,
              user: { name: "Matrix", infix: "x", lastName: "Meneer" },
            },
          ],
        };
      },
    } as any,
    authentication: {
      authenticateUser: async (): Promise<IAuthenticateUserResult> => {
        return {
          authentication: {
            id: 1,
            createdAt: new Date("2020-06-26T18:31:26.078551Z"),
            token: "rvCVnB28FTKS3sYm0hIAAcDBnQleQgIgcoeOUHGD",
            expireDate: new Date("2090-07-03T18:45:17.050748Z"),
            userId: 2,
          },
        };
      },
    } as any,
  };
};
const initialAuthState = {
  auth: dataContextCreator().authentication?.authenticateUser({
    email: "joost.stam@gmail.com",
    password: "hengel",
  }) as Authentication,
};

describe("Feature page", () => {
  it("Should render two implementation cards", async () => {
    await act(async () => {
      setObject();
      const history = createMemoryHistory();
      history.push("projects/3/features/3");
      const wrapper = mount(
        <DataContext.Provider value={dataContextCreator as any}>
          <AuthStore.Provider initialState={initialAuthState}>
            <Router history={history}>
              <MainSwitch />
            </Router>
          </AuthStore.Provider>
        </DataContext.Provider>
      );
      await new Promise((resolve) => setImmediate(resolve));

      console.log(wrapper.debug());

      const implementationCards = wrapper.update().find(".ant-card-body");
      //   expect(implementationCards.length).toBe(2);
    });
  });
});
