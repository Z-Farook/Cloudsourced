package io.cloudsourced.api.cloudsourcedapi.API.DTO.Mapper;

import io.cloudsourced.api.cloudsourcedapi.API.DTO.ProjectDTO;
import io.cloudsourced.api.cloudsourcedapi.Entity.Project;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.factory.Mappers;

@org.mapstruct.Mapper(componentModel = "spring", uses = { UserMapper.class, FeatureMapper.class }, injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface ProjectMapper extends Mapper<Project, ProjectDTO> {
    ProjectMapper INSTANCE = Mappers.getMapper(ProjectMapper.class);
}
