package io.cloudsourced.api.cloudsourcedapi.API.DTO;

import lombok.Data;
import lombok.NonNull;

@Data
public class RegisterUserDTO {
        private String image;
        private String name;
        private String infix;
        private String lastName;
        private String[] languages;
        private String country;
        private String email;
        private String password;
        private String telephone;
        private String street;
        private String streetNumber;

}
