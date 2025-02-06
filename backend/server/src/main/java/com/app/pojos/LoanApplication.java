package com.app.pojos;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Entity
@Table(name = "loan_applications")
@Getter
@Setter
public class LoanApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true)
    private UserEntity user;

    // Loan Details
    @Column(name = "loan_amount")
    private Double loanAmount;

    @Column(name = "loan_purpose")
    private String loanPurpose;



    @Column(name = "loan_period")
    private Integer loanPeriod;

    @Column(name = "interest_rate")
    private Double interestRate;

    // Application Status
    @Enumerated(EnumType.STRING)
    @Column(name = "application_status", nullable = false)
    private LoanApplicationStatus applicationStatus = LoanApplicationStatus.PENDING;
}
