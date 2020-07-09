package io.cloudsourced.api.cloudsourcedapi.API.Resource;

import io.cloudsourced.api.cloudsourcedapi.API.DTO.FeatureDTO;
import io.cloudsourced.api.cloudsourcedapi.API.DTO.Mapper.FeatureMapper;
import io.cloudsourced.api.cloudsourcedapi.Entity.Feature;
import io.cloudsourced.api.cloudsourcedapi.Persistence.FeatureRepository;
import io.cloudsourced.api.cloudsourcedapi.Service.FeatureService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/feature")
public class FeatureResource extends BaseResource<Feature, FeatureDTO, FeatureService, FeatureRepository, FeatureMapper>{

    public FeatureResource(FeatureService service, FeatureMapper mapper) {
        super(service, mapper);
    }

    @PostMapping("/{projectId}")
    public FeatureDTO addFeatureToProject(@PathVariable Long projectId, @RequestBody FeatureDTO featureDTO) {
        return mapper.entityToDTO(service.addFeatureToProject(projectId, mapper.DTOToEntity(featureDTO)));
    }
    @GetMapping("/user")
    public List<FeatureDTO> getFeaturesByUser(){
        return service.getFeaturesByAuthenticatedUser().stream().map(mapper::entityToDTO).collect(Collectors.toList());
    }
    @PostMapping("/finish/{featureId}")
    public FeatureDTO finishFeature(@PathVariable Long featureId) {
        Feature feature = service.getOneById(featureId);
        return mapper.entityToDTO(service.finishFeature(feature));
    }
    @PostMapping("/archive/{featureId}")
    public FeatureDTO archiveFeature(@PathVariable Long featureId) {
        Feature feature = service.getOneById(featureId);
        service.archiveFeature(feature);
        return mapper.entityToDTO(feature);
    }

}
