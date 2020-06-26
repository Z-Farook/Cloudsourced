import React from "react";
import { Configuration } from "cloudsourced-api";
import authentication, { IAuthenticationResource } from "./authentication";

export interface IResources {
  authentication: IAuthenticationResource;
}

const resources = (config?: Configuration) => {
  return {
    authentication: authentication(config),
  };
};

export const defaultDataContext = (config?: Configuration) => resources(config);
const DataContext = React.createContext(defaultDataContext);

export default DataContext;
