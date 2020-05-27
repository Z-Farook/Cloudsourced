package io.cloudsourced.api.cloudsourcedapi;

import io.cloudsourced.api.cloudsourcedapi.Entity.Project;
import io.cloudsourced.api.cloudsourcedapi.Persistence.ProjectRepository;
import io.cloudsourced.api.cloudsourcedapi.Service.ProjectService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.runner.JUnitPlatform;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;


import java.util.ArrayList;
import java.util.List;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.mockito.Mockito.when;
@ExtendWith(MockitoExtension.class)
@RunWith(JUnitPlatform.class)
public class ProjectServiceTests {

    @InjectMocks
    private ProjectService projectService;

    @Mock
    private ProjectRepository projectRepository;


    @Test
    public void searchProjectTest(){
        String name = "newProject";
        Project newProject = new Project();
        newProject.setName(name);
        newProject.setDescription("testDescription");
        newProject.setImage("image");
        newProject.setFeatures(null);
        List<Project> projectList = new ArrayList();
        projectList.add(newProject);

        when(projectRepository.findByNameContainsIgnoreCase(name)).thenReturn(projectList);
        List<Project> savedProjects = projectService.searchProjectName(name);

        Project   foundProject = savedProjects.get(0);
        assertSame(foundProject, newProject);
        assertEquals(savedProjects.size(), 1);
    }
}
