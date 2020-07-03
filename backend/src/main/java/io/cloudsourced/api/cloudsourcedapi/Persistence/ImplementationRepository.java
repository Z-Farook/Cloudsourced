package io.cloudsourced.api.cloudsourcedapi.Persistence;

import io.cloudsourced.api.cloudsourcedapi.Entity.Implementation;
import io.cloudsourced.api.cloudsourcedapi.Entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImplementationRepository extends JpaRepository<Implementation, Long> {
    @Query(value ="select imp from Implementation imp where imp.feature.id =:id AND (imp.feature.project.user.id=:userId or imp.user.id=:userId)")
    public List<Implementation> getImplementationsFromFeature(@Param("id") long id, @Param("userId") long userId);
}
