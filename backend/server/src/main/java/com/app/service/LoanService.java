package com.app.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.app.dto.ApiResponse;
import com.app.dto.LoanDetailsResp;
import com.app.dto.LoanSummaryResp;
import com.app.pojos.LoanEntity;

public interface LoanService {

	public List<LoanSummaryResp> getLoanSummaryByUserId(Long userId);
	public List<LoanDetailsResp> getLoansByUserId(Long userId);

//    List<Loan> getLoansByUserId(Long userId);
}