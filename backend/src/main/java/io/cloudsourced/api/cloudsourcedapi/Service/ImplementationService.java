package io.cloudsourced.api.cloudsourcedapi.Service;

import io.cloudsourced.api.cloudsourcedapi.Default.Authentication.AuthenticatedUserBean;
import io.cloudsourced.api.cloudsourcedapi.Entity.Feature;
import io.cloudsourced.api.cloudsourcedapi.Entity.Implementation;
import io.cloudsourced.api.cloudsourcedapi.Entity.Project;
import io.cloudsourced.api.cloudsourcedapi.Entity.User;
import io.cloudsourced.api.cloudsourcedapi.Persistence.ImplementationRepository;

import java.util.List;

@org.springframework.stereotype.Service
public class ImplementationService extends BaseService<Implementation, ImplementationRepository> {
    private final FeatureService featureService;
    private final TransactionService transactionService;

    public ImplementationService(ImplementationRepository repository, AuthenticatedUserBean authenticatedUserProvider, FeatureService featureService, TransactionService transactionService) {
        super(repository, authenticatedUserProvider);
        this.featureService = featureService;
        this.transactionService = transactionService;
    }

    // TODO: revise relationships
    public Implementation addImplementationToFeature(Long id, Implementation implementation) {
        User user = authenticatedUserProvider.getUser();
        Feature feature = featureService.getOneById(id);

        implementation.setUser(user);
        implementation.setFeature(feature);

        return repository.save(implementation);
    }

    public List<Implementation> getImplementationFromFeature(Long id) {
        User user = authenticatedUserProvider.getUser();

        return repository.getImplementationsFromFeature(id, user.getId());
    }

    public Implementation acceptImplementation(Long id) {
        User user = authenticatedUserProvider.getUser();
        Implementation implementation = repository.getOne(id);
        Long implementationId = implementation.getId();
        Feature feature = implementation.getFeature();
        Project project = feature.getProject();
        User projectUser = project.getUser();
        final Long userId = user.getId();
        final Long projectUserId = projectUser.getId();
        final Boolean implementationApproved = implementation.getApproved();

        //noinspection NumberEquality
        if (projectUserId != userId || implementationApproved) {
            throw new RuntimeException();
        }

        implementation.setApproved(true);

        transactionService.createTransaction(user, implementation, feature.getPoints());

        return repository.save(implementation);
    }
}
