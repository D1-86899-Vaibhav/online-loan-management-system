package com.app.service;

import com.app.dto.ApiResponse;
import com.app.pojos.LoanEntity;
import com.app.repository.LoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
public class LoanServiceImpl implements LoanService {

	@Autowired
	private LoanRepository loanRepository;

	@Override
	public List<LoanEntity> getLoansByUserId(Long userId) {
		return loanRepository.findByUserId(userId);
	}

	@Override
	public ApiResponse createLoan(LoanEntity loan) {
		LoanEntity savedLoan = loanRepository.save(loan);
		return new ApiResponse("Loan created with ID " + savedLoan.getId());
	}

	@Override
	public Map<String, Object> getLoanStatusSummary(Long userId) {
		List<LoanEntity> loans = loanRepository.findByUserId(userId);

		Map<String, Long> countByStatus = loans.stream()
				.collect(Collectors.groupingBy(loan -> loan.getStatus().name(), Collectors.counting()));

		Map<String, Double> totalAmountByStatus = loans.stream().collect(Collectors
				.groupingBy(loan -> loan.getStatus().name(), Collectors.summingDouble(LoanEntity::getLoanAmount)));

		return Map.of("countByStatus", countByStatus, "totalAmountByStatus", totalAmountByStatus);
	}
}
