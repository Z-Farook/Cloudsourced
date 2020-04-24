package io.cloudsourced.api.cloudsourcedapi.Service;

import java.util.List;

public interface ServiceInterface<Entity> {
    public Entity getOneById(Long id);
    public List<Entity> getAll();
    public Entity save(Entity PostDTO);
    public Entity update(Long id, Entity PostDTO);
    public void delete(Long id);
}
