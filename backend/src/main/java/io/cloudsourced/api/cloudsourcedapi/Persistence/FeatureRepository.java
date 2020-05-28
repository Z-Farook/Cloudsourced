package io.cloudsourced.api.cloudsourcedapi.Persistence;

import io.cloudsourced.api.cloudsourcedapi.Entity.Feature;
import io.cloudsourced.api.cloudsourcedapi.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeatureRepository extends JpaRepository<Feature, Long> {
}
