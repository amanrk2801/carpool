package com.carpool.backend.service;

import com.carpool.backend.entity.Message;
import com.carpool.backend.entity.Ride;
import com.carpool.backend.entity.User;
import com.carpool.backend.repository.MessageRepository;
import com.carpool.backend.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class MessageService {

    private static final Logger logger = LoggerFactory.getLogger(MessageService.class);

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TwilioWhatsAppService twilioWhatsAppService;

    public Message sendMessage(Long senderId, Long receiverId, String messageText, Long rideId) {
        try {
            Optional<User> senderOpt = userRepository.findById(senderId);
            Optional<User> receiverOpt = userRepository.findById(receiverId);

            if (senderOpt.isEmpty() || receiverOpt.isEmpty()) {
                throw new RuntimeException("Sender or receiver not found");
            }

            User sender = senderOpt.get();
            User receiver = receiverOpt.get();

            // Save message to database
            Message message = new Message(sender, receiver, messageText);
            if (rideId != null) {
                // You'll need to fetch the ride entity if needed
                // message.setRide(rideService.findById(rideId));
            }

            Message savedMessage = messageRepository.save(message);

            // Send WhatsApp notification to receiver
            if (receiver.getPhone() != null && !receiver.getPhone().isEmpty()) {
                if (sender.getIsDriver()) {
                    twilioWhatsAppService.sendDriverMessage(receiver.getPhone(), 
                        sender.getFirstName() + " " + sender.getLastName(), messageText);
                } else {
                    twilioWhatsAppService.sendPassengerMessage(receiver.getPhone(), 
                        sender.getFirstName() + " " + sender.getLastName(), messageText);
                }
            }

            logger.info("Message sent from user {} to user {}", senderId, receiverId);
            return savedMessage;

        } catch (Exception e) {
            logger.error("Failed to send message from user {} to user {}", senderId, receiverId, e);
            throw new RuntimeException("Failed to send message: " + e.getMessage());
        }
    }

    public List<Message> getConversation(Long userId1, Long userId2) {
        Optional<User> user1Opt = userRepository.findById(userId1);
        Optional<User> user2Opt = userRepository.findById(userId2);

        if (user1Opt.isEmpty() || user2Opt.isEmpty()) {
            throw new RuntimeException("One or both users not found");
        }

        return messageRepository.findConversationBetweenUsers(user1Opt.get(), user2Opt.get());
    }

    public Page<Message> getUserConversations(Long userId, int page, int size) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        Pageable pageable = PageRequest.of(page, size);
        return messageRepository.findLatestConversationsForUser(userOpt.get(), pageable);
    }

    public List<Message> getUnreadMessages(Long userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        return messageRepository.findUnreadMessagesForUser(userOpt.get());
    }

    public long getUnreadMessageCount(Long userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            return 0;
        }

        return messageRepository.countUnreadMessagesForUser(userOpt.get());
    }

    @Transactional
    public void markMessagesAsRead(Long userId, Long senderId) {
        Optional<User> userOpt = userRepository.findById(userId);
        Optional<User> senderOpt = userRepository.findById(senderId);

        if (userOpt.isPresent() && senderOpt.isPresent()) {
            messageRepository.markMessagesAsRead(userOpt.get(), senderOpt.get());
        }
    }

    public List<Message> getRideMessages(Long rideId) {
        return messageRepository.findMessagesByRideId(rideId);
    }

    // Send ride-related notifications
    public void sendRideRequestNotification(User driver, User passenger, Ride ride) {
        String message = String.format(
            "🚗 *New Ride Request*\n\n" +
            "Passenger: %s\n" +
            "📍 From: %s\n" +
            "🎯 To: %s\n" +
            "📅 Date: %s\n" +
            "⏰ Time: %s\n" +
            "💰 Price: ₹%s\n\n" +
            "Please check your app to accept or decline this request.",
            passenger.getFirstName() + " " + passenger.getLastName(),
            ride.getFromLocation(),
            ride.getToLocation(),
            ride.getDepartureDate(),
            ride.getDepartureTime(),
            ride.getPricePerSeat()
        );

        twilioWhatsAppService.sendWhatsAppMessage(driver.getPhone(), message);
    }

    public void sendBookingConfirmationNotification(User passenger, Ride ride) {
        String message = String.format(
            "✅ *Booking Confirmed*\n\n" +
            "Your ride has been confirmed!\n\n" +
            "📍 From: %s\n" +
            "🎯 To: %s\n" +
            "📅 Date: %s\n" +
            "⏰ Time: %s\n" +
            "🚗 Driver: %s\n" +
            "💰 Price: ₹%s\n\n" +
            "Have a safe journey! 🛡️",
            ride.getFromLocation(),
            ride.getToLocation(),
            ride.getDepartureDate(),
            ride.getDepartureTime(),
            ride.getDriver().getFirstName() + " " + ride.getDriver().getLastName(),
            ride.getPricePerSeat()
        );

        twilioWhatsAppService.sendWhatsAppMessage(passenger.getPhone(), message);
    }
}
