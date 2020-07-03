import React from "react";
import { Router } from "react-router";
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";
import AuthStore from "../../../../stores/AuthStore";
import { MainSwitch } from "../../../../routing/MainRouter";
import DataContext, { IResources } from "../../../../core/DataContext";
import {
  Authentication,
  Configuration, FeatureDTO,
  ImplementationResourceApi,
} from "../../../../../gen/api/dist";

import {
  IAddImplementationToFeatureParams,
  IAddImplementationToFeatureResult,
  IGetOneByIdUsingParams,
  IGetOneByIdUsingResult,
} from "../../../../core/DataContext/implementation";
import { api } from "../../../../core/api";
import {IAuthenticateUserParams, IAuthenticateUserResult} from "../../../../core/DataContext/authentication";
import {IArchiveFeatureParams, IGetOneByIdResult} from "../../../../core/DataContext/feature";
import {act} from "react-dom/test-utils";
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
    feature:{
      getFeaturesByUser: async(): Promise<Array<FeatureDTO>> => {
        return [];
      },
      getOneById: async():Promise<IGetOneByIdResult> => {return {feature:{id:1}}},

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
describe("implementationPage", () => {
  // it("should work", async () => {
  //   await act(async () => {
  //   const history = createMemoryHistory();
  //   history.push("projects/1/features/1/implementation");
  //   // const { container } =
  //   render(
  //     <DataContext.Provider value={dataContextCreator as any}>
  //       <AuthStore.Provider  initialState={initialAuthState}>
  //         <Router history={history}>
  //           <MainSwitch />
  //         </Router>
  //       </AuthStore.Provider>
  //     </DataContext.Provider>
  //   );
  //   //expect(container).toHaveTextContent("Whoops");
  //   expect(true).toBe(true);
  // });
  // });
  it("Should fail because wrong project ID", async() => {
    await act(async () => {
      const history = createMemoryHistory();
      history.push("projects/BAD_ID/features/1/implementation");
      const {container} = render(
          <DataContext.Provider value={dataContextCreator as any}>
            <AuthStore.Provider initialState={initialAuthState}>
              <Router history={history}>
                <MainSwitch/>
              </Router>
            </AuthStore.Provider>
          </DataContext.Provider>
      );
      expect(container).toHaveTextContent("Whoops");

    });
  });

  it("Should fail because wrong feature ID", async() => {
    await act(async () => {
    const history = createMemoryHistory();
    history.push("projects/1/features/BAD_ID/implementation");
    const { container } = render(
      <DataContext.Provider value={dataContextCreator as any}>
        <AuthStore.Provider initialState={initialAuthState}>
          <Router history={history}>
            <MainSwitch />
          </Router>
        </AuthStore.Provider>
      </DataContext.Provider>
    );
    expect(container).toHaveTextContent("Whoops");
  });
  });
});
