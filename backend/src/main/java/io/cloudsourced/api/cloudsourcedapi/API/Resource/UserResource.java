package io.cloudsourced.api.cloudsourcedapi.API.Resource;

import io.cloudsourced.api.cloudsourcedapi.API.DTO.Mapper.UserMapper;
import io.cloudsourced.api.cloudsourcedapi.API.DTO.Mapper.UserMapperImpl;
import io.cloudsourced.api.cloudsourcedapi.API.DTO.UserDTO;
import io.cloudsourced.api.cloudsourcedapi.Entity.User;
import io.cloudsourced.api.cloudsourcedapi.Persistence.UserRepository;
import io.cloudsourced.api.cloudsourcedapi.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/user")
public class UserResource extends BaseResource<User,UserDTO, UserService, UserRepository, UserMapper> {


    public UserResource(UserService service, UserMapper mapper) {
        super(service, mapper);
    }

    @GetMapping("/test/{id}")
    public UserDTO test(@PathVariable Long id){

        User u = service.getOneById(id);
        return UserMapper.INSTANCE.entityToDTO(u);
    }

}
