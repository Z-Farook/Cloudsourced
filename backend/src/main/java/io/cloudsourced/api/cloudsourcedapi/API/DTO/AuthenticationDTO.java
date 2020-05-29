package io.cloudsourced.api.cloudsourcedapi.API.DTO;

import lombok.Data;
import java.time.Instant;

@Data
public class AuthenticationDTO {
    private String token;
    private Instant expireDate;
}
