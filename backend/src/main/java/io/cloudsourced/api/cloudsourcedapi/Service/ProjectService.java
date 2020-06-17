package io.cloudsourced.api.cloudsourcedapi.Service;

import io.cloudsourced.api.cloudsourcedapi.API.DTO.ProjectDTO;
import io.cloudsourced.api.cloudsourcedapi.Default.Authentication.AuthenticatedUserBean;
import io.cloudsourced.api.cloudsourcedapi.Default.Exception.NotFoundException;
import io.cloudsourced.api.cloudsourcedapi.Entity.Project;
import io.cloudsourced.api.cloudsourcedapi.Entity.User;
import io.cloudsourced.api.cloudsourcedapi.Persistence.ProjectRepository;

import java.util.List;
import java.util.Optional;

@org.springframework.stereotype.Service
public class ProjectService extends BaseService<Project, ProjectRepository>{

    public ProjectService(ProjectRepository repository, AuthenticatedUserBean authenticatedUserProvider) {
        super(repository, authenticatedUserProvider);
    }

    public List<Project> searchProjectName(String name) {
        return repository.findByNameContainsIgnoreCase(name);
    }

    public Project saveProject(Project project) {
        return repository.save(project);
    }

    public Project saveWithUser(Project project) {
        User user = authenticatedUserProvider.GetUser();
        project.setUser(user);
        return repository.save(project);
    }

    public Project getProjectDetailById(long id){
        return repository.findById(id).orElseThrow(NotFoundException::new);
    }

    public List<Project> getProjectsByUser(){
        User user = authenticatedUserProvider.GetUser();
        return repository.findByUser(user);
    }

}
