import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Card, Typography, Button, TextField, Grid } from '@mui/material';
import Navbar from './Navbar';
import UserSidebar from './UserSidebar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Wallet = () => {
  // State variables
  const [walletBalance, setWalletBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const [action, setAction] = useState(''); // either 'add' or 'withdraw'

  // Function to display toast notifications
  const showToast = (message, type) => {
    if (type === 'error') {
      toast.error(message);
    } else {
      toast.success(message);
    }
  };

  // Function to fetch the wallet balance from the API
  const fetchWalletBalance = async () => {
    try {
      // Retrieve the JWT token from session storage
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication token is missing. Please log in.');
      }
      // Set up headers with the token
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get('http://localhost:8080/wallet/balance', { headers });
      // Since the API returns a single numeric value (e.g., 32.0), we set it directly
      setWalletBalance(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching wallet balance:', error.response?.data || error.message);
      showToast('Error fetching wallet balance', 'error');
    }
  };

  // Fetch the wallet balance when the component mounts
  useEffect(() => {
    fetchWalletBalance();
  }, []);

  // Handler for submitting the add/withdraw action
  const handleSubmit = async () => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      showToast('Please enter a valid amount!', 'error');
      return;
    }

    try {
      // Retrieve the JWT token from session storage
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication token is missing. Please log in.');
      }
      // Set up headers with the token
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      let response;
      let successMessage = '';

      if (action === 'add') {
        // Call the API endpoint for adding funds
        response = await axios.post(
          'http://localhost:8080/wallet/add-funds',
          { amount: numericAmount },
          { headers }
        );
        successMessage = 'Funds added successfully!';
      } else if (action === 'withdraw') {
        // Call the API endpoint for withdrawing funds
        response = await axios.post(
          'http://localhost:8080/wallet/withdraw-funds',
          { amount: numericAmount },
          { headers }
        );
        successMessage = 'Funds withdrawn successfully!';
      }

      // Show success toast with the proper message
      showToast(successMessage, 'success');

      // Immediately call the get balance API again to refresh the balance
      fetchWalletBalance();
    } catch (error) {
      console.error('Transaction error:', error.response?.data || error.message);
      showToast('An error occurred while processing your request.', 'error');
    } finally {
      setAmount('');
      setAction('');
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      sx={{
        backgroundColor: '#f4f4f4',
        fontFamily: 'Arial, sans-serif',
        margin: 0,
      }}
    >
      {/* Navbar */}
      <Navbar isAuthenticated={true} />

      <Box display="flex" flex={1}>
        {/* Sidebar */}
        <Box
          width="20%"
          minHeight="100vh"
          sx={{
            backgroundColor: '#fff',
            boxShadow: '4px 0 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <UserSidebar />
        </Box>

        {/* Main Content */}
        <Box
          width="80%"
          p={3}
          sx={{
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            marginLeft: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            mt: -35,
          }}
        >
          <Typography variant="h4" color="primary" gutterBottom align="center">
            Wallet Management
          </Typography>
          <Typography variant="body1" color="textSecondary" align="center" gutterBottom>
            Manage your wallet balance.
          </Typography>

          {/* Display current balance */}
          <Card
            sx={{
              p: 3,
              mb: 3,
              textAlign: 'center',
              width: '100%',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography variant="h5" color="textPrimary">
              Current Balance: ₹{walletBalance}
            </Typography>
          </Card>

          {/* Buttons to choose action */}
          <Grid container spacing={2} justifyContent="center" sx={{ mb: 3 }}>
            <Grid item>
              <Button
                variant="contained"
                color="success"
                onClick={() => setAction('add')}
                sx={{
                  fontSize: '16px',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
              >
                Add Funds
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="error"
                onClick={() => setAction('withdraw')}
                sx={{
                  fontSize: '16px',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
              >
                Withdraw Funds
              </Button>
            </Grid>
          </Grid>

          {/* Input field and submit button for the selected action */}
          {action && (
            <Card
              sx={{
                p: 3,
                mt: 3,
                textAlign: 'center',
                width: '100%',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              <TextField
                label={`Enter amount to ${action}`}
                variant="outlined"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                sx={{
                  mb: 2,
                  maxWidth: 400,
                  width: '100%',
                }}
              />
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  sx={{
                    width: '200px',
                    margin: '0 auto',
                    display: 'block',
                    fontSize: '16px',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  {action === 'add' ? 'Add Funds' : 'Withdraw Funds'}
                </Button>
              </Box>
            </Card>
          )}
        </Box>
      </Box>

      {/* Toast Container for notifications */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeButton
      />
    </Box>
  );
};

export default Wallet;
