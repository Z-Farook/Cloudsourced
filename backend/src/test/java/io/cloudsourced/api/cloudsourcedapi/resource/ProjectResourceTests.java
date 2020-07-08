package io.cloudsourced.api.cloudsourcedapi.resource;

import io.cloudsourced.api.cloudsourcedapi.API.DTO.Mapper.ProjectMapper;
import io.cloudsourced.api.cloudsourcedapi.API.DTO.ProjectDetailDTO;
import io.cloudsourced.api.cloudsourcedapi.API.Resource.ProjectResource;
import io.cloudsourced.api.cloudsourcedapi.Entity.Project;
import io.cloudsourced.api.cloudsourcedapi.Persistence.ProjectRepository;
import io.cloudsourced.api.cloudsourcedapi.Service.ProjectService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;


import java.util.ArrayList;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ProjectResourceTests {
    @Mock
    private ProjectRepository mockRepository;
    @InjectMocks
    ProjectService service;

    @Autowired
    private ProjectResource resource;

    @BeforeEach
    public void init() {

        Project project = new Project();
        project.setName("testProject");
        project.setDescription("test description");
        ArrayList list = new ArrayList();
        when(mockRepository.findById(1L)).thenReturn(Optional.of(project));

    }
    @Test
    public void testGetProjectByName(){
        ProjectDetailDTO result = resource.getProjectDetailById(1);
        assertEquals(result.getDescription(), "test description") ;
    }
}
