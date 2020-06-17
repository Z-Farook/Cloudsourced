package io.cloudsourced.api.cloudsourcedapi.API.DTO.Mapper;

import org.mapstruct.*;

import java.util.List;
public interface Mapper<Entity,DTO> {
    DTO entityToDTO(Entity entity);
    List<DTO> entityListToDtoList(List<Entity> entities);
    Entity DTOToEntity(DTO dto);

    Entity updateEntityFromEntity(@MappingTarget Entity originalEntity, Entity incomingEntity);
}
