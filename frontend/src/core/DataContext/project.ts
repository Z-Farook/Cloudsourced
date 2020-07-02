import { Configuration, ProjectResourceApi } from "cloudsourced-api";
import { api } from "../api";

export interface IProjectResource {
  getProjectsByAuthenticatedUser: () => Promise<
    Array<IGetProjectsByAuthenticatedUserResult>
  >;
}
export interface IGetProjectsByAuthenticatedUserResult {
  createdAt?: Date;
  description?: string;
  finishedAt?: Date;
  id?: number;
  image?: string;
  name?: string;
  updatedAt?: Date;
}
const project = (config?: Configuration): IProjectResource => {
  return {
    getProjectsByAuthenticatedUser: async (): Promise<
      Array<IGetProjectsByAuthenticatedUserResult>
    > => {
      const result = await new ProjectResourceApi(
        api.config
      ).getProjectsByUserUsingGET();
      return result;
    },
  };
};

export default project;
