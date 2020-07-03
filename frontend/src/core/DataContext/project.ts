
import { Configuration, ProjectResourceApi , ProjectDetailDTO} from "cloudsourced-api";
import { api } from "../api";
export interface IProjectDetailParams {
  projectId: number;
}

export interface IProjectDetailResult {
  project: ProjectDetailDTO;
}
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
   getProjectDetail: async (
      params: IProjectDetailParams
    ): Promise<IProjectDetailResult> => {
      const result = await new ProjectResourceApi(
        config
      ).getProjectDetailByIdUsingGET({ id: params.projectId });
      return {
        project: result,
      };
};

export default project;
