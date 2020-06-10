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
import {
    User,
    UserFromJSON,
    UserFromJSONTyped,
    UserToJSON,
} from './';

/**
 * 
 * @export
 * @interface Implementation
 */
export interface Implementation {
    /**
     * 
     * @type {string}
     * @memberof Implementation
     */
    code?: string;
    /**
     * 
     * @type {Date}
     * @memberof Implementation
     */
    createdAt?: Date;
    /**
     * 
     * @type {number}
     * @memberof Implementation
     */
    id?: number;
    /**
     * 
     * @type {Date}
     * @memberof Implementation
     */
    updatedAt?: Date;
    /**
     * 
     * @type {User}
     * @memberof Implementation
     */
    user?: User;
}

export function ImplementationFromJSON(json: any): Implementation {
    return ImplementationFromJSONTyped(json, false);
}

export function ImplementationFromJSONTyped(json: any, ignoreDiscriminator: boolean): Implementation {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'code': !exists(json, 'code') ? undefined : json['code'],
        'createdAt': !exists(json, 'createdAt') ? undefined : (new Date(json['createdAt'])),
        'id': !exists(json, 'id') ? undefined : json['id'],
        'updatedAt': !exists(json, 'updatedAt') ? undefined : (new Date(json['updatedAt'])),
        'user': !exists(json, 'user') ? undefined : UserFromJSON(json['user']),
    };
}

export function ImplementationToJSON(value?: Implementation | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'code': value.code,
        'createdAt': value.createdAt === undefined ? undefined : (value.createdAt.toISOString()),
        'id': value.id,
        'updatedAt': value.updatedAt === undefined ? undefined : (value.updatedAt.toISOString()),
        'user': UserToJSON(value.user),
    };
}


