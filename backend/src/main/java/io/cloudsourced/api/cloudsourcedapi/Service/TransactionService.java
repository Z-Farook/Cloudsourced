package io.cloudsourced.api.cloudsourcedapi.Service;

import io.cloudsourced.api.cloudsourcedapi.Default.Authentication.AuthenticatedUserBean;
import io.cloudsourced.api.cloudsourcedapi.Default.Exception.NotFoundException;
import io.cloudsourced.api.cloudsourcedapi.Entity.Transaction;
import io.cloudsourced.api.cloudsourcedapi.Entity.User;
import io.cloudsourced.api.cloudsourcedapi.Persistence.TransactionRepository;
import io.cloudsourced.api.cloudsourcedapi.Persistence.UserRepository;

import java.util.List;
import java.util.Optional;

@org.springframework.stereotype.Service
public class TransactionService extends BaseService<Transaction, TransactionRepository> {

    private final UserRepository userRepository;

    public TransactionService(TransactionRepository repository, UserRepository userRepository, AuthenticatedUserBean authenticatedUserBean) {
        super(repository, authenticatedUserBean);
        this.userRepository = userRepository;
    }

    public List<Transaction> getTransactionForUser(Long userId) {
        Optional<User> user = userRepository.findById(userId);

        if (!user.isPresent()) {
            throw new NotFoundException("No user Found with userId: " + userId);
        }
        return repository.findByUser(user.get());
    }
}
