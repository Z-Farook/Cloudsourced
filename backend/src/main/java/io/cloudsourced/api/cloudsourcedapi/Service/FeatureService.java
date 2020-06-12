package io.cloudsourced.api.cloudsourcedapi.Service;

import io.cloudsourced.api.cloudsourcedapi.Default.Authentication.AuthenticatedUserBean;
import io.cloudsourced.api.cloudsourcedapi.Entity.Feature;
import io.cloudsourced.api.cloudsourcedapi.Entity.Project;
import io.cloudsourced.api.cloudsourcedapi.Persistence.FeatureRepository;

import java.util.List;

@org.springframework.stereotype.Service
public class FeatureService extends BaseService<Feature, FeatureRepository> {
    private final ProjectService projectService;
    public FeatureService(FeatureRepository repository, AuthenticatedUserBean authenticatedUserProvider, ProjectService projectService) {
        super(repository, authenticatedUserProvider);
        this.projectService = projectService;
    }

    public Feature addFeatureToProject(Long id, Feature feature) {
        Project project = projectService.getOneById(id);

        List<Feature> features = project.getFeatures();
        features.add(feature);
        project.setFeatures(features);

        projectService.save(project);
        return feature;
    }
}
