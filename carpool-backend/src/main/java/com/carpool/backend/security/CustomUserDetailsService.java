package com.carpool.backend.security;

import com.carpool.backend.entity.User;
import com.carpool.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        return new CustomUserPrincipal(user);
    }

    public static class CustomUserPrincipal implements UserDetails {
        private final User user;

        public CustomUserPrincipal(User user) {
            this.user = user;
        }

        @Override
        public String getUsername() {
            return user.getEmail();
        }

        @Override
        public String getPassword() {
            return user.getPasswordHash();
        }

        @Override
        public List<GrantedAuthority> getAuthorities() {
            List<GrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority("ROLE_USER"));

            if (user.getIsDriver()) {
                authorities.add(new SimpleGrantedAuthority("ROLE_DRIVER"));
            }

            return authorities;
        }

        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return true; // You can add email verification logic here
        }

        // Getter for the User entity
        public User getUser() {
            return user;
        }

        public Long getUserId() {
            return user.getId();
        }

        public boolean isVerified() {
            return user.getIsVerified();
        }

        public boolean isDriver() {
            return user.getIsDriver();
        }
    }
}

