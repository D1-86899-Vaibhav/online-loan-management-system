package com.app.service;

import com.app.dto.ApiResponse;
import com.app.dto.KycDetailsUpdateRequest;
import com.app.pojos.KycEntity;
import com.app.repository.KycRepository;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class KycServiceImpl implements KycService {

	@Autowired
	private KycRepository kycRepository;

	@Autowired
	private ModelMapper mapper;

	@Override
	public KycEntity getKycRecordsByUserId(Long userId) {
		return kycRepository.findByUserId(userId);
	}

	@Override
	public ApiResponse createKycRecord(KycDetailsUpdateRequest dto) {
		try {
			KycEntity kyc = mapper.map(dto, KycEntity.class);
			kycRepository.save(kyc);
			return new ApiResponse("KYC record created successfully");
		} catch (Exception e) {
			e.printStackTrace();
			return new ApiResponse("Failed to create KYC record: " + e.getMessage());
		}
	}

	@Override
	public Long countKycUsers() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public KycEntity updateKycDetails(Long id, KycDetailsUpdateRequest request) {
		// TODO Auto-generated method stub
		return null;
	}
}
