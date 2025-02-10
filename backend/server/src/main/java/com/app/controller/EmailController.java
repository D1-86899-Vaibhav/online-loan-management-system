package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.app.service.EmailService;

@RestController
@RequestMapping("/auth")
public class EmailController {

    @Autowired
    private EmailService emailService;

    /**
     * Endpoint to send OTP to a user's email.
     * 
     * @param email the user's email
     * @return ResponseEntity indicating the success or failure of sending OTP
     */
    @PostMapping("/send-otp")
    public ResponseEntity<String> sendOtp(@RequestParam String email) {
        boolean otpSent = emailService.generateOtp(email);
        if (otpSent) {
            return ResponseEntity.ok("OTP sent successfully.");
        }
        return ResponseEntity.badRequest().body("Failed to send OTP. Please try again.");
    }

    /**
     * Endpoint to verify OTP entered by the user.
     * 
     * @param email the user's email
     * @param otp   the OTP to verify
     * @return ResponseEntity indicating OTP verification success or failure
     */
    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOtp(@RequestParam String email, @RequestParam String otp) {
        boolean isValid = emailService.verifyOtp(email, otp);
        return isValid ? ResponseEntity.ok("OTP Verified successfully.") : ResponseEntity.badRequest().body("Invalid OTP.");
    }
}
