package com.carpool.repository;

import com.carpool.entity.Ride;
import com.carpool.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface RideRepository extends JpaRepository<Ride, Long> {

    List<Ride> findByDriver(User driver);

    List<Ride> findByDriverId(Long driverId);

    @Query("SELECT r FROM Ride r WHERE r.status = 'ACTIVE'")
    List<Ride> findActiveRides();

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

    @Query("SELECT r FROM Ride r WHERE r.driver.id = :driverId AND r.status = 'ACTIVE'")
    List<Ride> findActiveRidesByDriver(@Param("driverId") Long driverId);

    @Query("SELECT r FROM Ride r WHERE r.departureDate = :date AND r.status = 'ACTIVE'")
    List<Ride> findRidesByDate(@Param("date") LocalDate date);

    @Query("SELECT r FROM Ride r WHERE r.departureDate >= :startDate " +
           "AND r.departureDate <= :endDate " +
           "AND r.status = 'ACTIVE'")
    List<Ride> findRidesByDateRange(@Param("startDate") LocalDate startDate,
                                   @Param("endDate") LocalDate endDate);

    @Query("SELECT r FROM Ride r WHERE r.fromLocation LIKE %:location% " +
           "OR r.toLocation LIKE %:location%")
    List<Ride> findRidesByLocation(@Param("location") String location);

    @Query("SELECT COUNT(r) FROM Ride r WHERE r.driver.id = :driverId")
    long countRidesByDriver(@Param("driverId") Long driverId);

    @Query("SELECT COUNT(r) FROM Ride r WHERE r.status = 'COMPLETED'")
    long countCompletedRides();

    @Query("SELECT AVG(r.pricePerSeat) FROM Ride r WHERE r.status = 'ACTIVE'")
    Double getAveragePrice();

    @Query("SELECT r FROM Ride r WHERE r.departureDate < :currentDate " +
           "AND r.status = 'ACTIVE'")
    List<Ride> findExpiredRides(@Param("currentDate") LocalDate currentDate);

    @Query("SELECT DISTINCT r.fromLocation FROM Ride r WHERE r.status = 'ACTIVE'")
    List<String> findDistinctFromLocations();

    @Query("SELECT DISTINCT r.toLocation FROM Ride r WHERE r.status = 'ACTIVE'")
    List<String> findDistinctToLocations();

    // Count completed rides where user was driver
    @Query("SELECT COUNT(r) FROM Ride r WHERE r.driver.id = :driverId AND r.status = 'COMPLETED'")
    Long countCompletedRidesByDriverId(@Param("driverId") Long driverId);

    // Count completed bookings where user was passenger
    @Query("SELECT COUNT(DISTINCT b.ride) FROM Booking b WHERE b.passenger.id = :passengerId AND b.ride.status = 'COMPLETED' AND b.status = 'CONFIRMED'")
    Long countCompletedBookingsByPassengerId(@Param("passengerId") Long passengerId);
}
