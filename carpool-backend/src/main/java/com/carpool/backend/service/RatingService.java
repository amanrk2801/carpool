package com.carpool.backend.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.carpool.backend.dto.request.RatingRequest;
import com.carpool.backend.dto.response.RatingResponse;
import com.carpool.backend.entity.Rating;
import com.carpool.backend.entity.Ride;
import com.carpool.backend.entity.User;
import com.carpool.backend.exception.ResourceNotFoundException;
import com.carpool.backend.exception.UnauthorizedException;
import com.carpool.backend.repository.RatingRepository;
import com.carpool.backend.repository.RideRepository;
import com.carpool.backend.repository.UserRepository;

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
        User rater = userRepository.findById(raterId)
                .orElseThrow(() -> new ResourceNotFoundException("Rater not found"));

        User ratee = userRepository.findById(request.getRateeId())
                .orElseThrow(() -> new ResourceNotFoundException("User to rate not found"));

        Ride ride = rideRepository.findById(request.getRideId())
                .orElseThrow(() -> new ResourceNotFoundException("Ride not found"));

        boolean isRaterInvolved = ride.getDriver().getId().equals(raterId) || 
                                 ride.getBookings().stream()
                                     .anyMatch(booking -> booking.getPassenger().getId().equals(raterId));

        if (!isRaterInvolved) {
            throw new UnauthorizedException("You can only rate users from rides you participated in");
        }

        boolean isRateeInvolved = ride.getDriver().getId().equals(request.getRateeId()) || 
                                 ride.getBookings().stream()
                                     .anyMatch(booking -> booking.getPassenger().getId().equals(request.getRateeId()));

        if (!isRateeInvolved) {
            throw new UnauthorizedException("You can only rate users who were part of this ride");
        }

        if (ratingRepository.existsByRideIdAndRaterId(request.getRideId(), raterId)) {
            throw new IllegalArgumentException("You have already rated this user for this ride");
        }

        Rating rating = new Rating(
                request.getRating(),
                request.getComment(),
                rater,
                ratee,
                ride
        );

        Rating savedRating = ratingRepository.save(rating);

        updateUserRating(ratee.getId());
        updateUserTotalRides(ratee.getId());

        return convertToResponse(savedRating);
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
        Long ridesAsDriver = rideRepository.countCompletedRidesByDriverId(userId);
        
        Long ridesAsPassenger = rideRepository.countCompletedBookingsByPassengerId(userId);
        
        int totalRides = ridesAsDriver.intValue() + ridesAsPassenger.intValue();
        
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.setTotalRides(totalRides);
        userRepository.save(user);
    }
    
    
    public List<RatingResponse> getRecentUserRatings(Long userId, int limit) {
        List<Rating> ratings = ratingRepository.findRecentRatingsByUserId(userId);
        return ratings.stream()
                .limit(limit)
                .map(this::convertToResponse)
                .collect(Collectors.toList());
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
