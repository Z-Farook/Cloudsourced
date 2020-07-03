import {
  Configuration,
  FeatureResourceApi,
  FeatureDTO,
} from "cloudsourced-api";

export interface IGetOneByIdParams {
  id: number;
}

export interface IGetOneByIdResult {
  feature: FeatureDTO;
}

export interface IFeatureResource {
  getOneById: (params: IGetOneByIdParams) => Promise<IGetOneByIdResult>;
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
  };
};

export default feature;
