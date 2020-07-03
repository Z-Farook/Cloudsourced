package io.cloudsourced.api.cloudsourcedapi.API.DTO.Mapper;

import io.cloudsourced.api.cloudsourcedapi.API.DTO.PaymentDTO;
import io.cloudsourced.api.cloudsourcedapi.Entity.Payment;
import org.mapstruct.InjectionStrategy;

@org.mapstruct.Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface PaymentMapper extends Mapper<Payment, PaymentDTO> {

}
