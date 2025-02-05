package com.app.service;

import com.app.dto.ApiResponse;
import com.app.pojos.KycEntity;

public interface KycService {
    KycEntity getKycRecordsByUserId(Long userId);
    ApiResponse createKycRecord(KycEntity kyc);
}
