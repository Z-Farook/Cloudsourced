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

import * as runtime from "../runtime";
import {
  Project,
  ProjectFromJSON,
  ProjectToJSON,
  ProjectDTO,
  ProjectDTOFromJSON,
  ProjectDTOToJSON,
} from "../models";

export interface AddWithUserUsingPOSTRequest {
  id: number;
  project: Project;
}

export interface CreateNewUsingPOST1Request {
  entity: Project;
}

export interface DeleteUsingDELETE1Request {
  id?: number;
}

export interface GetOneByIdUsingGET1Request {
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
   * addWithUser
   */
  async addWithUserUsingPOSTRaw(
    requestParameters: AddWithUserUsingPOSTRequest
  ): Promise<runtime.ApiResponse<Project>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling addWithUserUsingPOST."
      );
    }

    if (
      requestParameters.project === null ||
      requestParameters.project === undefined
    ) {
      throw new runtime.RequiredError(
        "project",
        "Required parameter requestParameters.project was null or undefined when calling addWithUserUsingPOST."
      );
    }

    const queryParameters: runtime.HTTPQuery = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters["Content-Type"] = "application/json";

    const response = await this.request({
      path: `/project/{id}`.replace(
        `{${"id"}}`,
        encodeURIComponent(String(requestParameters.id))
      ),
      method: "POST",
      headers: headerParameters,
      query: queryParameters,
      body: ProjectToJSON(requestParameters.project),
    });

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      ProjectFromJSON(jsonValue)
    );
  }

  /**
   * addWithUser
   */
  async addWithUserUsingPOST(
    requestParameters: AddWithUserUsingPOSTRequest
  ): Promise<Project> {
    const response = await this.addWithUserUsingPOSTRaw(requestParameters);
    return await response.value();
  }

  /**
   * All
   */
  async allUsingGET1Raw(): Promise<runtime.ApiResponse<Array<ProjectDTO>>> {
    const queryParameters: runtime.HTTPQuery = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request({
      path: `/project`,
      method: "GET",
      headers: headerParameters,
      query: queryParameters,
    });

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      jsonValue.map(ProjectDTOFromJSON)
    );
  }

  /**
   * All
   */
  async allUsingGET1(): Promise<Array<ProjectDTO>> {
    const response = await this.allUsingGET1Raw();
    return await response.value();
  }

  /**
   * createNew
   */
  async createNewUsingPOST1Raw(
    requestParameters: CreateNewUsingPOST1Request
  ): Promise<runtime.ApiResponse<Project>> {
    if (
      requestParameters.entity === null ||
      requestParameters.entity === undefined
    ) {
      throw new runtime.RequiredError(
        "entity",
        "Required parameter requestParameters.entity was null or undefined when calling createNewUsingPOST1."
      );
    }

    const queryParameters: runtime.HTTPQuery = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters["Content-Type"] = "application/json";

    const response = await this.request({
      path: `/project`,
      method: "POST",
      headers: headerParameters,
      query: queryParameters,
      body: ProjectToJSON(requestParameters.entity),
    });

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      ProjectFromJSON(jsonValue)
    );
  }

  /**
   * createNew
   */
  async createNewUsingPOST1(
    requestParameters: CreateNewUsingPOST1Request
  ): Promise<Project> {
    const response = await this.createNewUsingPOST1Raw(requestParameters);
    return await response.value();
  }

  /**
   * delete
   */
  async deleteUsingDELETE1Raw(
    requestParameters: DeleteUsingDELETE1Request
  ): Promise<runtime.ApiResponse<void>> {
    const queryParameters: runtime.HTTPQuery = {};

    if (requestParameters.id !== undefined) {
      queryParameters["id"] = requestParameters.id;
    }

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request({
      path: `/project`,
      method: "DELETE",
      headers: headerParameters,
      query: queryParameters,
    });

    return new runtime.VoidApiResponse(response);
  }

  /**
   * delete
   */
  async deleteUsingDELETE1(
    requestParameters: DeleteUsingDELETE1Request
  ): Promise<void> {
    await this.deleteUsingDELETE1Raw(requestParameters);
  }

  /**
   * getOneById
   */
  async getOneByIdUsingGET1Raw(
    requestParameters: GetOneByIdUsingGET1Request
  ): Promise<runtime.ApiResponse<ProjectDTO>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling getOneByIdUsingGET1."
      );
    }

    const queryParameters: runtime.HTTPQuery = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request({
      path: `/project/{id}`.replace(
        `{${"id"}}`,
        encodeURIComponent(String(requestParameters.id))
      ),
      method: "GET",
      headers: headerParameters,
      query: queryParameters,
    });

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      ProjectDTOFromJSON(jsonValue)
    );
  }

  /**
   * getOneById
   */
  async getOneByIdUsingGET1(
    requestParameters: GetOneByIdUsingGET1Request
  ): Promise<ProjectDTO> {
    const response = await this.getOneByIdUsingGET1Raw(requestParameters);
    return await response.value();
  }

  /**
   * searchProjectName
   */
  async searchProjectNameUsingGETRaw(
    requestParameters: SearchProjectNameUsingGETRequest
  ): Promise<runtime.ApiResponse<Array<ProjectDTO>>> {
    if (
      requestParameters.name === null ||
      requestParameters.name === undefined
    ) {
      throw new runtime.RequiredError(
        "name",
        "Required parameter requestParameters.name was null or undefined when calling searchProjectNameUsingGET."
      );
    }

    const queryParameters: runtime.HTTPQuery = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request({
      path: `/project/search/{name}`.replace(
        `{${"name"}}`,
        encodeURIComponent(String(requestParameters.name))
      ),
      method: "GET",
      headers: headerParameters,
      query: queryParameters,
    });

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      jsonValue.map(ProjectDTOFromJSON)
    );
  }

  /**
   * searchProjectName
   */
  async searchProjectNameUsingGET(
    requestParameters: SearchProjectNameUsingGETRequest
  ): Promise<Array<ProjectDTO>> {
    const response = await this.searchProjectNameUsingGETRaw(requestParameters);
    return await response.value();
  }
}