package com.carpool.backend.repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.carpool.backend.entity.Ride;
import com.carpool.backend.entity.User;

@Repository
public interface RideRepository extends JpaRepository<Ride, Long> {

    List<Ride> findByDriver(User driver);

    @Query("SELECT r FROM Ride r WHERE r.fromLocation LIKE %:from% " +
           "AND r.toLocation LIKE %:to% " +
           "AND r.departureDate = :date " +
           "AND r.availableSeats >= :seats " +
           "AND r.status = 'ACTIVE'")
    List<Ride> searchRides(@Param("from") String from,
                          @Param("to") String to,
                          @Param("date") LocalDate date,
                          @Param("seats") Integer seats);

    @Query("SELECT r FROM Ride r WHERE r.fromLocation LIKE %:from% " +
           "AND r.toLocation LIKE %:to% " +
           "AND r.departureDate = :date " +
           "AND r.availableSeats >= :seats " +
           "AND r.departureTime >= :startTime " +
           "AND r.departureTime <= :endTime " +
           "AND r.status = 'ACTIVE'")
    List<Ride> searchRidesWithTimeRange(@Param("from") String from,
                                       @Param("to") String to,
                                       @Param("date") LocalDate date,
                                       @Param("seats") Integer seats,
                                       @Param("startTime") LocalTime startTime,
                                       @Param("endTime") LocalTime endTime);

    @Query("SELECT r FROM Ride r WHERE r.fromLocation LIKE %:from% " +
           "AND r.toLocation LIKE %:to% " +
           "AND r.departureDate = :date " +
           "AND r.availableSeats >= :seats " +
           "AND r.pricePerSeat <= :maxPrice " +
           "AND r.status = 'ACTIVE' " +
           "ORDER BY r.pricePerSeat ASC")
    List<Ride> searchRidesWithPriceFilter(@Param("from") String from,
                                         @Param("to") String to,
                                         @Param("date") LocalDate date,
                                         @Param("seats") Integer seats,
                                         @Param("maxPrice") BigDecimal maxPrice);

    @Query("SELECT r FROM Ride r WHERE r.status = 'ACTIVE'")
    List<Ride> findActiveRides();


}
