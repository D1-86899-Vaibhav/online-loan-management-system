import React, { useState } from 'react';
import longFormatters from "date-fns/_lib/format/longFormatters";

import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Grid,
  InputLabel,
  FormHelperText,
  CircularProgress,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Divider,
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserSidebar from './UserSidebar';
import Navbar from './Navbar';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const FileUpload = ({ label, file, onDrop, loading, error, helperText }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
    onDrop,
  });

  return (
    <Box>
      <InputLabel>{label}</InputLabel>
      <Box
        {...getRootProps()}
        sx={{
          border: '1px dashed #ccc',
          borderRadius: 1,
          padding: 2,
          textAlign: 'center',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '120px',
          transition: 'background-color 0.3s ease',
          '&:hover': { backgroundColor: '#f1f1f1' },
        }}
      >
        <input {...getInputProps()} style={{ display: 'none' }} />
        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
          {file ? `${file.name} uploaded` : `Drag & drop or click to select`}
        </Typography>
        {loading ? <CircularProgress size={24} /> : null}
      </Box>
      {error && <FormHelperText error>{helperText}</FormHelperText>}
    </Box>
  );
};

const KYCForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: null,
    gender: '',
    fatherName: '',
    motherName: '',
    maritalStatus: '',
    permanentAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
    },
    correspondenceAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
    },
    phone: '',
    email: '',
    panNumber: '',
    aadhaarNumber: '',
    passportNumber: '',
    voterIdNumber: '',
    drivingLicenseNumber: '',
    aadhaarCardImage: null,
    utilityBillImage: null,
    rentalAgreementImage: null,
    passportImage: null,
    annualIncome: '',
    sourceOfIncome: '',
    occupation: '',
    employerName: '',
    tin: '',
    bankAccountNumber: '',
    ifscCode: '',
    accountType: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingFiles, setLoadingFiles] = useState({
    aadhaarCard: false,
    utilityBill: false,
    rentalAgreement: false,
    passport: false,
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First Name is required';
    if (!formData.lastName) newErrors.lastName = 'Last Name is required';
    if (!formData.dob) newErrors.dob = 'Date of Birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.fatherName && !formData.motherName)
      newErrors.parentName = 'Father’s or Mother’s Name is required';
    if (!formData.maritalStatus) newErrors.maritalStatus = 'Marital Status is required';
    if (!formData.permanentAddress.street || !formData.permanentAddress.city || !formData.permanentAddress.state || !formData.permanentAddress.zipCode)
      newErrors.permanentAddress = 'Complete Permanent Address is required';
    if (!formData.phone || formData.phone.length !== 10) newErrors.phone = 'Valid Phone Number is required';
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Valid Email is required';
    if (!formData.panNumber || formData.panNumber.length !== 10) newErrors.panNumber = 'Valid PAN Number is required';
    if (!formData.aadhaarNumber || formData.aadhaarNumber.length !== 12) newErrors.aadhaarNumber = 'Valid Aadhaar Number is required';
    if (!formData.annualIncome) newErrors.annualIncome = 'Annual Income is required';
    if (!formData.sourceOfIncome) newErrors.sourceOfIncome = 'Source of Income is required';
    if (!formData.bankAccountNumber) newErrors.bankAccountNumber = 'Bank Account Number is required';
    if (!formData.ifscCode || formData.ifscCode.length !== 11) newErrors.ifscCode = 'Valid IFSC Code is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        toast.success('KYC Submitted Successfully!');
        // Clear form fields after successful submission
        setFormData({
          firstName: '',
          lastName: '',
          dob: null,
          gender: '',
          fatherName: '',
          motherName: '',
          maritalStatus: '',
          permanentAddress: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
          },
          correspondenceAddress: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
          },
          phone: '',
          email: '',
          panNumber: '',
          aadhaarNumber: '',
          passportNumber: '',
          voterIdNumber: '',
          drivingLicenseNumber: '',
          aadhaarCardImage: null,
          utilityBillImage: null,
          rentalAgreementImage: null,
          passportImage: null,
          annualIncome: '',
          sourceOfIncome: '',
          occupation: '',
          employerName: '',
          tin: '',
          bankAccountNumber: '',
          ifscCode: '',
          accountType: '',
        });
        setErrors({}); // Clear errors
      }, 2000);
    } else {
      setIsSubmitting(false);
      toast.error('Please fix the errors and try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileDrop = (name, acceptedFiles) => {
    setLoadingFiles((prev) => ({ ...prev, [name]: true }));
    setFormData((prev) => ({ ...prev, [`${name}Image`]: acceptedFiles[0] }));

    // Simulate file upload process
    setTimeout(() => {
      setLoadingFiles((prev) => ({ ...prev, [name]: false }));
    }, 2000);
  };

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      dob: null,
      gender: '',
      fatherName: '',
      motherName: '',
      maritalStatus: '',
      permanentAddress: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
      },
      correspondenceAddress: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
      },
      phone: '',
      email: '',
      panNumber: '',
      aadhaarNumber: '',
      passportNumber: '',
      voterIdNumber: '',
      drivingLicenseNumber: '',
      aadhaarCardImage: null,
      utilityBillImage: null,
      rentalAgreementImage: null,
      passportImage: null,
      annualIncome: '',
      sourceOfIncome: '',
      occupation: '',
      employerName: '',
      tin: '',
      bankAccountNumber: '',
      ifscCode: '',
      accountType: '',
    });
    setErrors({});
    setLoadingFiles({
      aadhaarCard: false,
      utilityBill: false,
      rentalAgreement: false,
      passport: false,
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box display="flex" minHeight="100vh" flexDirection="column">
        {/* Navbar Component */}
        <Navbar />

        <Box display="flex" flex={1}>
          {/* Sidebar */}
          <Box width="20%" minHeight="100vh">
            <UserSidebar />
          </Box>

          {/* Main Content */}
          <Box width="80%" p={4}>
            <Card sx={{ p: 4, maxWidth: 1200, margin: '0 auto' }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                KYC Form
              </Typography>
              <form onSubmit={handleSubmit}>
                {/* Personal Information */}
                <Typography variant="h6" gutterBottom sx={{ mt: 2, color: 'primary.main' }}>
                  Personal Information
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      fullWidth
                      error={!!errors.firstName}
                      helperText={errors.firstName}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      fullWidth
                      error={!!errors.lastName}
                      helperText={errors.lastName}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      label="Date of Birth"
                      value={formData.dob}
                      onChange={(date) => setFormData({ ...formData, dob: date })}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          error={!!errors.dob}
                          helperText={errors.dob}
                          required
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Gender</InputLabel>
                      <Select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        error={!!errors.gender}
                        required
                      >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </Select>
                      {errors.gender && <FormHelperText error>{errors.gender}</FormHelperText>}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Father's Name"
                      name="fatherName"
                      value={formData.fatherName}
                      onChange={handleChange}
                      fullWidth
                      error={!!errors.parentName}
                      helperText={errors.parentName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Mother's Name"
                      name="motherName"
                      value={formData.motherName}
                      onChange={handleChange}
                      fullWidth
                      error={!!errors.parentName}
                      helperText={errors.parentName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Marital Status</InputLabel>
                      <Select
                        name="maritalStatus"
                        value={formData.maritalStatus}
                        onChange={handleChange}
                        error={!!errors.maritalStatus}
                        required
                      >
                        <MenuItem value="Single">Single</MenuItem>
                        <MenuItem value="Married">Married</MenuItem>
                        <MenuItem value="Divorced">Divorced</MenuItem>
                        <MenuItem value="Widowed">Widowed</MenuItem>
                      </Select>
                      {errors.maritalStatus && <FormHelperText error>{errors.maritalStatus}</FormHelperText>}
                    </FormControl>
                  </Grid>
                </Grid>

                {/* Contact Details */}
                <Typography variant="h6" gutterBottom sx={{ mt: 4, color: 'primary.main' }}>
                  Contact Details
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>
                      Permanent Address
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Street"
                      name="permanentAddress.street"
                      value={formData.permanentAddress.street}
                      onChange={handleChange}
                      fullWidth
                      error={!!errors.permanentAddress}
                      helperText={errors.permanentAddress && !formData.permanentAddress.street && 'Street is required'}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="City"
                      name="permanentAddress.city"
                      value={formData.permanentAddress.city}
                      onChange={handleChange}
                      fullWidth
                      error={!!errors.permanentAddress}
                      helperText={errors.permanentAddress && !formData.permanentAddress.city && 'City is required'}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="State"
                      name="permanentAddress.state"
                      value={formData.permanentAddress.state}
                      onChange={handleChange}
                      fullWidth
                      error={!!errors.permanentAddress}
                      helperText={errors.permanentAddress && !formData.permanentAddress.state && 'State is required'}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="ZIP Code"
                      name="permanentAddress.zipCode"
                      value={formData.permanentAddress.zipCode}
                      onChange={handleChange}
                      fullWidth
                      error={!!errors.permanentAddress}
                      helperText={errors.permanentAddress && !formData.permanentAddress.zipCode && 'ZIP Code is required'}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.correspondenceAddress.sameAsPermanent}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              correspondenceAddress: {
                                ...prev.correspondenceAddress,
                                sameAsPermanent: e.target.checked,
                              },
                            }))
                          }
                        />
                      }
                      label="Same as Permanent Address"
                    />
                  </Grid>
                  {!formData.correspondenceAddress.sameAsPermanent && (
                    <>
                      <Grid item xs={12}>
                        <Typography variant="subtitle1" sx={{ mb: 1 }}>
                          Correspondence Address
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Street"
                          name="correspondenceAddress.street"
                          value={formData.correspondenceAddress.street}
                          onChange={handleChange}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="City"
                          name="correspondenceAddress.city"
                          value={formData.correspondenceAddress.city}
                          onChange={handleChange}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="State"
                          name="correspondenceAddress.state"
                          value={formData.correspondenceAddress.state}
                          onChange={handleChange}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="ZIP Code"
                          name="correspondenceAddress.zipCode"
                          value={formData.correspondenceAddress.zipCode}
                          onChange={handleChange}
                          fullWidth
                        />
                      </Grid>
                    </>
                  )}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      fullWidth
                      error={!!errors.phone}
                      helperText={errors.phone}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Email Address"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      fullWidth
                      error={!!errors.email}
                      helperText={errors.email}
                      required
                    />
                  </Grid>
                </Grid>

                {/* Identity Proof */}
                <Typography variant="h6" gutterBottom sx={{ mt: 4, color: 'primary.main' }}>
                  Identity Proof
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="PAN Number"
                      name="panNumber"
                      value={formData.panNumber}
                      onChange={handleChange}
                      fullWidth
                      error={!!errors.panNumber}
                      helperText={errors.panNumber}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Aadhaar Number"
                      name="aadhaarNumber"
                      value={formData.aadhaarNumber}
                      onChange={handleChange}
                      fullWidth
                      error={!!errors.aadhaarNumber}
                      helperText={errors.aadhaarNumber}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Passport Number"
                      name="passportNumber"
                      value={formData.passportNumber}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Voter ID Number"
                      name="voterIdNumber"
                      value={formData.voterIdNumber}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Driving License Number"
                      name="drivingLicenseNumber"
                      value={formData.drivingLicenseNumber}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                </Grid>

                {/* Address Proof */}
                <Typography variant="h6" gutterBottom sx={{ mt: 4, color: 'primary.main' }}>
                  Address Proof
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <FileUpload
                      label="Upload Aadhaar Card"
                      file={formData.aadhaarCardImage}
                      onDrop={(files) => handleFileDrop('aadhaarCard', files)}
                      loading={loadingFiles.aadhaarCard}
                      error={!!errors.aadhaarCardImage}
                      helperText={errors.aadhaarCardImage}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FileUpload
                      label="Upload Utility Bill"
                      file={formData.utilityBillImage}
                      onDrop={(files) => handleFileDrop('utilityBill', files)}
                      loading={loadingFiles.utilityBill}
                      error={!!errors.utilityBillImage}
                      helperText={errors.utilityBillImage}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FileUpload
                      label="Upload Rental Agreement"
                      file={formData.rentalAgreementImage}
                      onDrop={(files) => handleFileDrop('rentalAgreement', files)}
                      loading={loadingFiles.rentalAgreement}
                      error={!!errors.rentalAgreementImage}
                      helperText={errors.rentalAgreementImage}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FileUpload
                      label="Upload Passport"
                      file={formData.passportImage}
                      onDrop={(files) => handleFileDrop('passport', files)}
                      loading={loadingFiles.passport}
                      error={!!errors.passportImage}
                      helperText={errors.passportImage}
                    />
                  </Grid>
                </Grid>

                {/* Financial Information */}
                <Typography variant="h6" gutterBottom sx={{ mt: 4, color: 'primary.main' }}>
                  Financial Information
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Annual Income"
                      name="annualIncome"
                      value={formData.annualIncome}
                      onChange={handleChange}
                      fullWidth
                      error={!!errors.annualIncome}
                      helperText={errors.annualIncome}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Source of Income"
                      name="sourceOfIncome"
                      value={formData.sourceOfIncome}
                      onChange={handleChange}
                      fullWidth
                      error={!!errors.sourceOfIncome}
                      helperText={errors.sourceOfIncome}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Occupation"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Employer Name"
                      name="employerName"
                      value={formData.employerName}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Taxpayer Identification Number (TIN)"
                      name="tin"
                      value={formData.tin}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                </Grid>

                {/* Banking Details */}
                <Typography variant="h6" gutterBottom sx={{ mt: 4, color: 'primary.main' }}>
                  Banking Details
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Bank Account Number"
                      name="bankAccountNumber"
                      value={formData.bankAccountNumber}
                      onChange={handleChange}
                      fullWidth
                      error={!!errors.bankAccountNumber}
                      helperText={errors.bankAccountNumber}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="IFSC Code"
                      name="ifscCode"
                      value={formData.ifscCode}
                      onChange={handleChange}
                      fullWidth
                      error={!!errors.ifscCode}
                      helperText={errors.ifscCode}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Account Type</InputLabel>
                      <Select
                        name="accountType"
                        value={formData.accountType}
                        onChange={handleChange}
                      >
                        <MenuItem value="Savings">Savings</MenuItem>
                        <MenuItem value="Current">Current</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                {/* Submit Button */}
                <Grid container spacing={3} sx={{ mt: 4 }}>
                  <Grid item xs={12}>
                    <center>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        size="large"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit KYC'}
                      </Button>
                    </center>
                  </Grid>
                </Grid>
              </form>
            </Card>
          </Box>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default KYCForm;