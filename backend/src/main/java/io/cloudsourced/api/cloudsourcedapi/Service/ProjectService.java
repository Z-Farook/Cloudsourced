package io.cloudsourced.api.cloudsourcedapi.Service;

import io.cloudsourced.api.cloudsourcedapi.Default.Authentication.AuthenticatedUserBean;
import io.cloudsourced.api.cloudsourcedapi.Default.Exception.NotFoundException;
import io.cloudsourced.api.cloudsourcedapi.Entity.Project;
import io.cloudsourced.api.cloudsourcedapi.Entity.User;
import io.cloudsourced.api.cloudsourcedapi.Persistence.ProjectRepository;

import java.time.Instant;
import java.util.List;

@org.springframework.stereotype.Service
public class ProjectService extends BaseService<Project, ProjectRepository>{

    public ProjectService(ProjectRepository repository, AuthenticatedUserBean authenticatedUserProvider) {
        super(repository, authenticatedUserProvider);
    }

    public List<Project> searchProjectName(String name) {
        return repository.findByNameContainsIgnoreCase(name);
    }

    public Project saveWithUser(Project project) {
        User user = authenticatedUserProvider.getUser();
        project.setUser(user);
        return repository.save(project);
    }

    public Project getProjectDetailById(long id){
        return repository.findById(id).orElseThrow(NotFoundException::new);
    }

    @Override
    public List<Project> getAll() {
        return repository.getAllUnfinished();
    }

    public List<Project> getProjectsByUser() {
        User user = authenticatedUserProvider.getUser();
        return repository.findByUser(user);
    }

    public List<Project> getProjectsByUserId(long id){

        return repository.byUserId(id);
    }

    public Project finishProject(Project project) {
        project.setFinishedAt(Instant.now());
        return repository.save(project);
    }

    public Project archiveProject(Project project) {
        project.setArchivedAt(Instant.now());
        return repository.save(project);
    }
}
