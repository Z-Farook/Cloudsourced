package io.cloudsourced.api.cloudsourcedapi.API.Resource;

import io.cloudsourced.api.cloudsourcedapi.API.DTO.Mapper.ReviewMapper;
import io.cloudsourced.api.cloudsourcedapi.API.DTO.ReviewDTO;
import io.cloudsourced.api.cloudsourcedapi.Entity.Review;
import io.cloudsourced.api.cloudsourcedapi.Persistence.ReviewRepository;
import io.cloudsourced.api.cloudsourcedapi.Service.ReviewService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/review")
public class ReviewResource extends BaseResource<Review, ReviewDTO, ReviewService, ReviewRepository, ReviewMapper>{

    public ReviewResource(ReviewService service, ReviewMapper mapper) {
        super(service, mapper);
    }

    @PostMapping("/{implementationId}")
    public ReviewDTO addReviewToImplementation(@PathVariable Long implementationId, @RequestBody ReviewDTO reviewDTO) {
        Review review = mapper.DTOToEntity(reviewDTO);

        Review savedReview =  service.addReviewToImplementation(implementationId, review);

        ReviewDTO savedReviewDTO = mapper.entityToDTO(savedReview);

        return savedReviewDTO;
//        return service.addReviewToImplementation(implementationId, mapper.DTOToEntity(reviewDTO));
    }
}
