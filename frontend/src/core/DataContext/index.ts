import React from "react";
import { Configuration } from "cloudsourced-api";
import authentication, { IAuthenticationResource } from "./authentication";
import project, { IProjectResource } from "./project";

export interface IResources {
  authentication: IAuthenticationResource;
  project: IProjectResource;
}

const resources = (config?: Configuration) => {
  return {
    authentication: authentication(config),
    project: project(config),
  };
};

export const defaultDataContext = (config?: Configuration) => resources(config);
const DataContext = React.createContext(defaultDataContext);

export default DataContext;
