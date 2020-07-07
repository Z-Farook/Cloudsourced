package io.cloudsourced.api.cloudsourcedapi.service;

import io.cloudsourced.api.cloudsourcedapi.Entity.Transaction;
import io.cloudsourced.api.cloudsourcedapi.Entity.User;
import io.cloudsourced.api.cloudsourcedapi.Persistence.TransactionRepository;
import io.cloudsourced.api.cloudsourcedapi.Service.TransactionService;
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
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class TransactionServiceTest {

    @InjectMocks
    private TransactionService transactionService;

    @Mock
    private TransactionRepository transactionRepository;

    @Test
    public void save() {
        //create object of transaction
        Transaction transaction = new Transaction();
        transaction.setPoints(12L);
        User user = new User();
        user.setName("Jhon Doe");
        transaction.setUser(user);

        //mocking the data returned from service
        when(transactionRepository.save(transaction)).thenReturn(transaction);
        Transaction savedTransaction = transactionService.save(transaction);
        assertEquals(transaction, savedTransaction);
        assertEquals(transaction.getPoints(), savedTransaction.getPoints());
        assertEquals(transaction.getUser().getName(), savedTransaction.getUser().getName());
        assertEquals("Jhon Doe", savedTransaction.getUser().getName());
    }

    @Test
    public void getAll() {
        List<Transaction> transactionList = new ArrayList<>();
        Transaction transaction1 = new Transaction();
        transaction1.setPoints(12L);
        User user = new User();
        user.setName("Jhon Doe");
        transaction1.setUser(user);

        Transaction transaction2 = new Transaction();
        User user1 = new User();
        user1.setName("Alex Doe");
        transaction1.setUser(user);

        transactionList.add(transaction1);
        transactionList.add(transaction2);

        when(transactionRepository.findAll()).thenReturn(transactionList);
        assertEquals(2, transactionService.getAll().size());
    }

    @Test
    public void getOneById() {
        Transaction transaction = new Transaction();
        transaction.setPoints(12L);
        User user = new User();
        user.setName("Jhon Doe");
        transaction.setUser(user);
        when(transactionRepository.findById(anyLong())).thenReturn(Optional.of(transaction));
        assertEquals(transaction, transactionService.getOneById(12L));
    }

    @Test
    public void deleteById() {

        Transaction transaction = new Transaction();
        transaction.setPoints(12L);
        User user = new User();
        user.setName("Jhon Doe");
        transaction.setUser(user);

        transactionService.delete(anyLong());
        verify(transactionRepository, times(1)).deleteById(anyLong());
    }
}
