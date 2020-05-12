package io.cloudsourced.api.cloudsourcedapi.Default.Exception;

public class UnauthorizedException extends  RuntimeException{
    public UnauthorizedException(){
    }

    public UnauthorizedException(String e){
        super(e);
    }
}
