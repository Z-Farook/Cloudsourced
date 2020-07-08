package io.cloudsourced.api.cloudsourcedapi;

import io.cloudsourced.api.cloudsourcedapi.Entity.Project;
import io.cloudsourced.api.cloudsourcedapi.Persistence.ProjectRepository;
import io.cloudsourced.api.cloudsourcedapi.Service.ProjectService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.runner.JUnitPlatform;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;


import java.util.ArrayList;
import java.util.List;


import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;
@ExtendWith(MockitoExtension.class)
public class ProjectServiceTests {
    Project newProject;
    List<Project> projectList;
    @InjectMocks
    private ProjectService projectService;

    @Mock
    private ProjectRepository projectRepository;

    @BeforeEach
    public void init(){
        newProject = new Project();
        newProject.setName("ProjectName");
        newProject.setDescription("testDescription");
        newProject.setImage("image");
        newProject.setFeatures(null);
        projectList = new ArrayList();
        projectList.add(newProject);
    }
    @Test
    public void SearchProjectTestShouldFail(){
        boolean failed = false;
        when(projectRepository.findByNameContainsIgnoreCase("ProjectName")).thenReturn(projectList);
        List<Project> savedProjects = projectService.searchProjectName("ProjectName");
        try {
            // allow test case to execute
            assertEquals(savedProjects.size(), 0);
        } catch (Throwable exception) {
            failed = true;
        }
        assertTrue(failed);
    }

    @Test
    public void SearchProjectTest(){
        when(projectRepository.findByNameContainsIgnoreCase("ProjectName")).thenReturn(projectList);
        List<Project> savedProjects = projectService.searchProjectName("ProjectName");
        assertEquals(savedProjects.size(), 1);
        Project foundProject = savedProjects.get(0);
        assertSame(foundProject, newProject);

    }



}
