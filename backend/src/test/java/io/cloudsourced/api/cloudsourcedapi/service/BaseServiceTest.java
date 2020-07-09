package io.cloudsourced.api.cloudsourcedapi.service;

import io.cloudsourced.api.cloudsourcedapi.Default.Exception.NotFoundException;
import io.cloudsourced.api.cloudsourcedapi.Default.Exception.UnauthorizedException;
import io.cloudsourced.api.cloudsourcedapi.Entity.Authentication;
import io.cloudsourced.api.cloudsourcedapi.Service.BaseService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

class mockEntity{
    public Long id;
    public String string;

    mockEntity(Long id, String string){
        this.id = id;
        this.string = string;
    }
}
@ExtendWith(MockitoExtension.class)
public class BaseServiceTest {

    @Mock
    private JpaRepository<mockEntity, Long> repository;

    @InjectMocks
    private BaseService<mockEntity, JpaRepository<mockEntity, Long>> baseService;


    @Test
    void givenInvalidId_getOneById_throwNotFoundException() {
        // given

        // when
        when(repository.findById(2L)).thenReturn(Optional.empty());
        // then

        Throwable exception = assertThrows(NotFoundException.class,
                () -> baseService.getOneById(2L));
        assertEquals(null, exception.getMessage());
    }

    @Test
    void givenValidId_getOneById_returnString() {
        // given
        mockEntity entity = new mockEntity(1l, "string");
        when(repository.findById(1L)).thenReturn(Optional.of(entity));
        // when
        final mockEntity result = baseService.getOneById(1L);
        // then
        assertEquals(entity, result);
    }

    
    @Test
    void givenEmptyDB_getAll_returnEmptyList() {
        //when
        when(repository.findAll()).thenReturn(new ArrayList<mockEntity>());
        final List<mockEntity> result = baseService.getAll();
        // then
        assertEquals(new ArrayList<mockEntity>(), result);
        //return repository.findAll();
    }
    @Test
    void givenRowsInDB_getAll_returnList() {
        final List<mockEntity> ExpectedResult = new ArrayList<mockEntity>();
        ExpectedResult.add(new mockEntity(1l, "string"));
        //when
        when(repository.findAll()).thenReturn(ExpectedResult);
        final List<mockEntity> result = baseService.getAll();
        // then
        assertEquals(ExpectedResult, result);
        //return repository.findAll();
    }

    @Test
    void givenNewEntity_save_expectSave() {
        final mockEntity e = new mockEntity(1l, "string");

        when(repository.save(e)).thenReturn(e);
        final mockEntity result = baseService.save(e);
        assertEquals(e, result);
        //return repository.save(post);
    }
}
