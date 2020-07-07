import React from "react";
import {
  Configuration,
  ProjectResourceApi,
  Authentication,
} from "cloudsourced-api";
import DataContext, { IResources } from "../../core/DataContext";
import { IProjectsResult } from "../../core/DataContext/project";
import { IAuthenticateUserResult } from "../../core/DataContext/authentication";
import { act } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { mount } from "enzyme";
import AuthStore from "../../stores/AuthStore";
import { Router } from "react-router";
import { MainSwitch } from "../../routing/MainRouter";

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
    project: {
      getAllProjects: async (): Promise<IProjectsResult> => {
        return {
          projects: [
            {
              name: "Project 1",
              description: "Cash machine",
              image: "https://picsum.photos/200",
            },
            {
              name: "Project 2",
              description: "Cash dripper",
              image: "https://picsum.photos/200",
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
            userId: 1,
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

describe("Project page", () => {
  it("Should render two project cards", async () => {
    await act(async () => {
      setObject();
      const history = createMemoryHistory();
      history.push("projects");
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

      const projectCards = wrapper.update().find(".ant-card-head-title");
      expect(projectCards.length).toBe(2);
    });
  });
});
