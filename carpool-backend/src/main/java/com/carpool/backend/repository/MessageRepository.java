package com.carpool.backend.repository;

import com.carpool.backend.entity.Message;
import com.carpool.backend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

    // Get conversation between two users
    @Query("SELECT m FROM Message m WHERE " +
           "(m.sender = :user1 AND m.receiver = :user2) OR " +
           "(m.sender = :user2 AND m.receiver = :user1) " +
           "ORDER BY m.sentAt ASC")
    List<Message> findConversationBetweenUsers(@Param("user1") User user1, @Param("user2") User user2);

    // Get all conversations for a user (latest message from each conversation)
    @Query("SELECT m FROM Message m WHERE m.id IN (" +
           "SELECT MAX(m2.id) FROM Message m2 WHERE " +
           "m2.sender = :user OR m2.receiver = :user " +
           "GROUP BY CASE " +
           "WHEN m2.sender = :user THEN m2.receiver " +
           "ELSE m2.sender END) " +
           "ORDER BY m.sentAt DESC")
    Page<Message> findLatestConversationsForUser(@Param("user") User user, Pageable pageable);

    // Get unread messages for a user
    @Query("SELECT m FROM Message m WHERE m.receiver = :user AND m.isRead = false ORDER BY m.sentAt DESC")
    List<Message> findUnreadMessagesForUser(@Param("user") User user);

    // Count unread messages for a user
    @Query("SELECT COUNT(m) FROM Message m WHERE m.receiver = :user AND m.isRead = false")
    long countUnreadMessagesForUser(@Param("user") User user);

    // Get messages related to a specific ride
    @Query("SELECT m FROM Message m WHERE m.ride.id = :rideId ORDER BY m.sentAt ASC")
    List<Message> findMessagesByRideId(@Param("rideId") Long rideId);

    // Mark messages as read
    @Query("UPDATE Message m SET m.isRead = true WHERE m.receiver = :user AND m.sender = :sender AND m.isRead = false")
    void markMessagesAsRead(@Param("user") User user, @Param("sender") User sender);
}
