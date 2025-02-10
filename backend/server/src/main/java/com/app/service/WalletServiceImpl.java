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
import com.app.pojos.UserRole;
import com.app.pojos.WalletEntity;
import com.app.repository.LoanRepository;
import com.app.repository.TransactionRepository;
import com.app.repository.UserRepository;
import com.app.repository.WalletRepository;

import java.time.LocalDateTime;
import java.util.List;

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
	    WalletEntity userWallet = walletRepository.findByUserId(userId)
	            .orElseThrow(() -> new RuntimeException("Wallet not found"));

	    if (userWallet.getBalance().compareTo(emiAmount) < 0) {
	        throw new RuntimeException("Insufficient balance");
	    }
	 // Find the admin user
	    UserEntity adminUser = userRepository.findByRole(UserRole.ROLE_ADMIN)
	            .stream()
	            .findFirst()
	            .orElseThrow(() -> new RuntimeException("Admin not found"));

	    WalletEntity adminWallet = walletRepository.findByUserId(adminUser.getId())
	            .orElseThrow(() -> new RuntimeException("Admin wallet not found"));
	    
	    
	    userWallet.setBalance(userWallet.getBalance() - emiAmount);
	    UserEntity user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
	    
	    TransactionEntity debitTransaction = new TransactionEntity(userWallet, user, emiAmount, "EMI Payment", TransactionStatus.COMPLETED);
	    TransactionEntity creditTransaction = new TransactionEntity(adminWallet, adminUser, emiAmount, "EMI Received", TransactionStatus.COMPLETED);

	    transactionRepository.save(debitTransaction);
	    transactionRepository.save(creditTransaction);
	    
	    LoanEntity loan = loanRepository.getReferenceById(userId);
	    walletRepository.save(adminWallet);
	    // Update the existing instance of LoanEntity
	    loan.setPaidEmi(loan.getPaidEmi() + 1);
	    loan.setRemainingEmi(loan.getRemainingEmi() - 1);
	    loan.setEmiAmount(emiAmount); // Ensure this field is updated correctly
	    // Update other necessary fields
	    loanRepository.save(loan);

	    return walletRepository.save(userWallet);
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
	public void creditFunds(Long userId, CreditFundsRequest request, Long adminId) {
	    WalletEntity adminWallet = walletRepository.findByUserId(adminId)
	            .orElseThrow(() -> new ApiException("Admin wallet not found for user ID " + adminId));

	    // Check if admin wallet has sufficient balance
	    if (adminWallet.getBalance() < request.getAmount()) {
	        throw new RuntimeException("Insufficient balance in admin wallet");
	    }

	    WalletEntity userWallet = walletRepository.findByUserId(userId)
	            .orElseThrow(() -> new ApiException("User wallet not found for user ID " + userId));

	    // Deduct the amount from admin wallet
	    adminWallet.setBalance(adminWallet.getBalance() - request.getAmount());

	    // Credit the amount to user wallet
	    userWallet.setBalance(userWallet.getBalance() + request.getAmount());

	    // Record transactions
	    UserEntity adminUser = userRepository.findById(adminId).orElseThrow(() -> new RuntimeException("Admin not found"));
	    UserEntity user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

	    TransactionEntity debitTransaction = new TransactionEntity(adminWallet, adminUser, request.getAmount(), "Loan Transfer Out", TransactionStatus.COMPLETED);
	    TransactionEntity creditTransaction = new TransactionEntity(userWallet, user, request.getAmount(), "Loan Transfer In", TransactionStatus.COMPLETED);

	    transactionRepository.save(debitTransaction);
	    transactionRepository.save(creditTransaction);
	    walletRepository.save(adminWallet);
	    walletRepository.save(userWallet);
	}

    public List<TransactionEntity> getWalletTransactions(Long walletId) {
        WalletEntity wallet = walletRepository.findById(walletId)
                .orElseThrow(() -> new RuntimeException("Wallet not found"));
        return transactionRepository.findByWallet(wallet);
    }

 


}
