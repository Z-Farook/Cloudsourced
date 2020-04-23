package io.cloudsourced.api.cloudsourcedapi.Service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

@RequiredArgsConstructor
public class Service<Entity, P extends JpaRepository<Entity, Long>> implements  ServiceInterface<Entity> {

    public final P repository;

    @Override
    public Entity getOneById(Long id) {
        return repository.getOne(id);
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
        repository.delete(getOneById(id));
    }

}