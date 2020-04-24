package io.cloudsourced.api.cloudsourcedapi.Service;

import java.util.List;
import java.util.Optional;

public interface ServiceInterface<Entity> {
    public Optional<Entity> getOneById(Long id);
    public List<Entity> getAll();
    public Entity save(Entity PostDTO);
    public Entity update(Long id, Entity PostDTO);
    public void delete(Long id);
}
