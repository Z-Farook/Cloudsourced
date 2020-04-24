package io.cloudsourced.api.cloudsourcedapi.Service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
public class Service<Entity, P extends JpaRepository<Entity, Long>> implements  ServiceInterface<Entity> {

    public final P repository;

    @Override
    public Optional<Entity> getOneById(Long id) {
        return repository.findById(id);
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
        if(getOneById(id).isPresent()){
            repository.delete(getOneById(id).get());
        }

    }

}