package io.cloudsourced.api.cloudsourcedapi.API.Resource;

import io.cloudsourced.api.cloudsourcedapi.API.DTO.FeatureDTO;
import io.cloudsourced.api.cloudsourcedapi.API.DTO.Mapper.FeatureMapper;
import io.cloudsourced.api.cloudsourcedapi.Default.Authentication.AuthenticatedUserBean;
import io.cloudsourced.api.cloudsourcedapi.Entity.Feature;
import io.cloudsourced.api.cloudsourcedapi.Persistence.FeatureRepository;
import io.cloudsourced.api.cloudsourcedapi.Service.FeatureService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/feature")
public class FeatureResource extends BaseResource<Feature, FeatureDTO, FeatureService, FeatureRepository, FeatureMapper>{


    public FeatureResource(FeatureService service, FeatureMapper mapper) {
        super(service, mapper);
    }

    @PostMapping("/{projectId}")
    public FeatureDTO addFeatureToProject(@PathVariable Long projectId, @RequestBody Feature feature) {
        return mapper.entityToDTO(service.addFeatureToProject(projectId, feature));
    }
}
