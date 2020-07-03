package io.cloudsourced.api.cloudsourcedapi.API.DTO;

import lombok.Data;

import java.time.Instant;
import java.util.List;

@Data
public class FeatureDTO {
    private Long id;
    private String name;
    private String description;
    private String codePreview;
    private String codeLanguage;
    private Long points;
    private List<ImplementationDTO> implementations;
    private Instant finishedAt;
    private Instant archivedAt;
    private Instant createdAt;
    private ProjectDTO project;
}
