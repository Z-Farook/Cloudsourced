package io.cloudsourced.api.cloudsourcedapi.API.DTO.Mapper;

import io.cloudsourced.api.cloudsourcedapi.API.DTO.UserDTO;
import io.cloudsourced.api.cloudsourcedapi.Entity.User;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.factory.Mappers;


@org.mapstruct.Mapper(componentModel = "spring", uses = { ImplementationMapper.class, ReviewMapper.class }, injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface UserMapper extends Mapper<User,UserDTO> {

    UserMapper INSTANCE = Mappers.getMapper( UserMapper.class );

}