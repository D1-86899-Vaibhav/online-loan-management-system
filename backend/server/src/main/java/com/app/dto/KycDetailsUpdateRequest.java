package com.app.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class KycDetailsUpdateRequest {
    private Long userId;
    private String firstName;
    private String lastName;
    private LocalDate dob;          // Format: yyyy-MM-dd (use a date picker on frontend)
    private String gender;
    private String fatherName;
    private String motherName;
    private String maritalStatus;
    private String permanentStreet;
    private String permanentCity;
    private String permanentState;
    private String permanentZipCode;
    private String correspondenceStreet;
    private String correspondenceCity;
    private String correspondenceState;
    private String correspondenceZipCode;
    private String phone;
    private String email;
    private String panNumber;
    private String aadhaarNumber;
    private String passportNumber;
    private String voterIdNumber;
    private String drivingLicenseNumber;
    private Double annualIncome;
    private String sourceOfIncome;
    private String occupation;
    private String employerName;
    private String bankAccountNumber;
    private String ifscCode;
    private String accountType;
    private String otherSourceOfIncome;
    private String otherOccupation;
}
