package io.cloudsourced.api.cloudsourcedapi.API.Resource;

import java.util.List;

public interface Resource<Entity,DTO> {
    DTO getOneById(Long id);
    Entity createNew(Entity dto);
    List<DTO> All();
    void delete(Long id);
}


