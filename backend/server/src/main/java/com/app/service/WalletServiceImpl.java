package com.app.service;

import com.app.custom_exceptions.ApiException;
import com.app.dto.AddFundsRequest;
import com.app.dto.ApiResponse;
import com.app.dto.CreditFundsRequest;
import com.app.dto.LoanDetailsResp;
import com.app.dto.WithdrawFundsRequest;
import com.app.pojos.LoanEntity;
import com.app.pojos.TransactionEntity;
import com.app.pojos.TransactionStatus;
import com.app.pojos.UserEntity;
import com.app.pojos.WalletEntity;
import com.app.repository.LoanRepository;
import com.app.repository.TransactionRepository;
import com.app.repository.UserRepository;
import com.app.repository.WalletRepository;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class WalletServiceImpl implements WalletService {

	@Autowired
	private WalletRepository walletRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private TransactionRepository transactionRepository;

	@Autowired
	private LoanRepository loanRepository;

	@Override
	public void addFunds(Long userId, AddFundsRequest request) {
		WalletEntity wallet = walletRepository.findByUserId(userId)
				.orElseThrow(() -> new ApiException("Wallet not found for user ID " + userId));
		wallet.setBalance(wallet.getBalance() + request.getAmount());// Record transaction
		Double amount = request.getAmount();
		System.out.println(amount);
		UserEntity user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
		TransactionEntity transaction = new TransactionEntity(wallet, user, amount, "Deposit",
				TransactionStatus.COMPLETED);
		System.out.println(transaction);
		transactionRepository.save(transaction);

		walletRepository.save(wallet);
	}

	@Override

	public boolean withdrawFunds(Long userId, WithdrawFundsRequest request) {
		WalletEntity wallet = walletRepository.findByUserId(userId)
				.orElseThrow(() -> new RuntimeException("Wallet not found"));
		Double amount = request.getAmount();
		if (wallet.getBalance().compareTo(amount) < 0) {
			// Record failed transaction
			UserEntity user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
			TransactionEntity transaction = new TransactionEntity(wallet, user, amount, "Withdraw",
					TransactionStatus.FAILED);
			transactionRepository.save(transaction);
			return false;
		}
		wallet.setBalance(wallet.getBalance() - (amount));

		// Record transaction
		UserEntity user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
		TransactionEntity transaction = new TransactionEntity(wallet, user, amount, "Withdraw",
				TransactionStatus.COMPLETED);
		transactionRepository.save(transaction);

		walletRepository.save(wallet);
		return true;
	}

	public WalletEntity payEmi(Long userId, Double emiAmount) {
	    WalletEntity wallet = walletRepository.findByUserId(userId)
	            .orElseThrow(() -> new RuntimeException("Wallet not found"));

	    if (wallet.getBalance().compareTo(emiAmount) < 0) {
	        throw new RuntimeException("Insufficient balance");
	    }

	    wallet.setBalance(wallet.getBalance() - emiAmount);
	    UserEntity user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
	    TransactionEntity transaction = new TransactionEntity(wallet, user, emiAmount, "Payment", TransactionStatus.COMPLETED);
	    transactionRepository.save(transaction);

	    LoanEntity loan = loanRepository.getReferenceById(userId);

	    // Update the existing instance of LoanEntity
	    loan.setPaidEmi(loan.getPaidEmi() + 1);
	    loan.setRemainingEmi(loan.getRemainingEmi() - 1);
	    loan.setEmiAmount(emiAmount); // Ensure this field is updated correctly
	    // Update other necessary fields
	    loanRepository.save(loan);

	    return walletRepository.save(wallet);
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

	@Override
	public Double getBalance(Long userId) {
		WalletEntity wallet = walletRepository.findByUserId(userId)
				.orElseThrow(() -> new ApiException("Wallet not found for user ID " + userId));
		return wallet.getBalance();
	}
	@Override
    public void creditFunds(Long userId, CreditFundsRequest request) {
        WalletEntity wallet = walletRepository.findByUserId(userId)
                .orElseThrow(() -> new ApiException("Wallet not found for user ID " + userId));
        wallet.setBalance(wallet.getBalance() + request.getAmount());
        UserEntity user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        TransactionEntity transaction = new TransactionEntity(wallet, user, request.getAmount(),
                "Loan Credited", TransactionStatus.COMPLETED);
        transactionRepository.save(transaction);
        walletRepository.save(wallet);
    }

//	private LoanEntity convertToLoanEntity(LoanDetailsResp loanDetailsResp) {
//	    LoanEntity loanEntity = new LoanEntity();
//	    loanEntity.setId(loanDetailsResp.getId());
//	    loanEntity.setPaidEmi(loanDetailsResp.getPaidEMI());
//	    loanEntity.setRemainingEmi(loanDetailsResp.getRemainingEMI());
//	    loanEntity.setDuration(loanDetailsResp.getDuration());
//	    loanEntity.setEmiAmount(loanDetailsResp.getEmiAmount());
//	    // Set other necessary fields
//	    return loanEntity;
//	}


}
