package io.cloudsourced.api.cloudsourcedapi.service;

import io.cloudsourced.api.cloudsourcedapi.Default.Authentication.AuthenticatedUserBean;
import io.cloudsourced.api.cloudsourcedapi.Entity.Implementation;
import io.cloudsourced.api.cloudsourcedapi.Entity.Project;
import io.cloudsourced.api.cloudsourcedapi.Entity.Review;
import io.cloudsourced.api.cloudsourcedapi.Entity.User;
import io.cloudsourced.api.cloudsourcedapi.Persistence.ProjectRepository;
import io.cloudsourced.api.cloudsourcedapi.Persistence.ReviewRepository;
import io.cloudsourced.api.cloudsourcedapi.Service.ImplementationService;
import io.cloudsourced.api.cloudsourcedapi.Service.ProjectService;
import io.cloudsourced.api.cloudsourcedapi.Service.ReviewService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ReviewServiceTest {
    @InjectMocks
    private ReviewService reviewService;

    @Mock
    AuthenticatedUserBean authenticatedUserProvider;

    @Mock
    ImplementationService implementationService;

    @Mock
    ReviewRepository reviewRepository;


    @Test
    void addReviewToImplementation_test(){
        Review r = new Review();
        when(authenticatedUserProvider.getUser()).thenReturn(new User());
        Implementation implementation = mock(Implementation.class);
        when(implementationService.getOneById(1L)).thenReturn(implementation);
        List<Review> lr = new ArrayList<Review>();
        when(implementation.getReviews()).thenReturn(lr);
        when(reviewRepository.save(r)).thenReturn(r);

        assertEquals(r, reviewService.addReviewToImplementation(1L, r));

    }

    @Test
    void getReviewFromImplementationt_test(){
        User u = mock(User.class);
        when(authenticatedUserProvider.getUser()).thenReturn(u);
        when(u.getId()).thenReturn(1L);

        List<Review> lr = new ArrayList<Review>();
        when(reviewRepository.getReviewFromImplementation(1L, u.getId())).thenReturn(lr);

        assertEquals(lr, reviewService.getReviewFromImplementation(1L));
    }


}
