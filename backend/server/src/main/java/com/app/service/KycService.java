package com.app.service;

import com.app.dto.ApiResponse;
import com.app.dto.KycDetailsUpdateRequest;
import com.app.pojos.KycEntity;
import org.springframework.web.multipart.MultipartFile;

public interface KycService {
	
	 Long countKycUsers();
	
    KycEntity getKycRecordsByUserId(Long userId);
    public KycEntity updateKycDetails(Long id, KycDetailsUpdateRequest request);
    ApiResponse createKycRecord(KycDetailsUpdateRequest kyc);
}