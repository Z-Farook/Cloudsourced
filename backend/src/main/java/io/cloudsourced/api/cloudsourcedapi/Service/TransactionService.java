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
//        when the transaction doesn't exist
        if (!transaction.isPresent()) {
            throw new NotFoundException("Transaction id is not found: " + transactionId);
        }
//        when the transaction doesn't have any user in it
        if (null == transaction.get().getUser()) {
            throw new NotFoundException("Transaction id: " + transactionId + " does not have any user");
        }
        // Lambok getter *getUser()*
        return transaction.get().getUser();
    }
}
