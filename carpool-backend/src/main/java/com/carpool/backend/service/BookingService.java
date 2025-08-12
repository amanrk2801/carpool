package com.carpool.backend.service;


import java.math.BigDecimal;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.carpool.backend.dto.request.BookingCreateRequest;
import com.carpool.backend.dto.response.BookingResponse;
import com.carpool.backend.entity.Booking;
import com.carpool.backend.entity.Booking.BookingStatus;
import com.carpool.backend.entity.Booking.PaymentStatus;
import com.carpool.backend.entity.Ride;
import com.carpool.backend.entity.User;
import com.carpool.backend.exception.ResourceNotFoundException;
import com.carpool.backend.exception.RideNotAvailableException;
import com.carpool.backend.repository.BookingRepository;
import com.carpool.backend.repository.RideRepository;
import com.carpool.backend.repository.UserRepository;

import jakarta.validation.ValidationException;

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
        Ride ride = rideRepository.findById(rideId)
                .orElseThrow(() -> new ResourceNotFoundException("Ride not found with id: " + rideId));

        if (!ride.getStatus().equals(Ride.RideStatus.ACTIVE)) {
            throw new RideNotAvailableException("Ride is not available for booking");
        }

        if (ride.getAvailableSeats() < request.getSeatsRequested()) {
            throw new RideNotAvailableException("Not enough seats available. Available: " + 
                    ride.getAvailableSeats() + ", Requested: " + request.getSeatsRequested());
        }

        if (ride.getDriver().getId().equals(passengerId)) {
            throw new ValidationException("Cannot book your own ride");
        }

        List<Booking> existingBookings = bookingRepository.findByRideIdAndPassengerIdAndStatus(
                rideId, passengerId, BookingStatus.CONFIRMED);
        if (!existingBookings.isEmpty()) {
            throw new ValidationException("You have already booked this ride");
        }

        List<Booking> pendingBookings = bookingRepository.findByRideIdAndPassengerIdAndStatus(
                rideId, passengerId, BookingStatus.PENDING);
        if (!pendingBookings.isEmpty()) {
            throw new ValidationException("You already have a pending booking for this ride");
        }

        User passenger = userRepository.findById(passengerId)
                .orElseThrow(() -> new ResourceNotFoundException("Passenger not found"));

        BigDecimal totalAmount = ride.getPricePerSeat().multiply(new BigDecimal(request.getSeatsRequested()));

        Booking booking = new Booking();
        booking.setRide(ride);
        booking.setPassenger(passenger);
        booking.setSeatsBooked(request.getSeatsRequested());
        booking.setTotalAmount(totalAmount);
        booking.setStatus(BookingStatus.PENDING);
        booking.setPaymentStatus(PaymentStatus.PENDING);

        booking = bookingRepository.save(booking);

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

        User driver = ride.getDriver();
        BookingResponse.UserInfo driverInfo = new BookingResponse.UserInfo();
        driverInfo.setId(driver.getId());
        driverInfo.setFirstName(driver.getFirstName());
        driverInfo.setLastName(driver.getLastName());
        driverInfo.setName(driver.getFirstName() + " " + driver.getLastName());
        driverInfo.setPhone(driver.getPhone());
        driverInfo.setRating(driver.getRating() != null ? driver.getRating().doubleValue() : 0.0);
        response.setDriver(driverInfo);

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
