import {
  Configuration,
  FeatureResourceApi,
  FeatureDTO,
} from "cloudsourced-api";

export interface IGetOneByIdParams {
  id: number;
}
export interface IFinishFeatureParams {
  featureId: number;
}
export interface IGetOneByIdResult {
  feature: FeatureDTO;
}
export interface IArchiveFeatureParams {
  featureId: number;
}

export interface IFeatureResource {
  getOneById: (params: IGetOneByIdParams) => Promise<IGetOneByIdResult>;
  finishOneById: (params: IFinishFeatureParams) => Promise<FeatureDTO>;
  getFeaturesByUser(): Promise<Array<FeatureDTO>>;
  archiveFeature(params: IArchiveFeatureParams): Promise<FeatureDTO>;
}

const feature = (config?: Configuration): IFeatureResource => {
  return {
    getOneById: async (
      params: IGetOneByIdParams
    ): Promise<IGetOneByIdResult> => {
      const result = await new FeatureResourceApi(config).getOneByIdUsingGET({
        id: params.id,
      });

      return {
        feature: result,
      };
    },
    finishOneById: async (
      params: IFinishFeatureParams
    ): Promise<FeatureDTO> => {
      return await new FeatureResourceApi(config).finishFeatureUsingPOST({
        featureId: params.featureId,
      });
    },
    getFeaturesByUser: async (): Promise<Array<FeatureDTO>> => {
      return await new FeatureResourceApi(config).getFeaturesByUserUsingGET();
    },
    archiveFeature: async (
      params: IArchiveFeatureParams
    ): Promise<FeatureDTO> => {
      return await new FeatureResourceApi(config).archiveFeatureUsingPOST({
        featureId: params.featureId,
      });
    },
  };
};

export default feature;
