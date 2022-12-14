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
 * @interface ValidateTokenResult
 */
export interface ValidateTokenResult {
    /**
     * 
     * @type {boolean}
     * @memberof ValidateTokenResult
     */
    valid?: boolean;
}

export function ValidateTokenResultFromJSON(json: any): ValidateTokenResult {
    return ValidateTokenResultFromJSONTyped(json, false);
}

export function ValidateTokenResultFromJSONTyped(json: any, ignoreDiscriminator: boolean): ValidateTokenResult {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'valid': !exists(json, 'valid') ? undefined : json['valid'],
    };
}

export function ValidateTokenResultToJSON(value?: ValidateTokenResult | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'valid': value.valid,
    };
}


