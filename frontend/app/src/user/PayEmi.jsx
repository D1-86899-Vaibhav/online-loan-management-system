import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Card,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Badge,
  Pagination,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserSidebar from './UserSidebar';
import Navbar from './Navbar';

const PayEmi = () => {
  // Local state for wallet balance (number) and EMI details.
  const [walletBalance, setWalletBalance] = useState(0);
  const [emiDetails, setEmiDetails] = useState([
    { id: 1, totalEMI: 35, paidEMI: 24, remainingEMI: 9, emiAmount: 500 },
    { id: 2, totalEMI: 24, paidEMI: 12, remainingEMI: 12, emiAmount: 1000 },
    { id: 3, totalEMI: 12, paidEMI: 6, remainingEMI: 6, emiAmount: 700 },
  ]);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const indexOfLastLoan = currentPage * itemsPerPage;
  const indexOfFirstLoan = indexOfLastLoan - itemsPerPage;
  const currentLoans = emiDetails.slice(indexOfFirstLoan, indexOfLastLoan);
  const totalPages = Math.ceil(emiDetails.length / itemsPerPage);

  // Function to fetch wallet balance from the API.
  const fetchWalletBalance = async () => {
    try {
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication token is missing. Please log in.');
      }
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get('http://localhost:8080/wallet/balance', { headers });
      // Assume the API returns a single numeric value (e.g. 32.0)
      setWalletBalance(response.data);
      console.log('Wallet balance:', response.data);
    } catch (error) {
      console.error('Error fetching wallet balance:', error.response?.data || error.message);
      toast.error('Error fetching wallet balance!', { position: 'top-right', autoClose: 3000 });
    }
  };

  // Fetch wallet balance when the component mounts.
  useEffect(() => {
    fetchWalletBalance();
  }, []);

  // Handler for processing EMI payment via the API.
  // The backend method accepts the EMI amount as a raw number in the request body.
  const handlePay = async (emiId, emiAmount) => {
    if (emiAmount > walletBalance) {
      toast.error('Insufficient balance in wallet!', { position: 'top-right', autoClose: 3000 });
      return;
    }

    try {
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication token is missing. Please log in.');
      }
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      // Send the EMI amount as the request body (a raw number).
      const response = await axios.post(
        'http://localhost:8080/wallet/pay-emi',
        emiAmount,
        { headers }
      );

      // Assume the API returns the updated wallet balance as a number.
      setWalletBalance(response.data);

      // Update EMI details locally: increment paidEMI and decrement remainingEMI for the matching EMI.
      const updatedEmiDetails = emiDetails.map((emi) =>
        emi.id === emiId
          ? { ...emi, paidEMI: emi.paidEMI + 1, remainingEMI: emi.remainingEMI - 1 }
          : emi
      );
      setEmiDetails(updatedEmiDetails);

      toast.success(`EMI ID: ${emiId} paid successfully!`, {
        position: 'top-right',
        autoClose: 3000,
      });
    } catch (error) {
      console.error('Error processing EMI payment:', error.response?.data || error.message);
      toast.error('An error occurred while processing your EMI payment.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  // Handle pagination page change.
  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Box display="flex" minHeight="100vh" flexDirection="column">
      {/* Navbar */}
      <Navbar />

      <Box display="flex" flex={1}>
        {/* Sidebar */}
        <Box width="20%" minHeight="100vh">
          <UserSidebar />
        </Box>

        {/* Main Content */}
        <Box width="80%" p={4}>
          <Card sx={{ p: 2, boxShadow: 3 }}>
            <Typography variant="h5" fontWeight="bold">
              Pay EMI
            </Typography>
            <Typography variant="h6" sx={{ mt: 2, mb: 4 }}>
              Wallet Balance: ₹{walletBalance}
            </Typography>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Total EMI</TableCell>
                    <TableCell>Paid EMI</TableCell>
                    <TableCell>Remaining EMI</TableCell>
                    <TableCell>EMI Amount</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentLoans.map((emi) => (
                    <TableRow key={emi.id}>
                      <TableCell>{emi.totalEMI}</TableCell>
                      <TableCell>{emi.paidEMI}</TableCell>
                      <TableCell>{emi.remainingEMI}</TableCell>
                      <TableCell>₹{emi.emiAmount}</TableCell>
                      <TableCell>
                        {emi.remainingEMI > 0 ? (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handlePay(emi.id, emi.emiAmount)}
                          >
                            Pay EMI
                          </Button>
                        ) : (
                          <Badge color="success" badgeContent="Completed" />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>

          {/* Pagination */}
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            sx={{ mt: 2, justifyContent: 'center', display: 'flex' }}
          />

          {/* Toast Container */}
          <ToastContainer />
        </Box>
      </Box>
    </Box>
  );
};

export default PayEmi;
