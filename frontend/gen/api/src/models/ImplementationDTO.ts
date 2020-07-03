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

import { exists, mapValues } from "../runtime";
import {
  ReviewDTO,
  ReviewDTOFromJSON,
  ReviewDTOFromJSONTyped,
  ReviewDTOToJSON,
} from "./";

/**
 *
 * @export
 * @interface ImplementationDTO
 */
export interface ImplementationDTO {
  /**
   *
   * @type {string}
   * @memberof ImplementationDTO
   */
  code?: string;
  /**
   *
   * @type {number}
   * @memberof ImplementationDTO
   */
  id?: number;
  /**
   *
   * @type {Array<ReviewDTO>}
   * @memberof ImplementationDTO
   */
  reviews?: Array<ReviewDTO>;
}

export function ImplementationDTOFromJSON(json: any): ImplementationDTO {
  return ImplementationDTOFromJSONTyped(json, false);
}

export function ImplementationDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): ImplementationDTO {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    code: !exists(json, "code") ? undefined : json["code"],
    id: !exists(json, "id") ? undefined : json["id"],
    reviews: !exists(json, "reviews")
      ? undefined
      : (json["reviews"] as Array<any>).map(ReviewDTOFromJSON),
  };
}

export function ImplementationDTOToJSON(value?: ImplementationDTO | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    code: value.code,
    id: value.id,
    reviews:
      value.reviews === undefined
        ? undefined
        : (value.reviews as Array<any>).map(ReviewDTOToJSON),
  };
}
