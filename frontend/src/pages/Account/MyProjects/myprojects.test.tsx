import {Authentication, Configuration, FeatureDTO} from "../../../../gen/api/dist";
import DataContext, {IResources} from "../../../core/DataContext";
import {IAuthenticateUserParams, IAuthenticateUserResult} from "../../../core/DataContext/authentication";
import {IGetProjectsByAuthenticatedUserResult} from "../../../core/DataContext/project";
import {IGettransactionsByAuthenticatedUserResult} from "../../../core/DataContext/transaction";
import {IArchiveFeatureParams, IGetOneByIdResult} from "../../../core/DataContext/feature";
import {act} from "react-dom/test-utils";
import {createMemoryHistory} from "history";
import {mount} from "enzyme";
import AuthStore from "../../../stores/AuthStore";
import {Router} from "react-router";
import {MainSwitch} from "../../../routing/MainRouter";
import React from "react";

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
                        name: "number1"
                    },
                    {
                        id: 2,
                        createdAt: new Date("2020-01-16"),
                        name: "number2"
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
            },

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
describe("MyProjectsPage", () => {
    it("Should navigate to my projects", async () => {
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
            const submitButton = wrapper.find(".ant-menu-item").at(5);
            await submitButton.simulate("click", {
                preventDefault() {},
            });
            await new Promise((resolve) => setImmediate(resolve));
            expect(wrapper.update().getDOMNode()).toHaveTextContent("My projects");

            const project = wrapper.find(".ant-card").at(0);
            expect(project.getDOMNode()).toHaveTextContent("number1");
            const project2 = wrapper.find(".ant-card").at(1);
            expect(project.getDOMNode()).toHaveTextContent("number2");

            // now test sort function to change order of projects
            const sortSelect = wrapper.find(".ant-select-selection-search-input");
            await sortSelect.simulate("click", {
                preventDefault() {},
            });
            await new Promise((resolve) => setImmediate(resolve));
            const descendingDate = wrapper.find(".ant-select-item").at(1);
            await descendingDate.simulate("click", {
                preventDefault() {},
            });
            await new Promise((resolve) => setImmediate(resolve));

            const projectD = wrapper.find(".ant-card").at(0);
            expect(project.getDOMNode()).toHaveTextContent("number2");
            const project2D = wrapper.find(".ant-card").at(1);
            expect(project.getDOMNode()).toHaveTextContent("number1");
        });
    });
});