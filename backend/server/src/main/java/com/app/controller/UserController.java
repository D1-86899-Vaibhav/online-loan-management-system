package com.app.controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;

import com.app.dto.*;
import com.app.pojos.UserEntity;
import com.app.repository.WalletRepository;
import com.app.security.CustomUserDetailsImpl;
import com.app.security.JwtUtils;
import com.app.service.EmailService;
import com.app.service.OtpService;
import com.app.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private JwtUtils jwtUtils;
    
    @Autowired
    private WalletRepository walletRepository;

    @Autowired
    private OtpService otpService;

    @Autowired
    private EmailService emailService;

    /*
     * User registration endpoint.
     * URL - /users/register
     */
    @PostMapping("/register")
    @Operation(description = "User register")
    public ResponseEntity<?> registerUser(@RequestBody @Valid UserDTO dto) {
        System.out.println("Registering user: " + dto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(userService.registerNewUser(dto));
    }
    
    /*
     * User login endpoint (Step 1)
     * URL - /users/login
     */
    @PostMapping("/login")
    @Operation(description = "User login with email & password, then send OTP")
    public ResponseEntity<?> userSignIn(@RequestBody @Valid AuthRequest dto) {
        System.out.println("User attempting login: " + dto);

        // Authenticate user credentials
        Authentication authToken = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword()));

        // Get authenticated user details
        UserEntity user = ((CustomUserDetailsImpl) authToken.getPrincipal()).getUserEntity();

        // Generate temporary token (tempToken) for OTP verification
        String tempToken = jwtUtils.generateTempToken(user.getId());  // Ensure using generateTempToken
        System.out.println("Generated TempToken: " + tempToken);

        // Generate OTP & send it via email
        String otp = otpService.generateOtp(user.getId());
        emailService.sendOtpEmail(user.getEmail(), otp);

        // Return tempToken, userId & role for OTP verification step
        return ResponseEntity.status(HttpStatus.OK)
                .body(new AuthResp("OTP sent to your email", tempToken, user.getRole().name()));
    }

    /*
     * OTP verification endpoint (Step 2)
     * URL - /users/verify-otp
     */
    @PostMapping("/verify-otp")
    @Operation(description = "Verify OTP and issue final auth token")
    public ResponseEntity<?> verifyOtp(@RequestBody @Valid OtpRequest otpRequest) {
        System.out.println("Verifying OTP for user: " + otpRequest.getUserId());

        // Validate the OTP
        boolean isValid = otpService.validateOtp(otpRequest.getUserId(), otpRequest.getOtp());

        if (isValid) {
            // Remove OTP after successful verification
            otpService.removeOtp(otpRequest.getUserId());

            // Fetch user details
            UserEntity user = userService.findById(otpRequest.getUserId());

            // Get the user's role as a List<String>
            List<String> userRoles = List.of(user.getRole().name()); // Assuming `getRole()` returns an ENUM

            // Generate final JWT token with roles
            String authToken = jwtUtils.generateFinalToken(user.getId(), userRoles);

            System.out.println("Generated Auth Token: " + authToken);

            return ResponseEntity.ok(new AuthResp("OTP Verified Successfully", authToken, user.getRole().name()));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse("Invalid OTP"));
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestBody @Valid UserDTO user) {
        System.out.println("Updating user profile: " + user);
        ApiResponse response = userService.updateUser(user);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody PasswordChangeRequest changePasswordRequest) {
        try {
            userService.changePassword(changePasswordRequest);
            return ResponseEntity.ok().body(new ApiResponse("Password changed successfully!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(e.getMessage()));
        }
    }
}
