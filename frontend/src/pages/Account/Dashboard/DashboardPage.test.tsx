import React from "react";
import { Router } from "react-router";
import { createMemoryHistory } from "history";
import AuthStore from "../../../stores/AuthStore";
import { MainSwitch } from "../../../routing/MainRouter";
import DataContext, { IResources } from "../../../core/DataContext";
import {Authentication, Configuration, FeatureDTO} from "cloudsourced-api";
import { mount, ReactWrapper } from "enzyme";
import {
  IAuthenticateUserParams,
  IAuthenticateUserResult,
} from "../../../core/DataContext/authentication";
import { IGetProjectsByAuthenticatedUserResult } from "../../../core/DataContext/project";
import { IGettransactionsByAuthenticatedUserResult } from "../../../core/DataContext/transaction";
import { act } from "react-dom/test-utils";
import {IArchiveFeatureParams, IGetOneByIdResult} from "../../../core/DataContext/feature";
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

    },feature:{
      getFeaturesByUser: async(): Promise<Array<FeatureDTO>> => {
        return [];
      },
      getOneById: async():Promise<IGetOneByIdResult> => {return {feature:{}}},

      finishOneById: async (
          params: { featureId: number }
      ): Promise<FeatureDTO> => {
        return {}
      },
      archiveFeature: async (params: IArchiveFeatureParams): Promise<FeatureDTO> => {return {}
      }
    }

  };
};
const initialAuthState = {
  auth: dataContextCreator().authentication?.authenticateUser({
    email: "test@email.com",
    password: "hengel",
  }) as Authentication,
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
describe("DashboardPage", () => {
  it("Should pass and have 50 points after map reduce", async () => {
    await act(async () => {
      setObject();
      const history = createMemoryHistory();

      history.push("/account");
      const wrapper = mount(
        <DataContext.Provider value={dataContextCreator as any}>
          <AuthStore.Provider initialState={initialAuthState}>
            <Router history={history}>
              <MainSwitch />
            </Router>
          </AuthStore.Provider>
        </DataContext.Provider>
      );
      // wait for state
      await new Promise((resolve) => setImmediate(resolve));
      expect(wrapper.update().getDOMNode()).toHaveTextContent("My account");

      // get third statistic card and check value
      expect(
        wrapper
          .update()
          .find(".ant-statistic-content-value-int")
          .at(2)
          .getDOMNode()
      ).toHaveTextContent("50");
    });
  });
});
