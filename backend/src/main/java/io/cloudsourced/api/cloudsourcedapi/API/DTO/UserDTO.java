package io.cloudsourced.api.cloudsourcedapi.API.DTO;
import lombok.Data;

import java.util.List;

@Data
public class UserDTO {
    private Long id;
    private String name;
    private String lastName;
    private String[] languages;
    private String Country;
    private String email;
}
