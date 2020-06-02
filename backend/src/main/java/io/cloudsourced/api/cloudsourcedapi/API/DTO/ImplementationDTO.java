package io.cloudsourced.api.cloudsourcedapi.API.DTO;

import io.cloudsourced.api.cloudsourcedapi.Entity.User;
import lombok.Data;

@Data
public class ImplementationDTO {
    private Long id;
    private String code;
    private User user;
}
