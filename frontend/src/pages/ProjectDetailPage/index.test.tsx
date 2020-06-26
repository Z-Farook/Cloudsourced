import React from "react";
import { Configuration } from "../../../gen/api/dist";
import { IResources } from "../../core/DataContext";

test("the right amount of items", () => {});

describe("projecDetailPage", () => {
  it("Should pass", async () => {
    await (async () => {
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
    });
  });
});
