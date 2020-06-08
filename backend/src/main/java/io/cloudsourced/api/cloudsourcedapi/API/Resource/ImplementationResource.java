package io.cloudsourced.api.cloudsourcedapi.API.Resource;

import io.cloudsourced.api.cloudsourcedapi.API.DTO.ImplementationDTO;
import io.cloudsourced.api.cloudsourcedapi.API.DTO.Mapper.ImplementationMapper;
import io.cloudsourced.api.cloudsourcedapi.Entity.Feature;
import io.cloudsourced.api.cloudsourcedapi.Entity.Implementation;
import io.cloudsourced.api.cloudsourcedapi.Persistence.ImplementationRepository;
import io.cloudsourced.api.cloudsourcedapi.Service.ImplementationService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/implementation")
public class ImplementationResource extends BaseResource<Implementation, ImplementationDTO, ImplementationService, ImplementationRepository, ImplementationMapper> {
    public ImplementationResource(ImplementationService service, ImplementationMapper mapper) {
        super(service, mapper);
    }

    @PostMapping("/{featureId}")
    public ImplementationDTO addImplementationToFeature(@PathVariable Long featureId, @RequestBody ImplementationDTO implementationDTO) {
        Implementation implementation = mapper.DTOToEntity(implementationDTO);
        return mapper.entityToDTO(service.addImplementationToFeature(featureId, implementation));
    }
}
