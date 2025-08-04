package com.carpool.service;

import com.carpool.dto.request.RideOfferRequest;
import com.carpool.dto.response.RideResponse;
import com.carpool.entity.Ride;
import com.carpool.entity.User;
import com.carpool.entity.Booking;
import com.carpool.entity.Booking.BookingStatus;
import com.carpool.repository.RideRepository;
import com.carpool.repository.UserRepository;
import com.carpool.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class RideService {

    @Autowired
    private RideRepository rideRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookingRepository bookingRepository;

    public RideResponse offerRide(RideOfferRequest request, Long driverId) {
        User driver = userRepository.findById(driverId)
                .orElseThrow(() -> new RuntimeException("Driver not found"));

        Ride ride = new Ride();
        ride.setDriver(driver);
        ride.setFromLocation(request.getFrom());
        ride.setToLocation(request.getTo());
        ride.setDepartureDate(request.getDepartureDate());
        ride.setDepartureTime(request.getDepartureTime());
        ride.setTotalSeats(request.getPassengers());
        ride.setAvailableSeats(request.getPassengers());
        ride.setPricePerSeat(request.getPricePerSeat());
        ride.setCarModel(request.getCarModel());
        ride.setCarNumber(request.getCarNumber());
        ride.setAdditionalInfo(request.getAdditionalInfo());
        ride.setInstantBooking(request.isInstantBooking());

        Ride savedRide = rideRepository.save(ride);
        return mapToRideResponse(savedRide);
    }

    public List<RideResponse> searchRides(String from, String to, LocalDate date, 
                                        Integer passengers, LocalTime time, BigDecimal maxPrice) {
        List<Ride> rides;
        
        if (time != null && maxPrice != null) {
            // Search with time range and price filter
            LocalTime startTime = time.minusHours(1);
            LocalTime endTime = time.plusHours(1);
            rides = rideRepository.searchRidesWithTimeRange(from, to, date, passengers, startTime, endTime)
                    .stream()
                    .filter(ride -> ride.getPricePerSeat().compareTo(maxPrice) <= 0)
                    .collect(Collectors.toList());
        } else if (maxPrice != null) {
            rides = rideRepository.searchRidesWithPriceFilter(from, to, date, passengers, maxPrice);
        } else {
            rides = rideRepository.searchRides(from, to, date, passengers);
        }

        return rides.stream()
                .map(this::mapToRideResponse)
                .collect(Collectors.toList());
    }

    public List<RideResponse> getDriverRides(Long driverId) {
        User driver = userRepository.findById(driverId)
                .orElseThrow(() -> new RuntimeException("Driver not found"));

        List<Ride> rides = rideRepository.findByDriver(driver);
        return rides.stream()
                .map(this::mapToRideResponse)
                .collect(Collectors.toList());
    }

    public RideResponse getRideDetails(Long rideId) {
        Ride ride = rideRepository.findById(rideId)
                .orElseThrow(() -> new RuntimeException("Ride not found"));

        return mapToRideResponse(ride);
    }

    public RideResponse updateRide(Long rideId, RideOfferRequest request, Long driverId) {
        Ride ride = rideRepository.findById(rideId)
                .orElseThrow(() -> new RuntimeException("Ride not found"));

        if (!ride.getDriver().getId().equals(driverId)) {
            throw new RuntimeException("Unauthorized to update this ride");
        }

        if (!ride.isActive()) {
            throw new RuntimeException("Cannot update inactive ride");
        }

        // Calculate current booked seats
        int currentBookedSeats = ride.getTotalSeats() - ride.getAvailableSeats();
        int newTotalSeats = request.getPassengers();
        
        // Validate seat changes - cannot reduce seats below already booked
        if (newTotalSeats < currentBookedSeats) {
            throw new RuntimeException("Cannot reduce total seats below already booked seats (" + currentBookedSeats + ")");
        }
        
        // Check if price per seat has changed
        boolean priceChanged = !ride.getPricePerSeat().equals(request.getPricePerSeat());
        
        // Update basic ride information
        ride.setFromLocation(request.getFrom());
        ride.setToLocation(request.getTo());
        ride.setDepartureDate(request.getDepartureDate());
        ride.setDepartureTime(request.getDepartureTime());
        
        // Update seats
        ride.setTotalSeats(newTotalSeats);
        ride.setAvailableSeats(newTotalSeats - currentBookedSeats);
        
        // Update pricing
        BigDecimal oldPricePerSeat = ride.getPricePerSeat();
        ride.setPricePerSeat(request.getPricePerSeat());
        
        // Update other fields
        ride.setCarModel(request.getCarModel());
        ride.setCarNumber(request.getCarNumber());
        ride.setAdditionalInfo(request.getAdditionalInfo());
        ride.setInstantBooking(request.isInstantBooking());

        Ride updatedRide = rideRepository.save(ride);
        
        // If price changed, update existing booking amounts
        if (priceChanged && currentBookedSeats > 0) {
            updateExistingBookingAmounts(ride.getId(), oldPricePerSeat, request.getPricePerSeat());
        }
        return mapToRideResponse(updatedRide);
    }

    public void cancelRide(Long rideId, Long driverId) {
        Ride ride = rideRepository.findById(rideId)
                .orElseThrow(() -> new RuntimeException("Ride not found"));

        if (!ride.getDriver().getId().equals(driverId)) {
            throw new RuntimeException("Unauthorized to cancel this ride");
        }

        ride.setStatus(Ride.RideStatus.CANCELLED);
        rideRepository.save(ride);

        // TODO: Notify all passengers about the cancellation
        // TODO: Process refunds if needed
    }

    public void deleteRide(Long rideId, Long driverId) {
        Ride ride = rideRepository.findById(rideId)
                .orElseThrow(() -> new RuntimeException("Ride not found"));

        if (!ride.getDriver().getId().equals(driverId)) {
            throw new RuntimeException("Unauthorized to delete this ride");
        }

        // Check if there are any active bookings (CONFIRMED or PENDING)
        List<Booking> confirmedBookings = bookingRepository.findByRideIdAndStatus(rideId, Booking.BookingStatus.CONFIRMED);
        List<Booking> pendingBookings = bookingRepository.findByRideIdAndStatus(rideId, Booking.BookingStatus.PENDING);
        
        if (!confirmedBookings.isEmpty() || !pendingBookings.isEmpty()) {
            throw new RuntimeException("Cannot delete ride with active bookings. Please cancel the ride instead.");
        }

        // Check if ride has already started (past departure time)
        LocalDateTime rideDateTime = LocalDateTime.of(ride.getDepartureDate(), ride.getDepartureTime());
        if (rideDateTime.isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Cannot delete past rides");
        }

        // Delete the ride
        rideRepository.delete(ride);
    }

    public void updateRideStatus(Long rideId, String statusString, Long driverId) {
        Ride ride = rideRepository.findById(rideId)
                .orElseThrow(() -> new RuntimeException("Ride not found"));

        if (!ride.getDriver().getId().equals(driverId)) {
            throw new RuntimeException("Unauthorized to update this ride status");
        }

        // Parse the status string
        Ride.RideStatus newStatus;
        try {
            newStatus = Ride.RideStatus.valueOf(statusString.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid status: " + statusString + ". Valid statuses are: ACTIVE, COMPLETED, CANCELLED");
        }

        // Business logic for status transitions
        Ride.RideStatus currentStatus = ride.getStatus();
        
        // Check if the transition is valid
        if (currentStatus == Ride.RideStatus.COMPLETED) {
            throw new RuntimeException("Cannot change status of a completed ride");
        }

        // Allow reactivating cancelled rides only if they haven't started yet
        if (currentStatus == Ride.RideStatus.CANCELLED && newStatus == Ride.RideStatus.ACTIVE) {
            LocalDateTime rideDateTime = LocalDateTime.of(ride.getDepartureDate(), ride.getDepartureTime());
            if (rideDateTime.isBefore(LocalDateTime.now())) {
                throw new RuntimeException("Cannot reactivate rides that have already started");
            }
        }

        // If changing to COMPLETED, check if ride date/time has passed
        if (newStatus == Ride.RideStatus.COMPLETED) {
            LocalDateTime rideDateTime = LocalDateTime.of(ride.getDepartureDate(), ride.getDepartureTime());
            if (rideDateTime.isAfter(LocalDateTime.now())) {
                throw new RuntimeException("Cannot mark future rides as completed");
            }
        }

        // If cancelling, handle existing bookings
        if (newStatus == Ride.RideStatus.CANCELLED && currentStatus == Ride.RideStatus.ACTIVE) {
            List<Booking> activeBookings = bookingRepository.findByRideIdAndStatus(rideId, Booking.BookingStatus.CONFIRMED);
            activeBookings.addAll(bookingRepository.findByRideIdAndStatus(rideId, Booking.BookingStatus.PENDING));
            
            if (!activeBookings.isEmpty()) {
                // Cancel all active bookings
                for (Booking booking : activeBookings) {
                    booking.setStatus(Booking.BookingStatus.CANCELLED);
                    bookingRepository.save(booking);
                }
                // TODO: Process refunds and notify passengers
            }
        }

        // Update the ride status
        ride.setStatus(newStatus);
        rideRepository.save(ride);
    }

    public List<RideResponse> filterRides(String from, String to, LocalDate startDate, LocalDate endDate,
                                        BigDecimal minPrice, BigDecimal maxPrice, Integer minSeats,
                                        int page, int size) {
        // This is a simplified implementation
        // In a real application, you would use Spring Data JPA Specifications or Criteria API
        List<Ride> rides = rideRepository.findActiveRides();

        return rides.stream()
                .filter(ride -> from == null || ride.getFromLocation().toLowerCase().contains(from.toLowerCase()))
                .filter(ride -> to == null || ride.getToLocation().toLowerCase().contains(to.toLowerCase()))
                .filter(ride -> startDate == null || !ride.getDepartureDate().isBefore(startDate))
                .filter(ride -> endDate == null || !ride.getDepartureDate().isAfter(endDate))
                .filter(ride -> minPrice == null || ride.getPricePerSeat().compareTo(minPrice) >= 0)
                .filter(ride -> maxPrice == null || ride.getPricePerSeat().compareTo(maxPrice) <= 0)
                .filter(ride -> minSeats == null || ride.getAvailableSeats() >= minSeats)
                .skip(page * size)
                .limit(size)
                .map(this::mapToRideResponse)
                .collect(Collectors.toList());
    }

    public List<String> getDistinctFromLocations() {
        return rideRepository.findDistinctFromLocations();
    }

    public List<String> getDistinctToLocations() {
        return rideRepository.findDistinctToLocations();
    }

    private RideResponse mapToRideResponse(Ride ride) {
        RideResponse response = new RideResponse();
        response.setId(ride.getId());
        response.setDepartureDate(ride.getDepartureDate());
        response.setDepartureTime(ride.getDepartureTime());
        response.setCarModel(ride.getCarModel());
        response.setCarNumber(ride.getCarNumber());
        response.setTotalSeats(ride.getTotalSeats());
        response.setAvailableSeats(ride.getAvailableSeats());
        response.setPricePerSeat(ride.getPricePerSeat());
        response.setAdditionalInfo(ride.getAdditionalInfo());
        response.setStatus(ride.getStatus().toString());
        response.setInstantBooking(ride.isInstantBooking());

        // Set driver info
        RideResponse.DriverInfo driverInfo = new RideResponse.DriverInfo();
        driverInfo.setName(ride.getDriver().getFullName());
        driverInfo.setPhone(ride.getDriver().getPhone());
        driverInfo.setRating(ride.getDriver().getRating());
        driverInfo.setTotalTrips(ride.getDriver().getTotalRides());
        response.setDriver(driverInfo);

        // Set route info
        RideResponse.RouteInfo routeInfo = new RideResponse.RouteInfo();
        routeInfo.setFrom(ride.getFromLocation());
        routeInfo.setTo(ride.getToLocation());
        response.setRoute(routeInfo);

        return response;
    }
    
    /**
     * Updates existing booking amounts when ride price changes
     */
    private void updateExistingBookingAmounts(Long rideId, BigDecimal oldPrice, BigDecimal newPrice) {
        try {
            List<Booking> activeBookings = bookingRepository.findByRideIdAndStatus(rideId, BookingStatus.CONFIRMED);
            activeBookings.addAll(bookingRepository.findByRideIdAndStatus(rideId, BookingStatus.PENDING));
            
            for (Booking booking : activeBookings) {
                // Calculate new total amount
                BigDecimal newTotalAmount = newPrice.multiply(BigDecimal.valueOf(booking.getSeatsBooked()));
                booking.setTotalAmount(newTotalAmount);
                bookingRepository.save(booking);
                
                // TODO: Notify passenger about price change
                // TODO: If price increased significantly, may need passenger confirmation
            }
        } catch (Exception e) {
            // Log error but don't fail the ride update
            System.err.println("Failed to update booking amounts for ride " + rideId + ": " + e.getMessage());
        }
    }
}
