package com.carpool.backend.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "driver_verifications")
@EntityListeners(AuditingEntityListener.class)
public class DriverVerification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @NotBlank
    @Column(nullable = false, length = 50)
    private String licenseNumber;

    private String licenseDocumentUrl;

    @NotBlank
    @Column(nullable = false, length = 50)
    private String vehicleRegistration;

    private String vehicleDocumentUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private VerificationStatus verificationStatus = VerificationStatus.PENDING;

    private LocalDateTime verifiedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "verified_by")
    private User verifiedBy;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    // Constructors
    public DriverVerification() {}

    public DriverVerification(User user, String licenseNumber, String vehicleRegistration) {
        this.user = user;
        this.licenseNumber = licenseNumber;
        this.vehicleRegistration = vehicleRegistration;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getLicenseNumber() {
        return licenseNumber;
    }

    public void setLicenseNumber(String licenseNumber) {
        this.licenseNumber = licenseNumber;
    }

    public String getLicenseDocumentUrl() {
        return licenseDocumentUrl;
    }

    public void setLicenseDocumentUrl(String licenseDocumentUrl) {
        this.licenseDocumentUrl = licenseDocumentUrl;
    }

    public String getVehicleRegistration() {
        return vehicleRegistration;
    }

    public void setVehicleRegistration(String vehicleRegistration) {
        this.vehicleRegistration = vehicleRegistration;
    }

    public String getVehicleDocumentUrl() {
        return vehicleDocumentUrl;
    }

    public void setVehicleDocumentUrl(String vehicleDocumentUrl) {
        this.vehicleDocumentUrl = vehicleDocumentUrl;
    }

    public VerificationStatus getVerificationStatus() {
        return verificationStatus;
    }

    public void setVerificationStatus(VerificationStatus verificationStatus) {
        this.verificationStatus = verificationStatus;
    }

    public LocalDateTime getVerifiedAt() {
        return verifiedAt;
    }

    public void setVerifiedAt(LocalDateTime verifiedAt) {
        this.verifiedAt = verifiedAt;
    }

    public User getVerifiedBy() {
        return verifiedBy;
    }

    public void setVerifiedBy(User verifiedBy) {
        this.verifiedBy = verifiedBy;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    // Utility methods
    public boolean isPending() {
        return verificationStatus == VerificationStatus.PENDING;
    }

    public boolean isApproved() {
        return verificationStatus == VerificationStatus.APPROVED;
    }

    public boolean isRejected() {
        return verificationStatus == VerificationStatus.REJECTED;
    }

    public void approve(User verifier) {
        this.verificationStatus = VerificationStatus.APPROVED;
        this.verifiedBy = verifier;
        this.verifiedAt = LocalDateTime.now();
    }

    public void reject(User verifier) {
        this.verificationStatus = VerificationStatus.REJECTED;
        this.verifiedBy = verifier;
        this.verifiedAt = LocalDateTime.now();
    }

    // Enum for verification status
    public enum VerificationStatus {
        PENDING, APPROVED, REJECTED
    }
}
