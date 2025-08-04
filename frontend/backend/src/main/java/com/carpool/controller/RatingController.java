package com.carpool.controller;

import com.carpool.dto.request.RatingRequest;
import com.carpool.dto.response.ApiResponse;
import com.carpool.dto.response.RatingResponse;
import com.carpool.security.CustomUserDetailsService.CustomUserPrincipal;
import com.carpool.service.RatingService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ratings")
public class RatingController {

    @Autowired
    private RatingService ratingService;

    @PostMapping
    public ResponseEntity<ApiResponse<RatingResponse>> createRating(
            @Valid @RequestBody RatingRequest request,
            Authentication authentication) {
        
        CustomUserPrincipal userPrincipal = (CustomUserPrincipal) authentication.getPrincipal();
        RatingResponse rating = ratingService.createRating(request, userPrincipal.getUserId());
        
        return ResponseEntity.ok(new ApiResponse<>(
                true, 
                "Rating created successfully", 
                rating
        ));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<List<RatingResponse>>> getUserRatings(
            @PathVariable Long userId) {
        
        List<RatingResponse> ratings = ratingService.getUserRatings(userId);
        
        return ResponseEntity.ok(new ApiResponse<>(
                true, 
                "User ratings retrieved successfully", 
                ratings
        ));
    }

    @GetMapping("/user/{userId}/recent")
    public ResponseEntity<ApiResponse<List<RatingResponse>>> getRecentUserRatings(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "5") int limit) {
        
        List<RatingResponse> ratings = ratingService.getRecentUserRatings(userId, limit);
        
        return ResponseEntity.ok(new ApiResponse<>(
                true, 
                "Recent user ratings retrieved successfully", 
                ratings
        ));
    }

    @PostMapping("/user/{userId}/update-stats")
    public ResponseEntity<ApiResponse<String>> updateUserStats(@PathVariable Long userId) {
        
        ratingService.updateUserRating(userId);
        ratingService.updateUserTotalRides(userId);
        
        return ResponseEntity.ok(new ApiResponse<>(
                true, 
                "User statistics updated successfully", 
                "Statistics updated"
        ));
    }
}
