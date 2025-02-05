package com.app.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ApiResponse;
import com.app.dto.AuthRequest;
import com.app.dto.AuthResp;
import com.app.dto.UserDTO;
import com.app.pojos.UserEntity;
import com.app.security.JwtUtils;
import com.app.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/users")

@CrossOrigin(origins = "http://localhost:3000") // Specify React's URL
public class UserController {

    @Autowired
    private UserService userService;
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private JwtUtils jwtUtils;
    
    /*
     * User registration endpoint.
     * URL - /users/register
     */
    @PostMapping("/register")
    @Operation(description = "User register")
    public ResponseEntity<?> registerUser(@RequestBody @Valid UserDTO dto) {
        System.out.println("register user " + dto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(userService.registerNewUser(dto));
    }
    
    /*
     * User login endpoint.
     * URL - /users/login
     */
    @PostMapping("/login")
    @Operation(description = "User login")
    public ResponseEntity<?> userSignIn(@RequestBody @Valid AuthRequest dto) {
        System.out.println("in login " + dto);
        // Create authentication token using supplied email and password.
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword());
        // Authenticate the token using Spring Security.
        Authentication authToken = authenticationManager.authenticate(authenticationToken);
        // Generate and return the JWT.
        return ResponseEntity.status(HttpStatus.OK)
                .body(new AuthResp("Successful Auth!", jwtUtils.generateJwtToken(authToken)));
    }
    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestBody @Valid UserDTO user) {
        System.out.println("update user " + user);
        ApiResponse response = userService.updateUser(user);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
