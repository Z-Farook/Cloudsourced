package io.cloudsourced.api.cloudsourcedapi.API.Resource;

import io.cloudsourced.api.cloudsourcedapi.API.DTO.ImplementationDTO;
import io.cloudsourced.api.cloudsourcedapi.API.DTO.Mapper.ImplementationMapper;
import io.cloudsourced.api.cloudsourcedapi.Entity.Implementation;
import io.cloudsourced.api.cloudsourcedapi.Persistence.ImplementationRepository;
import io.cloudsourced.api.cloudsourcedapi.Service.ImplementationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/implementation")
public class ImplementationResource extends BaseResource<Implementation, ImplementationDTO, ImplementationService, ImplementationRepository, ImplementationMapper> {

    public ImplementationResource(ImplementationService service, ImplementationMapper mapper) {
        super(service, mapper);
    }

    @PostMapping("/{featureId}")
    public ImplementationDTO addImplementationToFeature(@PathVariable Long featureId, @RequestBody ImplementationDTO implementationDTO) {
        return mapper.entityToDTO(service.addImplementationToFeature(featureId, mapper.DTOToEntity(implementationDTO)));
    }

    @GetMapping("/feature/{featureId}")
    public List<ImplementationDTO> getImplementationFromFeature(@PathVariable Long featureId) {
        return service.getImplementationFromFeature(featureId).stream().map(mapper::entityToDTO).collect(Collectors.toList());
    }

    @PostMapping("/{implementationId}/accept")
    public ImplementationDTO acceptImplementation(@PathVariable Long implementationId) throws Exception {
        return mapper.entityToDTO(service.acceptImplementation(implementationId));
    }
}
