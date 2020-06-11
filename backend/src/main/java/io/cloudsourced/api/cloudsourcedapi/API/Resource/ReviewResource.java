package io.cloudsourced.api.cloudsourcedapi.API.Resource;

import io.cloudsourced.api.cloudsourcedapi.API.DTO.Mapper.ReviewMapper;
import io.cloudsourced.api.cloudsourcedapi.API.DTO.ReviewDTO;
import io.cloudsourced.api.cloudsourcedapi.Default.Authentication.AuthenticatedUserBean;
import io.cloudsourced.api.cloudsourcedapi.Entity.Review;
import io.cloudsourced.api.cloudsourcedapi.Persistence.ReviewRepository;
import io.cloudsourced.api.cloudsourcedapi.Service.ReviewService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/review")
public class ReviewResource extends BaseResource<Review, ReviewDTO, ReviewService, ReviewRepository, ReviewMapper>{

    public ReviewResource(ReviewService service, ReviewMapper mapper, AuthenticatedUserBean Authentication) {
        super(service, mapper, Authentication);
    }

    @PostMapping("/{implementationId}")
    public ReviewDTO addReviewToImplementation(@PathVariable Long implementationId, @RequestBody ReviewDTO reviewDTO) {
        Review review =  service.addReviewToImplementation(implementationId, mapper.DTOToEntity(reviewDTO));
        return mapper.entityToDTO(review);
    }
}
