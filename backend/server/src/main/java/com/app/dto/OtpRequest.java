package com.app.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OtpRequest {
    @NotNull
    private Long userId;

    @NotNull
    private String otp;
}
