package io.cloudsourced.api.cloudsourcedapi.API.DTO;

import lombok.Data;

@Data
public class TransactionDTO {
    private Long id;
    private Long points;
    private UserDTO user;
}
