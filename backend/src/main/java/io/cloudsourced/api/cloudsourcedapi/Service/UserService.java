package io.cloudsourced.api.cloudsourcedapi.Service;

import io.cloudsourced.api.cloudsourcedapi.Entity.User;
import io.cloudsourced.api.cloudsourcedapi.Persistence.UserRepository;

@org.springframework.stereotype.Service
public class UserService extends Service<User, UserRepository>{

    public UserService(UserRepository repository) {
        super(repository);
    }
}
