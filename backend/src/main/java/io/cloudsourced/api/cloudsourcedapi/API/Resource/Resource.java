package io.cloudsourced.api.cloudsourcedapi.API.Resource;

import java.util.List;
import java.util.Optional;

public interface Resource<Entity> {
    Optional<Entity> getOneById(Long id);
    Entity createNew(Entity dto);
    List<Entity> All();
}


