import React, { useState } from "react";
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Grid, Typography,Box, } from "@mui/material";
import UserSidebar from "./UserSidebar";
import Navbar from "./Navbar";

const LoanApplicationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    loanAmount: "",
    loanPurpose: "",
    monthlyIncome: "",
    loanTerm: "",
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
      <Typography variant="h4" gutterBottom>
        Loan Application Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
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

          <Grid item xs={12}>
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

          <Grid item xs={12}>
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

          <Grid item xs={12}>
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

          <Grid item xs={12}>
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

          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Apply for Loan
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
    </Box>
    </Box>
  );
};

export default LoanApplicationForm;
