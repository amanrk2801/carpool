package com.carpool.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.carpool.backend.dto.response.ApiResponse;
import com.carpool.backend.security.CustomUserDetailsService.CustomUserPrincipal;
import com.carpool.backend.dto.request.BookingCreateRequest;
import com.carpool.backend.dto.response.BookingResponse;
import com.carpool.backend.service.BookingService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<BookingResponse>> createBooking(
            @Valid @RequestBody BookingCreateRequest request,
            Authentication authentication) {
        try {
            CustomUserPrincipal userPrincipal = (CustomUserPrincipal) authentication.getPrincipal();
            BookingResponse bookingResponse = bookingService.createBooking(
                    request.getRideId(), request, userPrincipal.getUserId());
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.success("Booking created successfully", bookingResponse));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error("Failed to create booking", e.getMessage()));
        }
    }

}
