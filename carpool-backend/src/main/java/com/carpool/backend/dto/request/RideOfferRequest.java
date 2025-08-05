package com.carpool.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Future;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

public class RideOfferRequest {

    @NotBlank(message = "From location is required")
    private String from;

    @NotBlank(message = "To location is required")
    private String to;

    @NotNull(message = "Departure date is required")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate departureDate;

    @NotNull(message = "Departure time is required")
    @DateTimeFormat(iso = DateTimeFormat.ISO.TIME)
    private LocalTime departureTime;

    @NotNull(message = "Number of passengers is required")
    @Positive(message = "Number of passengers must be positive")
    private Integer passengers;

    @NotNull(message = "Price per seat is required")
    @Positive(message = "Price per seat must be positive")
    private BigDecimal pricePerSeat;

    @NotBlank(message = "Car model is required")
    private String carModel;

    @NotBlank(message = "Car number is required")
    private String carNumber;

    private String additionalInfo;

    private boolean instantBooking = false;

    // Constructors
    public RideOfferRequest() {}

    // Getters and Setters
    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public LocalDate getDepartureDate() {
        return departureDate;
    }

    public void setDepartureDate(LocalDate departureDate) {
        this.departureDate = departureDate;
    }

    public LocalTime getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(LocalTime departureTime) {
        this.departureTime = departureTime;
    }

    public Integer getPassengers() {
        return passengers;
    }

    public void setPassengers(Integer passengers) {
        this.passengers = passengers;
    }

    public BigDecimal getPricePerSeat() {
        return pricePerSeat;
    }

    public void setPricePerSeat(BigDecimal pricePerSeat) {
        this.pricePerSeat = pricePerSeat;
    }

    public String getCarModel() {
        return carModel;
    }

    public void setCarModel(String carModel) {
        this.carModel = carModel;
    }

    public String getCarNumber() {
        return carNumber;
    }

    public void setCarNumber(String carNumber) {
        this.carNumber = carNumber;
    }

    public String getAdditionalInfo() {
        return additionalInfo;
    }

    public void setAdditionalInfo(String additionalInfo) {
        this.additionalInfo = additionalInfo;
    }

    public boolean isInstantBooking() {
        return instantBooking;
    }

    public void setInstantBooking(boolean instantBooking) {
        this.instantBooking = instantBooking;
    }
}
