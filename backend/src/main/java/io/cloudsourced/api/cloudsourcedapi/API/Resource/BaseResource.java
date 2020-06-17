package io.cloudsourced.api.cloudsourcedapi.API.Resource;

import io.cloudsourced.api.cloudsourcedapi.API.DTO.Mapper.Mapper;
import io.cloudsourced.api.cloudsourcedapi.Service.BaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
public class BaseResource<Entity,DTO, S extends BaseService<Entity, P>, P extends JpaRepository<Entity, Long>, DTOMapper extends Mapper<Entity,DTO>> implements Resource<Entity,DTO> {

    public final S service;
    public final DTOMapper mapper;

    @Override
    @GetMapping("{id}")
    public DTO getOneById(@PathVariable Long id) {
        return mapper.entityToDTO(service.getOneById(id));
    }

    @Override
    @PostMapping("")
    public DTO createNew(@RequestBody DTO dto) {
        return mapper.entityToDTO(service.save(mapper.DTOToEntity(dto)));
    }

    @Override
    @PutMapping("")
    public DTO update(@RequestBody Entity entity) {
        return mapper.entityToDTO(service.save(entity));
    }

    @Override
    @GetMapping("")
    public List<DTO> All() {
        return mapper.entityListToDtoList(service.getAll());
    }

    @Override
    @DeleteMapping
    public void delete(Long id) {
        service.delete(id);
    }
}