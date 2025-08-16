package com.carpool.backend.controller;

import com.carpool.backend.entity.Message;
import com.carpool.backend.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/messages")
@CrossOrigin(origins = "*")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @PostMapping("/send")
    public ResponseEntity<?> sendMessage(
            @RequestBody Map<String, Object> request,
            Authentication authentication) {
        try {
            Long senderId = Long.valueOf(authentication.getName());
            Long receiverId = Long.valueOf(request.get("receiverId").toString());
            String messageText = request.get("message").toString();
            Long rideId = request.get("rideId") != null ? 
                Long.valueOf(request.get("rideId").toString()) : null;

            Message message = messageService.sendMessage(senderId, receiverId, messageText, rideId);

            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Message sent successfully",
                "data", Map.of(
                    "id", message.getId(),
                    "messageText", message.getMessageText(),
                    "sentAt", message.getSentAt()
                )
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Failed to send message: " + e.getMessage()
            ));
        }
    }

    @GetMapping("/conversation/{userId}")
    public ResponseEntity<?> getConversation(
            @PathVariable Long userId,
            Authentication authentication) {
        try {
            Long currentUserId = Long.valueOf(authentication.getName());
            List<Message> messages = messageService.getConversation(currentUserId, userId);

            // Mark messages as read
            messageService.markMessagesAsRead(currentUserId, userId);

            return ResponseEntity.ok(Map.of(
                "success", true,
                "data", messages.stream().map(msg -> Map.of(
                    "id", msg.getId(),
                    "senderId", msg.getSender().getId(),
                    "senderName", msg.getSender().getFirstName() + " " + msg.getSender().getLastName(),
                    "messageText", msg.getMessageText(),
                    "messageType", msg.getMessageType(),
                    "sentAt", msg.getSentAt(),
                    "isRead", msg.getIsRead()
                )).toList()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Failed to get conversation: " + e.getMessage()
            ));
        }
    }

    @GetMapping("/conversations")
    public ResponseEntity<?> getUserConversations(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            Authentication authentication) {
        try {
            Long userId = Long.valueOf(authentication.getName());
            Page<Message> conversations = messageService.getUserConversations(userId, page, size);

            return ResponseEntity.ok(Map.of(
                "success", true,
                "data", conversations.getContent().stream().map(msg -> {
                    // Determine the other user in the conversation
                    boolean isSender = msg.getSender().getId().equals(userId);
                    var otherUser = isSender ? msg.getReceiver() : msg.getSender();
                    
                    return Map.of(
                        "conversationWith", Map.of(
                            "id", otherUser.getId(),
                            "name", otherUser.getFirstName() + " " + otherUser.getLastName(),
                            "phone", otherUser.getPhone() != null ? otherUser.getPhone() : ""
                        ),
                        "lastMessage", Map.of(
                            "text", msg.getMessageText(),
                            "sentAt", msg.getSentAt(),
                            "isFromMe", isSender
                        ),
                        "rideId", msg.getRide() != null ? msg.getRide().getId() : null
                    );
                }).toList(),
                "pagination", Map.of(
                    "currentPage", conversations.getNumber(),
                    "totalPages", conversations.getTotalPages(),
                    "totalElements", conversations.getTotalElements()
                )
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Failed to get conversations: " + e.getMessage()
            ));
        }
    }

    @GetMapping("/unread")
    public ResponseEntity<?> getUnreadMessages(Authentication authentication) {
        try {
            Long userId = Long.valueOf(authentication.getName());
            List<Message> unreadMessages = messageService.getUnreadMessages(userId);

            return ResponseEntity.ok(Map.of(
                "success", true,
                "data", unreadMessages.stream().map(msg -> Map.of(
                    "id", msg.getId(),
                    "senderId", msg.getSender().getId(),
                    "senderName", msg.getSender().getFirstName() + " " + msg.getSender().getLastName(),
                    "messageText", msg.getMessageText(),
                    "sentAt", msg.getSentAt()
                )).toList()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Failed to get unread messages: " + e.getMessage()
            ));
        }
    }

    @GetMapping("/unread/count")
    public ResponseEntity<?> getUnreadMessageCount(Authentication authentication) {
        try {
            Long userId = Long.valueOf(authentication.getName());
            long count = messageService.getUnreadMessageCount(userId);

            return ResponseEntity.ok(Map.of(
                "success", true,
                "data", Map.of("unreadCount", count)
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Failed to get unread count: " + e.getMessage()
            ));
        }
    }

    @GetMapping("/ride/{rideId}")
    public ResponseEntity<?> getRideMessages(@PathVariable Long rideId) {
        try {
            List<Message> messages = messageService.getRideMessages(rideId);

            return ResponseEntity.ok(Map.of(
                "success", true,
                "data", messages.stream().map(msg -> Map.of(
                    "id", msg.getId(),
                    "senderId", msg.getSender().getId(),
                    "senderName", msg.getSender().getFirstName() + " " + msg.getSender().getLastName(),
                    "messageText", msg.getMessageText(),
                    "messageType", msg.getMessageType(),
                    "sentAt", msg.getSentAt()
                )).toList()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Failed to get ride messages: " + e.getMessage()
            ));
        }
    }
}
