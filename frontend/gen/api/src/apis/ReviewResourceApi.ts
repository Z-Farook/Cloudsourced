/* tslint:disable */
/* eslint-disable */
/**
 * Api Documentation
 * Api Documentation
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import {
    ReviewDTO,
    ReviewDTOFromJSON,
    ReviewDTOToJSON,
} from '../models';

export interface AddReviewToImplementationUsingPOSTRequest {
    implementationId: number;
    reviewDTO: ReviewDTO;
}

export interface CreateNewUsingPOST3Request {
    dto: ReviewDTO;
}

export interface DeleteUsingDELETE3Request {
    id?: number;
}

export interface GetOneByIdUsingGET3Request {
    id: number;
}

export interface GetReviewFromImplementationUsingGETRequest {
    implementationId: number;
}

export interface UpdateUsingPUT3Request {
    id: number;
    dto: ReviewDTO;
}

/**
 * 
 */
export class ReviewResourceApi extends runtime.BaseAPI {

    /**
     * addReviewToImplementation
     */
    async addReviewToImplementationUsingPOSTRaw(requestParameters: AddReviewToImplementationUsingPOSTRequest): Promise<runtime.ApiResponse<ReviewDTO>> {
        if (requestParameters.implementationId === null || requestParameters.implementationId === undefined) {
            throw new runtime.RequiredError('implementationId','Required parameter requestParameters.implementationId was null or undefined when calling addReviewToImplementationUsingPOST.');
        }

        if (requestParameters.reviewDTO === null || requestParameters.reviewDTO === undefined) {
            throw new runtime.RequiredError('reviewDTO','Required parameter requestParameters.reviewDTO was null or undefined when calling addReviewToImplementationUsingPOST.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/review/{implementationId}`.replace(`{${"implementationId"}}`, encodeURIComponent(String(requestParameters.implementationId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ReviewDTOToJSON(requestParameters.reviewDTO),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ReviewDTOFromJSON(jsonValue));
    }

    /**
     * addReviewToImplementation
     */
    async addReviewToImplementationUsingPOST(requestParameters: AddReviewToImplementationUsingPOSTRequest): Promise<ReviewDTO> {
        const response = await this.addReviewToImplementationUsingPOSTRaw(requestParameters);
        return await response.value();
    }

    /**
     * all
     */
    async allUsingGET3Raw(): Promise<runtime.ApiResponse<Array<ReviewDTO>>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/review`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ReviewDTOFromJSON));
    }

    /**
     * all
     */
    async allUsingGET3(): Promise<Array<ReviewDTO>> {
        const response = await this.allUsingGET3Raw();
        return await response.value();
    }

    /**
     * createNew
     */
    async createNewUsingPOST3Raw(requestParameters: CreateNewUsingPOST3Request): Promise<runtime.ApiResponse<ReviewDTO>> {
        if (requestParameters.dto === null || requestParameters.dto === undefined) {
            throw new runtime.RequiredError('dto','Required parameter requestParameters.dto was null or undefined when calling createNewUsingPOST3.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/review`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ReviewDTOToJSON(requestParameters.dto),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ReviewDTOFromJSON(jsonValue));
    }

    /**
     * createNew
     */
    async createNewUsingPOST3(requestParameters: CreateNewUsingPOST3Request): Promise<ReviewDTO> {
        const response = await this.createNewUsingPOST3Raw(requestParameters);
        return await response.value();
    }

    /**
     * delete
     */
    async deleteUsingDELETE3Raw(requestParameters: DeleteUsingDELETE3Request): Promise<runtime.ApiResponse<void>> {
        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.id !== undefined) {
            queryParameters['id'] = requestParameters.id;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/review`,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * delete
     */
    async deleteUsingDELETE3(requestParameters: DeleteUsingDELETE3Request): Promise<void> {
        await this.deleteUsingDELETE3Raw(requestParameters);
    }

    /**
     * getOneById
     */
    async getOneByIdUsingGET3Raw(requestParameters: GetOneByIdUsingGET3Request): Promise<runtime.ApiResponse<ReviewDTO>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getOneByIdUsingGET3.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/review/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ReviewDTOFromJSON(jsonValue));
    }

    /**
     * getOneById
     */
    async getOneByIdUsingGET3(requestParameters: GetOneByIdUsingGET3Request): Promise<ReviewDTO> {
        const response = await this.getOneByIdUsingGET3Raw(requestParameters);
        return await response.value();
    }

    /**
     * getReviewFromImplementation
     */
    async getReviewFromImplementationUsingGETRaw(requestParameters: GetReviewFromImplementationUsingGETRequest): Promise<runtime.ApiResponse<Array<ReviewDTO>>> {
        if (requestParameters.implementationId === null || requestParameters.implementationId === undefined) {
            throw new runtime.RequiredError('implementationId','Required parameter requestParameters.implementationId was null or undefined when calling getReviewFromImplementationUsingGET.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/review/implementation/{implementationId}`.replace(`{${"implementationId"}}`, encodeURIComponent(String(requestParameters.implementationId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ReviewDTOFromJSON));
    }

    /**
     * getReviewFromImplementation
     */
    async getReviewFromImplementationUsingGET(requestParameters: GetReviewFromImplementationUsingGETRequest): Promise<Array<ReviewDTO>> {
        const response = await this.getReviewFromImplementationUsingGETRaw(requestParameters);
        return await response.value();
    }

    /**
     * update
     */
    async updateUsingPUT3Raw(requestParameters: UpdateUsingPUT3Request): Promise<runtime.ApiResponse<ReviewDTO>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateUsingPUT3.');
        }

        if (requestParameters.dto === null || requestParameters.dto === undefined) {
            throw new runtime.RequiredError('dto','Required parameter requestParameters.dto was null or undefined when calling updateUsingPUT3.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/review/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: ReviewDTOToJSON(requestParameters.dto),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ReviewDTOFromJSON(jsonValue));
    }

    /**
     * update
     */
    async updateUsingPUT3(requestParameters: UpdateUsingPUT3Request): Promise<ReviewDTO> {
        const response = await this.updateUsingPUT3Raw(requestParameters);
        return await response.value();
    }

}
