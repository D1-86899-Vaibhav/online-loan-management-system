package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.TransactionEntity;
import com.app.pojos.WalletEntity;

import java.util.List;

public interface TransactionRepository extends JpaRepository<TransactionEntity
, Long> {
  List<TransactionEntity> findByUserId(Long userId);

  List<TransactionEntity> findByWallet(WalletEntity wallet);
}
