package com.carpool.backend.repository;

import com.carpool.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findByPhone(String phone);

    boolean existsByEmail(String email);

    boolean existsByPhone(String phone);

    List<User> findByIsDriverTrue();

    List<User> findByIsVerifiedTrue();

    @Query("SELECT u FROM User u WHERE u.location LIKE %:location%")
    List<User> findByLocationContaining(@Param("location") String location);

    @Query("SELECT u FROM User u WHERE u.rating >= :rating ORDER BY u.rating DESC")
    List<User> findByRatingGreaterThanEqual(@Param("rating") Double rating);

    @Query("SELECT u FROM User u WHERE u.firstName LIKE %:name% OR u.lastName LIKE %:name%")
    List<User> findByNameContaining(@Param("name") String name);

    @Query("SELECT COUNT(u) FROM User u WHERE u.isDriver = true")
    long countDrivers();

    @Query("SELECT COUNT(u) FROM User u WHERE u.isVerified = true")
    long countVerifiedUsers();

    @Query("SELECT AVG(u.rating) FROM User u WHERE u.rating > 0")
    Double getAverageRating();
}

