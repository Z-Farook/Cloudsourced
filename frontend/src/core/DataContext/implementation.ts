import {
  Configuration,
  ImplementationResourceApi,
  ImplementationDTO,
} from "cloudsourced-api";
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

export interface IGetImplementationsFromFeatureParams {
  featureId: number;
}

export interface IGetImplementationsFromFeatureResult {
  implementations: Array<ImplementationDTO>;
}

export interface IAcceptImplementationParams {
  implementationId: number;
}

export interface IAcceptImplementationResult {
  implementation: ImplementationDTO;
}

export interface IImplementationResource {
  addImplementationToFeature: (
    params: IAddImplementationToFeatureParams
  ) => Promise<IAddImplementationToFeatureResult>;
  getOneById: (
    params: IGetOneByIdUsingParams
  ) => Promise<IGetOneByIdUsingResult>;
  getImplementationsFromFeature: (
    params: IGetImplementationsFromFeatureParams
  ) => Promise<IGetImplementationsFromFeatureResult>;
  acceptImplementation: (
    params: IAcceptImplementationParams
  ) => Promise<IAcceptImplementationResult>;
}
export interface IGetOneByIdUsingParams {
  id: number;
}
export interface IGetOneByIdUsingResult {
  implementation: ImplementationDTO;
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
    getOneById: async (
      params: IGetOneByIdUsingParams
    ): Promise<IGetOneByIdUsingResult> => {
      const result = await new ImplementationResourceApi(
        api.config
      ).getOneByIdUsingGET1({
        id: params.id,
      });
      return { implementation: result };
    },
    getImplementationsFromFeature: async (
      params: IGetImplementationsFromFeatureParams
    ): Promise<IGetImplementationsFromFeatureResult> => {
      const result = await new ImplementationResourceApi(
        api.config
      ).getImplementationFromFeatureUsingGET({
        featureId: params.featureId,
      });

      return { implementations: result };
    },
    acceptImplementation: async (
      params: IAcceptImplementationParams
    ): Promise<IAcceptImplementationResult> => {
      const result = await new ImplementationResourceApi(
        api.config
      ).acceptImplementationUsingPOST({
        implementationId: params.implementationId,
      });
      return {
        implementation: result,
      };
    },
  };
};

export default implementation;
