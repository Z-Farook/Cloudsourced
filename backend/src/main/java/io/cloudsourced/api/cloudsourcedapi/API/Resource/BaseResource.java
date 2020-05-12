package io.cloudsourced.api.cloudsourcedapi.API.Resource;

import io.cloudsourced.api.cloudsourcedapi.Service.BaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
public class BaseResource<Entity, S extends BaseService<Entity, P>, P extends JpaRepository<Entity, Long>> implements Resource<Entity> {

    public final S service;

    @GetMapping("{id}")
    @Override
    public Optional<Entity> getOneById(@PathVariable Long id) {
        return service.getOneById(id);
    }

    @PostMapping("")
    @Override
    public Entity createNew(@RequestBody Entity entity) {
        return service.save(entity);
    }

    @Override
    @GetMapping("")
    public List<Entity> All() {
        return service.getAll();
    }

    @DeleteMapping("{id}")
    @Override
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

}