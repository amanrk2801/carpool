package com.carpool.dto.response;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public class RideResponse {

    private Long id;
    private DriverInfo driver;
    private RouteInfo route;
    private LocalDate departureDate;
    private LocalTime departureTime;
    private String carModel;
    private String carNumber;
    private Integer totalSeats;
    private Integer availableSeats;
    private BigDecimal pricePerSeat;
    private String additionalInfo;
    private String status;
    private boolean instantBooking;
    private List<PassengerInfo> passengers;

    // Constructors
    public RideResponse() {}

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public DriverInfo getDriver() {
        return driver;
    }

    public void setDriver(DriverInfo driver) {
        this.driver = driver;
    }

    public RouteInfo getRoute() {
        return route;
    }

    public void setRoute(RouteInfo route) {
        this.route = route;
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

    public Integer getTotalSeats() {
        return totalSeats;
    }

    public void setTotalSeats(Integer totalSeats) {
        this.totalSeats = totalSeats;
    }

    public Integer getAvailableSeats() {
        return availableSeats;
    }

    public void setAvailableSeats(Integer availableSeats) {
        this.availableSeats = availableSeats;
    }

    public BigDecimal getPricePerSeat() {
        return pricePerSeat;
    }

    public void setPricePerSeat(BigDecimal pricePerSeat) {
        this.pricePerSeat = pricePerSeat;
    }

    public String getAdditionalInfo() {
        return additionalInfo;
    }

    public void setAdditionalInfo(String additionalInfo) {
        this.additionalInfo = additionalInfo;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public boolean isInstantBooking() {
        return instantBooking;
    }

    public void setInstantBooking(boolean instantBooking) {
        this.instantBooking = instantBooking;
    }

    public List<PassengerInfo> getPassengers() {
        return passengers;
    }

    public void setPassengers(List<PassengerInfo> passengers) {
        this.passengers = passengers;
    }

    // Inner classes for nested objects
    public static class DriverInfo {
        private String name;
        private String phone;
        private BigDecimal rating;
        private Integer totalTrips;

        // Constructors, getters, and setters
        public DriverInfo() {}

        public DriverInfo(String name, String phone, BigDecimal rating, Integer totalTrips) {
            this.name = name;
            this.phone = phone;
            this.rating = rating;
            this.totalTrips = totalTrips;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getPhone() {
            return phone;
        }

        public void setPhone(String phone) {
            this.phone = phone;
        }

        public BigDecimal getRating() {
            return rating;
        }

        public void setRating(BigDecimal rating) {
            this.rating = rating;
        }

        public Integer getTotalTrips() {
            return totalTrips;
        }

        public void setTotalTrips(Integer totalTrips) {
            this.totalTrips = totalTrips;
        }
    }

    public static class RouteInfo {
        private String from;
        private String to;

        // Constructors, getters, and setters
        public RouteInfo() {}

        public RouteInfo(String from, String to) {
            this.from = from;
            this.to = to;
        }

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
    }

    public static class PassengerInfo {
        private String name;
        private BigDecimal rating;
        private Integer seatsBooked;

        // Constructors, getters, and setters
        public PassengerInfo() {}

        public PassengerInfo(String name, BigDecimal rating, Integer seatsBooked) {
            this.name = name;
            this.rating = rating;
            this.seatsBooked = seatsBooked;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public BigDecimal getRating() {
            return rating;
        }

        public void setRating(BigDecimal rating) {
            this.rating = rating;
        }

        public Integer getSeatsBooked() {
            return seatsBooked;
        }

        public void setSeatsBooked(Integer seatsBooked) {
            this.seatsBooked = seatsBooked;
        }
    }
}
