package com.carpool.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.carpool.backend.entity.Ride;

@Repository
public interface RideRepository extends JpaRepository<Ride, Long> {
	
}
