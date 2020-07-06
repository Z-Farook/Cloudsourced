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
    ProjectDTO,
    ProjectDTOFromJSON,
    ProjectDTOToJSON,
    ProjectDetailDTO,
    ProjectDetailDTOFromJSON,
    ProjectDetailDTOToJSON,
} from '../models';

export interface ArchiveProjectUsingPOSTRequest {
    projectId: number;
}

export interface CreateNewUsingPOST2Request {
    projectDTO: ProjectDTO;
}

export interface DeleteUsingDELETE2Request {
    id?: number;
}

export interface FinishProjectUsingPOSTRequest {
    projectId: number;
}

export interface GetOneByIdUsingGET2Request {
    id: number;
}

export interface GetProjectDetailByIdUsingGETRequest {
    id: number;
}

export interface GetProjectsByUserIdUsingGETRequest {
    id: number;
}

export interface SearchProjectNameUsingGETRequest {
    name: string;
}

export interface UpdateUsingPUT2Request {
    id: number;
    dto: ProjectDTO;
}

/**
 * 
 */
export class ProjectResourceApi extends runtime.BaseAPI {

    /**
     * all
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
     * all
     */
    async allUsingGET2(): Promise<Array<ProjectDTO>> {
        const response = await this.allUsingGET2Raw();
        return await response.value();
    }

    /**
     * archiveProject
     */
    async archiveProjectUsingPOSTRaw(requestParameters: ArchiveProjectUsingPOSTRequest): Promise<runtime.ApiResponse<ProjectDetailDTO>> {
        if (requestParameters.projectId === null || requestParameters.projectId === undefined) {
            throw new runtime.RequiredError('projectId','Required parameter requestParameters.projectId was null or undefined when calling archiveProjectUsingPOST.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/project/archive/{projectId}`.replace(`{${"projectId"}}`, encodeURIComponent(String(requestParameters.projectId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ProjectDetailDTOFromJSON(jsonValue));
    }

    /**
     * archiveProject
     */
    async archiveProjectUsingPOST(requestParameters: ArchiveProjectUsingPOSTRequest): Promise<ProjectDetailDTO> {
        const response = await this.archiveProjectUsingPOSTRaw(requestParameters);
        return await response.value();
    }

    /**
     * createNew
     */
    async createNewUsingPOST2Raw(requestParameters: CreateNewUsingPOST2Request): Promise<runtime.ApiResponse<ProjectDTO>> {
        if (requestParameters.projectDTO === null || requestParameters.projectDTO === undefined) {
            throw new runtime.RequiredError('projectDTO','Required parameter requestParameters.projectDTO was null or undefined when calling createNewUsingPOST2.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/project`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ProjectDTOToJSON(requestParameters.projectDTO),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ProjectDTOFromJSON(jsonValue));
    }

    /**
     * createNew
     */
    async createNewUsingPOST2(requestParameters: CreateNewUsingPOST2Request): Promise<ProjectDTO> {
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
     * finishProject
     */
    async finishProjectUsingPOSTRaw(requestParameters: FinishProjectUsingPOSTRequest): Promise<runtime.ApiResponse<ProjectDetailDTO>> {
        if (requestParameters.projectId === null || requestParameters.projectId === undefined) {
            throw new runtime.RequiredError('projectId','Required parameter requestParameters.projectId was null or undefined when calling finishProjectUsingPOST.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/project/finish/{projectId}`.replace(`{${"projectId"}}`, encodeURIComponent(String(requestParameters.projectId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ProjectDetailDTOFromJSON(jsonValue));
    }

    /**
     * finishProject
     */
    async finishProjectUsingPOST(requestParameters: FinishProjectUsingPOSTRequest): Promise<ProjectDetailDTO> {
        const response = await this.finishProjectUsingPOSTRaw(requestParameters);
        return await response.value();
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
     * getProjectDetailById
     */
    async getProjectDetailByIdUsingGETRaw(requestParameters: GetProjectDetailByIdUsingGETRequest): Promise<runtime.ApiResponse<ProjectDetailDTO>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getProjectDetailByIdUsingGET.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/project/detail/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ProjectDetailDTOFromJSON(jsonValue));
    }

    /**
     * getProjectDetailById
     */
    async getProjectDetailByIdUsingGET(requestParameters: GetProjectDetailByIdUsingGETRequest): Promise<ProjectDetailDTO> {
        const response = await this.getProjectDetailByIdUsingGETRaw(requestParameters);
        return await response.value();
    }

    /**
     * getProjectsByUserId
     */
    async getProjectsByUserIdUsingGETRaw(requestParameters: GetProjectsByUserIdUsingGETRequest): Promise<runtime.ApiResponse<Array<ProjectDTO>>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getProjectsByUserIdUsingGET.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/project/profile/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ProjectDTOFromJSON));
    }

    /**
     * getProjectsByUserId
     */
    async getProjectsByUserIdUsingGET(requestParameters: GetProjectsByUserIdUsingGETRequest): Promise<Array<ProjectDTO>> {
        const response = await this.getProjectsByUserIdUsingGETRaw(requestParameters);
        return await response.value();
    }

    /**
     * getProjectsByUser
     */
    async getProjectsByUserUsingGETRaw(): Promise<runtime.ApiResponse<Array<ProjectDTO>>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/project/user`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ProjectDTOFromJSON));
    }

    /**
     * getProjectsByUser
     */
    async getProjectsByUserUsingGET(): Promise<Array<ProjectDTO>> {
        const response = await this.getProjectsByUserUsingGETRaw();
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

    /**
     * update
     */
    async updateUsingPUT2Raw(requestParameters: UpdateUsingPUT2Request): Promise<runtime.ApiResponse<ProjectDTO>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateUsingPUT2.');
        }

        if (requestParameters.dto === null || requestParameters.dto === undefined) {
            throw new runtime.RequiredError('dto','Required parameter requestParameters.dto was null or undefined when calling updateUsingPUT2.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/project/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: ProjectDTOToJSON(requestParameters.dto),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ProjectDTOFromJSON(jsonValue));
    }

    /**
     * update
     */
    async updateUsingPUT2(requestParameters: UpdateUsingPUT2Request): Promise<ProjectDTO> {
        const response = await this.updateUsingPUT2Raw(requestParameters);
        return await response.value();
    }

}
