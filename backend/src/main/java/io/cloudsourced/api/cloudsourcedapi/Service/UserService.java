package io.cloudsourced.api.cloudsourcedapi.Service;

import io.cloudsourced.api.cloudsourcedapi.Default.Authentication.AuthenticatedUserBean;
import io.cloudsourced.api.cloudsourcedapi.Default.Exception.BadRequestException;
import io.cloudsourced.api.cloudsourcedapi.Entity.User;
import io.cloudsourced.api.cloudsourcedapi.Persistence.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

@org.springframework.stereotype.Service
public class UserService extends BaseService<User, UserRepository> {

    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository repository, AuthenticatedUserBean authenticatedUserProvider, PasswordEncoder passwordEncoder) {
        super(repository, authenticatedUserProvider);
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User save(User user){
        Optional<User> foundByEmail = repository.findTopByEmail(user.getEmail());

        if(!foundByEmail.isPresent()){
            return repository.save(encodePassword(user));
        }
        throw new BadRequestException("User with this email already exists");
    }

    private User encodePassword(User user){
        CharSequence pass = user.getPassword().toString();
        user.setPassword(passwordEncoder.encode(pass));
        return user;
    }

    public User getAuthenticatedUserInfo(){
        return authenticatedUserProvider.getUser();
    }
    public User getUserInfo(long id){
        return repository.getOne(id);
    }
}
