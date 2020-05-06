package io.cloudsourced.api.cloudsourcedapi.API.Resource;

import io.cloudsourced.api.cloudsourcedapi.Entity.Project;
import io.cloudsourced.api.cloudsourcedapi.Entity.User;
import io.cloudsourced.api.cloudsourcedapi.Persistence.UserRepository;
import io.cloudsourced.api.cloudsourcedapi.Service.UserService;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/user/")
public class UserResource extends Resource<User, UserService, UserRepository>{

    public UserResource(UserService service) {
        super(service);
    }



}
