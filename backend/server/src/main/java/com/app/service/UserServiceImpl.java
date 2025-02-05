package com.app.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dto.ApiResponse;
import com.app.dto.UserDTO;
import com.app.pojos.UserEntity;
import com.app.pojos.WalletEntity;
import com.app.repository.UserRepository;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ModelMapper modelMapper;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    // Inject WalletService if you use it; otherwise, create wallet directly.
    // @Autowired
    // private WalletService walletService;

    @Override
    public ApiResponse registerNewUser(UserDTO dto) {
        // Basic duplicate checks (in a production system, encrypt the password)
        if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new IllegalStateException("Email already exists");
        }
        if (userRepository.findByPhone(dto.getPhone()).isPresent()) {
            throw new IllegalStateException("Phone already exists");
        }
        // Map DTO to entity
        UserEntity userEntity = modelMapper.map(dto, UserEntity.class);
        userEntity.setPassword(passwordEncoder.encode(userEntity.getPassword()));
        
        // Create a new WalletEntity for the user with initial balance 0
        WalletEntity wallet = new WalletEntity();
        wallet.setBalance(0.0);
        // Associate wallet with user
        wallet.setUser(userEntity);
        userEntity.setWallet(wallet);
        
        // Save user (wallet will be saved automatically if cascade is configured)
        UserEntity savedUser = userRepository.save(userEntity);
        return new ApiResponse("User registered with ID " + savedUser.getId());
    }
    
    @Override
    public ApiResponse updateUser(UserDTO dto) {
        UserEntity existingUser = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new IllegalStateException("User not found"));
        
        modelMapper.map(dto, existingUser);
        if (dto.getPassword() != null && !dto.getPassword().isEmpty()) {
            existingUser.setPassword(passwordEncoder.encode(dto.getPassword()));
        }

        UserEntity updatedUser = userRepository.save(existingUser);
        return new ApiResponse("User updated with ID " + updatedUser.getId());
    }
}
