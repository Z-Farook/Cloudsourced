package io.cloudsourced.api.cloudsourcedapi.Service;

import io.cloudsourced.api.cloudsourcedapi.Default.Authentication.AuthenticatedUserBean;
import io.cloudsourced.api.cloudsourcedapi.Default.Exception.UnauthorizedException;
import io.cloudsourced.api.cloudsourcedapi.Entity.Feature;
import io.cloudsourced.api.cloudsourcedapi.Entity.Project;
import io.cloudsourced.api.cloudsourcedapi.Entity.User;
import io.cloudsourced.api.cloudsourcedapi.Persistence.FeatureRepository;

import java.time.Instant;
import java.util.List;

@org.springframework.stereotype.Service
public class FeatureService extends BaseService<Feature, FeatureRepository> {
    private final ProjectService projectService;
    public FeatureService(FeatureRepository repository, AuthenticatedUserBean authenticatedUserProvider, ProjectService projectService) {
        super(repository, authenticatedUserProvider);
        this.projectService = projectService;
    }

    public Feature addFeatureToProject(Long id, Feature feature) {
        User user = authenticatedUserProvider.getUser();
        Project project = projectService.getOneById(id);

        if (project.getUser() != user) {
            throw new UnauthorizedException();
        }

        List<Feature> features = project.getFeatures();
        features.add(feature);
        project.setFeatures(features);

        feature.setProject(project);

        return repository.save(feature);
    }
    public List<Feature> getFeaturesByUser() {
        User user = authenticatedUserProvider.getUser();
        return repository.findByProjectUser(user.getId());
    }
    public Feature finishFeature(Feature feature) {
        feature.setFinishedAt(Instant.now());
        return repository.save(feature);
    }
    public Feature archiveFeature(Feature feature) {
        feature.setArchivedAt(Instant.now());
        return repository.save(feature);
    }
}
