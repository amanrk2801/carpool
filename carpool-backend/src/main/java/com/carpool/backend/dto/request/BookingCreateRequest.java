package com.carpool.backend.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class BookingCreateRequest {

    private Long rideId; 

    @NotNull(message = "Number of seats is required")
    @Positive(message = "Number of seats must be positive")
    private Integer seatsRequested;

    public BookingCreateRequest() {}

    public BookingCreateRequest(Long rideId, Integer seatsRequested) {
        this.rideId = rideId;
        this.seatsRequested = seatsRequested;
    }

    public Long getRideId() {
        return rideId;
    }

    public void setRideId(Long rideId) {
        this.rideId = rideId;
    }

    public Integer getSeatsRequested() {
        return seatsRequested;
    }

    public void setSeatsRequested(Integer seatsRequested) {
        this.seatsRequested = seatsRequested;
    }
}
