package io.cloudsourced.api.cloudsourcedapi.Default.Authentication;

import io.cloudsourced.api.cloudsourcedapi.Entity.User;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class AuthenticatedUserBean {

    public User GetUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getCredentials();
    }
}