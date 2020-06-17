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
  FeatureDTO,
  FeatureDTOFromJSON,
  FeatureDTOFromJSONTyped,
  FeatureDTOToJSON,
} from "./";

/**
 *
 * @export
 * @interface ProjectDetailDTO
 */
export interface ProjectDetailDTO {
  /**
   *
   * @type {Date}
   * @memberof ProjectDetailDTO
   */
  createdAt?: Date;
  /**
   *
   * @type {string}
   * @memberof ProjectDetailDTO
   */
  description?: string;
  /**
   *
   * @type {Array<FeatureDTO>}
   * @memberof ProjectDetailDTO
   */
  features?: Array<FeatureDTO>;
  /**
   *
   * @type {number}
   * @memberof ProjectDetailDTO
   */
  id?: number;
  /**
   *
   * @type {string}
   * @memberof ProjectDetailDTO
   */
  image?: string;
  /**
   *
   * @type {string}
   * @memberof ProjectDetailDTO
   */
  name?: string;
  /**
   *
   * @type {Date}
   * @memberof ProjectDetailDTO
   */
  updatedAt?: Date;
}

export function ProjectDetailDTOFromJSON(json: any): ProjectDetailDTO {
  return ProjectDetailDTOFromJSONTyped(json, false);
}

export function ProjectDetailDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): ProjectDetailDTO {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    createdAt: !exists(json, "createdAt")
      ? undefined
      : new Date(json["createdAt"]),
    description: !exists(json, "description") ? undefined : json["description"],
    features: !exists(json, "features")
      ? undefined
      : (json["features"] as Array<any>).map(FeatureDTOFromJSON),
    id: !exists(json, "id") ? undefined : json["id"],
    image: !exists(json, "image") ? undefined : json["image"],
    name: !exists(json, "name") ? undefined : json["name"],
    updatedAt: !exists(json, "updatedAt")
      ? undefined
      : new Date(json["updatedAt"]),
  };
}

export function ProjectDetailDTOToJSON(value?: ProjectDetailDTO | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    createdAt:
      value.createdAt === undefined ? undefined : value.createdAt.toISOString(),
    description: value.description,
    features:
      value.features === undefined
        ? undefined
        : (value.features as Array<any>).map(FeatureDTOToJSON),
    id: value.id,
    image: value.image,
    name: value.name,
    updatedAt:
      value.updatedAt === undefined ? undefined : value.updatedAt.toISOString(),
  };
}
