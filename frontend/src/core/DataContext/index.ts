import React from "react";
import { Configuration } from "cloudsourced-api";
import authentication, { IAuthenticationResource } from "./authentication";
import implementation, { IImplementationResource } from "./implementation";
import project, { IProjectResource } from "./project";
import transaction, { ITransactionResource } from "./transaction";

export interface IResources {
  authentication: IAuthenticationResource;
  implementation: IImplementationResource;
  project: IProjectResource;
  transaction: ITransactionResource;
}

const resources = (config?: Configuration) => {
  return {
    authentication: authentication(config),
    implementation: implementation(config),
    project: project(config),
    transaction: transaction(config),
  };
};

export const defaultDataContext = (config?: Configuration) => resources(config);
const DataContext = React.createContext(defaultDataContext);

export default DataContext;
