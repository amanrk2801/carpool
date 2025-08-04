package com.carpool.backend.controller;

import com.carpool.backend.dto.request.LoginRequest;
import com.carpool.backend.dto.request.RegisterRequest;
import com.carpool.backend.dto.response.ApiResponse;
import com.carpool.backend.dto.response.LoginResponse;
import com.carpool.backend.dto.response.UserResponse;
import com.carpool.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserResponse>> register(@Valid @RequestBody RegisterRequest request) {
        try {
            UserResponse userResponse = authService.register(request);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.success("Account created successfully", userResponse));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error("Registration failed", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest request) {
        try {
            LoginResponse loginResponse = authService.login(request);
            return ResponseEntity.ok(ApiResponse.success("Login successful", loginResponse));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Login failed", e.getMessage()));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<String>> logout(@RequestHeader("Authorization") String token) {
        try {
            authService.logout(token);
            return ResponseEntity.ok(ApiResponse.success("Logged out successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error("Logout failed", e.getMessage()));
        }
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<ApiResponse<LoginResponse>> refreshToken(@RequestHeader("Authorization") String refreshToken) {
        try {
            LoginResponse loginResponse = authService.refreshToken(refreshToken);
            return ResponseEntity.ok(ApiResponse.success("Token refreshed successfully", loginResponse));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Token refresh failed", e.getMessage()));
        }
    }

    @GetMapping("/verify-email")
    public ResponseEntity<ApiResponse<String>> verifyEmail(@RequestParam String token) {
        try {
            authService.verifyEmail(token);
            return ResponseEntity.ok(ApiResponse.success("Email verified successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error("Email verification failed", e.getMessage()));
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse<String>> forgotPassword(@RequestParam String email) {
        try {
            authService.sendPasswordResetEmail(email);
            return ResponseEntity.ok(ApiResponse.success("Password reset email sent"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error("Failed to send password reset email", e.getMessage()));
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<String>> resetPassword(
            @RequestParam String token,
            @RequestParam String newPassword) {
        try {
            authService.resetPassword(token, newPassword);
            return ResponseEntity.ok(ApiResponse.success("Password reset successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error("Password reset failed", e.getMessage()));
        }
    }
}

