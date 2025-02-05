package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.app.dto.ApiResponse;
import com.app.pojos.LoanEntity;
import com.app.service.LoanService;

import java.util.List;

@RestController
@RequestMapping("/loans")
public class LoanController {
    @Autowired
    private LoanService loanService;

    @GetMapping("/user/{userId}")
    public List<LoanEntity> getLoansByUserId(@PathVariable Long userId) {
        return loanService.getLoansByUserId(userId);
    }

    @PostMapping
    public ApiResponse createLoan(@RequestBody LoanEntity loan) {
        return loanService.createLoan(loan);
    }
}