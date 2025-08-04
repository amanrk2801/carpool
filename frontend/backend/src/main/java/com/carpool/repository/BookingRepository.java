package com.carpool.repository;

import com.carpool.entity.Booking;
import com.carpool.entity.Ride;
import com.carpool.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByPassenger(User passenger);

    List<Booking> findByPassengerId(Long passengerId);

    List<Booking> findByRide(Ride ride);

    List<Booking> findByRideId(Long rideId);

    @Query("SELECT b FROM Booking b WHERE b.ride.driver.id = :driverId")
    List<Booking> findBookingsByDriverId(@Param("driverId") Long driverId);

    @Query("SELECT b FROM Booking b WHERE b.passenger.id = :passengerId AND b.status = :status")
    List<Booking> findByPassengerIdAndStatus(@Param("passengerId") Long passengerId,
                                           @Param("status") Booking.BookingStatus status);

    @Query("SELECT b FROM Booking b WHERE b.ride.id = :rideId AND b.status = :status")
    List<Booking> findByRideIdAndStatus(@Param("rideId") Long rideId,
                                      @Param("status") Booking.BookingStatus status);

    @Query("SELECT b FROM Booking b WHERE b.status = 'CONFIRMED'")
    List<Booking> findConfirmedBookings();

    @Query("SELECT b FROM Booking b WHERE b.paymentStatus = 'PENDING'")
    List<Booking> findPendingPaymentBookings();

    @Query("SELECT b FROM Booking b WHERE b.passenger.id = :passengerId " +
           "ORDER BY b.createdAt DESC")
    List<Booking> findByPassengerIdOrderByCreatedAtDesc(@Param("passengerId") Long passengerId);

    @Query("SELECT b FROM Booking b WHERE b.ride.driver.id = :driverId " +
           "ORDER BY b.createdAt DESC")
    List<Booking> findByDriverIdOrderByCreatedAtDesc(@Param("driverId") Long driverId);

    @Query("SELECT COUNT(b) FROM Booking b WHERE b.passenger.id = :passengerId")
    long countBookingsByPassenger(@Param("passengerId") Long passengerId);

    @Query("SELECT COUNT(b) FROM Booking b WHERE b.ride.driver.id = :driverId")
    long countBookingsByDriver(@Param("driverId") Long driverId);

    @Query("SELECT SUM(b.totalAmount) FROM Booking b WHERE b.ride.driver.id = :driverId " +
           "AND b.paymentStatus = 'COMPLETED'")
    BigDecimal getTotalEarningsByDriver(@Param("driverId") Long driverId);

    @Query("SELECT SUM(b.totalAmount) FROM Booking b WHERE b.passenger.id = :passengerId " +
           "AND b.paymentStatus = 'COMPLETED'")
    BigDecimal getTotalSpentByPassenger(@Param("passengerId") Long passengerId);

    @Query("SELECT b FROM Booking b WHERE b.ride.departureDate = CURRENT_DATE " +
           "AND b.status = 'CONFIRMED'")
    List<Booking> findTodaysConfirmedBookings();

    @Query("SELECT b FROM Booking b WHERE b.createdAt >= :startDate " +
           "AND b.createdAt <= :endDate")
    List<Booking> findBookingsByDateRange(@Param("startDate") LocalDateTime startDate,
                                        @Param("endDate") LocalDateTime endDate);

    @Query("SELECT COUNT(b) FROM Booking b WHERE b.status = 'CONFIRMED'")
    long countConfirmedBookings();

    @Query("SELECT AVG(b.totalAmount) FROM Booking b WHERE b.paymentStatus = 'COMPLETED'")
    Double getAverageBookingAmount();

    Optional<Booking> findByPaymentId(String paymentId);

    @Query("SELECT b FROM Booking b WHERE b.passenger.id = :passengerId " +
           "AND b.ride.id = :rideId")
    Optional<Booking> findByPassengerAndRide(@Param("passengerId") Long passengerId,
                                           @Param("rideId") Long rideId);

    @Query("SELECT SUM(b.seatsBooked) FROM Booking b WHERE b.ride.id = :rideId " +
           "AND b.status IN ('CONFIRMED', 'PENDING')")
    Integer getTotalBookedSeatsByRide(@Param("rideId") Long rideId);

    @Query("SELECT b FROM Booking b WHERE b.ride.id = :rideId AND b.passenger.id = :passengerId " +
           "AND b.status = :status")
    List<Booking> findByRideIdAndPassengerIdAndStatus(@Param("rideId") Long rideId,
                                                     @Param("passengerId") Long passengerId,
                                                     @Param("status") Booking.BookingStatus status);
}
