package io.cloudsourced.api.cloudsourcedapi.API.Resource;

import io.cloudsourced.api.cloudsourcedapi.Entity.Project;
import io.cloudsourced.api.cloudsourcedapi.Persistence.ProjectRepository;
import io.cloudsourced.api.cloudsourcedapi.Service.ProjectService;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/project/")
public class ProjectResource extends Resource<Project, ProjectService, ProjectRepository>{

    public ProjectResource(ProjectService service) {
        super(service);
    }

    @GetMapping("search/{name}")
    public List<Project> searchProjectName(@PathVariable String name) {

        return service.searchProjectName(name);
    }

    public Project addProject(@RequestBody Project project) {
        return service.saveProject(project);
    }

    // This function is for development purposes only and needs to go when we can get the user from the session
    @PostMapping("{id}")
    public Project addWithUser(@PathVariable Long id, @RequestBody Project project) {
        return service.saveWithUser(id, project);
    }
}
