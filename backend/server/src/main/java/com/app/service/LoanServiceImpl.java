package com.app.service;

import com.app.dto.ApiResponse;
import com.app.dto.LoanDetailsResp;
import com.app.dto.LoanSummaryResp;
import com.app.pojos.LoanEntity;
import com.app.pojos.LoanStatus;
import com.app.repository.LoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
public class LoanServiceImpl implements LoanService {

	@Autowired
	private LoanRepository loanRepository;

	public List<LoanSummaryResp> getLoanSummaryByUserId(Long userId) {
        // Fetch existing summaries from the repository
        List<LoanSummaryResp> summaries = loanRepository.findLoanSummaryByUserId(userId);

        // Convert the list to a map for easy lookup
        Map<String, LoanSummaryResp> summaryMap = new HashMap<>();
        for (LoanSummaryResp summary : summaries) {
            summaryMap.put(summary.getStatus(), summary);
        }

        // Create a list to hold the final results
        List<LoanSummaryResp> finalSummaries = new ArrayList<>();

        // Loop through all possible statuses
        for (LoanStatus status : LoanStatus.values()) {
            LoanSummaryResp summary = summaryMap.get(status.name());
            if (summary == null) {
                // Create a new summary with zero count and zero totalAmount
                summary = new LoanSummaryResp(status, 0L, 0.0);
            }
            finalSummaries.add(summary);
        }

        return finalSummaries;
    }

	@Override
	public List<LoanDetailsResp> getLoansByUserId(Long userId) {
		return loanRepository.findLoanDetailsByUserId(userId);
	}
	
	
	

}
