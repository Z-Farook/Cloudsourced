package io.cloudsourced.api.cloudsourcedapi.Persistence;

import io.cloudsourced.api.cloudsourcedapi.Entity.Implementation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImplementationRepository extends JpaRepository<Implementation, Long> {
}
