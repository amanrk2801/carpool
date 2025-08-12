package com.carpool.backend.dto.response;

import java.time.LocalDateTime;

public class RatingResponse {

    private Long id;
    private Integer rating;
    private String comment;
    private String raterName;
    private String rateeName;
    private Long rideId;
    private LocalDateTime createdAt;

    // Constructors
    public RatingResponse() {}

    public RatingResponse(Long id, Integer rating, String comment, String raterName,
                          String rateeName, Long rideId, LocalDateTime createdAt) {
        this.id = id;
        this.rating = rating;
        this.comment = comment;
        this.raterName = raterName;
        this.rateeName = rateeName;
        this.rideId = rideId;
        this.createdAt = createdAt;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public String getRaterName() {
        return raterName;
    }

    public void setRaterName(String raterName) {
        this.raterName = raterName;
    }

    public String getRateeName() {
        return rateeName;
    }

    public void setRateeName(String rateeName) {
        this.rateeName = rateeName;
    }

    public Long getRideId() {
        return rideId;
    }

    public void setRideId(Long rideId) {
        this.rideId = rideId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
