package com.app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.app.pojos.KycEntity;
@Repository
public interface KycRepository extends JpaRepository<KycEntity, Long> {
  KycEntity findByUserId(Long userId);
  
	@Query("SELECT COUNT(u) FROM KycEntity u")
    Long countKycUsers();
   
}
