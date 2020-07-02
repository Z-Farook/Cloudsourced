import React from "react";
import { Configuration } from "cloudsourced-api";
import authentication, { IAuthenticationResource } from "./authentication";
import implementation, { IImplementationResource } from "./implementation";

export interface IResources {
  authentication: IAuthenticationResource;
  implementation: IImplementationResource;
}

const resources = (config?: Configuration) => {
  return {
    authentication: authentication(config),
    implementation: implementation(config),
  };
};

export const defaultDataContext = (config?: Configuration) => resources(config);
const DataContext = React.createContext(defaultDataContext);

export default DataContext;
