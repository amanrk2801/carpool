package com.carpool.backend.controller;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.carpool.backend.dto.request.BookingCreateRequest;
import com.carpool.backend.dto.response.ApiResponse;
import com.carpool.backend.dto.response.BookingResponse;
import com.carpool.backend.dto.response.RideResponse;
import com.carpool.backend.security.CustomUserDetailsService.CustomUserPrincipal;
import com.carpool.backend.service.BookingService;
import com.carpool.backend.service.RideService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/rides")
@CrossOrigin(origins = "*")
public class RideController {

    @Autowired
    private RideService rideService;

    @Autowired
    private BookingService bookingService;

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<RideResponse>>> searchRides(
            @RequestParam String from,
            @RequestParam String to,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam(defaultValue = "1") Integer passengers,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalTime time,
            @RequestParam(required = false) BigDecimal maxPrice) {
        try {
            if (from == null || from.trim().isEmpty()) {
                throw new RuntimeException("From location is required");
            }
            if (to == null || to.trim().isEmpty()) {
                throw new RuntimeException("To location is required");
            }
            if (date == null) {
                throw new RuntimeException("Departure date is required");
            }
            if (passengers == null || passengers <= 0) {
                throw new RuntimeException("Valid number of passengers is required");
            }
            String cleanFrom = from.trim().toLowerCase();
            String cleanTo = to.trim().toLowerCase();
            
            List<RideResponse> rides = rideService.searchRides(cleanFrom, cleanTo, date, passengers, time, maxPrice);
            return ResponseEntity.ok(ApiResponse.success("Rides found", rides));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error("Search failed", e.getMessage()));
        }
    }
    

    @GetMapping("/filter")
    public ResponseEntity<ApiResponse<List<RideResponse>>> filterRides(
            @RequestParam(required = false) String from,
            @RequestParam(required = false) String to,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) Integer minSeats,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            List<RideResponse> rides = rideService.filterRides(from, to, startDate, endDate, 
                    minPrice, maxPrice, minSeats, page, size);
            return ResponseEntity.ok(ApiResponse.success("Filtered rides retrieved", rides));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error("Filter operation failed", e.getMessage()));
        }
    }

    @PostMapping("/{id}/book")
    public ResponseEntity<ApiResponse<BookingResponse>> bookRide(
            @PathVariable Long id,
            @Valid @RequestBody BookingCreateRequest request,
            Authentication authentication) {
        try {
            CustomUserPrincipal userPrincipal = (CustomUserPrincipal) authentication.getPrincipal();
            request.setRideId(id);
            BookingResponse bookingResponse = bookingService.createBooking(id, request, userPrincipal.getUserId());
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.success("Ride booked successfully", bookingResponse));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error("Failed to book ride", e.getMessage()));
        }
    }
}
