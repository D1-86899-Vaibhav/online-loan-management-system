package com.app.service;

import com.app.dto.ApiResponse;
import com.app.pojos.KycEntity;
import com.app.repository.KycRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class KycServiceImpl implements KycService {

    @Autowired
    private KycRepository kycRepository;

    @Override
    public KycEntity getKycRecordsByUserId(Long userId) {
        return kycRepository.findByUserId(userId);
    }

    @Override
    public ApiResponse createKycRecord(KycEntity kyc) {
    	KycEntity savedKyc = kycRepository.save(kyc);
        return new ApiResponse("KYC record created with ID " + savedKyc.getId());
    }
}
