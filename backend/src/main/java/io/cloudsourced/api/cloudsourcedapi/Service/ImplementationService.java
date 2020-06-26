package io.cloudsourced.api.cloudsourcedapi.Service;

import io.cloudsourced.api.cloudsourcedapi.Default.Authentication.AuthenticatedUserBean;
import io.cloudsourced.api.cloudsourcedapi.Entity.Feature;
import io.cloudsourced.api.cloudsourcedapi.Entity.Implementation;
import io.cloudsourced.api.cloudsourcedapi.Entity.User;
import io.cloudsourced.api.cloudsourcedapi.Persistence.ImplementationRepository;

import java.util.List;

@org.springframework.stereotype.Service
public class ImplementationService extends BaseService<Implementation, ImplementationRepository> {
    private final FeatureService featureService;
    public ImplementationService(ImplementationRepository repository, AuthenticatedUserBean authenticatedUserProvider, FeatureService featureService) {
        super(repository, authenticatedUserProvider);
        this.featureService = featureService;
    }

    // TODO: revise relationships
    public Implementation addImplementationToFeature(Long id, Implementation implementation) {
        User user = authenticatedUserProvider.GetUser();
        Feature feature = featureService.getOneById(id);

        List<Implementation> implementations = feature.getImplementations();
        implementations.add(implementation);
        feature.setImplementations(implementations);

        implementation.setUser(user);
        implementation.setFeature(feature);

        return repository.save(implementation);
    }

    public List<Implementation> getImplementationFromFeature(Long id) {
        User user = authenticatedUserProvider.GetUser();

        return repository.getImplementationsFromFeature(id, user.getId());
    }
}
