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
import { User, UserFromJSON, UserFromJSONTyped, UserToJSON } from "./";

/**
 *
 * @export
 * @interface Transaction
 */
export interface Transaction {
  /**
   *
   * @type {Date}
   * @memberof Transaction
   */
  createdAt?: Date;
  /**
   *
   * @type {number}
   * @memberof Transaction
   */
  id?: number;
  /**
   *
   * @type {number}
   * @memberof Transaction
   */
  points?: number;
  /**
   *
   * @type {Date}
   * @memberof Transaction
   */
  updatedAt?: Date;
  /**
   *
   * @type {User}
   * @memberof Transaction
   */
  user?: User;
}

export function TransactionFromJSON(json: any): Transaction {
  return TransactionFromJSONTyped(json, false);
}

export function TransactionFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): Transaction {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    createdAt: !exists(json, "createdAt")
      ? undefined
      : new Date(json["createdAt"]),
    id: !exists(json, "id") ? undefined : json["id"],
    points: !exists(json, "points") ? undefined : json["points"],
    updatedAt: !exists(json, "updatedAt")
      ? undefined
      : new Date(json["updatedAt"]),
    user: !exists(json, "user") ? undefined : UserFromJSON(json["user"]),
  };
}

export function TransactionToJSON(value?: Transaction | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    createdAt:
      value.createdAt === undefined ? undefined : value.createdAt.toISOString(),
    id: value.id,
    points: value.points,
    updatedAt:
      value.updatedAt === undefined ? undefined : value.updatedAt.toISOString(),
    user: UserToJSON(value.user),
  };
}
