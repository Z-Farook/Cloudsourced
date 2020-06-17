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
    Project,
    ProjectFromJSON,
    ProjectToJSON,
    ProjectDTO,
    ProjectDTOFromJSON,
    ProjectDTOToJSON,
} from '../models';

export interface AddUsingPOSTRequest {
    projectDTO: ProjectDTO;
}

export interface CreateNewUsingPOST2Request {
    entity: Project;
}

export interface DeleteUsingDELETE2Request {
    id?: number;
}

export interface GetOneByIdUsingGET2Request {
    id: number;
}

export interface SearchProjectNameUsingGETRequest {
    name: string;
}

/**
 * 
 */
export class ProjectResourceApi extends runtime.BaseAPI {

    /**
     * add
     */
    async addUsingPOSTRaw(requestParameters: AddUsingPOSTRequest): Promise<runtime.ApiResponse<ProjectDTO>> {
        if (requestParameters.projectDTO === null || requestParameters.projectDTO === undefined) {
            throw new runtime.RequiredError('projectDTO','Required parameter requestParameters.projectDTO was null or undefined when calling addUsingPOST.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/project/test`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ProjectDTOToJSON(requestParameters.projectDTO),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ProjectDTOFromJSON(jsonValue));
    }

    /**
     * add
     */
    async addUsingPOST(requestParameters: AddUsingPOSTRequest): Promise<ProjectDTO> {
        const response = await this.addUsingPOSTRaw(requestParameters);
        return await response.value();
    }

    /**
     * All
     */
    async allUsingGET2Raw(): Promise<runtime.ApiResponse<Array<ProjectDTO>>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/project`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ProjectDTOFromJSON));
    }

    /**
     * All
     */
    async allUsingGET2(): Promise<Array<ProjectDTO>> {
        const response = await this.allUsingGET2Raw();
        return await response.value();
    }

    /**
     * createNew
     */
    async createNewUsingPOST2Raw(requestParameters: CreateNewUsingPOST2Request): Promise<runtime.ApiResponse<Project>> {
        if (requestParameters.entity === null || requestParameters.entity === undefined) {
            throw new runtime.RequiredError('entity','Required parameter requestParameters.entity was null or undefined when calling createNewUsingPOST2.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/project`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ProjectToJSON(requestParameters.entity),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ProjectFromJSON(jsonValue));
    }

    /**
     * createNew
     */
    async createNewUsingPOST2(requestParameters: CreateNewUsingPOST2Request): Promise<Project> {
        const response = await this.createNewUsingPOST2Raw(requestParameters);
        return await response.value();
    }

    /**
     * delete
     */
    async deleteUsingDELETE2Raw(requestParameters: DeleteUsingDELETE2Request): Promise<runtime.ApiResponse<void>> {
        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.id !== undefined) {
            queryParameters['id'] = requestParameters.id;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/project`,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * delete
     */
    async deleteUsingDELETE2(requestParameters: DeleteUsingDELETE2Request): Promise<void> {
        await this.deleteUsingDELETE2Raw(requestParameters);
    }

    /**
     * getOneById
     */
    async getOneByIdUsingGET2Raw(requestParameters: GetOneByIdUsingGET2Request): Promise<runtime.ApiResponse<ProjectDTO>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getOneByIdUsingGET2.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/project/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ProjectDTOFromJSON(jsonValue));
    }

    /**
     * getOneById
     */
    async getOneByIdUsingGET2(requestParameters: GetOneByIdUsingGET2Request): Promise<ProjectDTO> {
        const response = await this.getOneByIdUsingGET2Raw(requestParameters);
        return await response.value();
    }

    /**
     * searchProjectName
     */
    async searchProjectNameUsingGETRaw(requestParameters: SearchProjectNameUsingGETRequest): Promise<runtime.ApiResponse<Array<ProjectDTO>>> {
        if (requestParameters.name === null || requestParameters.name === undefined) {
            throw new runtime.RequiredError('name','Required parameter requestParameters.name was null or undefined when calling searchProjectNameUsingGET.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/project/search/{name}`.replace(`{${"name"}}`, encodeURIComponent(String(requestParameters.name))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ProjectDTOFromJSON));
    }

    /**
     * searchProjectName
     */
    async searchProjectNameUsingGET(requestParameters: SearchProjectNameUsingGETRequest): Promise<Array<ProjectDTO>> {
        const response = await this.searchProjectNameUsingGETRaw(requestParameters);
        return await response.value();
    }

}
