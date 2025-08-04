package com.carpool.dto.response;

import com.carpool.entity.Booking.BookingStatus;
import com.carpool.entity.Booking.PaymentStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class BookingResponse {

    private Long id;
    private Long rideId;
    private Long passengerId;
    private Integer seatsBooked;
    private BigDecimal totalAmount;
    private BookingStatus status;
    private PaymentStatus paymentStatus;
    private String paymentId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Nested ride information for convenience
    private RideInfo ride;
    private UserInfo driver;
    private UserInfo passenger;

    // Constructors
    public BookingResponse() {}

    public BookingResponse(Long id, Long rideId, Long passengerId, Integer seatsBooked, 
                          BigDecimal totalAmount, BookingStatus status, PaymentStatus paymentStatus,
                          String paymentId, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.rideId = rideId;
        this.passengerId = passengerId;
        this.seatsBooked = seatsBooked;
        this.totalAmount = totalAmount;
        this.status = status;
        this.paymentStatus = paymentStatus;
        this.paymentId = paymentId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Nested classes for related information
    public static class RideInfo {
        private Long id;
        private String from;
        private String to;
        private String departureDate;
        private String departureTime;
        private BigDecimal pricePerSeat;
        private String carModel;
        private String carNumber;

        // Constructors
        public RideInfo() {}

        public RideInfo(Long id, String from, String to, String departureDate, 
                       String departureTime, BigDecimal pricePerSeat, String carModel, String carNumber) {
            this.id = id;
            this.from = from;
            this.to = to;
            this.departureDate = departureDate;
            this.departureTime = departureTime;
            this.pricePerSeat = pricePerSeat;
            this.carModel = carModel;
            this.carNumber = carNumber;
        }

        // Getters and Setters
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getFrom() { return from; }
        public void setFrom(String from) { this.from = from; }
        public String getTo() { return to; }
        public void setTo(String to) { this.to = to; }
        public String getDepartureDate() { return departureDate; }
        public void setDepartureDate(String departureDate) { this.departureDate = departureDate; }
        public String getDepartureTime() { return departureTime; }
        public void setDepartureTime(String departureTime) { this.departureTime = departureTime; }
        public BigDecimal getPricePerSeat() { return pricePerSeat; }
        public void setPricePerSeat(BigDecimal pricePerSeat) { this.pricePerSeat = pricePerSeat; }
        public String getCarModel() { return carModel; }
        public void setCarModel(String carModel) { this.carModel = carModel; }
        public String getCarNumber() { return carNumber; }
        public void setCarNumber(String carNumber) { this.carNumber = carNumber; }
    }

    public static class UserInfo {
        private Long id;
        private String firstName;
        private String lastName;
        private String name;
        private String phone;
        private Double rating;

        // Constructors
        public UserInfo() {}

        public UserInfo(Long id, String firstName, String lastName, String phone, Double rating) {
            this.id = id;
            this.firstName = firstName;
            this.lastName = lastName;
            this.name = firstName + " " + lastName;
            this.phone = phone;
            this.rating = rating;
        }

        // Getters and Setters
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getFirstName() { return firstName; }
        public void setFirstName(String firstName) { this.firstName = firstName; }
        public String getLastName() { return lastName; }
        public void setLastName(String lastName) { this.lastName = lastName; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getPhone() { return phone; }
        public void setPhone(String phone) { this.phone = phone; }
        public Double getRating() { return rating; }
        public void setRating(Double rating) { this.rating = rating; }
    }

    // Main class getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getRideId() { return rideId; }
    public void setRideId(Long rideId) { this.rideId = rideId; }
    public Long getPassengerId() { return passengerId; }
    public void setPassengerId(Long passengerId) { this.passengerId = passengerId; }
    public Integer getSeatsBooked() { return seatsBooked; }
    public void setSeatsBooked(Integer seatsBooked) { this.seatsBooked = seatsBooked; }
    public BigDecimal getTotalAmount() { return totalAmount; }
    public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }
    public BookingStatus getStatus() { return status; }
    public void setStatus(BookingStatus status) { this.status = status; }
    public PaymentStatus getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(PaymentStatus paymentStatus) { this.paymentStatus = paymentStatus; }
    public String getPaymentId() { return paymentId; }
    public void setPaymentId(String paymentId) { this.paymentId = paymentId; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    public RideInfo getRide() { return ride; }
    public void setRide(RideInfo ride) { this.ride = ride; }
    public UserInfo getDriver() { return driver; }
    public void setDriver(UserInfo driver) { this.driver = driver; }
    public UserInfo getPassenger() { return passenger; }
    public void setPassenger(UserInfo passenger) { this.passenger = passenger; }
}
