package io.cloudsourced.api.cloudsourcedapi.API.DTO.Mapper;

import io.cloudsourced.api.cloudsourcedapi.API.DTO.ImplementationDTO;
import io.cloudsourced.api.cloudsourcedapi.Entity.Implementation;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.NullValueCheckStrategy;
import org.mapstruct.NullValuePropertyMappingStrategy;

@org.mapstruct.Mapper(componentModel = "spring", uses = { UserMapper.class, ReviewMapper.class }, injectionStrategy = InjectionStrategy.CONSTRUCTOR, nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE, nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
public interface ImplementationMapper extends Mapper<Implementation, ImplementationDTO> {
}
