package com.carpool.backend.repository;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.carpool.backend.entity.Rating;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {

	boolean existsByRideIdAndRaterIdAndRateeId(Long rideId, Long raterId, Long rateeId);
	
	@Query("SELECT AVG(r.rating) FROM Rating r WHERE r.ratee.id = :userId")
    BigDecimal findAverageRatingByUserId(@Param("userId") Long userId);

	@Query("SELECT r FROM Rating r WHERE r.ratee.id = :userId ORDER BY r.createdAt DESC")
    List<Rating> findRecentRatingsByUserId(@Param("userId") Long userId);

    List<Rating> findByRateeId(Long rateeId);
}
