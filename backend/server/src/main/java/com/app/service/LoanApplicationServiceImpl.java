package com.app.service;


import com.app.pojos.LoanApplication;
import com.app.repository.LoanApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoanApplicationServiceImpl implements LoanApplicationService {

  @Autowired
  private LoanApplicationRepository loanApplicationRepository;

  public LoanApplication submitLoanApplication(LoanApplication loanApplication) {
    return loanApplicationRepository.save(loanApplication);
  }
}
