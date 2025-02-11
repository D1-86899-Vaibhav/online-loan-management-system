package com.app.controller;

import com.app.dto.ApiResponse;
import com.app.dto.KycDetailsUpdateRequest;
import com.app.pojos.KycEntity;
import com.app.repository.KycRepository;
import com.app.service.KycService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/kyc")
@CrossOrigin(origins = "http://localhost:3000")
public class KYCController {

    @Autowired
    private KycRepository kycRepository;

    @PostMapping
    @Transactional
    public ResponseEntity<?> createKyc(@RequestBody KycEntity kyc) {
        // Set a default KYC status (for example, "PENDING")
        kyc.setKycStatus("PENDING");
        
        // Save the KYC record in the database
        KycEntity savedKyc = kycRepository.save(kyc);
        return ResponseEntity.ok(savedKyc);
    }
    
   
}

//public class KYCController {
//
//	@Autowired
//	private KycService kycService;
//
//	@PostMapping
//	public ResponseEntity<?> createKyc(@RequestBody KycDetailsUpdateRequest dto) {
//		// Map the DTO to the entity
////		KycEntity kyc = new KycEntity();
////		kyc.setUserId(dto.getUserId());
////		kyc.setFirstName(dto.getFirstName());
////		kyc.setLastName(dto.getLastName());
////		kyc.setDob(dto.getDob());
////		kyc.setGender(dto.getGender());
////		kyc.setFatherName(dto.getFatherName());
////		kyc.setMotherName(dto.getMotherName());
////		kyc.setMaritalStatus(dto.getMaritalStatus());
////		kyc.setPermanentStreet(dto.getPermanentStreet());
////		kyc.setPermanentCity(dto.getPermanentCity());
////		kyc.setPermanentState(dto.getPermanentState());
////		kyc.setPermanentZipCode(dto.getPermanentZipCode());
////		kyc.setCorrespondenceStreet(dto.getCorrespondenceStreet());
////		kyc.setCorrespondenceCity(dto.getCorrespondenceCity());
////		kyc.setCorrespondenceState(dto.getCorrespondenceState());
////		kyc.setCorrespondenceZipCode(dto.getCorrespondenceZipCode());
////		kyc.setPhone(dto.getPhone());
////		kyc.setEmail(dto.getEmail());
////		kyc.setPanNumber(dto.getPanNumber());
////		kyc.setAadhaarNumber(dto.getAadhaarNumber());
////		kyc.setPassportNumber(dto.getPassportNumber());
////		kyc.setVoterIdNumber(dto.getVoterIdNumber());
////		kyc.setDrivingLicenseNumber(dto.getDrivingLicenseNumber());
////		kyc.setAnnualIncome(dto.getAnnualIncome());
////		kyc.setSourceOfIncome(dto.getSourceOfIncome());
////		kyc.setOccupation(dto.getOccupation());
////		kyc.setEmployerName(dto.getEmployerName());
////		kyc.setBankAccountNumber(dto.getBankAccountNumber());
////		kyc.setIfscCode(dto.getIfscCode());
////		kyc.setAccountType(dto.getAccountType());
////		kyc.setOtherSourceOfIncome(dto.getOtherSourceOfIncome());
////		kyc.setOtherOccupation(dto.getOtherOccupation());
//
//		try {
//			ApiResponse response = kycService.createKycRecord(dto);
//			HttpStatus status = response.getMessage().contains("successfully") ? HttpStatus.CREATED
//					: HttpStatus.BAD_REQUEST;
//			return ResponseEntity.status(HttpStatus.OK).body("Done");
//		} catch (RuntimeException e) {
//			e.printStackTrace();
//			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
//		}
//		// Call the service to create the record
////        ApiResponse response = kycService.createKycRecord(kyc);
////        HttpStatus status = response.getMessage().contains("successfully") ? HttpStatus.CREATED : HttpStatus.BAD_REQUEST;
////        return new ResponseEntity<>(response, status);
//	}
//}
