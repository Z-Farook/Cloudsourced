package io.cloudsourced.api.cloudsourcedapi.API.Resource;

import io.cloudsourced.api.cloudsourcedapi.Entity.Feature;
import io.cloudsourced.api.cloudsourcedapi.Persistence.FeatureRepository;
import io.cloudsourced.api.cloudsourcedapi.Service.FeatureService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/feature")
public class FeatureResource extends BaseResource<Feature, FeatureService, FeatureRepository>{

    public FeatureResource(FeatureService service) {
        super(service);
    }

    @PostMapping("/{projectId}")
    public Feature addFeatureToProject(@PathVariable Long projectId, @RequestBody Feature feature) {
        return service.addFeatureToProject(projectId, feature);
    }
}
