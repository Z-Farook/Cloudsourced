package io.cloudsourced.api.cloudsourcedapi.API.Resource;

import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

public interface Resource<Entity,DTO> {
    DTO getOneById(Long id);
    DTO createNew(DTO dto);
    DTO update(Entity entity);
    List<DTO> All();
    void delete(Long id);
}


