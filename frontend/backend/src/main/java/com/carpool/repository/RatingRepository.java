package com.carpool.repository;

import com.carpool.entity.Rating;
import com.carpool.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {

    // Find all ratings given to a specific user
    List<Rating> findByRateeId(Long rateeId);

    // Find all ratings given by a specific user
    List<Rating> findByRaterId(Long raterId);

    // Find rating for a specific ride and rater combination
    Optional<Rating> findByRideIdAndRaterId(Long rideId, Long raterId);

    // Check if a rating exists for a specific ride and rater
    boolean existsByRideIdAndRaterId(Long rideId, Long raterId);

    // Calculate average rating for a user
    @Query("SELECT AVG(r.rating) FROM Rating r WHERE r.ratee.id = :userId")
    BigDecimal findAverageRatingByUserId(@Param("userId") Long userId);

    // Count total ratings received by a user
    @Query("SELECT COUNT(r) FROM Rating r WHERE r.ratee.id = :userId")
    Long countRatingsByUserId(@Param("userId") Long userId);

    // Get recent ratings for a user (for display purposes)
    @Query("SELECT r FROM Rating r WHERE r.ratee.id = :userId ORDER BY r.createdAt DESC")
    List<Rating> findRecentRatingsByUserId(@Param("userId") Long userId);
}
