import React from "react";
import { Configuration } from "cloudsourced-api";
import authentication, { IAuthenticationResource } from "./authentication";
import project, { IProjectResource } from "./project";
import implementation, { IImplementationResource } from "./implementation";

export interface IResources {
  authentication: IAuthenticationResource;
  project: IProjectResource;
  implementation: IImplementationResource;
}

const resources = (config?: Configuration) => {
  return {
    authentication: authentication(config),
    project: project(config),
    implementation: implementation(config),
  };
};

export const defaultDataContext = (config?: Configuration) => resources(config);
const DataContext = React.createContext(defaultDataContext);

export default DataContext;
