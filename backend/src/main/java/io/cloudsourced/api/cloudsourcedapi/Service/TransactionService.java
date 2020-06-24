package io.cloudsourced.api.cloudsourcedapi.Service;

import io.cloudsourced.api.cloudsourcedapi.Default.Authentication.AuthenticatedUserBean;
import io.cloudsourced.api.cloudsourcedapi.Entity.Transaction;
import io.cloudsourced.api.cloudsourcedapi.Persistence.TransactionRepository;

@org.springframework.stereotype.Service
public class TransactionService extends BaseService<Transaction, TransactionRepository> {
    public TransactionService(TransactionRepository repository, AuthenticatedUserBean authenticatedUserProvider) {
        super(repository, authenticatedUserProvider);
    }
    /**
     * This is used in paymentService to get points for user
     *
     * @return long points
     */
    public long getPointsByUser(Long userId) {
        return repository.findPoints(userId);
    }
}
