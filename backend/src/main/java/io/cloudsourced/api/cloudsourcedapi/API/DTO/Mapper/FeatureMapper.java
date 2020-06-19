package io.cloudsourced.api.cloudsourcedapi.API.DTO.Mapper;

import io.cloudsourced.api.cloudsourcedapi.API.DTO.FeatureDTO;
import io.cloudsourced.api.cloudsourcedapi.Entity.Feature;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.NullValueCheckStrategy;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.factory.Mappers;

@org.mapstruct.Mapper(componentModel = "spring", uses = { ImplementationMapper.class }, injectionStrategy = InjectionStrategy.CONSTRUCTOR, nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE, nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
public interface FeatureMapper extends Mapper<Feature, FeatureDTO> {
    FeatureMapper INSTANCE = Mappers.getMapper(FeatureMapper.class);
}
