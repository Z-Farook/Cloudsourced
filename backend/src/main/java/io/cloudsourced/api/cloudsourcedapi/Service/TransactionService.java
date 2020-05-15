package io.cloudsourced.api.cloudsourcedapi.Service;

import io.cloudsourced.api.cloudsourcedapi.Default.Exception.NotFoundException;
import io.cloudsourced.api.cloudsourcedapi.Entity.Transaction;
import io.cloudsourced.api.cloudsourcedapi.Entity.User;
import io.cloudsourced.api.cloudsourcedapi.Persistence.TransactionRepository;

import java.util.Optional;

@org.springframework.stereotype.Service
public class TransactionService extends BaseService<Transaction, TransactionRepository> {
    public TransactionService(TransactionRepository repository) {
        super(repository);
    }
}
