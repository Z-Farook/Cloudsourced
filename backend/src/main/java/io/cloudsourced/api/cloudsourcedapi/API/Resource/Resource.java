package io.cloudsourced.api.cloudsourcedapi.API.Resource;

import io.cloudsourced.api.cloudsourcedapi.Service.Service;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
public class Resource<Entity, S extends Service<Entity, P>, P extends JpaRepository<Entity, Long>> implements ResourceInterface<Entity>{

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

}