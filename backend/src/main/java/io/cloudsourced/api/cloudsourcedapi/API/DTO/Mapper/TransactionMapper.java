package io.cloudsourced.api.cloudsourcedapi.API.DTO.Mapper;

import io.cloudsourced.api.cloudsourcedapi.API.DTO.TransactionDTO;
import io.cloudsourced.api.cloudsourcedapi.Entity.Transaction;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.factory.Mappers;

@org.mapstruct.Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface TransactionMapper extends Mapper<Transaction, TransactionDTO> {
    TransactionMapper INSTANCE = Mappers.getMapper(TransactionMapper.class);
}
