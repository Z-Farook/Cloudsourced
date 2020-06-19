package io.cloudsourced.api.cloudsourcedapi.API.DTO.Mapper;

import io.cloudsourced.api.cloudsourcedapi.API.DTO.ProjectDetailDTO;
import io.cloudsourced.api.cloudsourcedapi.Entity.Project;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.NullValueCheckStrategy;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.factory.Mappers;

@org.mapstruct.Mapper(componentModel = "spring", uses = { FeatureMapper.class }, injectionStrategy = InjectionStrategy.CONSTRUCTOR, nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE, nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
public interface ProjectDetailMapper extends Mapper<Project, ProjectDetailDTO> {
    ProjectMapper INSTANCE = Mappers.getMapper(ProjectMapper.class);
}
