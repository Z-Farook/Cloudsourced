import React from "react";
import ReactDOM from "react-dom";
import { Route } from "react-router";
import { mount, shallow } from "enzyme";
import { MemoryRouter } from "react-router";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import App from "../App";
import toJson from "enzyme-to-json";

import MainRouter from "./MainRouter";

// jest.mock("react-router-dom");

// test("invalid path should redirect to 404", () => {
//   const wrapper = mount(
//     <MemoryRouter initialEntries={["/"]}>
//       <App />
//     </MemoryRouter>
//   );

//   console.log("wrapper", wrapper);
//   //   expect(wrapper.find(HomePage)).toHaveLength(0);
//   expect(wrapper.find(HomePage)).toEqual({});
//   expect(wrapper.find(NotFoundPage)).toHaveLength(1);
// });

interface IDictionary {
  [index: string]: any;
}

it("renders correct routes", () => {
  const wrapper = shallow(<MainRouter />);
  const pathMap = wrapper.find(Route).reduce((pathMap, route) => {
    console.log("\n routeProps ==>", route.props());

    const routeProps = toJson(route).props;

    // console.log("\n routeProps ==>", routeProps.path);

    const path: string = `${routeProps.path}`;

    // console.log("\n path ==>", path);

    let list = {} as IDictionary;

    list[path] = route.props();

    // pathMap[path] = toJson(route.props());

    // console.log("pathMap", pathMap);

    pathMap = list;

    return pathMap;
  }, {});
});
