package com.app.pojos;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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

	// Unidirectional mapping to WalletEntity
	@OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "wallet_id")
//	@JsonIgnoreProperties("user") // This can now be removed if WalletEntity no longer has a 'user' field.
	private WalletEntity wallet;

	@Enumerated(EnumType.STRING)
	@Column(length = 30)
	private UserRole role;

	@PrePersist
	private void setDefaultRole() {
		if (role == null) {
			role = UserRole.ROLE_USER;
		}

	}

}
