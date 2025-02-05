package com.app.controller;

import com.app.dto.AddFundsRequest;
import com.app.dto.WithdrawFundsRequest;
import com.app.service.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users/wallet")

@CrossOrigin(origins = "http://localhost:3000") // Specify React's URL
public class WalletController {

    @Autowired
    private WalletService walletService;

    @PostMapping("/add-funds")
    public ResponseEntity<String> addFunds(@RequestBody AddFundsRequest request, Authentication authentication) {
        // Retrieve the user ID from the credentials (set in JwtUtils).
        Long userId = (Long) authentication.getCredentials();
        walletService.addFunds(userId, request);
        return ResponseEntity.ok("Funds added successfully");
    }

    @PostMapping("/withdraw-funds")
    public ResponseEntity<String> withdrawFunds(@RequestBody WithdrawFundsRequest request, Authentication authentication) {
        // Retrieve the user ID from the credentials (set in JwtUtils).
        Long userId = (Long) authentication.getCredentials();
        boolean success = walletService.withdrawFunds(userId, request);
        if (success) {
            return ResponseEntity.ok("Funds withdrawn successfully");
        } else {
            return ResponseEntity.status(400).body("Insufficient funds");
        }
    }
}
