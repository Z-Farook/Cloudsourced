package io.cloudsourced.api.cloudsourcedapi.API.DTO;

import lombok.Data;

@Data
public class AuthenticationUserDTO {
    private String email;
    private String password;
}
