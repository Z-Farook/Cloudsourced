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
    private final UserService userService;
    public ImplementationService(ImplementationRepository repository, AuthenticatedUserBean authenticatedUserProvider, FeatureService featureService, UserService userService) {
        super(repository, authenticatedUserProvider);
        this.featureService = featureService;
        this.userService = userService;
    }

    // TODO: revise relationships
    public Implementation addImplementationToFeature(Long id, Implementation implementation) {
        User user = authenticatedUserProvider.GetUser();

        Feature feature = featureService.getOneById(id);

        implementation.setUser(user);
        implementation.setFeature(feature);

        return repository.save(implementation);

//        List<Implementation> implementations = feature.getImplementations();
//
//        implementation.setUser(user);
//
//        List<Implementation> userImplementations = user.getImplementations();
//        userImplementations.add(implementation);
//        user.setImplementations(userImplementations);
//
//        implementations.add(implementation);
//        feature.setImplementations(implementations);
//
//        featureService.save(feature);
//        userService.save(user);
//        return implementation;
    }
}
