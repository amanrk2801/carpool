package com.carpool.service;

import com.carpool.dto.request.RatingRequest;
import com.carpool.dto.response.RatingResponse;
import com.carpool.entity.Rating;
import com.carpool.entity.Ride;
import com.carpool.entity.User;
import com.carpool.exception.ResourceNotFoundException;
import com.carpool.exception.UnauthorizedException;
import com.carpool.repository.RatingRepository;
import com.carpool.repository.RideRepository;
import com.carpool.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RatingService {

    @Autowired
    private RatingRepository ratingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RideRepository rideRepository;

    @Transactional
    public RatingResponse createRating(RatingRequest request, Long raterId) {
        // Validate rater exists
        User rater = userRepository.findById(raterId)
                .orElseThrow(() -> new ResourceNotFoundException("Rater not found"));

        // Validate ratee exists
        User ratee = userRepository.findById(request.getRateeId())
                .orElseThrow(() -> new ResourceNotFoundException("User to rate not found"));

        // Validate ride exists
        Ride ride = rideRepository.findById(request.getRideId())
                .orElseThrow(() -> new ResourceNotFoundException("Ride not found"));

        // Validate that the rater was part of this ride
        boolean isRaterInvolved = ride.getDriver().getId().equals(raterId) || 
                                 ride.getBookings().stream()
                                     .anyMatch(booking -> booking.getPassenger().getId().equals(raterId));

        if (!isRaterInvolved) {
            throw new UnauthorizedException("You can only rate users from rides you participated in");
        }

        // Validate that the ratee was part of this ride
        boolean isRateeInvolved = ride.getDriver().getId().equals(request.getRateeId()) || 
                                 ride.getBookings().stream()
                                     .anyMatch(booking -> booking.getPassenger().getId().equals(request.getRateeId()));

        if (!isRateeInvolved) {
            throw new UnauthorizedException("You can only rate users who were part of this ride");
        }

        // Check if rating already exists
        if (ratingRepository.existsByRideIdAndRaterId(request.getRideId(), raterId)) {
            throw new IllegalArgumentException("You have already rated this user for this ride");
        }

        // Create and save rating
        Rating rating = new Rating(
                request.getRating(),
                request.getComment(),
                rater,
                ratee,
                ride
        );

        Rating savedRating = ratingRepository.save(rating);

        // Update user's average rating and total rides
        updateUserRating(ratee.getId());
        updateUserTotalRides(ratee.getId());

        return convertToResponse(savedRating);
    }

    public List<RatingResponse> getUserRatings(Long userId) {
        List<Rating> ratings = ratingRepository.findByRateeId(userId);
        return ratings.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public List<RatingResponse> getRecentUserRatings(Long userId, int limit) {
        List<Rating> ratings = ratingRepository.findRecentRatingsByUserId(userId);
        return ratings.stream()
                .limit(limit)
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public void updateUserRating(Long userId) {
        BigDecimal avgRating = ratingRepository.findAverageRatingByUserId(userId);
        if (avgRating != null) {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new ResourceNotFoundException("User not found"));
            user.setRating(avgRating.setScale(1, RoundingMode.HALF_UP));
            userRepository.save(user);
        }
    }

    @Transactional
    public void updateUserTotalRides(Long userId) {
        // Count completed rides as driver
        Long ridesAsDriver = rideRepository.countCompletedRidesByDriverId(userId);
        
        // Count completed bookings as passenger
        Long ridesAsPassenger = rideRepository.countCompletedBookingsByPassengerId(userId);
        
        int totalRides = ridesAsDriver.intValue() + ridesAsPassenger.intValue();
        
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.setTotalRides(totalRides);
        userRepository.save(user);
    }

    private RatingResponse convertToResponse(Rating rating) {
        return new RatingResponse(
                rating.getId(),
                rating.getRating(),
                rating.getComment(),
                rating.getRater().getFirstName() + " " + rating.getRater().getLastName(),
                rating.getRatee().getFirstName() + " " + rating.getRatee().getLastName(),
                rating.getRide().getId(),
                rating.getCreatedAt()
        );
    }
}
