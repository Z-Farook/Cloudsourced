import React from "react";
import { Router, Route } from "react-router";
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
describe("registerPage", () => {
  it("Should pass", async () => {
    await act(async () => {
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

      const dataContextCreator = (
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

      const nameInput = wrapper.find('input[name="name"]');
      await new Promise((resolve) => setImmediate(resolve));
      nameInput.simulate("change", {
        target: { value: "testName" },
      });
      await new Promise((resolve) => setImmediate(resolve));
      const lastNameInput = wrapper.find('input[name="lastname"]');
      lastNameInput.simulate("change", { target: { value: "testlastname" } });
      const emailNameInput = wrapper.find('input[name="email"]');
      await new Promise((resolve) => setImmediate(resolve));
      emailNameInput.simulate("change", {
        target: { value: "testlemail@email.com" },
      });
      await new Promise((resolve) => setImmediate(resolve));
      const passwordNameInput = wrapper.find('input[name="password"]');
      passwordNameInput.simulate("change", {
        target: { value: "testpass" },
      });
      await new Promise((resolve) => setImmediate(resolve));
      const repeatPasswordNameInput = wrapper.find(
        'input[name="repeatPassword"]'
      );
      await new Promise((resolve) => setImmediate(resolve));
      repeatPasswordNameInput.simulate("change", {
        target: { value: "testpass" },
      });
      await new Promise((resolve) => setImmediate(resolve));
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
      await new Promise((resolve) => setImmediate(resolve));
      wrapper.update();
      await new Promise((resolve) => setImmediate(resolve));
      submitButton.simulate("submit", {
        preventDefault() {},
      });

      await new Promise((resolve) => setImmediate(resolve));

      expect(wrapper.update().exists(".ant-form-item-has-error")).toEqual(
        false
      );
    });
  });

  it("Should fail on validate", async () => {
    await act(async () => {
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

      const dataContextCreator = (
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
      const submitButton = wrapper.find("button[type='submit']");

      wrapper.update();
      submitButton.simulate("submit", {
        preventDefault() {},
      });
      await new Promise((resolve) => setImmediate(resolve));

      expect(wrapper.update().exists(".ant-form-item-has-error")).toEqual(true);
    });
  });
  it("Should fail on email validation", async () => {
    await act(async () => {
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

      const dataContextCreator = (
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

      const nameInput = wrapper.find('input[name="name"]');
      await new Promise((resolve) => setImmediate(resolve));
      nameInput.simulate("change", {
        target: { value: "testName" },
      });
      await new Promise((resolve) => setImmediate(resolve));
      const lastNameInput = wrapper.find('input[name="lastname"]');
      lastNameInput.simulate("change", { target: { value: "testlastname" } });
      const emailNameInput = wrapper.find('input[name="email"]');
      await new Promise((resolve) => setImmediate(resolve));
      emailNameInput.simulate("change", {
        target: { value: "testlemail.com" },
      });
      await new Promise((resolve) => setImmediate(resolve));
      const passwordNameInput = wrapper.find('input[name="password"]');
      passwordNameInput.simulate("change", {
        target: { value: "testpass" },
      });
      await new Promise((resolve) => setImmediate(resolve));
      const repeatPasswordNameInput = wrapper.find(
        'input[name="repeatPassword"]'
      );
      await new Promise((resolve) => setImmediate(resolve));
      repeatPasswordNameInput.simulate("change", {
        target: { value: "testpass" },
      });

      const submitButton = wrapper.find("button[type='submit']");
      await new Promise((resolve) => setImmediate(resolve));
      wrapper.update();
      await new Promise((resolve) => setImmediate(resolve));
      submitButton.simulate("submit", {
        preventDefault() {},
      });
      await new Promise((resolve) => setImmediate(resolve));
      expect(wrapper.update().getDOMNode()).toHaveTextContent(
        "Must be a valid email address"
      );
    });
  });
});
