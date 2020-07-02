package io.cloudsourced.api.cloudsourcedapi.Persistence;

import io.cloudsourced.api.cloudsourcedapi.Entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    @Query("SELECT SUM(transacton.points) FROM Transaction transacton where transacton.user.id =:userId")
    long findPoints(Long userId);
}
