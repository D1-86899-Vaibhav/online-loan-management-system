package com.app.service;

import com.app.dto.ApiResponse;
import com.app.pojos.TransactionEntity;
import com.app.repository.TransactionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class TransactionHistoryServiceImpl implements TransactionHistoryService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Override
    public List<TransactionEntity> getTransactionHistoryByUserId(Long userId) {
        return transactionRepository.findByUserId(userId);
    }

    @Override
    public ApiResponse recordTransaction(TransactionEntity transactionHistory) {
        TransactionEntity savedTransaction = transactionRepository.save(transactionHistory);
        return new ApiResponse("Transaction recorded with ID " + savedTransaction.getId());
    }
    
}
