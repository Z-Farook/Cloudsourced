package io.cloudsourced.api.cloudsourcedapi.API.DTO;

import lombok.Data;

@Data
public class ReviewDTO {
    private Long id;
    private Boolean approved;
    private String message;
    private UserDTO user;
}
