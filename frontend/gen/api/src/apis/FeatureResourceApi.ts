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
import { FeatureDTO, FeatureDTOFromJSON, FeatureDTOToJSON } from "../models";

export interface AddFeatureToProjectUsingPOSTRequest {
  projectId: number;
  featureDTO: FeatureDTO;
}

export interface CreateNewUsingPOSTRequest {
  dto: FeatureDTO;
}

export interface DeleteUsingDELETERequest {
  id?: number;
}

export interface GetOneByIdUsingGETRequest {
  id: number;
}

export interface UpdateUsingPUTRequest {
  id: number;
  dto: FeatureDTO;
}

/**
 *
 */
export class FeatureResourceApi extends runtime.BaseAPI {
  /**
   * addFeatureToProject
   */
  async addFeatureToProjectUsingPOSTRaw(
    requestParameters: AddFeatureToProjectUsingPOSTRequest
  ): Promise<runtime.ApiResponse<FeatureDTO>> {
    if (
      requestParameters.projectId === null ||
      requestParameters.projectId === undefined
    ) {
      throw new runtime.RequiredError(
        "projectId",
        "Required parameter requestParameters.projectId was null or undefined when calling addFeatureToProjectUsingPOST."
      );
    }

    if (
      requestParameters.featureDTO === null ||
      requestParameters.featureDTO === undefined
    ) {
      throw new runtime.RequiredError(
        "featureDTO",
        "Required parameter requestParameters.featureDTO was null or undefined when calling addFeatureToProjectUsingPOST."
      );
    }

    const queryParameters: runtime.HTTPQuery = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters["Content-Type"] = "application/json";

    const response = await this.request({
      path: `/feature/{projectId}`.replace(
        `{${"projectId"}}`,
        encodeURIComponent(String(requestParameters.projectId))
      ),
      method: "POST",
      headers: headerParameters,
      query: queryParameters,
      body: FeatureDTOToJSON(requestParameters.featureDTO),
    });

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      FeatureDTOFromJSON(jsonValue)
    );
  }

  /**
   * addFeatureToProject
   */
  async addFeatureToProjectUsingPOST(
    requestParameters: AddFeatureToProjectUsingPOSTRequest
  ): Promise<FeatureDTO> {
    const response = await this.addFeatureToProjectUsingPOSTRaw(
      requestParameters
    );
    return await response.value();
  }

  /**
   * all
   */
  async allUsingGETRaw(): Promise<runtime.ApiResponse<Array<FeatureDTO>>> {
    const queryParameters: runtime.HTTPQuery = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request({
      path: `/feature`,
      method: "GET",
      headers: headerParameters,
      query: queryParameters,
    });

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      jsonValue.map(FeatureDTOFromJSON)
    );
  }

  /**
   * all
   */
  async allUsingGET(): Promise<Array<FeatureDTO>> {
    const response = await this.allUsingGETRaw();
    return await response.value();
  }

  /**
   * createNew
   */
  async createNewUsingPOSTRaw(
    requestParameters: CreateNewUsingPOSTRequest
  ): Promise<runtime.ApiResponse<FeatureDTO>> {
    if (requestParameters.dto === null || requestParameters.dto === undefined) {
      throw new runtime.RequiredError(
        "dto",
        "Required parameter requestParameters.dto was null or undefined when calling createNewUsingPOST."
      );
    }

    const queryParameters: runtime.HTTPQuery = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters["Content-Type"] = "application/json";

    const response = await this.request({
      path: `/feature`,
      method: "POST",
      headers: headerParameters,
      query: queryParameters,
      body: FeatureDTOToJSON(requestParameters.dto),
    });

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      FeatureDTOFromJSON(jsonValue)
    );
  }

  /**
   * createNew
   */
  async createNewUsingPOST(
    requestParameters: CreateNewUsingPOSTRequest
  ): Promise<FeatureDTO> {
    const response = await this.createNewUsingPOSTRaw(requestParameters);
    return await response.value();
  }

  /**
   * delete
   */
  async deleteUsingDELETERaw(
    requestParameters: DeleteUsingDELETERequest
  ): Promise<runtime.ApiResponse<void>> {
    const queryParameters: runtime.HTTPQuery = {};

    if (requestParameters.id !== undefined) {
      queryParameters["id"] = requestParameters.id;
    }

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request({
      path: `/feature`,
      method: "DELETE",
      headers: headerParameters,
      query: queryParameters,
    });

    return new runtime.VoidApiResponse(response);
  }

  /**
   * delete
   */
  async deleteUsingDELETE(
    requestParameters: DeleteUsingDELETERequest
  ): Promise<void> {
    await this.deleteUsingDELETERaw(requestParameters);
  }

  /**
   * getOneById
   */
  async getOneByIdUsingGETRaw(
    requestParameters: GetOneByIdUsingGETRequest
  ): Promise<runtime.ApiResponse<FeatureDTO>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling getOneByIdUsingGET."
      );
    }

    const queryParameters: runtime.HTTPQuery = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request({
      path: `/feature/{id}`.replace(
        `{${"id"}}`,
        encodeURIComponent(String(requestParameters.id))
      ),
      method: "GET",
      headers: headerParameters,
      query: queryParameters,
    });

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      FeatureDTOFromJSON(jsonValue)
    );
  }

  /**
   * getOneById
   */
  async getOneByIdUsingGET(
    requestParameters: GetOneByIdUsingGETRequest
  ): Promise<FeatureDTO> {
    const response = await this.getOneByIdUsingGETRaw(requestParameters);
    return await response.value();
  }

  /**
   * update
   */
  async updateUsingPUTRaw(
    requestParameters: UpdateUsingPUTRequest
  ): Promise<runtime.ApiResponse<FeatureDTO>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling updateUsingPUT."
      );
    }

    if (requestParameters.dto === null || requestParameters.dto === undefined) {
      throw new runtime.RequiredError(
        "dto",
        "Required parameter requestParameters.dto was null or undefined when calling updateUsingPUT."
      );
    }

    const queryParameters: runtime.HTTPQuery = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters["Content-Type"] = "application/json";

    const response = await this.request({
      path: `/feature/{id}`.replace(
        `{${"id"}}`,
        encodeURIComponent(String(requestParameters.id))
      ),
      method: "PUT",
      headers: headerParameters,
      query: queryParameters,
      body: FeatureDTOToJSON(requestParameters.dto),
    });

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      FeatureDTOFromJSON(jsonValue)
    );
  }

  /**
   * update
   */
  async updateUsingPUT(
    requestParameters: UpdateUsingPUTRequest
  ): Promise<FeatureDTO> {
    const response = await this.updateUsingPUTRaw(requestParameters);
    return await response.value();
  }
}
