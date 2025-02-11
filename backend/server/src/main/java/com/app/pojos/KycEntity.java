package com.app.pojos;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;


//import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "kyc_details")
public class KycEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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

    // Permanent Address
    @Column(name = "permanent_street")
    private String permanentStreet;

    @Column(name = "permanent_city")
    private String permanentCity;

    @Column(name = "permanent_state")
    private String permanentState;

    @Column(name = "permanent_zip_code")
    private String permanentZipCode;

    // Correspondence Address
    @Column(name = "correspondence_street")
    private String correspondenceStreet;

    @Column(name = "correspondence_city")
    private String correspondenceCity;

    @Column(name = "correspondence_state")
    private String correspondenceState;

    @Column(name = "correspondence_zip_code")
    private String correspondenceZipCode;

    // Contact Details
    @Column(name = "phone")
    private String phone;

    @Column(name = "email")
    private String email;

    // Identity Details
    @Column(name = "pan_number")
    private String panNumber;

    @Column(name = "aadhaar_number")
    private String aadhaarNumber;

    // Financial Information
    @Column(name = "annual_income")
    private Double annualIncome;

    @Column(name = "source_of_income")
    private String sourceOfIncome;

    @Column(name = "occupation")
    private String occupation;

    @Column(name = "other_occupation")
    private String otherOccupation;

    @Column(name = "other_source_of_income")
    private String otherSourceOfIncome;

    @Column(name = "employer_name")
    private String employerName;

    // Banking Details
    @Column(name = "bank_name")
    private String bankName;

    @Column(name = "bank_account_number")
    private String bankAccountNumber;

    @Column(name = "ifsc_code")
    private String ifscCode;

    @Column(name = "account_type")
    private String accountType;

    // User Info and Status
    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "kyc_status")
    private String kycStatus;  // e.g., "NOT_VERIFIED", "PENDING", "VERIFIED", "REJECTED"

    // Getters and Setters
    // (You can generate these automatically with your IDE or use Lombok's @Data)
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }
    
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    // (Add similar getters/setters for all properties...)

    public String getLastName() {
        return lastName;
    }
    
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public LocalDate getDob() {
        return dob;
    }
    
    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public String getGender() {
        return gender;
    }
    
    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getFatherName() {
        return fatherName;
    }
    
    public void setFatherName(String fatherName) {
        this.fatherName = fatherName;
    }

    public String getMotherName() {
        return motherName;
    }
    
    public void setMotherName(String motherName) {
        this.motherName = motherName;
    }

    public String getMaritalStatus() {
        return maritalStatus;
    }
    
    public void setMaritalStatus(String maritalStatus) {
        this.maritalStatus = maritalStatus;
    }

    public String getPermanentStreet() {
        return permanentStreet;
    }
    
    public void setPermanentStreet(String permanentStreet) {
        this.permanentStreet = permanentStreet;
    }

    public String getPermanentCity() {
        return permanentCity;
    }
    
    public void setPermanentCity(String permanentCity) {
        this.permanentCity = permanentCity;
    }

    public String getPermanentState() {
        return permanentState;
    }
    
    public void setPermanentState(String permanentState) {
        this.permanentState = permanentState;
    }

    public String getPermanentZipCode() {
        return permanentZipCode;
    }
    
    public void setPermanentZipCode(String permanentZipCode) {
        this.permanentZipCode = permanentZipCode;
    }

    public String getCorrespondenceStreet() {
        return correspondenceStreet;
    }
    
    public void setCorrespondenceStreet(String correspondenceStreet) {
        this.correspondenceStreet = correspondenceStreet;
    }

    public String getCorrespondenceCity() {
        return correspondenceCity;
    }
    
    public void setCorrespondenceCity(String correspondenceCity) {
        this.correspondenceCity = correspondenceCity;
    }

    public String getCorrespondenceState() {
        return correspondenceState;
    }
    
    public void setCorrespondenceState(String correspondenceState) {
        this.correspondenceState = correspondenceState;
    }

    public String getCorrespondenceZipCode() {
        return correspondenceZipCode;
    }
    
    public void setCorrespondenceZipCode(String correspondenceZipCode) {
        this.correspondenceZipCode = correspondenceZipCode;
    }

    public String getPhone() {
        return phone;
    }
    
    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }

    public String getPanNumber() {
        return panNumber;
    }
    
    public void setPanNumber(String panNumber) {
        this.panNumber = panNumber;
    }

    public String getAadhaarNumber() {
        return aadhaarNumber;
    }
    
    public void setAadhaarNumber(String aadhaarNumber) {
        this.aadhaarNumber = aadhaarNumber;
    }

    public Double getAnnualIncome() {
        return annualIncome;
    }
    
    public void setAnnualIncome(Double annualIncome) {
        this.annualIncome = annualIncome;
    }

    public String getSourceOfIncome() {
        return sourceOfIncome;
    }
    
    public void setSourceOfIncome(String sourceOfIncome) {
        this.sourceOfIncome = sourceOfIncome;
    }

    public String getOccupation() {
        return occupation;
    }
    
    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    public String getOtherOccupation() {
        return otherOccupation;
    }
    
    public void setOtherOccupation(String otherOccupation) {
        this.otherOccupation = otherOccupation;
    }

    public String getOtherSourceOfIncome() {
        return otherSourceOfIncome;
    }
    
    public void setOtherSourceOfIncome(String otherSourceOfIncome) {
        this.otherSourceOfIncome = otherSourceOfIncome;
    }

    public String getEmployerName() {
        return employerName;
    }
    
    public void setEmployerName(String employerName) {
        this.employerName = employerName;
    }

    public String getBankName() {
        return bankName;
    }
    
    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public String getBankAccountNumber() {
        return bankAccountNumber;
    }
    
    public void setBankAccountNumber(String bankAccountNumber) {
        this.bankAccountNumber = bankAccountNumber;
    }

    public String getIfscCode() {
        return ifscCode;
    }
    
    public void setIfscCode(String ifscCode) {
        this.ifscCode = ifscCode;
    }

    public String getAccountType() {
        return accountType;
    }
    
    public void setAccountType(String accountType) {
        this.accountType = accountType;
    }

    public Long getUserId() {
        return userId;
    }
    
    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getKycStatus() {
        return kycStatus;
    }
    
    public void setKycStatus(String kycStatus) {
        this.kycStatus = kycStatus;
    }
}
