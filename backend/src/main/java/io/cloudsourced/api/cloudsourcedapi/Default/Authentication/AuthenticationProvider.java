package io.cloudsourced.api.cloudsourcedapi.Default.Authentication;

import io.cloudsourced.api.cloudsourcedapi.Default.Exception.NotFoundException;
import io.cloudsourced.api.cloudsourcedapi.Default.Exception.UnauthorizedException;
import io.cloudsourced.api.cloudsourcedapi.Entity.Authentication;
import io.cloudsourced.api.cloudsourcedapi.Entity.User;
import io.cloudsourced.api.cloudsourcedapi.Persistence.AuthenticationRepository;
import io.cloudsourced.api.cloudsourcedapi.Persistence.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.security.SecureRandom;
import java.time.Instant;
import java.util.Optional;

@RequiredArgsConstructor
@Component
public class AuthenticationProvider {

    private final AuthenticationRepository authenticationRepository;
    private final UserRepository userRepository;

    static final String AB = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-";
    static SecureRandom rnd = new SecureRandom();
    int tokenLength = 40;

    public Boolean validateToken(String token) {
        Optional<Authentication> authentication = authenticationRepository.findTopByToken(token);
        return authentication.filter(value -> value.getExpireDate().compareTo(Instant.now()) > 0).isPresent();
    }

    public User getUserByToken(String token) {
        if (validateToken(token)) {
            Optional<Authentication> authentication = authenticationRepository.findTopByToken(token);
            if (authentication.isPresent()) {
                return authentication.get().getUser();
            }
        }
        throw new UnauthorizedException();
    }

    public String resolveToken(HttpServletRequest req) {
        String bearerToken = req.getHeader("Authorization");
        if (bearerToken != null && bearerToken.length() == tokenLength) {
            return bearerToken;
        }
        return null;
    }

    public org.springframework.security.core.Authentication getAuthentication(String token) {
        User user = getUserByToken(token);
        return new UsernamePasswordAuthenticationToken(user, "", null);
    }

    public Authentication getAuthenticationByEmailAndPassword(String email, String password) {
        Optional<User> user = userRepository.findTopByEmail(email);
        if (!user.isPresent()) {
            throw new UnauthorizedException("EMAIL_OR_PASSWORD_INCORRECT");
        }
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        if (!passwordEncoder.matches(password, user.get().getPassword())) {
            throw new UnauthorizedException("EMAIL_OR_PASSWORD_INCORRECT");
        }

        Authentication authentication = user.get().getAuthentication();
        if (authentication == null) {
            throw new UnauthorizedException("AUTH_NOT_FOUND");
        }

        if (authentication.getExpireDate() == null || authentication.getToken() == null) {
            return withNewToken(authentication);
        }
        if (authentication.getExpireDate().compareTo(Instant.now()) > 0) {
            return authentication;
        }

        throw new UnauthorizedException("AUTH_INVALID");
    }

    private Authentication withNewToken(Authentication authentication) {
        String generatedToken = generateToken();

        if (isTokenUnique(generatedToken)) {
            authentication.setToken(generatedToken);
            authenticationRepository.save(authentication);
            return authentication;
        }
        return withNewToken(authentication);
    }

    private Boolean isTokenUnique(String token) {
        ;
        return !authenticationRepository.findTopByToken(token).isPresent();
    }

    private String generateToken() {
        StringBuilder stringBuilder = new StringBuilder(tokenLength);
        for (int i = 0; i < tokenLength; i++)
            stringBuilder.append(AB.charAt(rnd.nextInt(AB.length())));
        return stringBuilder.toString();
    }
}
