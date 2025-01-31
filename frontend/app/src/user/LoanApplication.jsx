import React, { useState } from "react";
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Grid,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserSidebar from "./UserSidebar";
import Navbar from "./Navbar";

const LoanApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    loanAmount: "",
    loanPurpose: "",
    monthlyIncome: "",
    employmentStatus: "",
    loanTerm: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    dateOfBirth: "",
    gender: "",
    maritalStatus: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const { fullName, email, phone, loanAmount, dateOfBirth, gender, address, city, state, zipCode } = formData;

    if (!fullName.trim()) {
      toast.error("Full Name is required!");
      return false;
    }
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Enter a valid email address!");
      return false;
    }
    if (!phone.trim() || !/^\d{10}$/.test(phone)) {
      toast.error("Enter a valid 10-digit phone number!");
      return false;
    }
    if (!dateOfBirth) {
      toast.error("Date of Birth is required!");
      return false;
    }
    if (!gender) {
      toast.error("Please select your gender!");
      return false;
    }
    if (!address.trim()) {
      toast.error("Address is required!");
      return false;
    }
    if (!city.trim()) {
      toast.error("City is required!");
      return false;
    }
    if (!state.trim()) {
      toast.error("State is required!");
      return false;
    }
    if (!zipCode.trim() || !/^\d{5,6}$/.test(zipCode)) {
      toast.error("Enter a valid ZIP Code!");
      return false;
    }
    if (!loanAmount || parseFloat(loanAmount) <= 0) {
      toast.error("Enter a valid loan amount!");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      toast.success("Application submitted successfully!");
      console.log(formData);
      // Handle form submission (e.g., send data to server)
    }
  };

  return (
    <Box display="flex" minHeight="100vh" flexDirection="column">
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />
      <Box display="flex" flex={1}>
        <Box width="20%" minHeight="100vh">
          <UserSidebar />
        </Box>

        <Box width="80%" p={4}>
          <Card sx={{ p: 4, maxWidth: 900, margin: "0 auto" }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", textAlign: "center" }}>
              Loan Application Form
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mb: 2, color: "primary.main" }}>
                    Personal Information
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Email Address" name="email" value={formData.email} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Date of Birth" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} InputLabelProps={{ shrink: true }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Gender</InputLabel>
                    <Select name="gender" value={formData.gender} onChange={handleChange}>
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mb: 2, color: "primary.main" }}>
                    Address Details
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Address" name="address" value={formData.address} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="City" name="city" value={formData.city} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="State" name="state" value={formData.state} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="ZIP Code" name="zipCode" value={formData.zipCode} onChange={handleChange} />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mb: 2, color: "primary.main" }}>
                    Loan Details
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Loan Amount" name="loanAmount" type="number" value={formData.loanAmount} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Loan Purpose</InputLabel>
                    <Select name="loanPurpose" value={formData.loanPurpose} onChange={handleChange}>
                      <MenuItem value="Home Purchase">Home Purchase</MenuItem>
                      <MenuItem value="Car Purchase">Car Purchase</MenuItem>
                      <MenuItem value="Education">Education</MenuItem>
                      <MenuItem value="Debt Consolidation">Debt Consolidation</MenuItem>
                      <MenuItem value="Others">Others</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <center>
                    <Button variant="contained" color="primary" type="submit" size="large">
                      Apply for Loan
                    </Button>
                  </center>
                </Grid>
              </Grid>
            </form>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default LoanApplicationForm;
