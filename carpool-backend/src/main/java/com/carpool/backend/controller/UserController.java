package com.carpool.backend.controller;

import com.carpool.backend.dto.request.ProfileUpdateRequest;
import com.carpool.backend.dto.response.UserResponse;
import com.carpool.backend.entity.User;
import com.carpool.backend.exception.PhoneAlreadyExistsException;
import com.carpool.backend.repository.UserRepository;
import com.carpool.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    private Long getUserIdFromAuthentication(Authentication authentication) {
        String username = authentication.getName(); // This could be email or user ID
        
        // Try to parse as Long first (in case it's already a user ID)
        try {
            return Long.valueOf(username);
        } catch (NumberFormatException e) {
            // If parsing as Long fails, assume it's an email and look up the user
            Optional<User> userOpt = userRepository.findByEmail(username);
            if (userOpt.isPresent()) {
                return userOpt.get().getId();
            } else {
                throw new RuntimeException("User not found for email: " + username);
            }
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(Authentication authentication) {
        try {
            Long userId = getUserIdFromAuthentication(authentication);
            UserResponse userProfile = userService.getUserProfile(userId);
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "User profile retrieved successfully",
                "data", userProfile
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Failed to retrieve user profile: " + e.getMessage()
            ));
        }
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateUserProfile(
            @Valid @RequestBody ProfileUpdateRequest request,
            Authentication authentication) {
        try {
            Long userId = getUserIdFromAuthentication(authentication);
            UserResponse updatedProfile = userService.updateUserProfile(userId, request);
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Profile updated successfully",
                "data", updatedProfile
            ));
        } catch (PhoneAlreadyExistsException e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", e.getMessage(),
                "field", "phone"
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Failed to update profile: " + e.getMessage()
            ));
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable Long userId) {
        try {
            UserResponse user = userService.getUserById(userId);
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "User retrieved successfully",
                "data", user
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Failed to retrieve user: " + e.getMessage()
            ));
        }
    }

    @DeleteMapping("/profile")
    public ResponseEntity<?> deleteUserAccount(Authentication authentication) {
        try {
            Long userId = getUserIdFromAuthentication(authentication);
            userService.deleteUserAccount(userId);
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "User account deleted successfully"
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Failed to delete account: " + e.getMessage()
            ));
        }
    }
}
