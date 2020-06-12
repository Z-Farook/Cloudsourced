package io.cloudsourced.api.cloudsourcedapi.API.Resource;

import io.cloudsourced.api.cloudsourcedapi.API.DTO.Mapper.ProjectMapper;
import io.cloudsourced.api.cloudsourcedapi.API.DTO.ProjectDTO;
import io.cloudsourced.api.cloudsourcedapi.Entity.Project;
import io.cloudsourced.api.cloudsourcedapi.Persistence.ProjectRepository;
import io.cloudsourced.api.cloudsourcedapi.Service.ProjectService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/project")
public class ProjectResource extends BaseResource<Project, ProjectDTO, ProjectService, ProjectRepository, ProjectMapper>{

    public ProjectResource(ProjectService service, ProjectMapper mapper) {
        super(service, mapper);
    }

    @GetMapping("/search/{name}")
    public List<ProjectDTO> searchProjectName(@PathVariable String name) {
        return mapper.entityListToDtoList(service.searchProjectName(name));
    }

    @PostMapping("/test")
    public ProjectDTO add( @RequestBody Project project) {
        return mapper.entityToDTO(service.saveWithUser(project));
    }
}
