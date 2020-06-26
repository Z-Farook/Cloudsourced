import {
  ProjectResourceApi,
  Configuration,
  ProjectDetailDTO,
} from "cloudsourced-api";

export interface IProjectDetailParams {
  projectId: number;
}

export interface IProjectDetailResult {
  project: ProjectDetailDTO;
}

export interface IProjectResource {
  getProjectDetail: (
    params: IProjectDetailParams
  ) => Promise<IProjectDetailResult>;
}

const project = (config?: Configuration): IProjectResource => {
  return {
    getProjectDetail: async (
      params: IProjectDetailParams
    ): Promise<IProjectDetailResult> => {
      const result = await new ProjectResourceApi(
        config
      ).getProjectDetailByIdUsingGET({ id: params.projectId });
      return {
        project: result,
      };
    },
  };
};

export default project;
