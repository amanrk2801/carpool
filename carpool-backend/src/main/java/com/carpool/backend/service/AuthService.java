package com.carpool.backend.service;

import com.carpool.backend.dto.request.LoginRequest;
import com.carpool.backend.dto.request.RegisterRequest;
import com.carpool.backend.dto.response.LoginResponse;
import com.carpool.backend.dto.response.UserResponse;
import com.carpool.backend.entity.User;
import com.carpool.backend.exception.BadRequestException;
import com.carpool.backend.exception.ResourceNotFoundException;
import com.carpool.backend.exception.UnauthorizedException;
import com.carpool.backend.exception.UserAlreadyExistsException;
import com.carpool.backend.repository.UserRepository;
import com.carpool.backend.security.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@Transactional
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private TwilioWhatsAppService twilioWhatsAppService;

    public UserResponse register(RegisterRequest request) {
        // Check if user already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new UserAlreadyExistsException("Email already registered");
        }

        if (userRepository.existsByPhone(request.getPhone())) {
            throw new UserAlreadyExistsException("Phone number already registered");
        }

        // Create new user
        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setPhone(request.getPhone());
        user.setLocation(request.getLocation());

        // Save user
        User savedUser = userRepository.save(user);

        // Send welcome WhatsApp message
        try {
            if (savedUser.getPhone() != null && !savedUser.getPhone().isEmpty()) {
                String welcomeMessage = String.format(
                    "🎉 Welcome to Carpool, %s!\n\nYour account has been created successfully. " +
                    "You can now find rides or offer rides to fellow travelers.\n\n" +
                    "Safe travels! 🚗",
                    savedUser.getFullName()
                );
                twilioWhatsAppService.sendWhatsAppMessage(savedUser.getPhone(), welcomeMessage);
            }
        } catch (Exception e) {
            // Log error but don't fail registration
            System.err.println("Failed to send welcome WhatsApp message: " + e.getMessage());
        }

        return mapToUserResponse(savedUser);
    }

    public LoginResponse login(LoginRequest request) {
        try {
            // Authenticate user
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            // Get user details
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            User user = userRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found"));

            // Generate tokens
            Map<String, Object> extraClaims = new HashMap<>();
            extraClaims.put("userId", user.getId());
            extraClaims.put("isDriver", user.getIsDriver());
            extraClaims.put("isVerified", user.getIsVerified());

            String token = jwtTokenUtil.generateToken(userDetails.getUsername(), extraClaims);
            String refreshToken = jwtTokenUtil.generateRefreshToken(userDetails.getUsername());

            // Create response
            UserResponse userResponse = mapToUserResponse(user);
            return new LoginResponse(userResponse, token, refreshToken);

        } catch (BadCredentialsException e) {
            throw new UnauthorizedException("Invalid email or password");
        }
    }

    public void logout(String token) {
        // In a real implementation, you might want to blacklist the token
        // For now, we'll just validate that the token exists
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        if (!jwtTokenUtil.validateToken(token)) {
            throw new UnauthorizedException("Invalid token");
        }

        // Token blacklisting logic would go here
        // This could involve storing blacklisted tokens in Redis
    }

    public LoginResponse refreshToken(String refreshToken) {
        if (refreshToken.startsWith("Bearer ")) {
            refreshToken = refreshToken.substring(7);
        }

        if (!jwtTokenUtil.validateToken(refreshToken)) {
            throw new RuntimeException("Invalid refresh token");
        }

        String username = jwtTokenUtil.getUsernameFromToken(refreshToken);
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

        // Generate new tokens
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("userId", user.getId());
        extraClaims.put("isDriver", user.getIsDriver());
        extraClaims.put("isVerified", user.getIsVerified());

        String newToken = jwtTokenUtil.generateToken(userDetails.getUsername(), extraClaims);
        String newRefreshToken = jwtTokenUtil.generateRefreshToken(userDetails.getUsername());

        UserResponse userResponse = mapToUserResponse(user);
        return new LoginResponse(userResponse, newToken, newRefreshToken);
    }

    public void verifyEmail(String token) {
        // Email verification logic
        // This would typically involve validating a verification token
        // and updating the user's verified status

        if (!jwtTokenUtil.validateToken(token)) {
            throw new RuntimeException("Invalid verification token");
        }

        String email = jwtTokenUtil.getUsernameFromToken(token);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setIsVerified(true);
        userRepository.save(user);
    }

    public void sendPasswordResetEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));

        // Generate password reset token
        String resetToken = jwtTokenUtil.generateToken(email, new HashMap<>());

        // Send password reset WhatsApp message
        try {
            if (user.getPhone() != null && !user.getPhone().isEmpty()) {
                String resetMessage = String.format(
                    "🔐 Password Reset Request\n\n" +
                    "Hi %s,\n\n" +
                    "You requested a password reset for your Carpool account.\n\n" +
                    "Reset Token: %s\n\n" +
                    "Please use this token to reset your password. " +
                    "If you didn't request this, please ignore this message.",
                    user.getFullName(), resetToken
                );
                twilioWhatsAppService.sendWhatsAppMessage(user.getPhone(), resetMessage);
            }
        } catch (Exception e) {
            System.err.println("Failed to send password reset WhatsApp message: " + e.getMessage());
        }

        // For local testing, also log the reset token
        System.out.println("Password reset token for " + user.getEmail() + ": " + resetToken);
    }

    public void resetPassword(String token, String newPassword) {
        if (!jwtTokenUtil.validateToken(token)) {
            throw new RuntimeException("Invalid or expired reset token");
        }

        String email = jwtTokenUtil.getUsernameFromToken(token);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setPasswordHash(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    private UserResponse mapToUserResponse(User user) {
        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setFirstName(user.getFirstName());
        response.setLastName(user.getLastName());
        response.setEmail(user.getEmail());
        response.setPhone(user.getPhone());
        response.setLocation(user.getLocation());
        response.setBio(user.getBio());
        response.setProfilePictureUrl(user.getProfilePictureUrl());
        response.setIsVerified(user.getIsVerified());
        response.setIsDriver(user.getIsDriver());
        response.setRating(user.getRating());
        response.setTotalRides(user.getTotalRides());
        response.setTotalEarnings(user.getTotalEarnings());
        return response;
    }
}

