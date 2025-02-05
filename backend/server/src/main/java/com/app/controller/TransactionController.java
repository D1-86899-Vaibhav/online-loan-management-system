package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.app.dto.ApiResponse;
import com.app.pojos.TransactionEntity;
import com.app.security.JwtUtils;
import com.app.service.TransactionHistoryService;

import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

@RestController
@RequestMapping("/transactions")
@CrossOrigin(origins = "http://localhost:3000")
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
    public ApiResponse createTransaction(@RequestBody TransactionEntity transaction) {
        return transactionService.recordTransaction(transaction);
    }
}