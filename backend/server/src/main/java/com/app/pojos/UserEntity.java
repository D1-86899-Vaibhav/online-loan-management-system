package com.app.pojos;

import java.util.List;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "users")
@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true, exclude = { "password" })
public class UserEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_id")
	private Long id;

	@Column(name = "first_name", length = 20)
	private String firstName;

	@Column(name = "last_name", length = 20)
	private String lastName;

	@Column(length = 100, unique = true)
	private String email;

	@Column(length = 500, nullable = false)
	private String password;

	@Column(length = 15, nullable = false, name = "phone_number")
	private String phone;

	@OneToOne(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "user")
	@JoinColumn(name = "wallet_id", referencedColumnName = "wallet_id")
	private WalletEntity wallet;

	@OneToMany(mappedBy = "user")
	private List<LoanApplication> loanApplications;

	@OneToMany(mappedBy = "user")
	private List<LoanEntity> loans;

	@OneToMany(mappedBy = "user")
	private List<TransactionEntity> transactions;

	@Enumerated(EnumType.STRING)
	@Column(length = 30)
	private UserRole role;

	@PrePersist
	private void setDefaultRole() {
		if (role == null) {
			role = UserRole.ROLE_CUSTOMER;
		}
	}
}
