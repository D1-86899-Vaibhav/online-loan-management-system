import React, { useState } from "react";
import { Typography, Button, Box, TextField, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Paper, FormControl, CircularProgress } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminSidebar from "./AdminSidebar"; // Assuming you have a sidebar component
import AdminNavbar from "./AdminNavbar"; // Assuming you have a navbar component

const AdminCalculator = () => {
  const [amount, setAmount] = useState(0);
  const [interest, setInterest] = useState(0);
  const [time, setTime] = useState(0);
  const [emi, setEmi] = useState(0);
  const [totalinterest, setTotalinterest] = useState(0);
  const [principal, setPrincipal] = useState(0);
  const [loading, setLoading] = useState(false); // Loading state

  const handlePrincipalchange = (event) => {
    setPrincipal(event.target.value);
  };
  const handleInterestchange = (event) => {
    setInterest(event.target.value);
  };
  const handleTimechange = (event) => {
    setTime(event.target.value);
  };

  const calculateLoan = () => {
    // Convert inputs to numbers
    const p = parseFloat(principal);
    const r = parseFloat(interest);
    const n = parseFloat(time);

    // Check if inputs are valid numbers and greater than 0
    if (!isNaN(p) && !isNaN(r) && !isNaN(n) && p > 0 && r > 0 && n > 0) {
      setLoading(true); // Start loading

      let actualRate = r / 12 / 100; // Monthly interest rate

      let calcemi = p * actualRate * (Math.pow(1 + actualRate, n) / (Math.pow(1 + actualRate, n) - 1));

      setEmi(Math.round(calcemi));
      setAmount(Math.round(calcemi * n));
      setTotalinterest(Math.round(calcemi * n - p));
      setLoading(false); // End loading
    } else {
      toast.error("Amount, Interest and Period must be greater than 0!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        toastId: "id",
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setEmi(0);
      setAmount(0);
      setTotalinterest(0);
    }
  };

  return (
    <Box className="min-h-screen flex flex-col">
      {/* Navbar */}
      <AdminNavbar isAuthenticated={true} />

      <Box className="flex flex-row flex-grow">
        {/* Sidebar */}
        <Box className="w-1/5 bg-gray-100 p-4">
          <AdminSidebar />
        </Box>

        {/* Main Content */}
        <Box className="w-4/5 p-6">
          <ToastContainer />
          <Typography variant="h5" align="center" className="mb-4">
            Loan Calculator
          </Typography>

          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <TextField
                label="Enter loan Amount"
                type="number"
                variant="outlined"
                name="loan_amount"
                onChange={handlePrincipalchange}
                value={principal}
                sx={{ minWidth: "92%", mb: 2 }}
              />
              <TextField
                label="Enter interest rate"
                variant="outlined"
                type="number"
                name="interest_rate"
                onChange={handleInterestchange}
                value={interest}
                sx={{ minWidth: "92%", mb: 2 }}
              />
              <TextField
                label="Enter loan period in month"
                variant="outlined"
                type="number"
                name="loan_period_in_month"
                onChange={handleTimechange}
                value={time}
                sx={{ minWidth: "92%", mb: 2 }}
              />
              <Box display="flex" justifyContent="center" alignItems="center">
                <FormControl size="large" style={{ marginTop: "10px" }}>
                  <Button variant="outlined" size="large" onClick={calculateLoan}>
                    Calculate
                  </Button>
                </FormControl>
              </Box>
            </Grid>
            <Grid item md={6} xs={12} display="flex" alignItems="center" justifyContent="center">
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableBody>
                    <TableRow>
                      <TableCell align="center">
                        <Typography variant="p">Loan EMI</Typography>
                        <Box sx={{ m: 1 }} />
                        <Typography variant="h6" className="font-bold">
                          ₹ {emi || 0}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="center">
                        <Typography variant="p">Total Loan Amount</Typography>
                        <Box sx={{ m: 1 }} />
                        <Typography variant="h6" className="font-bold">
                          ₹ {amount || 0}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="center">
                        <Typography variant="p">Total Interest</Typography>
                        <Box sx={{ m: 1 }} />
                        <Typography variant="h6" className="font-bold">
                          ₹ {totalinterest || 0}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
          {loading && (
            <Box className="flex justify-center items-center h-40">
              <CircularProgress />
            </Box>
          )}
          <Box sx={{ m: 4 }} />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminCalculator;
