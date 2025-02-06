package com.app.pojos;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Entity
@Table(name = "loans")
@Getter
@Setter
public class LoanEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "loan_id")
    private Long id;

    // Reference to user
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @Column(name = "loan_amount", nullable = false)
    private Double loanAmount;

    @Column(name = "emi_amount", nullable = false)
    private Double emiAmount;

    // Duration as a text (e.g., "1 year")
    @Column(name = "duration_months", nullable = false)
    private Integer duration;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @Column(name = "total_emi", nullable = false)
    private Integer totalEmi;

    @Column(name = "paid_emi", nullable = false)
    private Integer paidEmi;

    @Column(name = "remaining_emi", nullable = false)
    private Integer remainingEmi;

    @Column(name = "last_emi_date")
    private LocalDate lastEmiDate;

    @Column(name = "next_emi_date")
    private LocalDate nextEmiDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private LoanStatus status = LoanStatus.PENDING;
}
