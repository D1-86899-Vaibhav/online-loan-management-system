package com.app.service;

import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class OtpService {

    private final Map<Long, String> otpStorage = new HashMap<>();
    private final Random random = new Random();

    public String generateOtp(Long userId) {
        String otp = String.format("%06d", random.nextInt(999999));
        otpStorage.put(userId, otp);
        return otp;
    }

    public boolean validateOtp(Long userId, String otp) {
        return otp.equals(otpStorage.get(userId));
    }

    public void removeOtp(Long userId) {
        otpStorage.remove(userId);
    }
}
