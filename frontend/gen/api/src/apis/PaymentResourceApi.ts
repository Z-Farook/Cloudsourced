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
import { PaymentDTO, PaymentDTOFromJSON, PaymentDTOToJSON } from "../models";

export interface UserPaymentUsingPOSTRequest {
  paymentDTO: PaymentDTO;
}

/**
 *
 */
export class PaymentResourceApi extends runtime.BaseAPI {
  /**
   * userPayment
   */
  async userPaymentUsingPOSTRaw(
    requestParameters: UserPaymentUsingPOSTRequest
  ): Promise<runtime.ApiResponse<PaymentDTO>> {
    if (
      requestParameters.paymentDTO === null ||
      requestParameters.paymentDTO === undefined
    ) {
      throw new runtime.RequiredError(
        "paymentDTO",
        "Required parameter requestParameters.paymentDTO was null or undefined when calling userPaymentUsingPOST."
      );
    }

    const queryParameters: runtime.HTTPQuery = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters["Content-Type"] = "application/json";

    const response = await this.request({
      path: `/payment/user`,
      method: "POST",
      headers: headerParameters,
      query: queryParameters,
      body: PaymentDTOToJSON(requestParameters.paymentDTO),
    });

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      PaymentDTOFromJSON(jsonValue)
    );
  }

  /**
   * userPayment
   */
  async userPaymentUsingPOST(
    requestParameters: UserPaymentUsingPOSTRequest
  ): Promise<PaymentDTO> {
    const response = await this.userPaymentUsingPOSTRaw(requestParameters);
    return await response.value();
  }
}
