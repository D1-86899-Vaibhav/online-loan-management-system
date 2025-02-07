package com.app.service;

import com.app.dto.ApiResponse;
import com.app.dto.KycDetailsUpdateRequest;
import com.app.pojos.KycEntity;
import org.springframework.web.multipart.MultipartFile;

public interface KycService {
	
	
	
    KycEntity getKycRecordsByUserId(Long userId);
    public KycEntity updateKycDetails(Long id, KycDetailsUpdateRequest request);
    ApiResponse createKycRecord(KycEntity kyc,
                                MultipartFile aadhaarCardImagePathFile,
                                MultipartFile utilityBillImagePathFile,
                                MultipartFile rentalAgreementImagePathFile,
                                MultipartFile passportImagePathFile,
                                MultipartFile panCardImageFile);
}