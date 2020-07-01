import { Configuration, ImplementationResourceApi } from "cloudsourced-api";
import { ReviewDTO } from "../../../gen/api/src/models";
import { api } from "../api";

export interface IAddImplementationToFeatureParams {
  featureId: number;
  code?: string;
}

export interface IAddImplementationToFeatureResult {
  code?: string;

  id?: number;

  reviews?: Array<ReviewDTO>;
}
export interface IImplementationResource {
  addImplementationToFeature: (
    params: IAddImplementationToFeatureParams
  ) => Promise<IAddImplementationToFeatureResult>;
}

const implementation = (config?: Configuration): IImplementationResource => {
  return {
    addImplementationToFeature: async (
      params: IAddImplementationToFeatureParams
    ): Promise<IAddImplementationToFeatureResult> => {
      const result = await new ImplementationResourceApi(
        api.config
      ).addImplementationToFeatureUsingPOST({
        featureId: params.featureId,
        implementationDTO: {
          code: params.code,
        },
      });
      return result;
    },
  };
};

export default implementation;
