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

    public Implementation addImplementationToFeature(Long id, Implementation implementation) throws Exception {
        Feature feature = featureService.getOneById(id);

        List<Implementation> implementations = feature.getImplementations();

        // TODO: there must be at least one user in the database for this function to be able to be called
        List<User> users = userService.getAll();
        if (users.size() < 1) {
            throw new Exception("There are no users in the database");
        }

        // TODO: get the logged in user
        User user = userService.getOneById(1L);

        if (user.getId() == feature.getId()) {
            throw new Exception("Hol' up.... you provided your own implementation?");
        }

        implementation.setUser(user);

        implementations.add(implementation);
        feature.setImplementations(implementations);

        featureService.save(feature);
        return implementation;
    }
}
