package io.cloudsourced.api.cloudsourcedapi.API.Resource;


import io.cloudsourced.api.cloudsourcedapi.API.DTO.Mapper.PaymentMapper;
import io.cloudsourced.api.cloudsourcedapi.API.DTO.PaymentDTO;
import io.cloudsourced.api.cloudsourcedapi.Entity.Payment;
import io.cloudsourced.api.cloudsourcedapi.Service.PaymentService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/payment")
public class PaymentResource {

    private final PaymentService service;
    private final PaymentMapper paymentMapper;

    public PaymentResource(PaymentService service, PaymentMapper paymentMapper) {
        this.paymentMapper = paymentMapper;
        this.service =service;
    }

    /**
     * Add payment by using an User's id
     * @param paymentDTO
     * @return
     */
    @PostMapping("/user")
    public PaymentDTO userPayment(@RequestBody PaymentDTO paymentDTO ) {
        Payment payment = paymentMapper.DTOToEntity(paymentDTO);
        return paymentMapper.entityToDTO(service.paymentOfPoints(payment));
    }
}
