package io.cloudsourced.api.cloudsourcedapi.Service;

import io.cloudsourced.api.cloudsourcedapi.Entity.Project;
import io.cloudsourced.api.cloudsourcedapi.Entity.User;
import io.cloudsourced.api.cloudsourcedapi.Persistence.ProjectRepository;

import java.util.List;
import java.util.Optional;

@org.springframework.stereotype.Service
public class ProjectService extends Service<Project, ProjectRepository>{


    private final UserService userService;

    public ProjectService(ProjectRepository repository, UserService userService) {
        super(repository);
        this.userService = userService;
    }

    public Project findByName(String name) {
        Optional<Project> result = repository.findTopByName(name);
        if (result.isPresent()){
            return result.get();
        }

        return null;
    }

    public Project saveWithUser(Long id, Project project) {
        User user = userService.getOneById(id).get();

        project.setUser(user);

        return repository.save(project);
    }

}
