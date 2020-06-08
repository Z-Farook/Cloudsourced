package io.cloudsourced.api.cloudsourcedapi.Service;

import io.cloudsourced.api.cloudsourcedapi.Entity.Project;
import io.cloudsourced.api.cloudsourcedapi.Entity.User;
import io.cloudsourced.api.cloudsourcedapi.Persistence.ProjectRepository;

import java.util.List;
import java.util.Optional;

@org.springframework.stereotype.Service
public class ProjectService extends BaseService<Project, ProjectRepository>{


    private final UserService userService;

    public ProjectService(ProjectRepository repository, UserService userService) {
        super(repository);
        this.userService = userService;
    }

    public List<Project> searchProjectName(String name) {
        return repository.findByNameContainsIgnoreCase(name);
    }

    public Project saveProject(Project project) {
        return repository.save(project);
    }

    //TODO: This function is for development purposes only and needs to go when we can get the user from the session
    public Project saveWithUser(Long id, Project project) {
        User user = userService.getOneById(id); //.get();

        project.setUser(user);

        return repository.save(project);
    }

}
