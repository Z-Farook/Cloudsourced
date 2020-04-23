package io.cloudsourced.api.cloudsourcedapi.Service;

import io.cloudsourced.api.cloudsourcedapi.Entity.User;
import io.cloudsourced.api.cloudsourcedapi.Percistance.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;

@org.springframework.stereotype.Service
public class UserService extends Service<User, UserRepository>{

    public UserService(UserRepository repository) {
        super(repository);
    }
}
