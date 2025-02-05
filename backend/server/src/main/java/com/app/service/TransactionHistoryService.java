package com.app.service;

import com.app.dto.ApiResponse;
import com.app.pojos.TransactionEntity;

import java.util.List;

public interface TransactionHistoryService {
    List<TransactionEntity> getTransactionHistoryByUserId(Long userId);
    ApiResponse recordTransaction(TransactionEntity transactionHistory);
}
