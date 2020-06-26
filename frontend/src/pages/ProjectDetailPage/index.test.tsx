import React from "react";
import { Configuration } from "../../../gen/api/dist";
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

// test("the right amount of items", () => {});

describe("projecDetailPage", () => {
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
          project: {
            getProjectDetail: async (
              params: 1
            ): Promise<IProjectDetailResult> => {
              return {
                project: {
                  name: "piet",
                  id: 1,
                  features: [],
                  description: "test",
                  image: "../../noimage.png",
                },
              };
            },
          } as any,
        };
      };

      const history = createMemoryHistory();
      history.push("projects/1");
      const wrapper = mount(
        <DataContext.Provider value={dataContextCreator as any}>
          <AuthStore.Provider>
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
        .getDOMNode();

      expect(heading).toBe("piet");
    });
  });
  it("Should pass and navigate", async () => {
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
          project: {
            getProjectDetail: async (
              params: 1
            ): Promise<IProjectDetailResult> => {
              return {
                project: {
                  name: "piet",
                  id: 1,
                  features: [],
                  description: "test",
                  image: "../../noimage.png",
                },
              };
            },
          } as any,
        };
      };

      const history = createMemoryHistory();
      history.push("projects/1");
      const wrapper = mount(
        <DataContext.Provider value={dataContextCreator as any}>
          <AuthStore.Provider>
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
