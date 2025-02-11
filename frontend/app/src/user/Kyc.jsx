import React, { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import UserSidebar from './UserSidebar';
import Navbar from './Navbar';

const KYCForm = () => {
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    dob: null,
    gender: '',
    fatherName: '',
    motherName: '',
    maritalStatus: '',
    // Permanent Address
    permanentStreet: '',
    permanentCity: '',
    permanentState: '',
    permanentZipCode: '',
    // Correspondence Address (optional)
    correspondenceStreet: '',
    correspondenceCity: '',
    correspondenceState: '',
    correspondenceZipCode: '',
    // Contact Details
    phone: '',
    email: '',
    // Identity Details
    panNumber: '',
    aadhaarNumber: '',
    drivingLicenseNumber: '',
    passportNumber: '',
    voterIdNumber: '',
    // Financial Information
    annualIncome: '',
    sourceOfIncome: '',
    otherSourceOfIncome: '',
    occupation: '',
    otherOccupation: '',
    employerName: '',
    // Banking Details
    bankName: '',
    bankAccountNumber: '',
    ifscCode: '',
    accountType: '',
    // User info (usually comes from session/login)
    userId: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Options for select fields
  const genderOptions = ['Male', 'Female', 'Other'];
  const maritalStatusOptions = ['Single', 'Married', 'Divorced', 'Widowed'];
  const sourceOfIncomeOptions = ['Salary', 'Business', 'Investments', 'Pension', 'Rent', 'Agriculture', 'Others'];
  const occupationOptions = ['Salaried', 'Self-Employed', 'Business', 'Professional', 'Student', 'Homemaker', 'Retired', 'Others'];
  const accountTypeOptions = ['Savings', 'Current'];

  const API_BASE_URL = 'http://localhost:8080';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First Name is required';
    if (!formData.lastName) newErrors.lastName = 'Last Name is required';
    if (!formData.dob) newErrors.dob = 'Date of Birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.fatherName && !formData.motherName)
      newErrors.parentName = 'Either Father’s or Mother’s Name is required';
    if (!formData.maritalStatus) newErrors.maritalStatus = 'Marital Status is required';
    if (!formData.permanentStreet || !formData.permanentCity || !formData.permanentState || !formData.permanentZipCode)
      newErrors.permanentAddress = 'Complete Permanent Address is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.panNumber) newErrors.panNumber = 'PAN Number is required';
    if (!formData.aadhaarNumber) newErrors.aadhaarNumber = 'Aadhaar Number is required';
    if (!formData.annualIncome) newErrors.annualIncome = 'Annual Income is required';
    if (!formData.sourceOfIncome) newErrors.sourceOfIncome = 'Source of Income is required';
    if (!formData.occupation) newErrors.occupation = 'Occupation is required';
    if (!formData.bankName) newErrors.bankName = 'Bank Name is required';
    if (!formData.bankAccountNumber) newErrors.bankAccountNumber = 'Bank Account Number is required';
    if (!formData.ifscCode) newErrors.ifscCode = 'IFSC Code is required';
    if (!formData.userId) newErrors.userId = 'User ID is required';

    setErrors(newErrors);
    if (Object.keys(newErrors).length !== 0) {
      toast.error('Please fill all required fields');
      setIsSubmitting(false);
      return;
    }

    // Prepare payload (convert annualIncome to a number, format dob)
    const payload = {
      ...formData,
      dob: formData.dob ? formData.dob.toISOString().split('T')[0] : null,
      annualIncome: Number(formData.annualIncome),
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/kyc`, payload);
      console.log('KYC submitted successfully', response.data);
      toast.success('KYC Submitted Successfully!');
      setFormData({
        firstName: '',
        lastName: '',
        dob: null,
        gender: '',
        fatherName: '',
        motherName: '',
        maritalStatus: '',
        permanentStreet: '',
        permanentCity: '',
        permanentState: '',
        permanentZipCode: '',
        correspondenceStreet: '',
        correspondenceCity: '',
        correspondenceState: '',
        correspondenceZipCode: '',
        phone: '',
        email: '',
        panNumber: '',
        aadhaarNumber: '',
        drivingLicenseNumber: '',
        passportNumber: '',
        voterIdNumber: '',
        annualIncome: '',
        sourceOfIncome: '',
        otherSourceOfIncome: '',
        occupation: '',
        otherOccupation: '',
        employerName: '',
        bankName: '',
        bankAccountNumber: '',
        ifscCode: '',
        accountType: '',
        userId: '',
      });
      setErrors({});
    } catch (error) {
      console.error('Error submitting KYC:', error);
      toast.error('Error submitting KYC. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
  };

  const handleDateChange = (date) => {
    setFormData({...formData, dob: date});
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar isAuthenticated={true} />
        <Box sx={{ display: 'flex', flex: 1 }}>
          <Box sx={{ width: '20%', bgcolor: 'grey.200', p: 2 }}>
            <UserSidebar />
          </Box>
          <Box sx={{ width: '80%', p: 2 }}>
            <Card sx={{ p: 4, boxShadow: 3 }}>
              <Typography variant="h4" gutterBottom sx={{ color: '#1976d2' }}>
                KYC Form
              </Typography>
              <form onSubmit={handleSubmit}>
                {/* Personal Information */}
                <Typography variant="h6" gutterBottom>
                  Personal Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      fullWidth
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
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      label="Date of Birth"
                      value={formData.dob}
                      onChange={handleDateChange}
                      renderInput={(params) => <TextField {...params} fullWidth required />}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                      <InputLabel>Gender</InputLabel>
                      <Select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        label="Gender"
                      >
                        {genderOptions.map((option) => (
                          <MenuItem key={option} value={option}>{option}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Father's Name"
                      name="fatherName"
                      value={formData.fatherName}
                      onChange={handleChange}
                      fullWidth
                      required={!(formData.motherName)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Mother's Name"
                      name="motherName"
                      value={formData.motherName}
                      onChange={handleChange}
                      fullWidth
                      required={!(formData.fatherName)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                      <InputLabel>Marital Status</InputLabel>
                      <Select
                        name="maritalStatus"
                        value={formData.maritalStatus}
                        onChange={handleChange}
                        label="Marital Status"
                      >
                        {maritalStatusOptions.map((option) => (
                          <MenuItem key={option} value={option}>{option}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                {/* Permanent Address */}
                <Typography variant="h6" gutterBottom>
                  Permanent Address
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Street"
                      name="permanentStreet"
                      value={formData.permanentStreet}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="City"
                      name="permanentCity"
                      value={formData.permanentCity}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="State"
                      name="permanentState"
                      value={formData.permanentState}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="ZIP Code"
                      name="permanentZipCode"
                      value={formData.permanentZipCode}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                {/* Correspondence Address (Optional) */}
                <Typography variant="h6" gutterBottom>
                  Correspondence Address (Optional)
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Street"
                      name="correspondenceStreet"
                      value={formData.correspondenceStreet}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="City"
                      name="correspondenceCity"
                      value={formData.correspondenceCity}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="State"
                      name="correspondenceState"
                      value={formData.correspondenceState}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="ZIP Code"
                      name="correspondenceZipCode"
                      value={formData.correspondenceZipCode}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                {/* Contact Details */}
                <Typography variant="h6" gutterBottom>
                  Contact Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                {/* Identity Details */}
                <Typography variant="h6" gutterBottom>
                  Identity Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="PAN Number"
                      name="panNumber"
                      value={formData.panNumber}
                      onChange={handleChange}
                      fullWidth
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
                      required
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
                </Grid>

                <Divider sx={{ my: 2 }} />

                {/* Financial Information */}
                <Typography variant="h6" gutterBottom>
                  Financial Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Annual Income"
                      name="annualIncome"
                      value={formData.annualIncome}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                      <InputLabel>Source of Income</InputLabel>
                      <Select
                        name="sourceOfIncome"
                        value={formData.sourceOfIncome}
                        onChange={handleChange}
                        label="Source of Income"
                      >
                        {sourceOfIncomeOptions.map(option => (
                          <MenuItem key={option} value={option}>{option}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  {formData.sourceOfIncome === 'Others' && (
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Other Source of Income"
                        name="otherSourceOfIncome"
                        value={formData.otherSourceOfIncome}
                        onChange={handleChange}
                        fullWidth
                        required
                      />
                    </Grid>
                  )}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                      <InputLabel>Occupation</InputLabel>
                      <Select
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleChange}
                        label="Occupation"
                      >
                        {occupationOptions.map(option => (
                          <MenuItem key={option} value={option}>{option}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  {formData.occupation === 'Others' && (
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Other Occupation"
                        name="otherOccupation"
                        value={formData.otherOccupation}
                        onChange={handleChange}
                        fullWidth
                        required
                      />
                    </Grid>
                  )}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Employer Name"
                      name="employerName"
                      value={formData.employerName}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                {/* Banking Details */}
                <Typography variant="h6" gutterBottom>
                  Banking Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Bank Name"
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Bank Account Number"
                      name="bankAccountNumber"
                      value={formData.bankAccountNumber}
                      onChange={handleChange}
                      fullWidth
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
                        label="Account Type"
                      >
                        {accountTypeOptions.map(option => (
                          <MenuItem key={option} value={option}>{option}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                {/* User ID */}
                <Typography variant="h6" gutterBottom>
                  User ID
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="User ID"
                      name="userId"
                      value={formData.userId}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                  </Grid>
                </Grid>

                <Box sx={{ mt: 3 }}>
                  <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit KYC'}
                  </Button>
                </Box>
              </form>
            </Card>
          </Box>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default KYCForm;
