package com.app.dto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PasswordChangeRequest {
    private String email;
    private String currentPassword;
    private String newPassword;
    private String confirmPassword;

}
