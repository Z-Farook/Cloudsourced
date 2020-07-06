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
    public ReviewService(ReviewRepository repository, AuthenticatedUserBean authenticatedUserProvider, ImplementationService implementationService) {
        super(repository, authenticatedUserProvider);
        this.implementationService = implementationService;
    }

    public Review addReviewToImplementation(Long id, Review review) {
        User user = authenticatedUserProvider.getUser();
        Implementation implementation = implementationService.getOneById(id);

        List<Review> reviews = implementation.getReviews();
        reviews.add(review);
        implementation.setReviews(reviews);

        review.setUser(user);
        review.setImplementation(implementation);

        return repository.save(review);
    }

    public List<Review> getReviewFromImplementation(Long id) {
        User user = authenticatedUserProvider.getUser();

        return repository.getReviewFromImplementation(id, user.getId());
    }
}
