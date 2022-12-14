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

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface Authentication
 */
export interface Authentication {
    /**
     * 
     * @type {Date}
     * @memberof Authentication
     */
    createdAt?: Date;
    /**
     * 
     * @type {Date}
     * @memberof Authentication
     */
    expireDate?: Date;
    /**
     * 
     * @type {number}
     * @memberof Authentication
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof Authentication
     */
    token?: string;
    /**
     * 
     * @type {Date}
     * @memberof Authentication
     */
    updatedAt?: Date;
    /**
     * 
     * @type {number}
     * @memberof Authentication
     */
    userId?: number;
}

export function AuthenticationFromJSON(json: any): Authentication {
    return AuthenticationFromJSONTyped(json, false);
}

export function AuthenticationFromJSONTyped(json: any, ignoreDiscriminator: boolean): Authentication {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'createdAt': !exists(json, 'createdAt') ? undefined : (new Date(json['createdAt'])),
        'expireDate': !exists(json, 'expireDate') ? undefined : (new Date(json['expireDate'])),
        'id': !exists(json, 'id') ? undefined : json['id'],
        'token': !exists(json, 'token') ? undefined : json['token'],
        'updatedAt': !exists(json, 'updatedAt') ? undefined : (new Date(json['updatedAt'])),
        'userId': !exists(json, 'userId') ? undefined : json['userId'],
    };
}

export function AuthenticationToJSON(value?: Authentication | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'createdAt': value.createdAt === undefined ? undefined : (value.createdAt.toISOString()),
        'expireDate': value.expireDate === undefined ? undefined : (value.expireDate.toISOString()),
        'id': value.id,
        'token': value.token,
        'updatedAt': value.updatedAt === undefined ? undefined : (value.updatedAt.toISOString()),
        'userId': value.userId,
    };
}


