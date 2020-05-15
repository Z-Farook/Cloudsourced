package io.cloudsourced.api.cloudsourcedapi.Service;

import io.cloudsourced.api.cloudsourcedapi.Entity.Feature;
import io.cloudsourced.api.cloudsourcedapi.Entity.Project;
import io.cloudsourced.api.cloudsourcedapi.Persistence.FeatureRepository;

@org.springframework.stereotype.Service
public class FeatureService extends BaseService<Feature, FeatureRepository> {
    private final ProjectService projectService;
    public FeatureService(FeatureRepository repository, ProjectService projectService) {
        super(repository);
        this.projectService = projectService;
    }

    public Feature addFeatureToProject(Long id, Feature feature) {
        Project project = projectService.getOneById(id);
        feature.setProject(project);
        return repository.save(feature);
    }
}
