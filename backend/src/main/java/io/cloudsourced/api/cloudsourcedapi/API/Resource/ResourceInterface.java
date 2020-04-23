package io.cloudsourced.api.cloudsourcedapi.API.Resource;

import java.util.List;

public interface ResourceInterface<Entity> {
    Entity getOneById(Long id);
    Entity createNew(Entity dto);
    List<Entity> All();
}


