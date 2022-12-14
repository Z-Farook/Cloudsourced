package io.cloudsourced.api.cloudsourcedapi.API.DTO;

import lombok.Data;

import java.util.List;

@Data
public class FeatureDetailDTO {
    private Long id;
    private String name;
    private String description;
    private String codePreview;
    private String codeLanguage;
    private Long points;
    private List<ImplementationDTO> implementations;
}
