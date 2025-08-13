package com.carpool.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.carpool.backend.dto.request.RatingRequest;
import com.carpool.backend.dto.response.ApiResponse;
import com.carpool.backend.dto.response.RatingResponse;
import com.carpool.backend.security.CustomUserDetailsService.CustomUserPrincipal;
import com.carpool.backend.service.RatingService;

import jakarta.validation.Valid;

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

}
