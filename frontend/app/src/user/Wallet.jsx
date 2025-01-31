import React, { useState } from 'react';
import Navbar from './Navbar';
import { useWallet } from '../components/SharedWallet'; // Import wallet context
import { Box, Card, Typography, Button, TextField, Grid } from '@mui/material';
import UserSidebar from './UserSidebar';
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import styles for Toastify

const Wallet = () => {
  const { walletBalance, addFunds, withdrawFunds } = useWallet(); // Get shared wallet functions
  const [amount, setAmount] = useState('');
  const [action, setAction] = useState(''); // Track action: 'add' or 'withdraw'

  // Function to show toast messages
  const showToast = (message, type) => {
    if (type === 'error') {
      toast.error(message);
    } else {
      toast.success(message);
    }
  };

  const handleSubmit = () => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      showToast('Please enter a valid amount!', 'error');
      return;
    }
    action === 'add' ? addFunds(numericAmount) : withdrawFunds(numericAmount);
    setAmount('');
    setAction('');
    showToast(action === 'add' ? 'Funds added successfully!' : 'Funds withdrawn successfully!', 'success');
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      sx={{
        backgroundColor: '#f4f4f4',
        fontFamily: 'Arial, sans-serif',
        margin: 0, // Remove default margin
      }}
    >
      {/* Navbar Component */}
      <Navbar />

      <Box display="flex" flex={1}>
        {/* Sidebar */}
        <Box width="20%" minHeight="100vh" sx={{ backgroundColor: '#fff', boxShadow: '4px 0 6px rgba(0, 0, 0, 0.1)' }}>
          <UserSidebar />
        </Box>

        {/* Main Content */}
        <Box
          width="80%"
          p={3} // Reduced padding to minimize space
          sx={{
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            marginLeft: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            mt: -35, // Reduced margin-top for main content
          }}
        >
          <Typography variant="h4" color="primary" gutterBottom align="center">
            Wallet Management
          </Typography>
          <Typography variant="body1" color="textSecondary" align="center" gutterBottom>
            Manage your wallet balance.
          </Typography>

          <Card sx={{ p: 3, mb: 3, textAlign: 'center', width: '100%', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
            <Typography variant="h5" color="textPrimary">
              Current Balance: ₹{walletBalance}
            </Typography>
          </Card>

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

          {action && (
            <Card sx={{ p: 3, mt: 3, textAlign: 'center', width: '100%', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
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
                  marginBottom: '20px',
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

      {/* Toast container to show the toasts */}
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar newestOnTop closeButton />
    </Box>
  );
};

export default Wallet;
