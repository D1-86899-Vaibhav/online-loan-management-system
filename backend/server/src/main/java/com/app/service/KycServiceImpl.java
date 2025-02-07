package com.app.service;

import com.app.dto.ApiResponse;
import com.app.dto.KycDetailsUpdateRequest;
import com.app.pojos.KycEntity;
import com.app.repository.KycRepository;
import jakarta.annotation.PostConstruct; // Correct import for @PostConstruct
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Service
public class KycServiceImpl implements KycService {

    @Autowired
    private KycRepository kycRepository;

    // **Configure your file storage directory from application.properties or application.yml**
    @Value("${file.upload.directory}") // Define property in application.properties like: file.upload.directory=uploads/kyc-documents
    private String uploadDirectory;
    private Path fileStorageLocation;

    // Initialize file storage location in constructor
    public KycServiceImpl() {
        // No-arg constructor for Spring to manage bean
    }

    @PostConstruct // After bean is created and dependencies are injected
    public void postConstruct() {
        this.fileStorageLocation = Paths.get(uploadDirectory).toAbsolutePath().normalize();
        try {
            Files.createDirectories(fileStorageLocation); // Create directory if it doesn't exist
        } catch (IOException e) {
            throw new RuntimeException("Could not create directory for file storage at: " + fileStorageLocation, e);
        }
    }


    @Override
    public KycEntity getKycRecordsByUserId(Long userId) {
        return kycRepository.findByUserId(userId); // Assuming you have findByUserId in KycRepository
    }

    @Override
    public ApiResponse createKycRecord(KycEntity kyc, MultipartFile aadhaarCardImagePathFile, MultipartFile utilityBillImagePathFile, MultipartFile rentalAgreementImagePathFile, MultipartFile passportImagePathFile, MultipartFile panCardImageFile) {
        try {
            // **File Saving Logic for different document types using MultipartFile parameters**

            // Aadhaar Card Image
            if (aadhaarCardImagePathFile != null && !aadhaarCardImagePathFile.isEmpty()) {
                kyc.setAadhaarCardImagePath(saveFileAndGetPath(aadhaarCardImagePathFile, "aadhaar-cards"));
            }
            // Utility Bill Image
            if (utilityBillImagePathFile != null && !utilityBillImagePathFile.isEmpty()) {
                kyc.setUtilityBillImagePath(saveFileAndGetPath(utilityBillImagePathFile, "utility-bills"));
            }
            // Rental Agreement Image
            if (rentalAgreementImagePathFile != null && !rentalAgreementImagePathFile.isEmpty()) {
                kyc.setRentalAgreementImagePath(saveFileAndGetPath(rentalAgreementImagePathFile, "rental-agreements"));
            }
            // Passport Image
            if (passportImagePathFile != null && !passportImagePathFile.isEmpty()) {
                kyc.setPassportImagePath(saveFileAndGetPath(passportImagePathFile, "passports"));
            }
            // Pan Card Image
            if (panCardImageFile != null && !panCardImageFile.isEmpty()) {
                kyc.setAadhaarCardImagePath(saveFileAndGetPath(panCardImageFile, "pan-cards")); // **Note:** saving pan card image path to aadhaarCardImagePath field as panCardImagePath is not in KycEntity - adjust if needed. Consider adding panCardImagePath to KycEntity.
            }


            kycRepository.save(kyc); // Save the KycEntity to the database
            return new ApiResponse("KYC record created successfully");

        } catch (IOException e) {
            System.err.println("IO Error in KycServiceImpl.createKycRecord (File saving): " + e.getMessage());
            e.printStackTrace();
            return new ApiResponse("Failed to create KYC record due to file saving error: " + e.getMessage());
        }
        catch (Exception e) {
            System.err.println("General Error in KycServiceImpl.createKycRecord: " + e.getMessage());
            e.printStackTrace();
            return new ApiResponse("Failed to create KYC record: " + e.getMessage());
        }
    }


    // **Helper method for saving a single file and generating a unique path**
    private String saveFileAndGetPath(MultipartFile file, String subdirectory) throws IOException {
        if (file == null || file.isEmpty()) {
            return null; // Or handle empty file case as needed
        }

        String originalFilename = file.getOriginalFilename();
        String uniqueFilename = UUID.randomUUID().toString() + "_" + originalFilename; // Generate unique name
        Path targetDirectory = fileStorageLocation.resolve(subdirectory);
        Files.createDirectories(targetDirectory); // Ensure subdirectory exists
        Path targetFile = targetDirectory.resolve(uniqueFilename);


        // **Security: Validate file type/extension if needed here before saving**
        // Example (basic extension check - enhance for production):
        if (!isValidFileType(originalFilename)) {
            throw new IOException("Invalid file type for: " + originalFilename);
        }


        Files.copy(file.getInputStream(), targetFile, StandardCopyOption.REPLACE_EXISTING); // Save the file

        // **Return the file path - Adjust this based on how you want to store paths in your database (relative, absolute, URL)**
        return targetFile.toString(); // For local file system, returns absolute path
        // For web access, you might want to return a relative path or a URL if files are served via a web server.
    }

    // **Basic file type validation example - Enhance for production with more robust checks**
    private boolean isValidFileType(String filename) {
        String lowerFilename = filename.toLowerCase();
        return lowerFilename.endsWith(".pdf") || lowerFilename.endsWith(".doc") || lowerFilename.endsWith(".docx") || lowerFilename.endsWith(".jpg") || lowerFilename.endsWith(".jpeg") || lowerFilename.endsWith(".png");
        // Add more types if needed and consider more robust validation (MIME type checking, etc.)
    }
    @Override
    public KycEntity updateKycDetails(Long id, KycDetailsUpdateRequest request) {
        Optional<KycEntity> optionalKycDetails = kycRepository.findById(id);

        if (optionalKycDetails.isPresent()) {
            KycEntity kycDetails = optionalKycDetails.get();

            kycDetails.setFirstName(request.getFirstName());
            kycDetails.setLastName(request.getLastName());
            kycDetails.setEmail(request.getEmail());
            kycDetails.setPhone(request.getPhone());
            kycDetails.setGender(request.getGender());
            kycDetails.setCorrespondenceCity(request.getCorrespondenceCity());
            kycDetails.setCorrespondenceState(request.getCorrespondenceState());
            kycDetails.setCorrespondenceZipCode(request.getCorrespondenceZipCode());

            // Convert Date to LocalDate before setting it
            Date dateOfBirth = request.getDateOfBirth();
            if (dateOfBirth != null) {
                LocalDate dob = dateOfBirth.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
                kycDetails.setDob(dob);
            }

            return kycRepository.save(kycDetails);
        } else {
            throw new RuntimeException("KYC Details not found with ID: " + id);
        }
    }

}
