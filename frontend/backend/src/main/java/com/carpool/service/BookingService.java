package com.carpool.service;

import com.carpool.dto.request.BookingCreateRequest;
import com.carpool.dto.response.BookingResponse;
import com.carpool.entity.Booking;
import com.carpool.entity.Booking.BookingStatus;
import com.carpool.entity.Booking.PaymentStatus;
import com.carpool.entity.Ride;
import com.carpool.entity.User;
import com.carpool.exception.ResourceNotFoundException;
import com.carpool.exception.RideNotAvailableException;
import com.carpool.exception.UnauthorizedException;
import com.carpool.exception.ValidationException;
import com.carpool.repository.BookingRepository;
import com.carpool.repository.RideRepository;
import com.carpool.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private RideRepository rideRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public BookingResponse createBooking(Long rideId, BookingCreateRequest request, Long passengerId) {
        // Validate ride exists and is available
        Ride ride = rideRepository.findById(rideId)
                .orElseThrow(() -> new ResourceNotFoundException("Ride not found with id: " + rideId));

        if (!ride.getStatus().equals(Ride.RideStatus.ACTIVE)) {
            throw new RideNotAvailableException("Ride is not available for booking");
        }

        // Check if ride has enough available seats
        if (ride.getAvailableSeats() < request.getSeatsRequested()) {
            throw new RideNotAvailableException("Not enough seats available. Available: " + 
                    ride.getAvailableSeats() + ", Requested: " + request.getSeatsRequested());
        }

        // Check if passenger is trying to book their own ride
        if (ride.getDriver().getId().equals(passengerId)) {
            throw new ValidationException("Cannot book your own ride");
        }

        // Check if passenger has already booked this ride
        List<Booking> existingBookings = bookingRepository.findByRideIdAndPassengerIdAndStatus(
                rideId, passengerId, BookingStatus.CONFIRMED);
        if (!existingBookings.isEmpty()) {
            throw new ValidationException("You have already booked this ride");
        }

        // Also check for pending bookings
        List<Booking> pendingBookings = bookingRepository.findByRideIdAndPassengerIdAndStatus(
                rideId, passengerId, BookingStatus.PENDING);
        if (!pendingBookings.isEmpty()) {
            throw new ValidationException("You already have a pending booking for this ride");
        }

        // Get passenger
        User passenger = userRepository.findById(passengerId)
                .orElseThrow(() -> new ResourceNotFoundException("Passenger not found"));

        // Calculate total amount
        BigDecimal totalAmount = ride.getPricePerSeat().multiply(new BigDecimal(request.getSeatsRequested()));

        // Create booking
        Booking booking = new Booking();
        booking.setRide(ride);
        booking.setPassenger(passenger);
        booking.setSeatsBooked(request.getSeatsRequested());
        booking.setTotalAmount(totalAmount);
        booking.setStatus(BookingStatus.PENDING);
        booking.setPaymentStatus(PaymentStatus.PENDING);

        // Save booking
        booking = bookingRepository.save(booking);

        // Update ride available seats
        ride.setAvailableSeats(ride.getAvailableSeats() - request.getSeatsRequested());
        rideRepository.save(ride);

        return convertToBookingResponse(booking);
    }

    public List<BookingResponse> getPassengerBookings(Long passengerId) {
        List<Booking> bookings = bookingRepository.findByPassengerIdOrderByCreatedAtDesc(passengerId);
        return bookings.stream()
                .map(this::convertToBookingResponse)
                .collect(Collectors.toList());
    }

    public List<BookingResponse> getDriverBookings(Long driverId) {
        List<Booking> bookings = bookingRepository.findByDriverIdOrderByCreatedAtDesc(driverId);
        return bookings.stream()
                .map(this::convertToBookingResponse)
                .collect(Collectors.toList());
    }

    public BookingResponse getBookingDetails(Long bookingId, Long userId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + bookingId));

        // Check if user is either the passenger or the driver
        if (!booking.getPassenger().getId().equals(userId) && 
            !booking.getRide().getDriver().getId().equals(userId)) {
            throw new UnauthorizedException("You are not authorized to view this booking");
        }

        return convertToBookingResponse(booking);
    }

    @Transactional
    public BookingResponse cancelBooking(Long bookingId, Long userId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + bookingId));

        // Check if user is the passenger who made the booking
        if (!booking.getPassenger().getId().equals(userId)) {
            throw new UnauthorizedException("You can only cancel your own bookings");
        }

        // Check if booking can be cancelled
        if (booking.getStatus().equals(BookingStatus.CANCELLED) || 
            booking.getStatus().equals(BookingStatus.COMPLETED)) {
            throw new ValidationException("Cannot cancel booking with status: " + booking.getStatus());
        }

        // Check if ride has already started (optional business rule)
        LocalDate today = LocalDate.now();
        LocalTime now = LocalTime.now();
        if (booking.getRide().getDepartureDate().isBefore(today) || 
            (booking.getRide().getDepartureDate().isEqual(today) && 
             booking.getRide().getDepartureTime().isBefore(now))) {
            throw new ValidationException("Cannot cancel booking for a ride that has already started");
        }

        // Update booking status
        booking.setStatus(BookingStatus.CANCELLED);
        
        // If payment was completed, mark for refund
        if (booking.getPaymentStatus().equals(PaymentStatus.COMPLETED)) {
            booking.setPaymentStatus(PaymentStatus.REFUNDED);
        }

        // Restore seats to ride
        Ride ride = booking.getRide();
        ride.setAvailableSeats(ride.getAvailableSeats() + booking.getSeatsBooked());
        rideRepository.save(ride);

        booking = bookingRepository.save(booking);
        return convertToBookingResponse(booking);
    }

    @Transactional
    public BookingResponse confirmBooking(Long bookingId, Long driverId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + bookingId));

        // Check if user is the driver
        if (!booking.getRide().getDriver().getId().equals(driverId)) {
            throw new UnauthorizedException("Only the driver can confirm bookings");
        }

        // Check if booking is in pending status
        if (!booking.getStatus().equals(BookingStatus.PENDING)) {
            throw new ValidationException("Can only confirm pending bookings");
        }

        booking.setStatus(BookingStatus.CONFIRMED);
        booking = bookingRepository.save(booking);

        return convertToBookingResponse(booking);
    }

    private BookingResponse convertToBookingResponse(Booking booking) {
        BookingResponse response = new BookingResponse();
        response.setId(booking.getId());
        response.setRideId(booking.getRide().getId());
        response.setPassengerId(booking.getPassenger().getId());
        response.setSeatsBooked(booking.getSeatsBooked());
        response.setTotalAmount(booking.getTotalAmount());
        response.setStatus(booking.getStatus());
        response.setPaymentStatus(booking.getPaymentStatus());
        response.setPaymentId(booking.getPaymentId());
        response.setCreatedAt(booking.getCreatedAt());
        response.setUpdatedAt(booking.getUpdatedAt());

        // Set ride information
        Ride ride = booking.getRide();
        BookingResponse.RideInfo rideInfo = new BookingResponse.RideInfo();
        rideInfo.setId(ride.getId());
        rideInfo.setFrom(ride.getFromLocation());
        rideInfo.setTo(ride.getToLocation());
        rideInfo.setDepartureDate(ride.getDepartureDate().format(DateTimeFormatter.ISO_LOCAL_DATE));
        rideInfo.setDepartureTime(ride.getDepartureTime().format(DateTimeFormatter.ISO_LOCAL_TIME));
        rideInfo.setPricePerSeat(ride.getPricePerSeat());
        rideInfo.setCarModel(ride.getCarModel());
        rideInfo.setCarNumber(ride.getCarNumber());
        response.setRide(rideInfo);

        // Set driver information
        User driver = ride.getDriver();
        BookingResponse.UserInfo driverInfo = new BookingResponse.UserInfo();
        driverInfo.setId(driver.getId());
        driverInfo.setFirstName(driver.getFirstName());
        driverInfo.setLastName(driver.getLastName());
        driverInfo.setName(driver.getFirstName() + " " + driver.getLastName());
        driverInfo.setPhone(driver.getPhone());
        driverInfo.setRating(driver.getRating() != null ? driver.getRating().doubleValue() : 0.0);
        response.setDriver(driverInfo);

        // Set passenger information
        User passenger = booking.getPassenger();
        BookingResponse.UserInfo passengerInfo = new BookingResponse.UserInfo();
        passengerInfo.setId(passenger.getId());
        passengerInfo.setFirstName(passenger.getFirstName());
        passengerInfo.setLastName(passenger.getLastName());
        passengerInfo.setName(passenger.getFirstName() + " " + passenger.getLastName());
        passengerInfo.setPhone(passenger.getPhone());
        passengerInfo.setRating(passenger.getRating() != null ? passenger.getRating().doubleValue() : 0.0);
        response.setPassenger(passengerInfo);

        return response;
    }
}
