package com.app.pojos;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "wallet")
@Getter
@Setter
public class WalletEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "wallet_id")
    private Long id;

    // Each user has a unique wallet
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    @JsonIgnore
    private UserEntity user;

    @Column(name = "balance", nullable = false)
    private Double balance = 0.0;

	public List<TransactionEntity> getTransactions() {
		// TODO Auto-generated method stub
		return null;
	}
    
}
