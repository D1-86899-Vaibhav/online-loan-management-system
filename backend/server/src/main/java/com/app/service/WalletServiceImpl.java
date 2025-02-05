package com.app.service;

import com.app.custom_exceptions.ApiException;
import com.app.dto.AddFundsRequest;
import com.app.dto.ApiResponse;
import com.app.dto.WithdrawFundsRequest;
import com.app.pojos.WalletEntity;
import com.app.repository.WalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class WalletServiceImpl implements WalletService {

    @Autowired
    private WalletRepository walletRepository;

    @Override
    public void addFunds(Long userId, AddFundsRequest request) {
        WalletEntity wallet = walletRepository.findByUserId(userId)
                .orElseThrow(() -> new ApiException("Wallet not found for user ID " + userId));
        wallet.setBalance(wallet.getBalance() + request.getAmount());
        walletRepository.save(wallet);
    }

    @Override
    public boolean withdrawFunds(Long userId, WithdrawFundsRequest request) {
        WalletEntity wallet = walletRepository.findByUserId(userId)
                .orElseThrow(() -> new ApiException("Wallet not found for user ID " + userId));
        if (wallet.getBalance() >= request.getAmount()) {
            wallet.setBalance(wallet.getBalance() - request.getAmount());
            walletRepository.save(wallet);
            return true;
        }
        return false;
    }

    @Override
    public WalletEntity getWalletByUserId(Long userId) {
        return walletRepository.findByUserId(userId)
                .orElseThrow(() -> new ApiException("Wallet not found for user ID " + userId));
    }

    @Override
    public ApiResponse updateWallet(WalletEntity wallet) {
        WalletEntity updatedWallet = walletRepository.save(wallet);
        return new ApiResponse("Wallet updated with ID " + updatedWallet.getId());
    }
}
