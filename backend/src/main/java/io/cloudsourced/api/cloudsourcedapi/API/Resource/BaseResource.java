package io.cloudsourced.api.cloudsourcedapi.API.Resource;


import io.cloudsourced.api.cloudsourcedapi.API.DTO.Mapper.FeatureMapper;
import io.cloudsourced.api.cloudsourcedapi.API.DTO.Mapper.Mapper;
import io.cloudsourced.api.cloudsourcedapi.Default.Authentication.AuthenticatedUserBean;
import io.cloudsourced.api.cloudsourcedapi.Entity.User;
import io.cloudsourced.api.cloudsourcedapi.Service.BaseService;
import io.cloudsourced.api.cloudsourcedapi.Service.FeatureService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
public class BaseResource<Entity,DTO, S extends BaseService<Entity, P>, P extends JpaRepository<Entity, Long>, DTOMapper extends Mapper<Entity,DTO>> implements Resource<Entity,DTO> {

    public final S service;
    public final DTOMapper mapper;
    private final AuthenticatedUserBean Authentication;
    

    @GetMapping("{id}")
    @Override
    public DTO getOneById(@PathVariable Long id) {
        return mapper.entityToDTO(service.getOneById(id));
    }

    @PostMapping("")
    @Override
    public Entity createNew(@RequestBody Entity entity) {
        return service.save(entity);
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