package com.carpool.backend.service;

import com.carpool.backend.dto.request.ProfileUpdateRequest;
import com.carpool.backend.dto.response.UserResponse;
import com.carpool.backend.entity.User;
import com.carpool.backend.exception.ResourceNotFoundException;
import com.carpool.backend.exception.PhoneAlreadyExistsException;
import com.carpool.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserResponse getUserProfile(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));
        
        return mapToUserResponse(user);
    }

    public UserResponse updateUserProfile(Long userId, ProfileUpdateRequest request) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));

        // Check if phone number is being changed and if it's already taken by another user
        if (request.getPhone() != null && !request.getPhone().trim().isEmpty()) {
            String newPhone = request.getPhone().trim();
            // Only check for duplicates if the phone number is actually changing
            if (!newPhone.equals(user.getPhone())) {
                if (userRepository.existsByPhone(newPhone)) {
                    throw new PhoneAlreadyExistsException("Phone number is already registered to another user");
                }
            }
            user.setPhone(newPhone);
        }

        // Update other user fields
        if (request.getFirstName() != null && !request.getFirstName().trim().isEmpty()) {
            user.setFirstName(request.getFirstName().trim());
        }
        
        if (request.getLastName() != null && !request.getLastName().trim().isEmpty()) {
            user.setLastName(request.getLastName().trim());
        }
        
        if (request.getLocation() != null) {
            user.setLocation(request.getLocation().trim());
        }
        
        if (request.getBio() != null) {
            user.setBio(request.getBio().trim());
        }

        User updatedUser = userRepository.save(user);
        return mapToUserResponse(updatedUser);
    }

    public UserResponse getUserById(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));
        
        return mapToUserResponse(user);
    }

    public void deleteUserAccount(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));
        
        // TODO: Add logic to handle cascading deletes for related entities
        // (rides, bookings, ratings, etc.) before deleting the user
        
        userRepository.delete(user);
    }

    private UserResponse mapToUserResponse(User user) {
        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setFirstName(user.getFirstName());
        response.setLastName(user.getLastName());
        response.setEmail(user.getEmail());
        response.setPhone(user.getPhone());
        response.setLocation(user.getLocation());
        response.setBio(user.getBio());
        response.setProfilePictureUrl(user.getProfilePictureUrl());
        response.setIsVerified(user.getIsVerified());
        response.setIsDriver(user.getIsDriver());
        response.setRating(user.getRating());
        response.setTotalRides(user.getTotalRides());
        response.setTotalEarnings(user.getTotalEarnings());
        
        return response;
    }
}
