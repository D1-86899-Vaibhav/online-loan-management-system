package com.app.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class LoanApplicationRequest {

	private Double loanAmount;
	private String loanPurpose;
	private Integer loanPeriod;
	private Double interestRate;

}
