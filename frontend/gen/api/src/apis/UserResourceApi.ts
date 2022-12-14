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
    UserDTO,
    UserDTOFromJSON,
    UserDTOToJSON,
} from '../models';

export interface CreateNewUsingPOST4Request {
    dto: UserDTO;
}

export interface DeleteUsingDELETE4Request {
    id?: number;
}

export interface GetOneByIdUsingGET4Request {
    id: number;
}

export interface GetUserProfileInfoUsingGETRequest {
    id: number;
}

export interface UpdateUsingPUT4Request {
    id: number;
    dto: UserDTO;
}

/**
 * 
 */
export class UserResourceApi extends runtime.BaseAPI {

    /**
     * all
     */
    async allUsingGET4Raw(): Promise<runtime.ApiResponse<Array<UserDTO>>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/user`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(UserDTOFromJSON));
    }

    /**
     * all
     */
    async allUsingGET4(): Promise<Array<UserDTO>> {
        const response = await this.allUsingGET4Raw();
        return await response.value();
    }

    /**
     * createNew
     */
    async createNewUsingPOST4Raw(requestParameters: CreateNewUsingPOST4Request): Promise<runtime.ApiResponse<UserDTO>> {
        if (requestParameters.dto === null || requestParameters.dto === undefined) {
            throw new runtime.RequiredError('dto','Required parameter requestParameters.dto was null or undefined when calling createNewUsingPOST4.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/user`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: UserDTOToJSON(requestParameters.dto),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => UserDTOFromJSON(jsonValue));
    }

    /**
     * createNew
     */
    async createNewUsingPOST4(requestParameters: CreateNewUsingPOST4Request): Promise<UserDTO> {
        const response = await this.createNewUsingPOST4Raw(requestParameters);
        return await response.value();
    }

    /**
     * delete
     */
    async deleteUsingDELETE4Raw(requestParameters: DeleteUsingDELETE4Request): Promise<runtime.ApiResponse<void>> {
        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.id !== undefined) {
            queryParameters['id'] = requestParameters.id;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/user`,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * delete
     */
    async deleteUsingDELETE4(requestParameters: DeleteUsingDELETE4Request): Promise<void> {
        await this.deleteUsingDELETE4Raw(requestParameters);
    }

    /**
     * getOneById
     */
    async getOneByIdUsingGET4Raw(requestParameters: GetOneByIdUsingGET4Request): Promise<runtime.ApiResponse<UserDTO>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getOneByIdUsingGET4.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/user/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => UserDTOFromJSON(jsonValue));
    }

    /**
     * getOneById
     */
    async getOneByIdUsingGET4(requestParameters: GetOneByIdUsingGET4Request): Promise<UserDTO> {
        const response = await this.getOneByIdUsingGET4Raw(requestParameters);
        return await response.value();
    }

    /**
     * getUserInfo
     */
    async getUserInfoUsingGETRaw(): Promise<runtime.ApiResponse<UserDTO>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/user/info`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => UserDTOFromJSON(jsonValue));
    }

    /**
     * getUserInfo
     */
    async getUserInfoUsingGET(): Promise<UserDTO> {
        const response = await this.getUserInfoUsingGETRaw();
        return await response.value();
    }

    /**
     * getUserProfileInfo
     */
    async getUserProfileInfoUsingGETRaw(requestParameters: GetUserProfileInfoUsingGETRequest): Promise<runtime.ApiResponse<UserDTO>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getUserProfileInfoUsingGET.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/user/profile/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => UserDTOFromJSON(jsonValue));
    }

    /**
     * getUserProfileInfo
     */
    async getUserProfileInfoUsingGET(requestParameters: GetUserProfileInfoUsingGETRequest): Promise<UserDTO> {
        const response = await this.getUserProfileInfoUsingGETRaw(requestParameters);
        return await response.value();
    }

    /**
     * update
     */
    async updateUsingPUT4Raw(requestParameters: UpdateUsingPUT4Request): Promise<runtime.ApiResponse<UserDTO>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateUsingPUT4.');
        }

        if (requestParameters.dto === null || requestParameters.dto === undefined) {
            throw new runtime.RequiredError('dto','Required parameter requestParameters.dto was null or undefined when calling updateUsingPUT4.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/user/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: UserDTOToJSON(requestParameters.dto),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => UserDTOFromJSON(jsonValue));
    }

    /**
     * update
     */
    async updateUsingPUT4(requestParameters: UpdateUsingPUT4Request): Promise<UserDTO> {
        const response = await this.updateUsingPUT4Raw(requestParameters);
        return await response.value();
    }

}
