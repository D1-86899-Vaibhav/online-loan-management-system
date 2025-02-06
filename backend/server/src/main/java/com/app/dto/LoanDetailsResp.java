package com.app.dto;

import java.time.LocalDate;

import com.app.pojos.LoanEntity;
import com.app.pojos.LoanStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoanDetailsResp {

	 private Long id;
	    private Double loanAmount;
	    private Double emiAmount;
	    private Integer duration;
	    private LocalDate startDate;
	    private LocalDate endDate;
	    private Integer totalEMI;
	    private Integer paidEMI;
	    private Integer remainingEMI;
	    private LocalDate lastEMIDate;
	    private LocalDate nextEMIDate;
	    private String status;
	    
	    // Constructor matching the query
	    public LoanDetailsResp(Long id, Double loanAmount, Double emiAmount, Integer duration,
	                           LocalDate startDate, LocalDate endDate, Integer totalEmi,
	                           Integer paidEmi, Integer remainingEmi, LocalDate lastEmiDate,
	                           LocalDate nextEmiDate, LoanStatus status) {
	        this.id = id;
	        this.loanAmount = loanAmount;
	        this.emiAmount = emiAmount;
	        this.duration = duration;
	        this.startDate = startDate;
	        this.endDate = endDate;
	        this.totalEMI = totalEmi;
	        this.paidEMI = paidEmi;
	        this.remainingEMI = remainingEmi;
	        this.lastEMIDate = lastEmiDate;
	        this.nextEMIDate = nextEmiDate;
	        this.status = status.name();
	    }

	    
}
