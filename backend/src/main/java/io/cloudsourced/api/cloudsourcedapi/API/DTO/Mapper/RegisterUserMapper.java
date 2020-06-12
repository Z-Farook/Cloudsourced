package io.cloudsourced.api.cloudsourcedapi.API.DTO.Mapper;

import io.cloudsourced.api.cloudsourcedapi.API.DTO.RegisterUserDTO;
import io.cloudsourced.api.cloudsourcedapi.Entity.User;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.factory.Mappers;

@org.mapstruct.Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface RegisterUserMapper extends Mapper<User, RegisterUserDTO> {
    RegisterUserMapper INSTANCE = Mappers.getMapper(RegisterUserMapper.class);
}
