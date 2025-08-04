package com.carpool.service;

// NOTE: Email service is commented out for local testing
// Uncomment when email dependencies are added back to pom.xml

/*
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username:noreply@carpool.com}")
    private String fromEmail;

    public void sendWelcomeEmail(String toEmail, String userName) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject("Welcome to CarpoolConnect!");
            message.setText(String.format(
                "Hi %s,\n\n" +
                "Welcome to CarpoolConnect! Your account has been created successfully.\n\n" +
                "You can now:\n" +
                "- Search for rides across India\n" +
                "- Offer rides to fellow travelers\n" +
                "- Build your carpool community\n\n" +
                "Start your journey with safe and affordable travel!\n\n" +
                "Best regards,\n" +
                "The CarpoolConnect Team",
                userName
            ));

            mailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException("Failed to send welcome email", e);
        }
    }

    public void sendPasswordResetEmail(String toEmail, String userName, String resetToken) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject("Password Reset - CarpoolConnect");
            message.setText(String.format(
                "Hi %s,\n\n" +
                "You requested to reset your password for your CarpoolConnect account.\n\n" +
                "Please use the following token to reset your password:\n" +
                "%s\n\n" +
                "If you didn't request this password reset, please ignore this email.\n\n" +
                "Best regards,\n" +
                "The CarpoolConnect Team",
                userName,
                resetToken
            ));

            mailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException("Failed to send password reset email", e);
        }
    }

    public void sendBookingConfirmationEmail(String toEmail, String userName, String rideDetails) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject("Booking Confirmation - CarpoolConnect");
            message.setText(String.format(
                "Hi %s,\n\n" +
                "Your booking has been confirmed!\n\n" +
                "Ride Details:\n%s\n\n" +
                "Please arrive at the pickup location on time.\n\n" +
                "Safe travels!\n\n" +
                "Best regards,\n" +
                "The CarpoolConnect Team",
                userName,
                rideDetails
            ));

            mailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException("Failed to send booking confirmation email", e);
        }
    }

    public void sendRideCancellationEmail(String toEmail, String userName, String rideDetails) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject("Ride Cancellation - CarpoolConnect");
            message.setText(String.format(
                "Hi %s,\n\n" +
                "Unfortunately, the following ride has been cancelled:\n\n" +
                "Ride Details:\n%s\n\n" +
                "If payment was made, a refund will be processed within 3-5 business days.\n\n" +
                "We apologize for any inconvenience caused.\n\n" +
                "Best regards,\n" +
                "The CarpoolConnect Team",
                userName,
                rideDetails
            ));

            mailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException("Failed to send ride cancellation email", e);
        }
    }
}
*/
