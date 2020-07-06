import {
  Configuration,
  ProjectResourceApi,
  ProjectDetailDTO,
  ProjectDTO,
} from "cloudsourced-api";
import { api } from "../api";
export interface IProjectDetailParams {
  projectId: number;
}

export interface IProjectDetailResult {
  project: ProjectDetailDTO;
}

export interface IProjectsResult {
  projects: Array<ProjectDTO>;
}
export interface IProjectResource {
  getProjectsByAuthenticatedUser: () => Promise<
    Array<IGetProjectsByAuthenticatedUserResult>
  >;
  getProjectDetail: (
    params: IProjectDetailParams
  ) => Promise<IProjectDetailResult>;
  getAllProjects: () => Promise<IProjectsResult>;
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
        api.config
      ).getProjectDetailByIdUsingGET({ id: params.projectId });
      return {
        project: result,
      };
    },
    getAllProjects: async (): Promise<IProjectsResult> => {
      const result = await new ProjectResourceApi(api.config).allUsingGET2();
      return {
        projects: result,
      };
    },
  };
};

export default project;
