package io.cloudsourced.api.cloudsourcedapi.API.Resource;

import io.cloudsourced.api.cloudsourcedapi.API.DTO.Mapper.TransactionMapper;
import io.cloudsourced.api.cloudsourcedapi.API.DTO.TransactionDTO;
import io.cloudsourced.api.cloudsourcedapi.Default.Authentication.AuthenticatedUserBean;
import io.cloudsourced.api.cloudsourcedapi.Entity.User;
import io.cloudsourced.api.cloudsourcedapi.Service.TransactionService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/transaction")
public class TransactionResource {

    private final TransactionService service;
    private final TransactionMapper transactionMapper;
    public final AuthenticatedUserBean authenticatedUserProvider;

    public TransactionResource(TransactionService service, TransactionMapper transactionMapper, AuthenticatedUserBean authenticatedUserProvider) {
        this.service = service;
        this.transactionMapper = transactionMapper;
        this.authenticatedUserProvider = authenticatedUserProvider;
    }

    /**
     * Fetch all the Transactions related to User X
     * @param /user
     * @return
     */
    @GetMapping("/user")
    public List<TransactionDTO> getAllTransactionForAUser() {
        User user = authenticatedUserProvider.GetUser();
        return  transactionMapper.entityListToDtoList( service.getTransactionForUser(user));
    }
}
