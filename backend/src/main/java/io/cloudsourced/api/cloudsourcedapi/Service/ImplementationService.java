package io.cloudsourced.api.cloudsourcedapi.Service;

import io.cloudsourced.api.cloudsourcedapi.Entity.Feature;
import io.cloudsourced.api.cloudsourcedapi.Entity.Implementation;
import io.cloudsourced.api.cloudsourcedapi.Entity.User;
import io.cloudsourced.api.cloudsourcedapi.Persistence.ImplementationRepository;

import java.util.List;

@org.springframework.stereotype.Service
public class ImplementationService extends BaseService<Implementation, ImplementationRepository> {
    private final FeatureService featureService;
    private final UserService userService;
    public ImplementationService(ImplementationRepository repository, FeatureService featureService, UserService userService) {
        super(repository);
        this.featureService = featureService;
        this.userService = userService;
    }

    // TODO: revise relationships
    public Implementation addImplementationToFeature(Long id, Implementation implementation) {
        Feature feature = featureService.getOneById(id);

        List<Implementation> implementations = feature.getImplementations();

        // TODO: get the logged in user
        User user = userService.getOneById(1L);

        implementation.setUser(user);

        List<Implementation> userImplementations = user.getImplementations();
        userImplementations.add(implementation);
        user.setImplementations(userImplementations);

        implementations.add(implementation);
        feature.setImplementations(implementations);

        featureService.save(feature);
        userService.save(user);
        return implementation;
    }
}
