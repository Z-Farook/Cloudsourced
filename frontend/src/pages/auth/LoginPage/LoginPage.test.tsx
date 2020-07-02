import React from "react";
import { Router } from "react-router";
import { createMemoryHistory } from "history";
import AuthStore from "../../../stores/AuthStore";
import { MainSwitch } from "../../../routing/MainRouter";
import DataContext, { IResources } from "../../../core/DataContext";
import { Configuration } from "cloudsourced-api";
import {
  IAuthenticateUserParams,
  IAuthenticateUserResult,
} from "../../../core/DataContext/authentication";
import { mount, ReactWrapper } from "enzyme";
import { act } from "react-dom/test-utils";
import { IGetProjectsByAuthenticatedUserResult } from "../../../core/DataContext/project";
import { IGettransactionsByAuthenticatedUserResult } from "../../../core/DataContext/transaction";

const fillForm = async (
  wrapper: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>
) => {
  const emailNameInput = await wrapper.find('input[name="email"]');
  await emailNameInput.simulate("change", {
    target: { value: "testlemail@email.com" },
  });

  const passwordInput = await wrapper.find('input[name="password"]');
  await passwordInput.simulate("change", {
    target: { value: "testpass" },
  });
};

const emptyForm = async (
  wrapper: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>
) => {
  const emailNameInput = await wrapper.find('input[name="email"]');
  await emailNameInput.simulate("change", {
    target: { value: "" },
  });

  const passwordInput = await wrapper.find('input[name="password"]');
  await passwordInput.simulate("change", {
    target: { value: "" },
  });
};
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
    project: {
      getProjectsByAuthenticatedUser: async (): Promise<
        Array<IGetProjectsByAuthenticatedUserResult>
      > => {
        return [
          {
            id: 1,
            createdAt: new Date("2019-01-16"),
          },
          {
            id: 2,
            createdAt: new Date("2020-01-16"),
          },
        ];
      },
    } as any,
    transaction: {
      getTransactionsByAuthenticatedUser: async (): Promise<
        Array<IGettransactionsByAuthenticatedUserResult>
      > => {
        return [
          {
            id: 1,
            points: 20,
          },
          {
            id: 2,
            points: 30,
          },
        ];
      },
    },
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
describe("loginPage", () => {
  it("Should fail and has error", async () => {
    await act(async () => {
      setObject();
      const history = createMemoryHistory();
      history.push("auth/login");
      const wrapper = mount(
        <DataContext.Provider value={dataContextCreator as any}>
          <AuthStore.Provider>
            <Router history={history}>
              <MainSwitch />
            </Router>
          </AuthStore.Provider>
        </DataContext.Provider>
      );
      await emptyForm(wrapper);
      const submitButton = wrapper.find("button[type='submit']");

      await submitButton.simulate("click", {
        preventDefault() {},
      });
      await new Promise((resolve) => setImmediate(resolve));

      expect(wrapper.update().exists(".ant-form-item-has-error")).toEqual(true);
      expect(wrapper.update().getDOMNode()).toHaveTextContent(
        "Email is a required field"
      );
    });
  });
  it("Should fail on email validation", async () => {
    await act(async () => {
      setObject();
      const history = createMemoryHistory();
      history.push("auth/login");
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
  it("Should pass and login", async () => {
    await act(async () => {
      setObject();
      const history = createMemoryHistory();
      history.push("auth/login");
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

      const submitButton = wrapper.find("button[type='submit']");

      await submitButton.simulate("click", {
        preventDefault() {},
      });
      await new Promise((resolve) => setImmediate(resolve));

      expect(history.location.pathname).toBe("/account");
    });
  });
});
