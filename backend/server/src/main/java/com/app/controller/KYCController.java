package com.app.controller;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.ApiResponse;
import com.app.pojos.KycEntity;
import com.app.service.KycService;

@RestController
@RequestMapping("/kyc")
@CrossOrigin(origins = "http://localhost:3000")
public class KYCController {

    @Autowired
    private KycService kycService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getKYCByUserId(@PathVariable Long userId) {
        KycEntity kyc = kycService.getKycRecordsByUserId(userId);
        if (kyc != null) {
            return ResponseEntity.ok(kyc);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("KYC record not found for user ID: " + userId));
        }
    }

    @PostMapping(consumes = { "multipart/form-data" })
    public ResponseEntity<ApiResponse> createKYC(
            @RequestParam("userId") Long userId,
            @RequestParam("firstName") String firstName,
            @RequestParam("lastName") String lastName,
            @RequestParam(value = "dob", required = false) String dob, // LocalDate as String from frontend
            @RequestParam(value = "gender", required = false) String gender,
            @RequestParam(value = "fatherName", required = false) String fatherName,
            @RequestParam(value = "motherName", required = false) String motherName,
            @RequestParam(value = "maritalStatus", required = false) String maritalStatus,
            @RequestParam("permanentStreet") String permanentStreet,
            @RequestParam("permanentCity") String permanentCity,
            @RequestParam("permanentState") String permanentState,
            @RequestParam("permanentZipCode") String permanentZipCode,
            @RequestParam(value = "correspondenceStreet", required = false) String correspondenceStreet,
            @RequestParam(value = "correspondenceCity", required = false) String correspondenceCity,
            @RequestParam(value = "correspondenceState", required = false) String correspondenceState,
            @RequestParam(value = "correspondenceZipCode", required = false) String correspondenceZipCode,
            @RequestParam("phone") String phone,
            @RequestParam("email") String email,
            @RequestParam("panNumber") String panNumber,
            @RequestParam(value = "aadhaarNumber", required = false) String aadhaarNumber,
            @RequestParam(value = "passportNumber", required = false) String passportNumber,
            @RequestParam(value = "voterIdNumber", required = false) String voterIdNumber,
            @RequestParam(value = "drivingLicenseNumber", required = false) String drivingLicenseNumber,
            @RequestPart(value = "aadhaarCardImagePath", required = false) MultipartFile aadhaarCardImagePathFile,
            @RequestPart(value = "utilityBillImagePath", required = false) MultipartFile utilityBillImagePathFile,
            @RequestPart(value = "rentalAgreementImagePath", required = false) MultipartFile rentalAgreementImagePathFile,
            @RequestPart(value = "passportImagePath", required = false) MultipartFile passportImagePathFile,
            @RequestPart("panCardImage") MultipartFile panCardImageFile, // panCardImage is required in frontend validation
            @RequestParam("annualIncome") Double annualIncome,
            @RequestParam(value = "sourceOfIncome", required = false) String sourceOfIncome,
            @RequestParam(value = "occupation", required = false) String occupation,
            @RequestParam(value = "employerName", required = false) String employerName,
            @RequestParam("bankAccountNumber") String bankAccountNumber,
            @RequestParam("ifscCode") String ifscCode,
            @RequestParam(value = "accountType", required = false) String accountType
    ) {
        try {
            KycEntity kyc = new KycEntity();
            kyc.setUserId(userId);
            kyc.setFirstName(firstName);
            kyc.setLastName(lastName);
            if (dob != null && !dob.isEmpty()) {
                kyc.setDob(LocalDate.parse(dob)); // Parse date string to LocalDate
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

            // **Call the updated createKycRecord method in KycService, passing file parameters**
            ApiResponse response = kycService.createKycRecord(kyc, aadhaarCardImagePathFile, utilityBillImagePathFile, rentalAgreementImagePathFile, passportImagePathFile, panCardImageFile);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (Exception e) {
            System.err.println("Error creating KYC record: " + e.getMessage());
            e.printStackTrace(); // Print the full stack trace for debugging
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse("Error creating KYC record: " + e.getMessage()));
        }
    }
}