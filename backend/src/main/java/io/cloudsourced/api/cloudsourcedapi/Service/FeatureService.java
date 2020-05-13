package io.cloudsourced.api.cloudsourcedapi.Service;

import io.cloudsourced.api.cloudsourcedapi.Entity.Feature;
import io.cloudsourced.api.cloudsourcedapi.Persistence.FeatureRepository;

@org.springframework.stereotype.Service
public class FeatureService extends Service<Feature, FeatureRepository> {
    public FeatureService(FeatureRepository repository) {
        super(repository);
    }
}
