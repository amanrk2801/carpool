package com.carpool.backend.service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;

@Service
public class TwilioWhatsAppService {

    private static final Logger logger = LoggerFactory.getLogger(TwilioWhatsAppService.class);

    @Value("${twilio.account-sid}")
    private String accountSid;

    @Value("${twilio.auth-token}")
    private String authToken;

    @Value("${twilio.whatsapp-from}")
    private String whatsappFrom;

    @PostConstruct
    public void initTwilio() {
        if (accountSid == null || authToken == null || accountSid.isEmpty() || authToken.isEmpty()) {
            logger.warn("Twilio credentials not configured. WhatsApp messaging will not work.");
            return;
        }
        
        try {
            Twilio.init(accountSid, authToken);
            logger.info("Twilio WhatsApp service initialized successfully");
        } catch (Exception e) {
            logger.error("Failed to initialize Twilio: {}", e.getMessage());
        }
    }

    public boolean sendWhatsAppMessage(String toPhoneNumber, String messageBody) {
        if (accountSid == null || authToken == null || accountSid.isEmpty() || authToken.isEmpty()) {
            logger.warn("Twilio credentials not configured. Cannot send WhatsApp message.");
            return false;
        }

        try {
            // Format phone number for WhatsApp
            String formattedToNumber = formatPhoneNumber(toPhoneNumber);
            
            Message message = Message.creator(
                    new PhoneNumber("whatsapp:" + formattedToNumber),
                    new PhoneNumber(whatsappFrom),
                    messageBody
            ).create();

            logger.info("WhatsApp message sent successfully. SID: {}", message.getSid());
            return true;

        } catch (Exception e) {
            logger.error("Failed to send WhatsApp message to {}: {}", toPhoneNumber, e.getMessage());
            return false;
        }
    }

    public boolean sendRideNotification(String toPhoneNumber, String driverName, String pickupLocation, String destination, String departureTime) {
        String message = String.format(
            "🚗 *Carpool Ride Update*\n\n" +
            "Driver: %s\n" +
            "📍 Pickup: %s\n" +
            "🎯 Destination: %s\n" +
            "⏰ Departure: %s\n\n" +
            "Safe travels! 🛡️",
            driverName, pickupLocation, destination, departureTime
        );
        
        return sendWhatsAppMessage(toPhoneNumber, message);
    }

    public boolean sendBookingConfirmation(String toPhoneNumber, String passengerName, String pickupLocation, String destination, String departureTime) {
        String message = String.format(
            "✅ *Booking Confirmed*\n\n" +
            "Passenger: %s\n" +
            "📍 Pickup: %s\n" +
            "🎯 Destination: %s\n" +
            "⏰ Departure: %s\n\n" +
            "Thank you for choosing our carpool service! 🚗",
            passengerName, pickupLocation, destination, departureTime
        );
        
        return sendWhatsAppMessage(toPhoneNumber, message);
    }

    public boolean sendDriverMessage(String toPhoneNumber, String driverName, String message) {
        String formattedMessage = String.format(
            "💬 *Message from Driver %s*\n\n%s",
            driverName, message
        );
        
        return sendWhatsAppMessage(toPhoneNumber, formattedMessage);
    }

    public boolean sendPassengerMessage(String toPhoneNumber, String passengerName, String message) {
        String formattedMessage = String.format(
            "💬 *Message from Passenger %s*\n\n%s",
            passengerName, message
        );
        
        return sendWhatsAppMessage(toPhoneNumber, formattedMessage);
    }

    public boolean sendVerificationCode(String toPhoneNumber, String verificationCode) {
        String message = String.format(
            "🔐 *Carpool Verification*\n\n" +
            "Your verification code is: %s\n\n" +
            "Please enter this code to verify your account.\n" +
            "This code expires in 10 minutes.",
            verificationCode
        );
        
        return sendWhatsAppMessage(toPhoneNumber, message);
    }

    private String formatPhoneNumber(String phoneNumber) {
        // Remove any non-digit characters
        String cleanNumber = phoneNumber.replaceAll("[^0-9]", "");
        
        // If it doesn't start with country code, assume it's Indian number
        if (!cleanNumber.startsWith("91") && cleanNumber.length() == 10) {
            cleanNumber = "91" + cleanNumber;
        }
        
        // Add + if not present
        if (!cleanNumber.startsWith("+")) {
            cleanNumber = "+" + cleanNumber;
        }
        
        return cleanNumber;
    }
}
