package io.cloudsourced.api.cloudsourcedapi.API.Resource;

import io.cloudsourced.api.cloudsourcedapi.API.DTO.AuthenticationUserDTO;
import io.cloudsourced.api.cloudsourcedapi.API.DTO.Mapper.RegisterUserMapper;
import io.cloudsourced.api.cloudsourcedapi.API.DTO.RegisterUserDTO;
import io.cloudsourced.api.cloudsourcedapi.Entity.Authentication;
import io.cloudsourced.api.cloudsourcedapi.Default.Authentication.AuthenticationProvider;
import io.cloudsourced.api.cloudsourcedapi.Entity.User;
import io.cloudsourced.api.cloudsourcedapi.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

class ValidateTokenResult {
    public boolean valid;

    ValidateTokenResult(boolean valid) {
        this.valid = valid;
    }
}

@RestController
@RequestMapping("/authentication")
@RequiredArgsConstructor
public class AuthenticationResource {

    private final AuthenticationProvider service;
    private final UserService userService;
    public final RegisterUserMapper registerUserMapper;

    @PostMapping("")
    Authentication authenticateUser(@RequestBody AuthenticationUserDTO authenticationUserDTO) {
        return service.getAuthenticationByEmailAndPassword(
                authenticationUserDTO.getEmail(),
                authenticationUserDTO.getPassword());
    }


    @PostMapping("/register")
    User registerNewUser(@RequestBody RegisterUserDTO registerUserDTO){
        return userService.save(
                registerUserMapper.DTOToEntity(registerUserDTO)
        );
    }

    @PostMapping("/validate-token/{token}")
    ValidateTokenResult validateToken(@PathVariable String token) {
        final boolean isValid = service.validateToken(token);
        return new ValidateTokenResult(isValid);
    }
}
