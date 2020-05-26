package io.cloudsourced.api.cloudsourcedapi.API.DTO.Mapper;

import io.cloudsourced.api.cloudsourcedapi.API.DTO.FeatureDTO;
import io.cloudsourced.api.cloudsourcedapi.API.DTO.UserDTO;
import io.cloudsourced.api.cloudsourcedapi.Entity.Feature;
import io.cloudsourced.api.cloudsourcedapi.Entity.User;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.factory.Mappers;

@org.mapstruct.Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface FeatureMapper extends Mapper<Feature, FeatureDTO> {
    FeatureMapper INSTANCE = Mappers.getMapper(FeatureMapper.class);
}
