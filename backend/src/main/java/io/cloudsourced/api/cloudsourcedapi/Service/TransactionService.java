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

    public User getUserById(Long transactionId) {
        Optional<Transaction> transaction = repository.findById(transactionId);
        if (!transaction.isPresent()) {
            throw new NotFoundException("Transaction id is not found: " + transactionId);
        }
        if (null == transaction.get().getUser()) {
            throw new NotFoundException("Transaction id: " + transactionId + " does not have any user");
        }
        return transaction.get().getUser();
    }
}
