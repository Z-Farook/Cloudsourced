import {Configuration, ReviewDTO, ReviewResourceApi} from "cloudsourced-api";

export interface IGetReviewsFromImplementationParams {
  implementationId: number;
}

interface IGetReviewsFromImplementationResult {
  reviews: ReviewDTO[];
}

export interface IAddReviewToImplementationParams {
  implementationId: number;
  review: ReviewDTO;
}

export interface IAddReviewToImplementationResult {
  review: ReviewDTO;
}

export interface IReviewResource {
  getReviewsFromImplementation: (params: IGetReviewsFromImplementationParams) => Promise<IGetReviewsFromImplementationResult>;
  addReviewToImplementation: (params: IAddReviewToImplementationParams) => Promise<IAddReviewToImplementationResult>;
}

export const review = (config?: Configuration): IReviewResource => {
  return {
    getReviewsFromImplementation: async (params: IGetReviewsFromImplementationParams): Promise<IGetReviewsFromImplementationResult> => {
      const resource = new ReviewResourceApi(config);
      const result = await resource.getReviewFromImplementationUsingGET({
        implementationId: params.implementationId,
      });
      return {
        reviews: result,
      };
    },
    addReviewToImplementation: async (params: IAddReviewToImplementationParams): Promise<IAddReviewToImplementationResult> => {
      const resource = new ReviewResourceApi(config);
      const result = await resource.addReviewToImplementationUsingPOST({
        implementationId: params.implementationId,
        reviewDTO: params.review
      });
      return {
        review: result,
      };
    },
  };
};
