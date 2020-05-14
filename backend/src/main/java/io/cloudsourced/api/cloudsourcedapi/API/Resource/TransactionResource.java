package io.cloudsourced.api.cloudsourcedapi.API.Resource;

import io.cloudsourced.api.cloudsourcedapi.Entity.Transaction;
import io.cloudsourced.api.cloudsourcedapi.Entity.User;
import io.cloudsourced.api.cloudsourcedapi.Persistence.TransactionRepository;
import io.cloudsourced.api.cloudsourcedapi.Service.TransactionService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/transaction")
public class TransactionResource extends BaseResource<Transaction, TransactionService, TransactionRepository> {

    public TransactionResource(TransactionService service) {
        super(service);
    }

    @GetMapping("/user/{id}")
    public User findUserByTransactionId(@PathVariable Long id) {
        return this.service.getUserById(id);
    }

}
