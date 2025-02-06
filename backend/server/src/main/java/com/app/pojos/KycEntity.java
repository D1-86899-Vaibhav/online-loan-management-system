package com.app.pojos;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "kyc_details")
public class KycEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Reference to the user
    @Column(name = "user_id", nullable = false)
    private Long userId;

    // Personal Information
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "date_of_birth")
    private LocalDate dob;

    @Column(name = "gender")
    private String gender;

    @Column(name = "father_name")
    private String fatherName;

    @Column(name = "mother_name")
    private String motherName;

    @Column(name = "marital_status")
    private String maritalStatus;

    // Permanent Address fields
    @Column(name = "permanent_street")
    private String permanentStreet;

    @Column(name = "permanent_city")
    private String permanentCity;

    @Column(name = "permanent_state")
    private String permanentState;

    @Column(name = "permanent_zip_code")
    private String permanentZipCode;

    // Correspondence Address fields
    @Column(name = "correspondence_street")
    private String correspondenceStreet;

    @Column(name = "correspondence_city")
    private String correspondenceCity;

    @Column(name = "correspondence_state")
    private String correspondenceState;

    @Column(name = "correspondence_zip_code")
    private String correspondenceZipCode;

    // Contact Information
    @Column(name = "phone")
    private String phone;

    @Column(name = "email")
    private String email;

    // Identity Proofs
    @Column(name = "pan_number")
    private String panNumber;

    @Column(name = "aadhaar_number")
    private String aadhaarNumber;

    @Column(name = "passport_number")
    private String passportNumber;

    @Column(name = "voter_id_number")
    private String voterIdNumber;

    @Column(name = "driving_license_number")
    private String drivingLicenseNumber;

    // For simplicity, we store file paths or URLs
    @Column(name = "aadhaar_card_image_path")
    private String aadhaarCardImagePath;

    @Column(name = "utility_bill_image_path")
    private String utilityBillImagePath;

    @Column(name = "rental_agreement_image_path")
    private String rentalAgreementImagePath;

    @Column(name = "passport_image_path")
    private String passportImagePath;

    // Financial Information
    @Column(name = "annual_income")
    private Double annualIncome;

    @Column(name = "source_of_income")
    private String sourceOfIncome;

    @Column(name = "occupation")
    private String occupation;

    @Column(name = "employer_name")
    private String employerName;

    // Banking Details
    @Column(name = "bank_account_number")
    private String bankAccountNumber;

    @Column(name = "ifsc_code")
    private String ifscCode;

    @Column(name = "account_type")
    private String accountType;

    // KYC Status
    @Enumerated(EnumType.STRING) // Store the Enum as String in the database
    @Column(name = "kyc_status")
    private KYCStatus kycStatus;

    // Default value in constructor (optional, but good practice to set initial status)
    @PrePersist // Before entity is persisted (saved for the first time)
    public void prePersist() {
        if (this.kycStatus == null) {
            this.kycStatus = KYCStatus.NOT_VERIFIED; // Default status when a new KYC is created
        }
    }
}