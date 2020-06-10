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
  Authentication,
  AuthenticationFromJSON,
  AuthenticationFromJSONTyped,
  AuthenticationToJSON,
  Implementation,
  ImplementationFromJSON,
  ImplementationFromJSONTyped,
  ImplementationToJSON,
} from "./";

/**
 *
 * @export
 * @interface User
 */
export interface User {
  /**
   *
   * @type {Authentication}
   * @memberof User
   */
  authentication?: Authentication;
  /**
   *
   * @type {string}
   * @memberof User
   */
  country?: string;
  /**
   *
   * @type {Date}
   * @memberof User
   */
  createdAt?: Date;
  /**
   *
   * @type {string}
   * @memberof User
   */
  email?: string;
  /**
   *
   * @type {number}
   * @memberof User
   */
  id?: number;
  /**
   *
   * @type {Array<Implementation>}
   * @memberof User
   */
  implementations?: Array<Implementation>;
  /**
   *
   * @type {string}
   * @memberof User
   */
  infix?: string;
  /**
   *
   * @type {Array<string>}
   * @memberof User
   */
  languages?: Array<string>;
  /**
   *
   * @type {string}
   * @memberof User
   */
  lastName?: string;
  /**
   *
   * @type {string}
   * @memberof User
   */
  name?: string;
  /**
   *
   * @type {string}
   * @memberof User
   */
  password?: string;
  /**
   *
   * @type {string}
   * @memberof User
   */
  street?: string;
  /**
   *
   * @type {string}
   * @memberof User
   */
  streetNumber?: string;
  /**
   *
   * @type {string}
   * @memberof User
   */
  telephone?: string;
  /**
   *
   * @type {Date}
   * @memberof User
   */
  updatedAt?: Date;
}

export function UserFromJSON(json: any): User {
  return UserFromJSONTyped(json, false);
}

export function UserFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): User {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    authentication: !exists(json, "authentication")
      ? undefined
      : AuthenticationFromJSON(json["authentication"]),
    country: !exists(json, "country") ? undefined : json["country"],
    createdAt: !exists(json, "createdAt")
      ? undefined
      : new Date(json["createdAt"]),
    email: !exists(json, "email") ? undefined : json["email"],
    id: !exists(json, "id") ? undefined : json["id"],
    implementations: !exists(json, "implementations")
      ? undefined
      : (json["implementations"] as Array<any>).map(ImplementationFromJSON),
    infix: !exists(json, "infix") ? undefined : json["infix"],
    languages: !exists(json, "languages") ? undefined : json["languages"],
    lastName: !exists(json, "lastName") ? undefined : json["lastName"],
    name: !exists(json, "name") ? undefined : json["name"],
    password: !exists(json, "password") ? undefined : json["password"],
    street: !exists(json, "street") ? undefined : json["street"],
    streetNumber: !exists(json, "streetNumber")
      ? undefined
      : json["streetNumber"],
    telephone: !exists(json, "telephone") ? undefined : json["telephone"],
    updatedAt: !exists(json, "updatedAt")
      ? undefined
      : new Date(json["updatedAt"]),
  };
}

export function UserToJSON(value?: User | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    authentication: AuthenticationToJSON(value.authentication),
    country: value.country,
    createdAt:
      value.createdAt === undefined ? undefined : value.createdAt.toISOString(),
    email: value.email,
    id: value.id,
    implementations:
      value.implementations === undefined
        ? undefined
        : (value.implementations as Array<any>).map(ImplementationToJSON),
    infix: value.infix,
    languages: value.languages,
    lastName: value.lastName,
    name: value.name,
    password: value.password,
    street: value.street,
    streetNumber: value.streetNumber,
    telephone: value.telephone,
    updatedAt:
      value.updatedAt === undefined ? undefined : value.updatedAt.toISOString(),
  };
}
