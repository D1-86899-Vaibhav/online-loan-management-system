package com.app.repository;

import com.app.pojos.KycEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface KycRepository extends JpaRepository<KycEntity, Long> {
    KycEntity findByUserId(Long userId);

    @Query("SELECT COUNT(u) FROM KycEntity u")
    Long countKycUsers();
}
