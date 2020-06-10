package io.cloudsourced.api.cloudsourcedapi.API.Resource;

import io.cloudsourced.api.cloudsourcedapi.API.DTO.AuthenticationUserDTO;
import io.cloudsourced.api.cloudsourcedapi.Entity.Authentication;
import io.cloudsourced.api.cloudsourcedapi.Default.Authentication.AuthenticationProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/authentication")
@RequiredArgsConstructor
public class AuthenticationResource {

    private final AuthenticationProvider service;

    @PostMapping("")
    Authentication authenticateUser(@RequestBody AuthenticationUserDTO authenticationUserDTO) {
        return service.getAuthenticationByEmailAndPassword(
                authenticationUserDTO.getEmail(),
                authenticationUserDTO.getPassword());
    }
}
