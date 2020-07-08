package io.cloudsourced.api.cloudsourcedapi.API.DTO.Mapper;

import io.cloudsourced.api.cloudsourcedapi.API.DTO.ProjectDTO;
import io.cloudsourced.api.cloudsourcedapi.Entity.Project;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

@org.mapstruct.Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR, nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE, nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
public interface ProjectMapper extends Mapper<Project, ProjectDTO> { }
