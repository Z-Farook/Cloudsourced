package io.cloudsourced.api.cloudsourcedapi.service;

import io.cloudsourced.api.cloudsourcedapi.Default.Authentication.AuthenticatedUserBean;
import io.cloudsourced.api.cloudsourcedapi.Default.Exception.NotFoundException;
import io.cloudsourced.api.cloudsourcedapi.Entity.Project;
import io.cloudsourced.api.cloudsourcedapi.Entity.User;
import io.cloudsourced.api.cloudsourcedapi.Persistence.ProjectRepository;
import io.cloudsourced.api.cloudsourcedapi.Service.ProjectService;
import org.junit.Assert;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.runner.JUnitPlatform;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;


import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
@ExtendWith(MockitoExtension.class)
public class ProjectServiceTests {

    @InjectMocks
    private ProjectService projectService;

    @Mock
    private ProjectRepository projectRepository;

    @Mock
    AuthenticatedUserBean authenticatedUserProvider;

    @Test
    public void SearchProjectTestShouldFail(){
        String name = "failedProject";
        boolean failed = false;

        Project newProject = new Project();
        newProject.setName(name);
        newProject.setDescription("testDescription");
        newProject.setImage("image");
        newProject.setFeatures(null);
        List<Project> projectList = new ArrayList();
        projectList.add(newProject);

        when(projectRepository.findByNameContainsIgnoreCase(name)).thenReturn(projectList);
        List<Project> savedProjects = projectService.searchProjectName(name);
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
        assertEquals(savedProjects.size(), 1);
        Project foundProject = savedProjects.get(0);
        assertSame(foundProject, newProject);

    }

    @Test
    void givenUserAuthenticated_saveWithUser(){
        final Project project = new Project();

        when(authenticatedUserProvider.getUser()).thenReturn(new User());
        when(projectRepository.save(project)).thenReturn(project);

        assertEquals(project, projectService.saveWithUser(project));
    }

    @Test
    void givenNonExistingId_getProjectDetailById(){

        when(projectRepository.findById(1L)).thenReturn(Optional.empty());
        Assertions.assertThrows(NotFoundException.class, () -> {
            projectService.getProjectDetailById(1L);
        });
    }

    @Test
    void givenNUllgetArchivedAt_getProjectDetailById(){
        User AuthUserMock = mock(User.class);
        User OtherUserMock = mock(User.class);
        Project project = mock(Project.class);
        when(projectRepository.findById(1L)).thenReturn(Optional.of(project));
        when(authenticatedUserProvider.getUser()).thenReturn(AuthUserMock);

        when(project.getArchivedAt()).thenReturn(Instant.now());
        when(AuthUserMock.getId()).thenReturn(1L);
        when(OtherUserMock.getId()).thenReturn(2L);
        when(project.getUser()).thenReturn(OtherUserMock);

        Assertions.assertThrows(NotFoundException.class, () -> {
            projectService.getProjectDetailById(1L);
        });
    }

    @Test
    void givenValidId_getProjectDetailById(){
        User AuthUserMock = mock(User.class);
        Project project = mock(Project.class);
        when(projectRepository.findById(1L)).thenReturn(Optional.of(project));
        when(authenticatedUserProvider.getUser()).thenReturn(AuthUserMock);

        when(project.getArchivedAt()).thenReturn(Instant.now());
        when(AuthUserMock.getId()).thenReturn(1L);
        when(project.getUser()).thenReturn(AuthUserMock);

        assertEquals(project, projectService.getProjectDetailById(1L));

    }

    @Test
    void getAll_test(){
        List<Project> lp = new ArrayList<Project>();
        when(projectRepository.getAllUnfinished()).thenReturn(lp);
        assertEquals(lp, projectService.getAll());

    }

    @Test
    void getAllByAuthenticatedUser_test(){
        List<Project> lp = new ArrayList<Project>();
        User user = new User();
        when(authenticatedUserProvider.getUser()).thenReturn(user);
        when(projectRepository.findByUser(user)).thenReturn(lp);
        assertEquals(lp, projectService.getProjectsByUser());
    }

    @Test
    void getAllByUserId_test(){
        List<Project> lp = new ArrayList<Project>();
       when(projectRepository.byUserId(1L)).thenReturn(lp);
       assertEquals(lp, projectService.getProjectsByUserId(1L));
    }

    @Test
    void finishProject_test(){
        Project p = mock(Project.class);
        when(projectRepository.save(p)).thenReturn(p);
        assertEquals(p, projectService.finishProject(p));
    }

    @Test
    void archiveProject_test(){
        Project p = mock(Project.class);
        when(projectRepository.save(p)).thenReturn(p);
        assertEquals(p, projectService.archiveProject(p));
    }

}
