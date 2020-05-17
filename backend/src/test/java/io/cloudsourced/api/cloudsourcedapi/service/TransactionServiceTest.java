package io.cloudsourced.api.cloudsourcedapi.service;

import io.cloudsourced.api.cloudsourcedapi.Entity.Transaction;
import io.cloudsourced.api.cloudsourcedapi.Entity.User;
import io.cloudsourced.api.cloudsourcedapi.Service.TransactionService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class TransactionServiceTest {
    @Before
    public void setUp() throws Exception {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void save() {
        TransactionService transactionService = mock(TransactionService.class);
        //create object of transaction
        Transaction transaction = new Transaction();
        transaction.setId(1L);
        transaction.setPoints(12L);
        User user = new User();
        user.setId(1L);
        user.setName("Jhon Doe");
        transaction.setUser(user);

        //mocking the data returned from service
        when(transactionService.save(transaction)).thenReturn(transaction);
        assertEquals(transaction, transactionService.save(transaction));
    }

    @Test
    public void getAll() {
        TransactionService transactionService = mock(TransactionService.class);
        List<Transaction> transactionList = new ArrayList<>();
        Transaction transaction1 = new Transaction();
        transaction1.setId(1L);
        transaction1.setPoints(12L);
        User user = new User();
        user.setId(1L);
        user.setName("Jhon Doe");
        transaction1.setUser(user);

        Transaction transaction2 = new Transaction();
        transaction2.setId(2L);
        transaction2.setPoints(50L);
        User user1 = new User();
        user1.setId(2L);
        user1.setName("Alex Doe");
        transaction1.setUser(user);

        transactionList.add(transaction1);
        transactionList.add(transaction2);

        when(transactionService.getAll()).thenReturn(transactionList);
        assertEquals(2, transactionService.getAll().size());
    }

    @Test
    public void getOneById() {
        TransactionService transactionService = mock(TransactionService.class);

        Transaction transaction = new Transaction();
        transaction.setId(1L);
        transaction.setPoints(12L);
        User user = new User();
        user.setId(1L);
        user.setName("Jhon Doe");
        transaction.setUser(user);
        when(transactionService.getOneById(anyLong())).thenReturn(transaction);
        assertEquals(transaction, transactionService.getOneById(2L));
    }

    @Test
    public void deleteById() {
        TransactionService transactionService = mock(TransactionService.class);

        doNothing().when(transactionService).delete(anyLong());
        transactionService.delete(12L);
        verify(transactionService, times(1)).delete(12L);
    }
}
