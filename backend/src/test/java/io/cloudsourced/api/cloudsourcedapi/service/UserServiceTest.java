package io.cloudsourced.api.cloudsourcedapi.service;

import io.cloudsourced.api.cloudsourcedapi.Default.Exception.BadRequestException;
import io.cloudsourced.api.cloudsourcedapi.Default.Exception.NotFoundException;
import io.cloudsourced.api.cloudsourcedapi.Entity.User;
import io.cloudsourced.api.cloudsourcedapi.Persistence.UserRepository;
import io.cloudsourced.api.cloudsourcedapi.Service.UserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @InjectMocks
    UserService userService;

    @Mock
    UserRepository userRepository;

    @Mock
    PasswordEncoder passwordEncoder;

    @Test
    void giveEmailAlreadyExist_save_throwBadRequestException()
    {
        User user =new User();
        when(userRepository.findTopByEmail(user.getEmail())).thenReturn(Optional.of(user));

        Assertions.assertThrows(BadRequestException.class, () -> {
            userService.save(user);
        });
    }

    @Test
    void giveEmailThatDoesNotExist_save_ReturnUser()
    {
        User user = mock(User.class);
        when(userRepository.findTopByEmail(user.getEmail())).thenReturn(Optional.empty());
        when(userRepository.save(user)).thenReturn(user);
        when(user.getPassword()).thenReturn("password");
        when(passwordEncoder.encode("password")).thenReturn("password");
        assertEquals(user, userService.save(user));

    }

}

