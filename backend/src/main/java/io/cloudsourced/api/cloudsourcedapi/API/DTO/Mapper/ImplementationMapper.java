package io.cloudsourced.api.cloudsourcedapi.API.DTO.Mapper;

import io.cloudsourced.api.cloudsourcedapi.API.DTO.ImplementationDTO;
import io.cloudsourced.api.cloudsourcedapi.Entity.Implementation;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.factory.Mappers;

@org.mapstruct.Mapper(componentModel = "spring", uses = { UserMapper.class }, injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface ImplementationMapper extends Mapper<Implementation, ImplementationDTO> {
    ImplementationMapper INSTANCE = Mappers.getMapper(ImplementationMapper.class);
}
