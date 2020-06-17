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
 * @interface RegisterUserDTO
 */
export interface RegisterUserDTO {
  /**
   *
   * @type {string}
   * @memberof RegisterUserDTO
   */
  country?: string;
  /**
   *
   * @type {string}
   * @memberof RegisterUserDTO
   */
  email?: string;
  /**
   *
   * @type {Array<string>}
   * @memberof RegisterUserDTO
   */
  languages?: Array<string>;
  /**
   *
   * @type {string}
   * @memberof RegisterUserDTO
   */
  lastName?: string;
  /**
   *
   * @type {string}
   * @memberof RegisterUserDTO
   */
  name?: string;
  /**
   *
   * @type {string}
   * @memberof RegisterUserDTO
   */
  password?: string;
}

export function RegisterUserDTOFromJSON(json: any): RegisterUserDTO {
  return RegisterUserDTOFromJSONTyped(json, false);
}

export function RegisterUserDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): RegisterUserDTO {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    country: !exists(json, "country") ? undefined : json["country"],
    email: !exists(json, "email") ? undefined : json["email"],
    languages: !exists(json, "languages") ? undefined : json["languages"],
    lastName: !exists(json, "lastName") ? undefined : json["lastName"],
    name: !exists(json, "name") ? undefined : json["name"],
    password: !exists(json, "password") ? undefined : json["password"],
  };
}

export function RegisterUserDTOToJSON(value?: RegisterUserDTO | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    country: value.country,
    email: value.email,
    languages: value.languages,
    lastName: value.lastName,
    name: value.name,
    password: value.password,
  };
}
