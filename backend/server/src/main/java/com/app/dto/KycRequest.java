package com.app.dto;

import java.time.LocalDate;

import org.springframework.web.multipart.MultipartFile;

import com.app.pojos.KycEntity;

import lombok.Data;

@Data
public class KycRequest {
    private Long userId;
    private String firstName;
    private String lastName;
    private String dob;
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

    private MultipartFile aadhaarCardImagePathFile;
    private MultipartFile utilityBillImagePathFile;
    private MultipartFile rentalAgreementImagePathFile;
    private MultipartFile passportImagePathFile;
    private MultipartFile panCardImageFile;

    public KycEntity toEntity() {
        KycEntity kyc = new KycEntity();
        kyc.setUserId(userId);
        kyc.setFirstName(firstName);
        kyc.setLastName(lastName);
        if (dob != null && !dob.isEmpty()) {
            kyc.setDob(LocalDate.parse(dob));
        }
        kyc.setGender(gender);
        kyc.setFatherName(fatherName);
        kyc.setMotherName(motherName);
        kyc.setMaritalStatus(maritalStatus);
        kyc.setPermanentStreet(permanentStreet);
        kyc.setPermanentCity(permanentCity);
        kyc.setPermanentState(permanentState);
        kyc.setPermanentZipCode(permanentZipCode);
        kyc.setCorrespondenceStreet(correspondenceStreet);
        kyc.setCorrespondenceCity(correspondenceCity);
        kyc.setCorrespondenceState(correspondenceState);
        kyc.setCorrespondenceZipCode(correspondenceZipCode);
        kyc.setPhone(phone);
        kyc.setEmail(email);
        kyc.setPanNumber(panNumber);
        kyc.setAadhaarNumber(aadhaarNumber);
        kyc.setPassportNumber(passportNumber);
        kyc.setVoterIdNumber(voterIdNumber);
        kyc.setDrivingLicenseNumber(drivingLicenseNumber);
        kyc.setAnnualIncome(annualIncome);
        kyc.setSourceOfIncome(sourceOfIncome);
        kyc.setOccupation(occupation);
        kyc.setEmployerName(employerName);
        kyc.setBankAccountNumber(bankAccountNumber);
        kyc.setIfscCode(ifscCode);
        kyc.setAccountType(accountType);
        return kyc;
    }
}

