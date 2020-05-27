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
  Transaction,
  TransactionFromJSON,
  TransactionToJSON,
  TransactionDTO,
  TransactionDTOFromJSON,
  TransactionDTOToJSON,
} from "../models";

export interface CreateNewUsingPOST2Request {
  entity: Transaction;
}

export interface DeleteUsingDELETE2Request {
  id?: number;
}

export interface GetOneByIdUsingGET2Request {
  id: number;
}

/**
 *
 */
export class TransactionResourceApi extends runtime.BaseAPI {
  /**
   * All
   */
  async allUsingGET2Raw(): Promise<runtime.ApiResponse<Array<TransactionDTO>>> {
    const queryParameters: runtime.HTTPQuery = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request({
      path: `/transaction`,
      method: "GET",
      headers: headerParameters,
      query: queryParameters,
    });

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      jsonValue.map(TransactionDTOFromJSON)
    );
  }

  /**
   * All
   */
  async allUsingGET2(): Promise<Array<TransactionDTO>> {
    const response = await this.allUsingGET2Raw();
    return await response.value();
  }

  /**
   * createNew
   */
  async createNewUsingPOST2Raw(
    requestParameters: CreateNewUsingPOST2Request
  ): Promise<runtime.ApiResponse<Transaction>> {
    if (
      requestParameters.entity === null ||
      requestParameters.entity === undefined
    ) {
      throw new runtime.RequiredError(
        "entity",
        "Required parameter requestParameters.entity was null or undefined when calling createNewUsingPOST2."
      );
    }

    const queryParameters: runtime.HTTPQuery = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters["Content-Type"] = "application/json";

    const response = await this.request({
      path: `/transaction`,
      method: "POST",
      headers: headerParameters,
      query: queryParameters,
      body: TransactionToJSON(requestParameters.entity),
    });

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      TransactionFromJSON(jsonValue)
    );
  }

  /**
   * createNew
   */
  async createNewUsingPOST2(
    requestParameters: CreateNewUsingPOST2Request
  ): Promise<Transaction> {
    const response = await this.createNewUsingPOST2Raw(requestParameters);
    return await response.value();
  }

  /**
   * delete
   */
  async deleteUsingDELETE2Raw(
    requestParameters: DeleteUsingDELETE2Request
  ): Promise<runtime.ApiResponse<void>> {
    const queryParameters: runtime.HTTPQuery = {};

    if (requestParameters.id !== undefined) {
      queryParameters["id"] = requestParameters.id;
    }

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request({
      path: `/transaction`,
      method: "DELETE",
      headers: headerParameters,
      query: queryParameters,
    });

    return new runtime.VoidApiResponse(response);
  }

  /**
   * delete
   */
  async deleteUsingDELETE2(
    requestParameters: DeleteUsingDELETE2Request
  ): Promise<void> {
    await this.deleteUsingDELETE2Raw(requestParameters);
  }

  /**
   * getOneById
   */
  async getOneByIdUsingGET2Raw(
    requestParameters: GetOneByIdUsingGET2Request
  ): Promise<runtime.ApiResponse<TransactionDTO>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        "id",
        "Required parameter requestParameters.id was null or undefined when calling getOneByIdUsingGET2."
      );
    }

    const queryParameters: runtime.HTTPQuery = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request({
      path: `/transaction/{id}`.replace(
        `{${"id"}}`,
        encodeURIComponent(String(requestParameters.id))
      ),
      method: "GET",
      headers: headerParameters,
      query: queryParameters,
    });

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      TransactionDTOFromJSON(jsonValue)
    );
  }

  /**
   * getOneById
   */
  async getOneByIdUsingGET2(
    requestParameters: GetOneByIdUsingGET2Request
  ): Promise<TransactionDTO> {
    const response = await this.getOneByIdUsingGET2Raw(requestParameters);
    return await response.value();
  }
}
