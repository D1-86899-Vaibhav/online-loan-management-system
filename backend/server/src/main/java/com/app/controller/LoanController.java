package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.app.dto.LoanDetailsResp;
import com.app.dto.LoanSummaryResp;
import com.app.pojos.TransactionEntity;
import com.app.security.JwtUtils;
import com.app.service.LoanService;

import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

@RestController
@RequestMapping("/loans")
@CrossOrigin(origins = "http://localhost:3000")
public class LoanController {
	@Autowired
	private LoanService loanService;

	@Autowired
	private JwtUtils jwtUtil;

	@GetMapping("/summary")
	public ResponseEntity<List<LoanSummaryResp>> getLoanSummary(HttpServletRequest request) {
		String authHeader = request.getHeader("Authorization");
		String token = authHeader.substring(7); // Remove "Bearer " prefix

		Claims claims = jwtUtil.validateJwtToken(token);
		Long userId = jwtUtil.getUserIdFromJwtToken(claims);
		List<LoanSummaryResp> summary = loanService.getLoanSummaryByUserId(userId);

		return new ResponseEntity<>(summary, HttpStatus.OK);
	}
	
	@GetMapping("/details")
    public ResponseEntity<List<LoanDetailsResp>>  getLoanDetails(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        String token = authHeader.substring(7); // Remove "Bearer " prefix

        Claims claims = jwtUtil.validateJwtToken(token);
        Long userId = jwtUtil.getUserIdFromJwtToken(claims);
       
        List<LoanDetailsResp> loans = loanService.getLoansByUserId(userId);

        return ResponseEntity.ok(loans);
    }


}