package io.cloudsourced.api.cloudsourcedapi.Service;

import io.cloudsourced.api.cloudsourcedapi.Default.Authentication.AuthenticatedUserBean;
import io.cloudsourced.api.cloudsourcedapi.Entity.Implementation;
import io.cloudsourced.api.cloudsourcedapi.Entity.Review;
import io.cloudsourced.api.cloudsourcedapi.Entity.User;
import io.cloudsourced.api.cloudsourcedapi.Persistence.ReviewRepository;

import java.util.List;

@org.springframework.stereotype.Service
public class ReviewService extends BaseService<Review, ReviewRepository> {
    private final ImplementationService implementationService;
    private final UserService userService;
    public ReviewService(ReviewRepository repository, AuthenticatedUserBean authenticatedUserProvider, ImplementationService implementationService, UserService userService) {
        super(repository, authenticatedUserProvider);
        this.implementationService = implementationService;
        this.userService = userService;
    }

    public Review addReviewToImplementation(Long id, Review review) {
        User user = userService.getOneById(1L);
        review.setUser(user);
        Implementation implementation = implementationService.getOneById(id);
        review.setImplementation(implementation);
        repository.save(review);
        return review;
    }
}
