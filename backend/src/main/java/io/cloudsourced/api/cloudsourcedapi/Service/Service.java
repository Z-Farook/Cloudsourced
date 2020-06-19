package io.cloudsourced.api.cloudsourcedapi.Service;

import java.util.List;
import java.util.Optional;

public interface Service<Entity> {
    public Entity getOneById(Long id);
    public List<Entity> getAll();
    public Entity save(Entity PostDTO);
    public void delete(Long id);
}
