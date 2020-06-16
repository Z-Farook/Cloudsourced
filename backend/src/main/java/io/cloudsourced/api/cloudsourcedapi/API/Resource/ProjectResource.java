package io.cloudsourced.api.cloudsourcedapi.API.Resource;

import io.cloudsourced.api.cloudsourcedapi.API.DTO.Mapper.ProjectMapper;
import io.cloudsourced.api.cloudsourcedapi.API.DTO.ProjectDTO;
import io.cloudsourced.api.cloudsourcedapi.Default.Authentication.AuthenticatedUserBean;
import io.cloudsourced.api.cloudsourcedapi.Entity.Project;
import io.cloudsourced.api.cloudsourcedapi.Persistence.ProjectRepository;
import io.cloudsourced.api.cloudsourcedapi.Service.ProjectService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/project")
public class ProjectResource extends BaseResource<Project, ProjectDTO, ProjectService, ProjectRepository, ProjectMapper>{


    public ProjectResource(ProjectService service, ProjectMapper mapper, AuthenticatedUserBean Authentication) {
        super(service, mapper, Authentication);
    }

    @GetMapping("/search/{name}")
    public List<ProjectDTO> searchProjectName(@PathVariable String name) {
        return mapper.entityListToDtoList(service.searchProjectName(name));
    }
    
    @Override
    public ProjectDTO createNew(@RequestBody ProjectDTO projectDTO) {
        return mapper.entityToDTO(service.saveWithUser(authenticatedUserProvider.GetUser().getId(), mapper.DTOToEntity(projectDTO)));
    }
}
