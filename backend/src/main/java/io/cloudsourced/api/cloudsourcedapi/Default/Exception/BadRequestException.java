package io.cloudsourced.api.cloudsourcedapi.Default.Exception;

public class BadRequestException extends RuntimeException {

    public BadRequestException(){
    }
    public BadRequestException(String e){
        super(e);
    }
}
