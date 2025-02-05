
package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public KycEntity getKYCByUserId(@PathVariable Long userId) {
        return kycService.getKycRecordsByUserId(userId);
    }

    @PostMapping
    public ApiResponse createKYC(@RequestBody KycEntity kyc) {
        return kycService.createKycRecord(kyc);
    }
}