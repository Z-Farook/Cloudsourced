package io.cloudsourced.api.cloudsourcedapi.API.DTO.Mapper;

import io.cloudsourced.api.cloudsourcedapi.API.DTO.ReviewDTO;
import io.cloudsourced.api.cloudsourcedapi.Entity.Review;
import org.mapstruct.InjectionStrategy;

@org.mapstruct.Mapper(componentModel = "spring", uses = { ImplementationMapper.class, UserMapper.class }, injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface ReviewMapper extends Mapper<Review, ReviewDTO> {
}
