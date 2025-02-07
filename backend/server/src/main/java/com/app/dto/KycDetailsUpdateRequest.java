package com.app.dto;

import lombok.Getter;
import lombok.Setter;
import java.util.Date;

@Getter
@Setter
public class KycDetailsUpdateRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String gender;
    private String correspondenceCity;
    private String correspondenceState;
    private String correspondenceZipCode;
    private Date dateOfBirth;
}
