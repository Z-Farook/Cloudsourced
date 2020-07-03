package io.cloudsourced.api.cloudsourcedapi.service;

import io.cloudsourced.api.cloudsourcedapi.Default.Authentication.AuthenticatedUserBean;
import io.cloudsourced.api.cloudsourcedapi.Entity.Feature;
import io.cloudsourced.api.cloudsourcedapi.Entity.Project;
import io.cloudsourced.api.cloudsourcedapi.Entity.User;
import io.cloudsourced.api.cloudsourcedapi.Persistence.FeatureRepository;
import io.cloudsourced.api.cloudsourcedapi.Persistence.UserRepository;
import io.cloudsourced.api.cloudsourcedapi.Service.FeatureService;
import io.cloudsourced.api.cloudsourcedapi.Service.ProjectService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class FeatureServiceTest {
    @InjectMocks
    private FeatureService featureService;

    @Mock
    private ProjectService projectService;

    @Mock
    AuthenticatedUserBean authenticatedUserProvider;

    @Mock
    private FeatureRepository featureRepository;

    @Mock
    private UserRepository userRepository;

    @Test
    public void createNewFeature() {
        User user = new User();
        user.setName("Jhon Doe");

        Project project = new Project();
        project.setName("Project1");
        project.setDescription("ProjectDescription");
        project.setImage("ImageUrl");
        project.setUser(user);

        Feature feature = new Feature();
        feature.setName("Feature1");
        feature.setCodeLanguage("JAVA");
        feature.setCodePreview("Good");
        feature.setDescription("Feature Description");
        //TODO when the Field "points" is added to dev the next line will be uncommented
        //        feature.setPoints(12L);
        feature.setProject(project);

        //mocking the data returned from service
        when(featureRepository.save(feature)).thenReturn(feature);
        Feature savedFeature = featureService.save(feature);
        assertEquals(feature, savedFeature);
        //TODO when the Field "points" is added to dev the next line will be uncommented
        //        assertEquals(feature.getPoints(), savedFeature.getPoints());
        assertEquals("JAVA", savedFeature.getCodeLanguage());
        assertEquals(feature.getName(), savedFeature.getName());
        assertEquals(feature.getProject().getName(), savedFeature.getProject().getName());
    }

    @Test
    public void getAllFeature() {
        List<Feature> featureList = new ArrayList<>();

        User user = new User();
        user.setName("Jhon Doe");

        Project project = new Project();
        project.setName("Project1");
        project.setDescription("ProjectDescription");
        project.setImage("ImageUrl");
        project.setUser(user);

        Feature feature1 = new Feature();
        feature1.setName("Feature1");
        feature1.setCodeLanguage("JAVA");
        feature1.setCodePreview("Good");
        feature1.setDescription("Feature Description");
        feature1.setProject(project);

        Feature feature2 = new Feature();
        feature2.setName("Featur2");
        feature2.setCodeLanguage("PHP");
        feature2.setCodePreview("Need Improvement");
        feature2.setDescription("Feature Description2");
        feature1.setProject(project);

        featureList.add(feature1);
        featureList.add(feature2);

        when(featureRepository.findAll()).thenReturn(featureList);

        List<Feature> features = featureService.getAll();
        assertEquals(2, features.size());
        assertEquals("JAVA", features.get(0).getCodeLanguage());
        assertEquals("PHP", features.get(1).getCodeLanguage());
    }

    @Test
    public void getOneFeatureById() {
        User user = new User();
        user.setName("Jhon Doe");

        Project project = new Project();
        project.setName("Project1");
        project.setDescription("ProjectDescription");
        project.setImage("ImageUrl");
        project.setUser(user);

        Feature feature = new Feature();
        feature.setName("Feature1");
        feature.setCodeLanguage("JAVA");
        feature.setCodePreview("Good");
        feature.setDescription("Feature Description");
        feature.setProject(project);

        when(featureRepository.findById(anyLong())).thenReturn(Optional.of(feature));
        Feature featureServiceOneById = featureService.getOneById(12L);
        assertEquals(feature.getName(), featureServiceOneById.getName());
        assertEquals(feature.getProject().getName(), featureServiceOneById.getProject().getName());
    }

    @Test
    public void addFeatureToProject() {
        User user = new User();
        user.setName("Test");

        Feature existingFeature = new Feature();
        existingFeature.setName("Feature Exist");
        existingFeature.setCodeLanguage("PHP");
        existingFeature.setCodePreview("Good");
        existingFeature.setDescription("Feature Description");

        List<Feature> featureList = new ArrayList<>();
        featureList.add(existingFeature);

        Project project = new Project();
        project.setName("Project1");
        project.setDescription("ProjectDescription");
        project.setImage("ImageUrl");
        project.setUser(user);
        project.setFeatures(featureList);

        Feature feature = new Feature();
        feature.setName("Feature1");
        feature.setCodeLanguage("JAVA");
        feature.setCodePreview("Good");
        feature.setDescription("Feature Description");
        feature.setProject(project);

        when(authenticatedUserProvider.GetUser()).thenReturn(user);
        when(featureRepository.save(feature)).thenReturn(feature);
        when(projectService.getOneById(user.getId())).thenReturn(project);

        Feature savedFeature = featureService.addFeatureToProject(user.getId(), feature);
        assertEquals(feature, savedFeature);
        assertEquals("JAVA", savedFeature.getCodeLanguage());
        assertEquals(feature.getName(), savedFeature.getName());
        assertEquals(feature.getProject().getName(), savedFeature.getProject().getName());
        assertEquals("PHP", feature.getProject().getFeatures().get(0).getCodeLanguage());
    }
}