import React, { useState } from 'react';
import { useWallet } from '../components/SharedWallet'; // Import wallet context
import {
  Box,
  Card,
  Typography,
  Button,
  TextField,
  Grid,
} from '@mui/material';
import UserSidebar from './UserSidebar';

const Wallet = () => {
  const { walletBalance, addFunds, withdrawFunds } = useWallet(); // Get shared wallet functions
  const [amount, setAmount] = useState('');
  const [action, setAction] = useState(''); // Track action: 'add' or 'withdraw'

  const handleSubmit = () => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      alert('Please enter a valid amount!');
      return;
    }
    action === 'add' ? addFunds(numericAmount) : withdrawFunds(numericAmount);
    setAmount('');
    setAction('');
  };

  return (
    <Box display="flex" minHeight="100vh">
      {/* Sidebar */}
      <Box width="20%" minHeight="100vh">
        <UserSidebar />
      </Box>
     <Box width="80%" p={4}>
      <Typography variant="h4" color="primary">Wallet</Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Manage your wallet balance.
      </Typography>
      
      <Card sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" color="textPrimary">
          Current Balance: ₹{walletBalance}
        </Typography>
      </Card>

      <Grid container spacing={2}>
        <Grid item>
          <Button
            variant="contained"
            color="success"
            onClick={() => setAction('add')}
          >
            Add Funds
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="error"
            onClick={() => setAction('withdraw')}
          >
            Withdraw Funds
          </Button>
        </Grid>
      </Grid>

      {action && (
        <Card sx={{ p: 3, mt: 3 }}>
          <TextField
            label={`Enter amount to ${action}`}
            variant="outlined"
            type="number"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{ width: '100%' }}
            >
              {action === 'add' ? 'Add Funds' : 'Withdraw Funds'}
            </Button>
          </Box>
        </Card>
      )}
    </Box>
    </Box>
  );
};

export default Wallet;
