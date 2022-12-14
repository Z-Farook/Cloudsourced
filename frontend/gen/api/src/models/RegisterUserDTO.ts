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
     * @type {string}
     * @memberof RegisterUserDTO
     */
    image?: string;
    /**
     * 
     * @type {string}
     * @memberof RegisterUserDTO
     */
    infix?: string;
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
    /**
     * 
     * @type {string}
     * @memberof RegisterUserDTO
     */
    street?: string;
    /**
     * 
     * @type {string}
     * @memberof RegisterUserDTO
     */
    streetNumber?: string;
    /**
     * 
     * @type {string}
     * @memberof RegisterUserDTO
     */
    telephone?: string;
}

export function RegisterUserDTOFromJSON(json: any): RegisterUserDTO {
    return RegisterUserDTOFromJSONTyped(json, false);
}

export function RegisterUserDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): RegisterUserDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'country': !exists(json, 'country') ? undefined : json['country'],
        'email': !exists(json, 'email') ? undefined : json['email'],
        'image': !exists(json, 'image') ? undefined : json['image'],
        'infix': !exists(json, 'infix') ? undefined : json['infix'],
        'languages': !exists(json, 'languages') ? undefined : json['languages'],
        'lastName': !exists(json, 'lastName') ? undefined : json['lastName'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'password': !exists(json, 'password') ? undefined : json['password'],
        'street': !exists(json, 'street') ? undefined : json['street'],
        'streetNumber': !exists(json, 'streetNumber') ? undefined : json['streetNumber'],
        'telephone': !exists(json, 'telephone') ? undefined : json['telephone'],
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
        
        'country': value.country,
        'email': value.email,
        'image': value.image,
        'infix': value.infix,
        'languages': value.languages,
        'lastName': value.lastName,
        'name': value.name,
        'password': value.password,
        'street': value.street,
        'streetNumber': value.streetNumber,
        'telephone': value.telephone,
    };
}


