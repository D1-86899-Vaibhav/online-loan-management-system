package com.app.service;

import com.app.dto.ApiResponse;
import com.app.dto.UserDTO;

public interface UserService {
    ApiResponse registerNewUser(UserDTO dto);
    ApiResponse updateUser(UserDTO dto);
    
}
