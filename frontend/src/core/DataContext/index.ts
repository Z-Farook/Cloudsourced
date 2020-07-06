import React from "react";
import { Configuration } from "cloudsourced-api";
import authentication, { IAuthenticationResource } from "./authentication";
import project, { IProjectResource } from "./project";
import implementation, { IImplementationResource } from "./implementation";
import transaction, { ITransactionResource } from "./transaction";
import feature, { IFeatureResource } from "./feature";
import { IUserResource, user } from "./user";
import {IReviewResource, review} from "./review";

export interface IResources {
  authentication: IAuthenticationResource;
  project: IProjectResource;
  implementation: IImplementationResource;
  transaction: ITransactionResource;
  feature: IFeatureResource;
  user: IUserResource;
  review: IReviewResource;
}

const resources = (config?: Configuration) => {
  return {
    authentication: authentication(config),
    project: project(config),
    implementation: implementation(config),
    transaction: transaction(config),
    feature: feature(config),
    user: user(config),
    review: review(config),
  };
};

export const defaultDataContext = (config?: Configuration) => resources(config);
const DataContext = React.createContext(defaultDataContext);

export default DataContext;
