package io.cloudsourced.api.cloudsourcedapi.API.Resource;

import io.cloudsourced.api.cloudsourcedapi.API.DTO.Mapper.TransactionMapper;
import io.cloudsourced.api.cloudsourcedapi.API.DTO.TransactionDTO;
import io.cloudsourced.api.cloudsourcedapi.Default.Authentication.AuthenticatedUserBean;
import io.cloudsourced.api.cloudsourcedapi.Entity.Transaction;
import io.cloudsourced.api.cloudsourcedapi.Entity.User;
import io.cloudsourced.api.cloudsourcedapi.Persistence.TransactionRepository;
import io.cloudsourced.api.cloudsourcedapi.Service.TransactionService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/transaction")
public class TransactionResource extends BaseResource<Transaction, TransactionDTO, TransactionService, TransactionRepository, TransactionMapper> {


    public TransactionResource(TransactionService service, TransactionMapper mapper, AuthenticatedUserBean Authentication) {
        super(service, mapper, Authentication);
    }
}
