package com.app.pojos;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Entity
@Table(name = "transactions")
@Getter
@Setter
public class TransactionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transaction_id")
    private Long id;

    // Reference to user
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

//
//    @Column(name = "user_id", nullable = false)
//    private Long userId; // Store the user's primary key directly
//    
    @Column(name = "transaction_date", nullable = false)
    private LocalDate date;

    @Column(name = "amount", nullable = false)
    private Double amount;

    // Transaction type: Credit (e.g., deposit) or Debit (e.g., EMI payment)
    @Column(name = "transaction_type", nullable = false)
    private String type;

    // Status: Completed, Pending, Failed
    @Enumerated(EnumType.STRING)
    @Column(name = "transaction_status", nullable = false)
    private TransactionStatus status;
}
