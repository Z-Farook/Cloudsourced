package io.cloudsourced.api.cloudsourcedapi;

import io.cloudsourced.api.cloudsourcedapi.Default.Authentication.AuthenticationProvider;
import io.cloudsourced.api.cloudsourcedapi.Default.Exception.UnauthorizedException;
import io.cloudsourced.api.cloudsourcedapi.Entity.Authentication;
import io.cloudsourced.api.cloudsourcedapi.Entity.User;
import io.cloudsourced.api.cloudsourcedapi.Persistence.AuthenticationRepository;
import io.cloudsourced.api.cloudsourcedapi.Persistence.UserRepository;
import org.junit.Rule;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.runner.JUnitPlatform;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.naming.NameNotFoundException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Optional;

import static org.junit.Assert.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
@RunWith(JUnitPlatform.class)

@SpringBootTest
public class AuthenticationProviderTest {

    @InjectMocks
    private AuthenticationProvider authenticationProvider;

    @Spy
    private UserRepository userRepository;

    @Spy
    private AuthenticationRepository authenticationRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @BeforeEach
    void setup() {
        initMocks(this);
    }

    @Test
    void GivenAnInvalidToken_WhenValidateToken_ShouldReturnFalse(){
        // given
        final var token = "";
        // when
        final var actual = authenticationProvider.validateToken(token);
        // then
        assertEquals(false, actual);

    }

    @Test
    void GivenAnValidToken_WhenValidateToken_ShouldReturnTrue(){
        final String token = "123-test-token";
        // given
        Authentication authentication = new Authentication();
        authentication.setToken(token);
        authentication.setExpireDate(Instant.now().plus(5, ChronoUnit.MINUTES));

        when(authenticationRepository.findTopByToken(token)).thenReturn(Optional.of(authentication));
        // when
        final var actual = authenticationProvider.validateToken(token);
        // then
        assertEquals(true, actual);
    }

    @Test
    void GivenAnInvalidUsernameAndPassword_whenGetAuthentication_ShouldThrowUnauthorized(){

        Authentication authentication = new Authentication();
        authentication.setToken("123-test-token");
        authentication.setExpireDate(Instant.now().plus(5, ChronoUnit.MINUTES));

        User user = new User();
        user.setEmail("test@test.test");
        user.setPassword(passwordEncoder.encode("test"));
        user.setAuthentication(authentication);

        when(userRepository.findTopByEmail("test@test.test")).thenReturn(Optional.of(user));

        Throwable exception = assertThrows(UnauthorizedException.class,
                () -> authenticationProvider.getAuthenticationByEmailAndPassword("wrong@test.test", "test"));
        assertEquals("EMAIL_OR_PASSWORD_INCORRECT", exception.getMessage());
    }

    @Test
    void GivenAnValidUsernameAndPassword_whenGetAuthentication_ShouldReturnAuthentication(){
        Authentication authentication = new Authentication();
        authentication.setToken("123-test-token");
        authentication.setExpireDate(Instant.now().plus(5, ChronoUnit.MINUTES));

        User user = new User();
        user.setEmail("test@test.test");
        user.setPassword(passwordEncoder.encode("test"));
        user.setAuthentication(authentication);

        when(userRepository.findTopByEmail("test@test.test")).thenReturn(Optional.of(user));

        var actual = authenticationProvider.getAuthenticationByEmailAndPassword("test@test.test", "test");
        assertEquals(authentication, actual);
    }

    @Test
    void GivenAnInvalidToken_WhenGetUserByToken_ShouldThrowUnauthorized(){
        Authentication authentication = new Authentication();
        authentication.setToken("123-test-token");
        authentication.setExpireDate(Instant.now().plus(5, ChronoUnit.MINUTES));

        User user = new User();
        user.setEmail("test@test.test");
        user.setPassword(passwordEncoder.encode("test"));
        user.setAuthentication(authentication);

        when(authenticationRepository.findTopByToken("")).thenReturn(Optional.empty());
        when(userRepository.findTopByAuthentication(authentication)).thenReturn(Optional.of(user));

        Throwable exception = assertThrows(UnauthorizedException.class,
                () -> authenticationProvider.getUserByToken(""));
        assertEquals("TOKEN_NOT_VALID", exception.getMessage());

    }

    @Test
    void GivenAnValidToken_WhenGetUserByToken_ShouldReturnUser(){
        Authentication authentication = new Authentication();
        authentication.setToken("123-test-token");
        authentication.setExpireDate(Instant.now().plus(5, ChronoUnit.MINUTES));

        User user = new User();
        user.setEmail("test@test.test");
        user.setPassword(passwordEncoder.encode("test"));
        user.setAuthentication(authentication);

        when(authenticationRepository.findTopByToken("123-test-token")).thenReturn(Optional.of(authentication));
        when(userRepository.findTopByAuthentication(authentication)).thenReturn(Optional.of(user));

        var actual = authenticationProvider.getUserByToken("123-test-token");
        assertEquals(user, actual);

    }

}