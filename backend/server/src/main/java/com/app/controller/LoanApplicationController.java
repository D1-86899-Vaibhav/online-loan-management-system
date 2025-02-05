package com.app.controller;

import com.app.pojos.LoanApplication;
import com.app.service.LoanApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/loan-applications")
@CrossOrigin(origins = "http://localhost:3000")
public class LoanApplicationController {

  @Autowired
  private LoanApplicationService loanApplicationService;

  @PostMapping
  public LoanApplication submitLoanApplication(@RequestBody LoanApplication loanApplication) {
    return loanApplicationService.submitLoanApplication(loanApplication);
  }
}
