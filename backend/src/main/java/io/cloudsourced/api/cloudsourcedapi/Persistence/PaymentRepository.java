package io.cloudsourced.api.cloudsourcedapi.Persistence;

import io.cloudsourced.api.cloudsourcedapi.Entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PaymentRepository extends JpaRepository<Payment, Long>{

    @Query("SELECT SUM(payment.paidPoints) FROM Payment payment where payment.user.id =:userId")
    Long getPaidPoints(Long userId);
}
