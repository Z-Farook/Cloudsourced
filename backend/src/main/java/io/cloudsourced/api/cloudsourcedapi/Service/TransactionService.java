package io.cloudsourced.api.cloudsourcedapi.Service;

import io.cloudsourced.api.cloudsourcedapi.Default.Authentication.AuthenticatedUserBean;
import io.cloudsourced.api.cloudsourcedapi.Default.Exception.NotFoundException;
import io.cloudsourced.api.cloudsourcedapi.Entity.Transaction;
import io.cloudsourced.api.cloudsourcedapi.Entity.User;
import io.cloudsourced.api.cloudsourcedapi.Persistence.TransactionRepository;
import io.cloudsourced.api.cloudsourcedapi.Persistence.UserRepository;

import java.util.List;

@org.springframework.stereotype.Service
public class TransactionService extends BaseService<Transaction, TransactionRepository> {


    public TransactionService(TransactionRepository repository,  AuthenticatedUserBean authenticatedUserBean) {
        super(repository, authenticatedUserBean);
    }

    public List<Transaction> getTransactionForUser(User user) {

        if (null == user) {
            throw new NotFoundException("No user Found in Security context");
        }
        return repository.findByUser(user);
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
