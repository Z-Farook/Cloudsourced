package io.cloudsourced.api.cloudsourcedapi.Service;

import io.cloudsourced.api.cloudsourcedapi.Default.Authentication.AuthenticatedUserBean;
import io.cloudsourced.api.cloudsourcedapi.Entity.Feature;
import io.cloudsourced.api.cloudsourcedapi.Entity.Project;
import io.cloudsourced.api.cloudsourcedapi.Entity.User;
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
        User user = authenticatedUserProvider.GetUser();
        Project project = projectService.getOneById(id);

        List<Feature> features = project.getFeatures();
        features.add(feature);
        project.setFeatures(features);

        feature.setUser(user);
        feature.setProject(project);

        return repository.save(feature);
    }
}
