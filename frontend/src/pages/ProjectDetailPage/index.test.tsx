import React from "react";
import { Authentication, Configuration } from "cloudsourced-api";
import DataContext, { IResources } from "../../core/DataContext";
import project, {
  IProjectDetailParams,
  IProjectDetailResult,
} from "../../core/DataContext/project";
import { createMemoryHistory } from "history";
import { mount } from "enzyme";
import AuthStore from "../../stores/AuthStore";
import { Router } from "react-router";
import { MainSwitch } from "../../routing/MainRouter";
import { act } from "react-dom/test-utils";
import {
  IAuthenticateUserParams,
  IAuthenticateUserResult,
} from "../../core/DataContext/authentication";

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
      getProjectDetail: async (params: 1): Promise<IProjectDetailResult> => {
        return {
          project: {
            name: "piet",
            id: 1,
            features: [
              {
                name: "Login",
                description: "I want a login system",
                codePreview: "{like this}",
                codeLanguage: ".tsx",
                points: 69,
              },
              {
                name: "Payment",
                description: "I want a payment system",
                codePreview: "[like so]",
                codeLanguage: ".cpp",
                points: 420,
              },
            ],
            description: "test",
            image: "../../noimage.png",
          },
        };
      },
    } as any,
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
const initialAuthState = {
  auth: dataContextCreator().authentication?.authenticateUser({
    email: "joost.stam@gmail.com",
    password: "hengel",
  }) as Authentication,
};
describe("projecDetailPage", () => {
  it("Should render two feature cards", async () => {
    await act(async () => {
      setObject();
      const history = createMemoryHistory();
      history.push("projects/1");
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

      const featureCards = wrapper.update().find(".ant-card");
      expect(featureCards.length).toBe(2);
    });
  });
  it("Should pass", async () => {
    await act(async () => {
      setObject();
      const history = createMemoryHistory();
      history.push("projects/1");
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
      // await wrapper.update();
      const heading = await wrapper
        .update()
        .find(".ant-page-header-heading-title")
        .getDOMNode()
        .getAttribute("title");

      expect(heading).toBe("piet");
    });
  });
  it("Should pass and navigate", async () => {
    await act(async () => {
      setObject();
      const history = createMemoryHistory();
      history.push("projects/1");
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
      await wrapper.update();

      const editButton = wrapper.find(".anticon-edit");
      await editButton.simulate("click");

      expect(history.location.pathname).toBe("/projects/1/edit");
    });
  });
});
