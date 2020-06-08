package io.cloudsourced.api.cloudsourcedapi.Service;

import io.cloudsourced.api.cloudsourcedapi.Default.Exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

@RequiredArgsConstructor
public class BaseService<Entity, P extends JpaRepository<Entity, Long>> implements Service<Entity> {

    public final P repository;

    @Override
    public Entity getOneById(Long id) {
        return repository.findById(id).orElseThrow(NotFoundException::new);
    }

    @Override
    public List<Entity> getAll() {
        return repository.findAll();
    }

    @Override
    public Entity save(Entity PostDTO) {
        return repository.save(PostDTO);
    }

    @Override
    public Entity update(Long id, Entity e) {
        return null;
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }
}