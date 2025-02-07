package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.app.dto.LoanActionRequest;
import com.app.dto.LoanDetailsResp;
import com.app.dto.LoanSummaryResp;
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

	
	//ADMIN SIDE
	 @PostMapping("/{loanId}/updateStatus")
	    public ResponseEntity<LoanDetailsResp> updateLoanStatus(@PathVariable Long loanId, @RequestBody LoanActionRequest loanActionRequest,HttpServletRequest request) {
		  // Validate JWT token and optionally check for admin privileges
	        String authHeader = request.getHeader("Authorization");
	        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	        }
	        String token = authHeader.substring(7);
	        jwtUtil.validateJwtToken(token);
	        // Optionally, check the user's roles to ensure admin access
		     LoanDetailsResp updatedLoan = loanService.updateLoanStatus(loanId, loanActionRequest.getAction());
		     return ResponseEntity.ok(updatedLoan);
	    }
	

	

	 
	// New endpoint for admin: Get all loans
	    @GetMapping("/all")
	    public ResponseEntity<List<LoanDetailsResp>> getAllLoans(HttpServletRequest request) {
	        // Validate JWT token and optionally check for admin privileges
	        String authHeader = request.getHeader("Authorization");
	        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	        }
	        String token = authHeader.substring(7);
	        jwtUtil.validateJwtToken(token);
	        // Optionally, check the user's roles to ensure admin access

	        List<LoanDetailsResp> loans = loanService.getAllLoanDetails();
	        return ResponseEntity.ok(loans);
	    }
}