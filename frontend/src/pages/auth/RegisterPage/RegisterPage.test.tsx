import React from "react";
import { Router } from "react-router";
import { createMemoryHistory } from "history";
import AuthStore from "../../../stores/AuthStore";
import { MainSwitch } from "../../../routing/MainRouter";
import DataContext, { IResources } from "../../../core/DataContext";
import { Configuration } from "cloudsourced-api";
import {
  IRegisterNewUserParams,
  IRegisterNewUserResult,
} from "../../../core/DataContext/authentication";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
const fillForm = async (wrapper: any) => {
  const nameInput = await wrapper.find('input[name="name"]');

  await nameInput.simulate("change", {
    target: { value: "testName" },
  });

  const lastNameInput = await wrapper.find('input[name="lastname"]');
  await lastNameInput.simulate("change", { target: { value: "testlastname" } });
  const emailNameInput = await wrapper.find('input[name="email"]');

  await emailNameInput.simulate("change", {
    target: { value: "testlemail@email.com" },
  });

  const passwordNameInput = await wrapper.find('input[name="password"]');
  await passwordNameInput.simulate("change", {
    target: { value: "testpass" },
  });

  const repeatPasswordNameInput = await wrapper.find(
    'input[name="repeatPassword"]'
  );

  await repeatPasswordNameInput.simulate("change", {
    target: { value: "testpass" },
  });
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
const emptyDataContextCreator = (
  config?: Configuration
): Partial<IResources> => {
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
describe("registerPage", () => {
  it("Should pass and navigate to login page", async () => {
    await act(async () => {
      setObject();
      const dataContextCreator = (
        config?: Configuration
      ): Partial<IResources> => {
        return {
          authentication: {
            registerNewUser: async (
              params: IRegisterNewUserParams
            ): Promise<IRegisterNewUserResult> => {
              return {
                user: {
                  authentication: {
                    id: 1,
                  },
                  name: params.name,
                  email: params.email,
                },
              };
            },
            postImage: async (params: string): Promise<string> => {
              return ""
            },
          } as any,
        };
      };
      const history = createMemoryHistory();
      history.push("auth/register");
      const wrapper = mount(
        <DataContext.Provider value={dataContextCreator as any}>
          <AuthStore.Provider>
            <Router history={history}>
              <MainSwitch />
            </Router>
          </AuthStore.Provider>
        </DataContext.Provider>
      );
      await fillForm(wrapper);

      expect(wrapper.update().find('input[name="name"]').props().value).toEqual(
        "testName"
      );
      expect(
        wrapper.update().find('input[name="lastname"]').props().value
      ).toEqual("testlastname");
      expect(
        wrapper.update().find('input[name="email"]').props().value
      ).toEqual("testlemail@email.com");
      expect(
        wrapper.update().find('input[name="password"]').props().value
      ).toEqual("testpass");
      expect(
        wrapper.update().find('input[name="repeatPassword"]').props().value
      ).toEqual("testpass");

      const submitButton = wrapper.find("button[type='submit']");

      submitButton.simulate("click", {
        preventDefault() {},
      });
      await new Promise((resolve) => setImmediate(resolve));

      expect(wrapper.update().exists(".ant-form-item-has-error")).toEqual(
        false
      );

      expect(history.location.pathname).toBe("/auth/login");
    });
  });

  it("Should fail on validate", async () => {
    await act(async () => {
      setObject();
      const history = createMemoryHistory();
      history.push("auth/register");
      const wrapper = mount(
        <DataContext.Provider value={emptyDataContextCreator as any}>
          <AuthStore.Provider>
            <Router history={history}>
              <MainSwitch />
            </Router>
          </AuthStore.Provider>
        </DataContext.Provider>
      );
      const submitButton = wrapper.find("button[type='submit']");

      wrapper.update();
      submitButton.simulate("click", {
        preventDefault() {},
      });
      await new Promise((resolve) => setImmediate(resolve));
      expect(wrapper.update().exists(".ant-form-item-has-error")).toEqual(true);
      expect(history.location.pathname).toEqual("/auth/register");
    });
  });
  it("Should fail on email validation", async () => {
    await act(async () => {
      setObject();
      const history = createMemoryHistory();
      history.push("auth/register");
      const wrapper = mount(
        <DataContext.Provider value={emptyDataContextCreator as any}>
          <AuthStore.Provider>
            <Router history={history}>
              <MainSwitch />
            </Router>
          </AuthStore.Provider>
        </DataContext.Provider>
      );

      await fillForm(wrapper);
      const emailNameInput = await wrapper.find('input[name="email"]');
      await emailNameInput.simulate("change", {
        target: { value: "testlemail@email.com3546546" },
      });

      const submitButton = wrapper.find("button[type='submit']");

      wrapper.update();

      submitButton.simulate("click", {
        preventDefault() {},
      });
      await new Promise((resolve) => setImmediate(resolve));
      expect(wrapper.update().getDOMNode()).toHaveTextContent(
        "Must be a valid email address"
      );
    });
  });
});
