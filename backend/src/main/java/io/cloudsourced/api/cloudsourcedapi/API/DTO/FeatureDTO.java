package io.cloudsourced.api.cloudsourcedapi.API.DTO;

import lombok.Data;

@Data
public class FeatureDTO {
    private Long id;
    private String name;
    private String description;
    private String codePreview;
    private String codeLanguage;
    private ProjectDTO project;
}
