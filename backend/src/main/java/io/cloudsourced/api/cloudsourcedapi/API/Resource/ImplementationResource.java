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
    public Implementation addImplementationToFeature(@PathVariable Long featureId, @RequestBody Implementation implementation) {
//        Implementation implementation = service.addImplementationToFeature(featureId, implementation);
        return service.addImplementationToFeature(featureId, implementation);
    }
}
