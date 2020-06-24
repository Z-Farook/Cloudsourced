package io.cloudsourced.api.cloudsourcedapi.Persistence;

import io.cloudsourced.api.cloudsourcedapi.Entity.Project;
import io.cloudsourced.api.cloudsourcedapi.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    public List<Project> findByNameContainsIgnoreCase(String name);

    public List<Project> findByUser(User user);

    @Query(value="SELECT Project FROM Project WHERE Project.user.id = :id", nativeQuery = true)
    public List<Project> findByUserId(@Param("id") long id);
}
