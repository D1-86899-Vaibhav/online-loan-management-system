package com.app.service;

import java.util.List;
import java.util.Map;

import com.app.dto.ApiResponse;
import com.app.pojos.LoanEntity;

public interface LoanService {

	List<LoanEntity> getLoansByUserId(Long userId);

	ApiResponse createLoan(LoanEntity loan);
    

    public Map<String, Object> getLoanStatusSummary(Long userId);
}