package io.cloudsourced.api.cloudsourcedapi.Service;

import io.cloudsourced.api.cloudsourcedapi.Entity.Feature;
import io.cloudsourced.api.cloudsourcedapi.Entity.Implementation;
import io.cloudsourced.api.cloudsourcedapi.Persistence.ImplementationRepository;

import java.util.List;

@org.springframework.stereotype.Service
public class ImplementationService extends BaseService<Implementation, ImplementationRepository> {
    private final FeatureService featureService;
    public ImplementationService(ImplementationRepository repository, FeatureService featureService) {
        super(repository);
        this.featureService = featureService;
    }

    public Implementation addImplementationToFeature(Long id, Implementation implementation) {
        Feature feature = featureService.getOneById(id);

        List<Implementation> implementations = feature.getImplementations();
        implementations.add(implementation);
        feature.setImplementations(implementations);

        featureService.save(feature);
        return implementation;
    }
}
