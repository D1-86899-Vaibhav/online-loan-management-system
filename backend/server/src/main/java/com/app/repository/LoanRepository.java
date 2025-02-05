package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.app.dto.LoanDetailsResp;
import com.app.dto.LoanSummaryResp;
import com.app.pojos.LoanEntity;

@Repository
public interface LoanRepository extends JpaRepository<LoanEntity, Long> {
	

	@Query("SELECT new com.app.dto.LoanSummaryResp(l.status, COUNT(l), SUM(l.loanAmount)) "
			+ "FROM LoanEntity l WHERE l.id = :userId GROUP BY l.status")
	List<LoanSummaryResp> findLoanSummaryByUserId(@Param("userId") Long userId);

	
	
	// Fetch loan details by user ID
    @Query("SELECT new com.app.dto.LoanDetailsResp(" +
           "l.id, l.loanAmount, l.emiAmount, l.duration, l.startDate, l.endDate, " +
           "l.totalEmi, l.paidEmi, l.remainingEmi, l.lastEmiDate, l.nextEmiDate, l.status) " +
           "FROM LoanEntity l WHERE l.user.id = :userId")
    List<LoanDetailsResp> findLoanDetailsByUserId(@Param("userId") Long userId);
}
