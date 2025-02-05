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

    // Personal Information
    @Column(name = "full_name")
    private String fullName;

    @Column(name = "email")
    private String email;

    @Column(name = "phone")
    private String phone;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(name = "gender")
    private String gender;

    @Column(name = "marital_status")
    private String maritalStatus;

    // Address details
    @Column(name = "address")
    private String address;

    @Column(name = "city")
    private String city;

    @Column(name = "state")
    private String state;

    @Column(name = "zip_code")
    private String zipCode;

    // Loan Details
    @Column(name = "loan_amount")
    private Double loanAmount;

    @Column(name = "loan_purpose")
    private String loanPurpose;

    @Column(name = "monthly_income")
    private Double monthlyIncome;

    @Column(name = "employment_status")
    private String employmentStatus;

    @Column(name = "loan_term")
    private String loanTerm;
}
