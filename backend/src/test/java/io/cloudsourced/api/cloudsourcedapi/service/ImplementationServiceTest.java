package io.cloudsourced.api.cloudsourcedapi.service;

import io.cloudsourced.api.cloudsourcedapi.Default.Authentication.AuthenticatedUserBean;
import io.cloudsourced.api.cloudsourcedapi.Entity.Feature;
import io.cloudsourced.api.cloudsourcedapi.Entity.Implementation;
import io.cloudsourced.api.cloudsourcedapi.Entity.User;
import io.cloudsourced.api.cloudsourcedapi.Persistence.ImplementationRepository;
import io.cloudsourced.api.cloudsourcedapi.Service.FeatureService;
import io.cloudsourced.api.cloudsourcedapi.Service.ImplementationService;
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
public class ImplementationServiceTest {

    @InjectMocks
    ImplementationService implementationService;

    @Mock
    ImplementationRepository implementationRepository;

    @Mock
    AuthenticatedUserBean authenticatedUserProvider;

    @Mock
    FeatureService featureService;

    @Test
    public void createNewImplementation() {
        User user = new User();
        user.setName("Jhon Doe");

        Implementation implementation = new Implementation();
        implementation.setCode("<br>Ram</br>");

        Feature feature = new Feature();
        feature.setName("Feature1");
        feature.setCodeLanguage("JAVA");
        feature.setCodePreview("Good");
        feature.setDescription("Feature Description");
        feature.setPoints(12L);

        implementation.setFeature(feature);
        implementation.setUser(user);

        //mocking the data returned from service
        when(implementationRepository.save(implementation)).thenReturn(implementation);
        Implementation savedImplementation = implementationService.save(implementation);
        assertEquals(implementation, savedImplementation);
        assertEquals(implementation.getCode(), savedImplementation.getCode());
        assertEquals(implementation.getUser().getName(), savedImplementation.getUser().getName());
        assertEquals(implementation.getFeature().getCodeLanguage(), savedImplementation.getFeature().getCodeLanguage());
    }

    @Test
    public void getAllFeatureImplementation() {

        User user = new User();
        user.setName("Jhon Doe");
        List<Implementation> implementationList = new ArrayList<>();

        Feature feature = new Feature();
        feature.setName("Feature1");
        feature.setCodeLanguage("JAVA");
        feature.setCodePreview("Good");
        feature.setDescription("Feature Description");
        feature.setPoints(12L);

        Implementation implementation1 = new Implementation();
        implementation1.setCode("<br>Ram</br>");
        implementation1.setFeature(feature);
        implementation1.setUser(user);

        Implementation implementation2 = new Implementation();
        implementation2.setCode("<br>Shyam</br>");
        implementation2.setFeature(feature);
        implementation2.setUser(user);


        implementationList.add(implementation1);
        implementationList.add(implementation2);

        when(implementationRepository.findAll()).thenReturn(implementationList);

        List<Implementation> implementations = implementationService.getAll();
        assertEquals(2, implementations.size());
        assertEquals("<br>Ram</br>", implementations.get(0).getCode());
        assertEquals("<br>Shyam</br>", implementations.get(1).getCode());
        assertEquals(user.getName(), implementations.get(1).getUser().getName());
    }

    @Test
    public void getOneFeatureById() {
        User user = new User();
        user.setName("Jhon Doe");

        Feature feature = new Feature();
        feature.setName("Feature1");
        feature.setCodeLanguage("JAVA");
        feature.setCodePreview("Good");
        feature.setDescription("Feature Description");
        feature.setPoints(12L);

        Implementation implementation = new Implementation();
        implementation.setCode("<br>Ram</br>");
        implementation.setFeature(feature);
        implementation.setUser(user);

        when(implementationRepository.findById(anyLong())).thenReturn(Optional.of(implementation));
        Implementation implementationById = implementationService.getOneById(12L);
        assertEquals(implementation.getCode(), implementationById.getCode());
        assertEquals(implementation.getFeature().getCodeLanguage(), implementationById.getFeature().getCodeLanguage());
        assertEquals(implementation.getUser().getName(), implementationById.getUser().getName());
    }

    @Test
    public void addImplementationToFeature(){
        User user = new User();
        user.setName("Jhon Doe");

        Feature existingFeature = new Feature();
        existingFeature.setName("Feature1");
        existingFeature.setCodeLanguage("PHP");
        existingFeature.setCodePreview("Good");
        existingFeature.setDescription("Feature Description");
        existingFeature.setPoints(12L);

        Implementation existingImplementation = new Implementation();
        existingImplementation.setCode("<p>Hello</p>");
        existingImplementation.setFeature(existingFeature);

        List<Implementation> exiting = new ArrayList<>();
        exiting.add(existingImplementation);

        Feature feature = new Feature();
        feature.setName("Feature1");
        feature.setCodeLanguage("JAVA");
        feature.setCodePreview("Good");
        feature.setDescription("Feature Description");
        feature.setPoints(12L);
//        feature.setImplementations(exiting);

        Implementation implementation = new Implementation();
        implementation.setCode("<br>Ram</br>");
        implementation.setFeature(feature);


        when(authenticatedUserProvider.getUser()).thenReturn(user);
        when(featureService.getOneById(user.getId())).thenReturn(feature);
        when(implementationRepository.save(implementation)).thenReturn(implementation);

        Implementation savedImplementation = implementationService.addImplementationToFeature(user.getId(),implementation);
        assertEquals(implementation, savedImplementation);
        assertEquals(implementation.getCode(), savedImplementation.getCode());
        assertEquals(implementation.getUser().getName(), savedImplementation.getUser().getName());
        assertEquals(implementation.getFeature().getCodeLanguage(), savedImplementation.getFeature().getCodeLanguage());
//        assertEquals(implementation.getFeature().getImplementations().get(0).getCode(), savedImplementation.getFeature().getImplementations().get(0).getCode());
//        assertEquals("PHP", savedImplementation.getFeature().getImplementations().get(0).getFeature().getCodeLanguage());

    }

}
