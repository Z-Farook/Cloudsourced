package io.cloudsourced.api.cloudsourcedapi.resource;

import io.cloudsourced.api.cloudsourcedapi.API.DTO.Mapper.ProjectDetailMapper;
import io.cloudsourced.api.cloudsourcedapi.API.DTO.Mapper.ProjectMapper;
import io.cloudsourced.api.cloudsourcedapi.API.DTO.ProjectDTO;
import io.cloudsourced.api.cloudsourcedapi.API.DTO.ProjectDetailDTO;
import io.cloudsourced.api.cloudsourcedapi.API.Resource.ProjectResource;
import io.cloudsourced.api.cloudsourcedapi.Default.Authentication.AuthenticatedUserBean;
import io.cloudsourced.api.cloudsourcedapi.Entity.Project;
import io.cloudsourced.api.cloudsourcedapi.Entity.User;
import io.cloudsourced.api.cloudsourcedapi.Persistence.ProjectRepository;
import io.cloudsourced.api.cloudsourcedapi.Service.ProjectService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;


import javax.swing.text.html.Option;
import java.util.ArrayList;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ProjectResourceTests {

    Project project;
    ProjectDTO projectDto;
    ProjectDetailDTO projectDetailDto;
    User user ;

    @InjectMocks
    private ProjectResource resource;
    @Mock
    private ProjectService service;
    @Mock
    private ProjectMapper mapper;
    @Mock
    private ProjectDetailMapper detailMapper;

    @BeforeEach()
    public void init() {
        project = new Project();
        projectDto = new ProjectDTO();
        projectDetailDto = new ProjectDetailDTO();
        user = new User();
        project.setName("testProject");
        project.setDescription("test description");
        projectDto.setName("testProject");
        projectDto.setDescription("post description");
        projectDetailDto.setName("testProject");
        projectDetailDto.setDescription("get description");
        user.setName("username");
    }
    @Test
    public void testGetProjectByName(){

        when(service.getProjectDetailById(1L)).thenReturn(project);
        when(detailMapper.entityToDTO(project)).thenReturn(projectDetailDto);
        ProjectDetailDTO result = resource.getProjectDetailById(1);
        assertEquals(result.getDescription(), "get description") ;
    }
    @Test
    public void testCreateProject(){

        when(mapper.DTOToEntity(projectDto)).thenReturn(project);
        when(service.saveWithUser(project)).thenReturn(project);
        when(mapper.entityToDTO(project)).thenReturn(projectDto);
        ProjectDTO result = resource.createNew(projectDto);
        assertEquals(result.getDescription(), "post description") ;
    }
}
