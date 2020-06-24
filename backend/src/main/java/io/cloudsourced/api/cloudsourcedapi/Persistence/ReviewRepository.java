package io.cloudsourced.api.cloudsourcedapi.Persistence;

import io.cloudsourced.api.cloudsourcedapi.Entity.Implementation;
import io.cloudsourced.api.cloudsourcedapi.Entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    @Query(value ="select rev from Review rev where rev.implementation.id =:id AND rev.implementation.feature.project.user.id=:userId or rev.implementation.user.id=:userId")
    public List<Review> getReviewFromImplementation(@Param("id") long id, @Param("userId") long userId);
}
