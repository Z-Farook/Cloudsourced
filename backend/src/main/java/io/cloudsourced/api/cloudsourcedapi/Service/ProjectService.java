package io.cloudsourced.api.cloudsourcedapi.Service;

import io.cloudsourced.api.cloudsourcedapi.Default.Authentication.AuthenticatedUserBean;
import io.cloudsourced.api.cloudsourcedapi.Entity.Project;
import io.cloudsourced.api.cloudsourcedapi.Entity.User;
import io.cloudsourced.api.cloudsourcedapi.Persistence.ProjectRepository;

import java.util.List;
import java.util.Optional;

@org.springframework.stereotype.Service
public class ProjectService extends BaseService<Project, ProjectRepository>{

    private final UserService userService;

    public ProjectService(ProjectRepository repository, AuthenticatedUserBean authenticatedUserProvider, UserService userService) {
        super(repository, authenticatedUserProvider);
        this.userService = userService;
    }

    public List<Project> searchProjectName(String name) {
        return repository.findByNameContainsIgnoreCase(name);
    }

    public Project saveProject(Project project) {
        return repository.save(project);
    }

    public Project saveWithUser(Project project) {
        User user = authenticatedUserProvider.GetUser();

        List<Project> projects = user.getProjects();

        projects.add(project);
        user.setProjects(projects);

        project.setUser(user);

//        user.setProjects(user.getProjects().add(project));
//        user.getProjects().add(project);
//        userService.save(user);

        return repository.save(project);
    }
}
