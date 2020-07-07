package io.cloudsourced.api.cloudsourcedapi.service;

import io.cloudsourced.api.cloudsourcedapi.Default.Authentication.AuthenticatedUserBean;
import io.cloudsourced.api.cloudsourcedapi.Entity.Payment;
import io.cloudsourced.api.cloudsourcedapi.Entity.User;
import io.cloudsourced.api.cloudsourcedapi.Persistence.PaymentRepository;
import io.cloudsourced.api.cloudsourcedapi.Service.PaymentService;
import io.cloudsourced.api.cloudsourcedapi.Service.TransactionService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class PaymentServiceTest {

    @InjectMocks
    PaymentService paymentService;

    @Mock
    AuthenticatedUserBean authenticatedUserProvider;

    @Mock
    TransactionService transactionService;

    @Mock
    PaymentRepository paymentRepository;


    @Test
    public void paymentOfPoints() {
        User user = new User();
        user.setName("Test");
        when(authenticatedUserProvider.getUser()).thenReturn(user);
        when(transactionService.getPointsByUser(user.getId())).thenReturn(10L);
        when(paymentRepository.getPaidPoints(user.getId())).thenReturn(7L);

        Payment payment = new Payment();
        payment.setPaidPoints(3L);
        payment.setUser(user);

        when(paymentRepository.save(payment)).thenReturn(payment);
        Payment savedPayment = paymentService.paymentOfPoints(payment);
        assertEquals(payment, savedPayment);
        assertEquals(3L, savedPayment.getPaidPoints());
        assertEquals("Test", savedPayment.getUser().getName());
    }

}
