package io.cloudsourced.api.cloudsourcedapi.API.DTO;

import io.cloudsourced.api.cloudsourcedapi.Entity.Feature;
import lombok.Data;

import java.util.List;

@Data
public class ProjectDTO {
    private Long id;
    private String name;
    private String description;
    private String image;
    private List<Feature> features;
    private UserDTO user;
}
