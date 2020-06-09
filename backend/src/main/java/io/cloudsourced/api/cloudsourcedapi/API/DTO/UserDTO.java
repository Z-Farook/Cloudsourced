package io.cloudsourced.api.cloudsourcedapi.API.DTO;
import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    private String name;
    private String infix;
    private String lastName;
    private String[] languages;
    private String Country;
    private String email;
    private String telephone;
    private String street;
    private String streetNumber;
}
