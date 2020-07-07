package io.cloudsourced.api.cloudsourcedapi.Default.Authentication;

import io.cloudsourced.api.cloudsourcedapi.Entity.User;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class AuthenticatedUserBean {

    public User getUser() {
        // TODO: getCredentials returns a string after creating an user and navigating to the
        // dashboard page.
        Object data = SecurityContextHolder.getContext().getAuthentication().getCredentials();
//        if (data instanceof String) {
//            return null;
//        }
        return (User) data;
    }
}
