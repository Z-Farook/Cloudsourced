package io.cloudsourced.api.cloudsourcedapi.Service;

import io.cloudsourced.api.cloudsourcedapi.Entity.Feature;
import io.cloudsourced.api.cloudsourcedapi.Entity.Project;
import io.cloudsourced.api.cloudsourcedapi.Persistence.FeatureRepository;
import io.cloudsourced.api.cloudsourcedapi.Persistence.ProjectRepository;

import java.util.List;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
public class FeatureService extends BaseService<Feature, FeatureRepository> {
    private final ProjectService projectService;
    public FeatureService(FeatureRepository repository, ProjectService projectService) {
        super(repository);
        this.projectService = projectService;
    }

    public Feature addFeatureToProject(Long id, Feature feature) {
        Project project = projectService.getOneById(id);

        List<Feature> features = project.getFeatures();
        features.add(feature);
        project.setFeatures(features);

        return projectService.save(project).getFeatures().stream()
                .filter(x -> x.getId()
                .equals(id))
                .collect(Collectors.toList())
                .get(0);
    }
}
