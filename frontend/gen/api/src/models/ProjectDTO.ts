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
/**
 *
 * @export
 * @interface ProjectDTO
 */
export interface ProjectDTO {
  /**
   *
   * @type {Date}
   * @memberof ProjectDTO
   */
  createdAt?: Date;
  /**
   *
   * @type {string}
   * @memberof ProjectDTO
   */
  description?: string;
  /**
   *
   * @type {Date}
   * @memberof ProjectDTO
   */
  finishedAt?: Date;
  /**
   *
   * @type {number}
   * @memberof ProjectDTO
   */
  id?: number;
  /**
   *
   * @type {string}
   * @memberof ProjectDTO
   */
  image?: string;
  /**
   *
   * @type {string}
   * @memberof ProjectDTO
   */
  name?: string;
  /**
   *
   * @type {Date}
   * @memberof ProjectDTO
   */
  updatedAt?: Date;
}

export function ProjectDTOFromJSON(json: any): ProjectDTO {
  return ProjectDTOFromJSONTyped(json, false);
}

export function ProjectDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): ProjectDTO {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    createdAt: !exists(json, "createdAt")
      ? undefined
      : new Date(json["createdAt"]),
    description: !exists(json, "description") ? undefined : json["description"],
    finishedAt: !exists(json, "finishedAt")
      ? undefined
      : new Date(json["finishedAt"]),
    id: !exists(json, "id") ? undefined : json["id"],
    image: !exists(json, "image") ? undefined : json["image"],
    name: !exists(json, "name") ? undefined : json["name"],
    updatedAt: !exists(json, "updatedAt")
      ? undefined
      : new Date(json["updatedAt"]),
  };
}

export function ProjectDTOToJSON(value?: ProjectDTO | null): any {
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
    finishedAt:
      value.finishedAt === undefined
        ? undefined
        : value.finishedAt.toISOString(),
    id: value.id,
    image: value.image,
    name: value.name,
    updatedAt:
      value.updatedAt === undefined ? undefined : value.updatedAt.toISOString(),
  };
}
