package com.carpool.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "users")
@EntityListeners(AuditingEntityListener.class)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Email
    @NotBlank
    @Column(unique = true)
    private String email;

    @NotBlank
    @Size(min = 6)
    private String passwordHash;

    @NotBlank
    @Size(max = 100)
    private String firstName;

    @NotBlank
    @Size(max = 100)
    private String lastName;

    @Pattern(regexp = "^[+]?91[6-9][0-9]{9}$|^[6-9][0-9]{9}$", message = "Phone number must be a valid Indian mobile number")
    @Column(unique = true)
    private String phone;

    private String location;

    @Column(columnDefinition = "TEXT")
    private String bio;

    private String profilePictureUrl;

    @Column(nullable = false)
    private Boolean isVerified = false;

    @Column(nullable = false)
    private Boolean isDriver = false;

    @Column(precision = 2, scale = 1)
    private BigDecimal rating = BigDecimal.ZERO;

    @Column(nullable = false)
    private Integer totalRides = 0;

    @Column(precision = 10, scale = 2)
    private BigDecimal totalEarnings = BigDecimal.ZERO;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    // Relationships
    @OneToMany(mappedBy = "driver", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Ride> offeredRides;

    @OneToMany(mappedBy = "passenger", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Booking> bookings;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Notification> notifications;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private DriverVerification driverVerification;

    // Constructors
    public User() {}

    public User(String email, String passwordHash, String firstName, String lastName, String phone) {
        this.email = email;
        this.passwordHash = passwordHash;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getProfilePictureUrl() {
        return profilePictureUrl;
    }

    public void setProfilePictureUrl(String profilePictureUrl) {
        this.profilePictureUrl = profilePictureUrl;
    }

    public Boolean getIsVerified() {
        return isVerified;
    }

    public void setIsVerified(Boolean isVerified) {
        this.isVerified = isVerified;
    }

    public Boolean getIsDriver() {
        return isDriver;
    }

    public void setIsDriver(Boolean isDriver) {
        this.isDriver = isDriver;
    }

    public BigDecimal getRating() {
        return rating;
    }

    public void setRating(BigDecimal rating) {
        this.rating = rating;
    }

    public Integer getTotalRides() {
        return totalRides;
    }

    public void setTotalRides(Integer totalRides) {
        this.totalRides = totalRides;
    }

    public BigDecimal getTotalEarnings() {
        return totalEarnings;
    }

    public void setTotalEarnings(BigDecimal totalEarnings) {
        this.totalEarnings = totalEarnings;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public List<Ride> getOfferedRides() {
        return offeredRides;
    }

    public void setOfferedRides(List<Ride> offeredRides) {
        this.offeredRides = offeredRides;
    }

    public List<Booking> getBookings() {
        return bookings;
    }

    public void setBookings(List<Booking> bookings) {
        this.bookings = bookings;
    }

    public List<Notification> getNotifications() {
        return notifications;
    }

    public void setNotifications(List<Notification> notifications) {
        this.notifications = notifications;
    }

    public DriverVerification getDriverVerification() {
        return driverVerification;
    }

    public void setDriverVerification(DriverVerification driverVerification) {
        this.driverVerification = driverVerification;
    }

    // Utility methods
    public String getFullName() {
        return firstName + " " + lastName;
    }

    public void incrementTotalRides() {
        this.totalRides++;
    }

    public void addEarnings(BigDecimal amount) {
        if (this.totalEarnings == null) {
            this.totalEarnings = BigDecimal.ZERO;
        }
        this.totalEarnings = this.totalEarnings.add(amount);
    }
}

