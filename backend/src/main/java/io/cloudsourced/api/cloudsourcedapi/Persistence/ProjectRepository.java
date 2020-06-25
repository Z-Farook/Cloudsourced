package io.cloudsourced.api.cloudsourcedapi.Persistence;

import io.cloudsourced.api.cloudsourcedapi.Entity.Project;
import io.cloudsourced.api.cloudsourcedapi.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    public List<Project> findByNameContainsIgnoreCase(String name);

    public List<Project> findByUser(User user);

    @Query("SELECT project FROM Project project WHERE project.finishedAt IS NULL")
    public List<Project> getAllUnfinished();
}
