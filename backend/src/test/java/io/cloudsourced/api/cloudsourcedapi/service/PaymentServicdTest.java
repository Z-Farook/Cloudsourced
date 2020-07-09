package io.cloudsourced.api.cloudsourcedapi.service;

import io.cloudsourced.api.cloudsourcedapi.Default.Authentication.AuthenticatedUserBean;
import io.cloudsourced.api.cloudsourcedapi.Default.Exception.NotFoundException;
import io.cloudsourced.api.cloudsourcedapi.Default.Exception.UnauthorizedException;
import io.cloudsourced.api.cloudsourcedapi.Entity.Payment;
import io.cloudsourced.api.cloudsourcedapi.Entity.User;
import io.cloudsourced.api.cloudsourcedapi.Persistence.PaymentRepository;
import io.cloudsourced.api.cloudsourcedapi.Service.PaymentService;
import io.cloudsourced.api.cloudsourcedapi.Service.TransactionService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Objects;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class PaymentServicdTest {

    @InjectMocks
    private PaymentService paymentService;

    @Mock
    private PaymentRepository paymentRepository;

    @Mock
    private AuthenticatedUserBean authenticatedUserProvider;

    @Mock
    private TransactionService transactionService;

    @Test
    void giveUserNotAuthenticated_PaymentOfPoints_throwUnAuthorizedException(){
        Payment Payment = mock(Payment.class);
        when(authenticatedUserProvider.getUser()).thenReturn(null);

        Assertions.assertThrows(UnauthorizedException.class, () -> {
            paymentService.paymentOfPoints(Payment);
        });
    }

    @Test
    public void giveAuthenticatedPaidIsLessThanAvailable_PaymentOfPoints_throwIllegalArgument() {
        User user = mock(User.class);
        Payment payment = mock(Payment.class);
        when(authenticatedUserProvider.getUser()).thenReturn(user);
        when(user.getId()).thenReturn(1L);
        when(transactionService.getPointsByUser(user.getId())).thenReturn(100L);
        when(paymentRepository.getPaidPoints(user.getId())).thenReturn(60L);

        when(payment.getPaidPoints()).thenReturn(60L);


        Throwable exception = assertThrows(IllegalArgumentException.class,
                () -> paymentService.paymentOfPoints(payment));
        assertEquals("Requested points are greater than your total points.", exception.getMessage());

    }


    @Test
    public void giveEverythingOK_PaymentOfPoints_ReturnPayment() {
        User user = mock(User.class);
        Payment payment = mock(Payment.class);
        when(authenticatedUserProvider.getUser()).thenReturn(user);
        when(user.getId()).thenReturn(1L);
        when(transactionService.getPointsByUser(user.getId())).thenReturn(100L);
        when(paymentRepository.getPaidPoints(user.getId())).thenReturn(60L);

        when(payment.getPaidPoints()).thenReturn(30L);
        when(paymentRepository.save(payment)).thenReturn(payment);

        assertEquals(payment, paymentService.paymentOfPoints(payment));
    }




}
