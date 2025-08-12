package com.carpool.backend.controller;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.carpool.backend.dto.response.ApiResponse;
import com.carpool.backend.dto.response.RideResponse;
import com.carpool.backend.service.RideService;

@RestController
@RequestMapping("/rides")
@CrossOrigin(origins = "*")
public class RideController {

    @Autowired
    private RideService rideService;

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
}
