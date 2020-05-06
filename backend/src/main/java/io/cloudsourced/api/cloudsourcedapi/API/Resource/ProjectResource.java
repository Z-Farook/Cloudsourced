package io.cloudsourced.api.cloudsourcedapi.API.Resource;

import io.cloudsourced.api.cloudsourcedapi.Entity.Project;
import io.cloudsourced.api.cloudsourcedapi.Persistence.ProjectRepository;
import io.cloudsourced.api.cloudsourcedapi.Service.ProjectService;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/project/")
public class ProjectResource extends Resource<Project, ProjectService, ProjectRepository>{

    public ProjectResource(ProjectService service) {
        super(service);
    }

    @GetMapping("name/{name}")
    public Project FindOneByName(@PathVariable String name) {
        return service.findByName(name);
    }

    @PostMapping("{id}")
    public Project addWithUser(@PathVariable Long id, @RequestBody Project project) {
        return service.saveWithUser(id, project);
    }
}
