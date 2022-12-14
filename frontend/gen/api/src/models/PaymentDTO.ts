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
 * @interface PaymentDTO
 */
export interface PaymentDTO {
    /**
     * 
     * @type {number}
     * @memberof PaymentDTO
     */
    paidPoints?: number;
}

export function PaymentDTOFromJSON(json: any): PaymentDTO {
    return PaymentDTOFromJSONTyped(json, false);
}

export function PaymentDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): PaymentDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'paidPoints': !exists(json, 'paidPoints') ? undefined : json['paidPoints'],
    };
}

export function PaymentDTOToJSON(value?: PaymentDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'paidPoints': value.paidPoints,
    };
}


