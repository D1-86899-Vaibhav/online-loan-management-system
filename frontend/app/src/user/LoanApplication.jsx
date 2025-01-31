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
  Divider,
} from "@mui/material";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Handle form submission (e.g., send data to server)
  };

  return (
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
          <Card sx={{ p: 4, maxWidth: 900, margin: "0 auto" }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", textAlign: "center" }}>
              Loan Application Form
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {/* Personal Information Section */}
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mb: 2, color: "primary.main" }}>
                    Personal Information
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    type="email"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    type="tel"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Date of Birth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                    type="date"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Gender</InputLabel>
                    <Select
                      label="Gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Marital Status</InputLabel>
                    <Select
                      label="Marital Status"
                      name="maritalStatus"
                      value={formData.maritalStatus}
                      onChange={handleChange}
                    >
                      <MenuItem value="Single">Single</MenuItem>
                      <MenuItem value="Married">Married</MenuItem>
                      <MenuItem value="Divorced">Divorced</MenuItem>
                      <MenuItem value="Widowed">Widowed</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Address Section */}
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mb: 2, color: "primary.main" }}>
                    Address Details
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="ZIP Code"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                  />
                </Grid>

                {/* Loan Details Section */}
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mb: 2, color: "primary.main" }}>
                    Loan Details
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Loan Amount"
                    name="loanAmount"
                    value={formData.loanAmount}
                    onChange={handleChange}
                    required
                    type="number"
                    InputProps={{
                      inputProps: {
                        min: 0,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Loan Purpose</InputLabel>
                    <Select
                      label="Loan Purpose"
                      name="loanPurpose"
                      value={formData.loanPurpose}
                      onChange={handleChange}
                    >
                      <MenuItem value="Home Purchase">Home Purchase</MenuItem>
                      <MenuItem value="Car Purchase">Car Purchase</MenuItem>
                      <MenuItem value="Education">Education</MenuItem>
                      <MenuItem value="Debt Consolidation">Debt Consolidation</MenuItem>
                      <MenuItem value="Others">Others</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Monthly Income"
                    name="monthlyIncome"
                    value={formData.monthlyIncome}
                    onChange={handleChange}
                    required
                    type="number"
                    InputProps={{
                      inputProps: {
                        min: 0,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Employment Status</InputLabel>
                    <Select
                      label="Employment Status"
                      name="employmentStatus"
                      value={formData.employmentStatus}
                      onChange={handleChange}
                    >
                      <MenuItem value="Employed">Employed</MenuItem>
                      <MenuItem value="Self-Employed">Self-Employed</MenuItem>
                      <MenuItem value="Unemployed">Unemployed</MenuItem>
                      <MenuItem value="Student">Student</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Loan Term</InputLabel>
                    <Select
                      label="Loan Term"
                      name="loanTerm"
                      value={formData.loanTerm}
                      onChange={handleChange}
                    >
                      <MenuItem value="12 months">12 months</MenuItem>
                      <MenuItem value="24 months">24 months</MenuItem>
                      <MenuItem value="36 months">36 months</MenuItem>
                      <MenuItem value="48 months">48 months</MenuItem>
                      <MenuItem value="60 months">60 months</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Submit Button */}
                <Grid item xs={12}>
                  <center>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    
                    size="large"
                  >
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