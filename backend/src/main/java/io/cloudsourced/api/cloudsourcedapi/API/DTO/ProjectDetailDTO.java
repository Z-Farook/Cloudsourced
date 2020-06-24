package io.cloudsourced.api.cloudsourcedapi.API.DTO;

import lombok.Data;

import java.time.Instant;
import java.util.List;

@Data
public class ProjectDetailDTO {
    private Long id;
    private String name;
    private String description;
    private String image;
    private Boolean isFinished;
    private List<FeatureDTO> features;
    private Instant createdAt;
    private Instant updatedAt;
    private UserDTO user;
}

