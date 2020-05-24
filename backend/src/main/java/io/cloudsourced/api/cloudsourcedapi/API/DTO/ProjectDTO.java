package io.cloudsourced.api.cloudsourcedapi.API.DTO;

import lombok.Data;

@Data
public class ProjectDTO {
    public Long id;
    public String name;
    public String description;
    public String image;
}
