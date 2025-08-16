package com.carpool.backend.controller;

import com.carpool.backend.service.TwilioWhatsAppService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/test")
public class TestController {

    @Autowired
    private TwilioWhatsAppService twilioWhatsAppService;

    @PostMapping("/send-whatsapp")
    public ResponseEntity<?> testWhatsApp(@RequestBody Map<String, String> request) {
        try {
            String phoneNumber = request.get("phoneNumber");
            String name = request.get("name");
            
            if (phoneNumber == null || name == null) {
                return ResponseEntity.badRequest()
                    .body(Map.of("success", false, "message", "Phone number and name are required"));
            }
            
            System.out.println("🔄 Testing WhatsApp message to: " + phoneNumber);
            String welcomeMessage = String.format(
                "🎉 Welcome to Carpool, %s!\n\nYour account has been created successfully. " +
                "You can now find rides or offer rides to fellow travelers.\n\n" +
                "Safe travels! 🚗",
                name
            );
            twilioWhatsAppService.sendWhatsAppMessage(phoneNumber, welcomeMessage);
            
            return ResponseEntity.ok()
                .body(Map.of("success", true, "message", "WhatsApp message sent successfully! Check logs for details."));
                
        } catch (Exception e) {
            System.err.println("❌ WhatsApp test failed: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.ok()
                .body(Map.of("success", false, "message", "WhatsApp test failed: " + e.getMessage()));
        }
    }
    
    @GetMapping("/whatsapp-config")
    public ResponseEntity<?> getWhatsAppConfig() {
        return ResponseEntity.ok()
            .body(Map.of(
                "success", true,
                "message", "Twilio WhatsApp service is configured",
                "note", "Set TWILIO_AUTH_TOKEN environment variable for real messaging",
                "setup_guide", "Visit: https://www.twilio.com/docs/whatsapp"
            ));
    }
}
