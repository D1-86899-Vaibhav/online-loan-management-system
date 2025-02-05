package com.app.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class AuthRequest {
    @NotBlank(message = "Email must not be null or blank!")
    @Email(message = "Invalid email format")
    private String email;
    
    @NotBlank(message = "Password must not be blank")
    private String password;
}
