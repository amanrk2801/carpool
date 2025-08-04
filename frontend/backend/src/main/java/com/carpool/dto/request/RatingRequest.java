package com.carpool.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class RatingRequest {

    @NotNull(message = "Rating is required")
    @Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 5, message = "Rating cannot be more than 5")
    private Integer rating;

    private String comment;

    @NotNull(message = "Ride ID is required")
    private Long rideId;

    @NotNull(message = "Ratee ID is required")
    private Long rateeId;

    // Constructors
    public RatingRequest() {}

    public RatingRequest(Integer rating, String comment, Long rideId, Long rateeId) {
        this.rating = rating;
        this.comment = comment;
        this.rideId = rideId;
        this.rateeId = rateeId;
    }

    // Getters and Setters
    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Long getRideId() {
        return rideId;
    }

    public void setRideId(Long rideId) {
        this.rideId = rideId;
    }

    public Long getRateeId() {
        return rateeId;
    }

    public void setRateeId(Long rateeId) {
        this.rateeId = rateeId;
    }
}
