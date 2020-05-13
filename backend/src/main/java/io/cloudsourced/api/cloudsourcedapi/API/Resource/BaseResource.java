package io.cloudsourced.api.cloudsourcedapi.API.Resource;


import io.cloudsourced.api.cloudsourcedapi.API.DTO.Mapper.IMapper;
import io.cloudsourced.api.cloudsourcedapi.Service.BaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
public class BaseResource<Entity,DTO, S extends BaseService<Entity, P>, P extends JpaRepository<Entity, Long>, Mapper extends IMapper<Entity,DTO>> implements Resource<Entity,DTO> {

    public final S service;
    public final Mapper mapper;

    @GetMapping("{id}")
    @Override
    public DTO getOneById(@PathVariable Long id) {

        return mapper.entityToDTO(service.getOneById(id));
        //return service.getOneById(id);
        //return null;
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

    @Override
    @DeleteMapping
    public void delete(Long id) {
        service.delete(id);
    }

}