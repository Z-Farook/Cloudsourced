package io.cloudsourced.api.cloudsourcedapi.Default.Exception;

public class NotFoundException extends RuntimeException {

    public NotFoundException(){
    }
    public NotFoundException(String e){
        super(e);
    }
}
