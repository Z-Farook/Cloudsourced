package io.cloudsourced.api.cloudsourcedapi.API.DTO.Mapper;

import org.mapstruct.Mapping;

public interface IMapper<Entity,DTO> {
    DTO entityToDTO(Entity entity);
    Entity DTOToEntity(DTO dto);
}
