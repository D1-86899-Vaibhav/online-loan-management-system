package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.LoanApplication;

public interface LoanApplicationRepository extends JpaRepository<LoanApplication, Long> {
  // Custom queries can be added if needed
}
