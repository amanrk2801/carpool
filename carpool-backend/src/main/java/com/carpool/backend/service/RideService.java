package com.carpool.backend.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.carpool.backend.dto.response.RideResponse;
import com.carpool.backend.entity.Ride;
import com.carpool.backend.entity.User;
import com.carpool.backend.repository.RideRepository;
import com.carpool.backend.repository.UserRepository;

@Service
@Transactional
public class RideService {

    @Autowired
    private RideRepository rideRepository;
    
    @Autowired
    private UserRepository userRepository;

    public List<RideResponse> searchRides(String from, String to, LocalDate date, 
                                        Integer passengers, LocalTime time, BigDecimal maxPrice) {
        List<Ride> rides;
        
        if (time != null && maxPrice != null) {
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


    public List<RideResponse> filterRides(String from, String to, LocalDate startDate, LocalDate endDate,
                                        BigDecimal minPrice, BigDecimal maxPrice, Integer minSeats,
                                        int page, int size) {
        
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


    public List<RideResponse> getDriverRides(Long driverId) {
        User driver = userRepository.findById(driverId)
                .orElseThrow(() -> new RuntimeException("Driver not found"));

        List<Ride> rides = rideRepository.findByDriver(driver);
        return rides.stream()
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

        RideResponse.DriverInfo driverInfo = new RideResponse.DriverInfo();
        driverInfo.setName(ride.getDriver().getFullName());
        driverInfo.setPhone(ride.getDriver().getPhone());
        driverInfo.setRating(ride.getDriver().getRating());
        driverInfo.setTotalTrips(ride.getDriver().getTotalRides());
        response.setDriver(driverInfo);

        RideResponse.RouteInfo routeInfo = new RideResponse.RouteInfo();
        routeInfo.setFrom(ride.getFromLocation());
        routeInfo.setTo(ride.getToLocation());
        response.setRoute(routeInfo);

        return response;
    }
}
