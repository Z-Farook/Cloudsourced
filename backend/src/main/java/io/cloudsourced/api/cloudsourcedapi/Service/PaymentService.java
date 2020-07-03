package io.cloudsourced.api.cloudsourcedapi.Service;

import io.cloudsourced.api.cloudsourcedapi.Default.Authentication.AuthenticatedUserBean;
import io.cloudsourced.api.cloudsourcedapi.Default.Exception.NotFoundException;
import io.cloudsourced.api.cloudsourcedapi.Entity.Payment;
import io.cloudsourced.api.cloudsourcedapi.Entity.User;
import io.cloudsourced.api.cloudsourcedapi.Persistence.PaymentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

@Service
public class PaymentService extends BaseService<Payment, PaymentRepository> {

    private final TransactionService transactionService;

    public PaymentService(PaymentRepository repository, TransactionService transactionService, AuthenticatedUserBean authenticatedUserBean) {
        super(repository, authenticatedUserBean);
        this.transactionService = transactionService;
    }

    @Transactional
    public Payment paymentOfPoints(Payment payment) {
        User user = authenticatedUserProvider.GetUser();

        if (user == null) {
            throw new NotFoundException("User is Not found");
        }

        long totalPoints = transactionService.getPointsByUser(user.getId());
        Long totalPaidPoints = repository.getPaidPoints(user.getId());

        if (Objects.isNull(totalPaidPoints)) {
            totalPaidPoints = Long.valueOf(0);
        }

        if (payment.getPaidPoints() > totalPoints - totalPaidPoints) {
            throw new IllegalArgumentException("Requested points are greater than your total points.");
        }

        payment.setUser(user);
        payment.setPaidPoints(payment.getPaidPoints());
        return repository.save(payment);
    }

}


