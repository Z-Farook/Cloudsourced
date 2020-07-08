package io.cloudsourced.api.cloudsourcedapi.service;

import io.cloudsourced.api.cloudsourcedapi.Default.Exception.NotFoundException;
import io.cloudsourced.api.cloudsourcedapi.Entity.Implementation;
import io.cloudsourced.api.cloudsourcedapi.Entity.Transaction;
import io.cloudsourced.api.cloudsourcedapi.Entity.User;
import io.cloudsourced.api.cloudsourcedapi.Persistence.TransactionRepository;
import io.cloudsourced.api.cloudsourcedapi.Service.TransactionService;
import org.junit.jupiter.api.Assertions;
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
    void givenUserIsNull_getTransactionForUser_throwNotFoundException()
    {
        Assertions.assertThrows(NotFoundException.class, () -> {
            transactionService.getTransactionForUser(null);
        });
    }

    @Test
    void givenUser_getTransactionForUser_returnListTransactions()
    {
        User u = new User();
        List<Transaction> lt = new ArrayList<Transaction>();
        when(transactionRepository.findByUser(u)).thenReturn(lt);

        assertEquals(lt, transactionService.getTransactionForUser(u));
    }


}
