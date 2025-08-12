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
import com.carpool.backend.repository.BookingRepository;
import com.carpool.backend.repository.RideRepository;
import com.carpool.backend.repository.UserRepository;

@Service
@Transactional
public class RideService {

    @Autowired
    private RideRepository rideRepository;

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
