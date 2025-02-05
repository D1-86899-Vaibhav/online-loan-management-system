package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ApiResponse;
import com.app.pojos.TransactionEntity;
import com.app.security.JwtUtils;
import com.app.service.TransactionHistoryService;

import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/transactions")
public class TransactionController {
    @Autowired
    private TransactionHistoryService transactionService;

    @Autowired
    private JwtUtils jwtUtil;

    @GetMapping
    public List<TransactionEntity> getTransactionsByUserId(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        String token = authHeader.substring(7); // Remove "Bearer " prefix

        Claims claims = jwtUtil.validateJwtToken(token);
        Long userId = jwtUtil.getUserIdFromJwtToken(claims);

        return transactionService.getTransactionHistoryByUserId(userId);
    }
    @PostMapping
    public ApiResponse createTransaction(@RequestBody TransactionEntity transaction, HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        String token = authHeader.substring(7); // Remove "Bearer " prefix

        Claims claims = jwtUtil.validateJwtToken(token);
        Long userId = jwtUtil.getUserIdFromJwtToken(claims);

        // Set user ID in the transaction
        //transaction.setUser(userId);
        //transaction.setUser(userId);

        return transactionService.recordTransaction(transaction);
    }
}