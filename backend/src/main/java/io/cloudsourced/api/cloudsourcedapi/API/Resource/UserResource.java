package io.cloudsourced.api.cloudsourcedapi.API.Resource;


import io.cloudsourced.api.cloudsourcedapi.API.DTO.Mapper.UserMapper;
import io.cloudsourced.api.cloudsourcedapi.API.DTO.ProjectDTO;
import io.cloudsourced.api.cloudsourcedapi.API.DTO.UserDTO;
import io.cloudsourced.api.cloudsourcedapi.Entity.User;
import io.cloudsourced.api.cloudsourcedapi.Persistence.UserRepository;
import io.cloudsourced.api.cloudsourcedapi.Service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/user")
public class UserResource extends BaseResource<User,UserDTO, UserService, UserRepository, UserMapper> {

    public UserResource(UserService service, UserMapper mapper) {
        super(service, mapper);
    }

    @GetMapping("/info")
    public UserDTO getUserInfo(){
        return mapper.entityToDTO(service.getAuthenticatedUserInfo());
    }
    @GetMapping("/profile/{id}")
    public UserDTO getUserProfileInfo(@PathVariable long id){
        return mapper.entityToDTO(service.getUserInfo(id));
    }
}
