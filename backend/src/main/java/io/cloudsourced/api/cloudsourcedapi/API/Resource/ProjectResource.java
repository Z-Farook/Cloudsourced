package io.cloudsourced.api.cloudsourcedapi.API.Resource;

import io.cloudsourced.api.cloudsourcedapi.API.DTO.Mapper.ProjectDetailMapper;
import io.cloudsourced.api.cloudsourcedapi.API.DTO.Mapper.ProjectMapper;
import io.cloudsourced.api.cloudsourcedapi.API.DTO.ProjectDTO;
import io.cloudsourced.api.cloudsourcedapi.API.DTO.ProjectDetailDTO;
import io.cloudsourced.api.cloudsourcedapi.API.DTO.ProjectPostDTO;
import io.cloudsourced.api.cloudsourcedapi.Entity.Project;
import io.cloudsourced.api.cloudsourcedapi.Persistence.ProjectRepository;
import io.cloudsourced.api.cloudsourcedapi.Service.ProjectService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/project")
public class ProjectResource extends BaseResource<Project, ProjectDTO, ProjectService, ProjectRepository, ProjectMapper>{

    private final ProjectDetailMapper detailMapper;
    public ProjectResource(ProjectService service, ProjectMapper mapper, ProjectDetailMapper detailMapper) {
        super(service, mapper);
        this.detailMapper = detailMapper;
    }

    @GetMapping("/search/{name}")
    public List<ProjectDTO> searchProjectName(@PathVariable String name) {
        return mapper.entityListToDtoList(service.searchProjectName(name));
    }

    @PostMapping("/test")
    public ProjectDTO add(@RequestBody ProjectDTO projectDTO) {
        return mapper.entityToDTO(service.saveWithUser(mapper.DTOToEntity(projectDTO)));
    }

    @GetMapping("/detail/{id}")
    public ProjectDetailDTO getProjectDetailById(@PathVariable long id){
        return detailMapper.entityToDTO(service.getProjectDetailById(id));
    }

    @GetMapping("/user")
    public List<ProjectDTO> getProjectsByUser(){
        return service.getProjectsByUser().stream().map(mapper::entityToDTO).collect(Collectors.toList());
    }
    @GetMapping("/profile/{id}")
    public List<ProjectDTO> getProjectsByUserId(@PathVariable long id){
        return service.getProjectsByUserId(id).stream().map(mapper::entityToDTO).collect(Collectors.toList());
    }
}
