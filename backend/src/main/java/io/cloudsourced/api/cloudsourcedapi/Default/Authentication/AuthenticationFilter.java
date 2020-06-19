package io.cloudsourced.api.cloudsourcedapi.Default.Authentication;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public class AuthenticationFilter extends GenericFilterBean {

    private AuthenticationProvider AuthenticationProvider;

    public AuthenticationFilter(AuthenticationProvider AuthenticationProvider) {
        this.AuthenticationProvider = AuthenticationProvider;
    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain filterChain)
            throws IOException, ServletException {

        String token = AuthenticationProvider.resolveToken((HttpServletRequest) req);
        if (token != null && AuthenticationProvider.validateToken(token)) {
            Authentication auth = AuthenticationProvider.getAuthentication(token);

            if (auth != null) {
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }
        filterChain.doFilter(req, res);
    }
}
