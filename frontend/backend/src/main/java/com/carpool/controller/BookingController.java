package com.carpool.controller;

import com.carpool.dto.request.BookingCreateRequest;
import com.carpool.dto.response.ApiResponse;
import com.carpool.dto.response.BookingResponse;
import com.carpool.security.CustomUserDetailsService.CustomUserPrincipal;
import com.carpool.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/my-bookings")
    public ResponseEntity<ApiResponse<List<BookingResponse>>> getMyBookings(Authentication authentication) {
        try {
            CustomUserPrincipal userPrincipal = (CustomUserPrincipal) authentication.getPrincipal();
            List<BookingResponse> bookings = bookingService.getPassengerBookings(userPrincipal.getUserId());
            return ResponseEntity.ok(ApiResponse.success("Bookings retrieved successfully", bookings));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error("Failed to retrieve bookings", e.getMessage()));
        }
    }

    @GetMapping("/my-ride-bookings")
    public ResponseEntity<ApiResponse<List<BookingResponse>>> getMyRideBookings(Authentication authentication) {
        try {
            CustomUserPrincipal userPrincipal = (CustomUserPrincipal) authentication.getPrincipal();
            List<BookingResponse> bookings = bookingService.getDriverBookings(userPrincipal.getUserId());
            return ResponseEntity.ok(ApiResponse.success("Driver bookings retrieved successfully", bookings));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error("Failed to retrieve driver bookings", e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<BookingResponse>> getBookingDetails(
            @PathVariable Long id, Authentication authentication) {
        try {
            CustomUserPrincipal userPrincipal = (CustomUserPrincipal) authentication.getPrincipal();
            BookingResponse booking = bookingService.getBookingDetails(id, userPrincipal.getUserId());
            return ResponseEntity.ok(ApiResponse.success("Booking details retrieved", booking));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error("Booking not found", e.getMessage()));
        }
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<ApiResponse<BookingResponse>> cancelBooking(
            @PathVariable Long id, Authentication authentication) {
        try {
            CustomUserPrincipal userPrincipal = (CustomUserPrincipal) authentication.getPrincipal();
            BookingResponse booking = bookingService.cancelBooking(id, userPrincipal.getUserId());
            return ResponseEntity.ok(ApiResponse.success("Booking cancelled successfully", booking));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error("Failed to cancel booking", e.getMessage()));
        }
    }

    @PutMapping("/{id}/confirm")
    public ResponseEntity<ApiResponse<BookingResponse>> confirmBooking(
            @PathVariable Long id, Authentication authentication) {
        try {
            CustomUserPrincipal userPrincipal = (CustomUserPrincipal) authentication.getPrincipal();
            BookingResponse booking = bookingService.confirmBooking(id, userPrincipal.getUserId());
            return ResponseEntity.ok(ApiResponse.success("Booking confirmed successfully", booking));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error("Failed to confirm booking", e.getMessage()));
        }
    }
}
