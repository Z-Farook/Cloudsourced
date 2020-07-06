package io.cloudsourced.api.cloudsourcedapi.API.DTO;

import lombok.Data;

import java.util.List;

@Data
public class ImplementationDTO {
    private Long id;
    private String code;
    private List<ReviewDTO> reviews;
    private UserDTO user;
    private Boolean approved;
}
