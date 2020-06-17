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
    FeatureDTO,
    FeatureDTOFromJSON,
    FeatureDTOFromJSONTyped,
    FeatureDTOToJSON,
} from './';

/**
 * 
 * @export
 * @interface ProjectDTO
 */
export interface ProjectDTO {
    /**
     * 
     * @type {string}
     * @memberof ProjectDTO
     */
    description?: string;
    /**
     * 
     * @type {Array<FeatureDTO>}
     * @memberof ProjectDTO
     */
    features?: Array<FeatureDTO>;
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
}

export function ProjectDTOFromJSON(json: any): ProjectDTO {
    return ProjectDTOFromJSONTyped(json, false);
}

export function ProjectDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): ProjectDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'description': !exists(json, 'description') ? undefined : json['description'],
        'features': !exists(json, 'features') ? undefined : ((json['features'] as Array<any>).map(FeatureDTOFromJSON)),
        'id': !exists(json, 'id') ? undefined : json['id'],
        'image': !exists(json, 'image') ? undefined : json['image'],
        'name': !exists(json, 'name') ? undefined : json['name'],
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
        
        'description': value.description,
        'features': value.features === undefined ? undefined : ((value.features as Array<any>).map(FeatureDTOToJSON)),
        'id': value.id,
        'image': value.image,
        'name': value.name,
    };
}


