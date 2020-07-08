package io.cloudsourced.api.cloudsourcedapi.API.DTO;

import lombok.Data;

import java.time.Instant;
import java.util.List;

@Data
public class ProjectDTO {
    private Long id;
    private String name;
    private String description;
    private String image;
    private Instant finishedAt;
    private Instant archivedAt;
    private Instant createdAt;
    private Instant updatedAt;
    private String userImage;
}

