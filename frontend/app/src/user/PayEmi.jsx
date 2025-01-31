import React, { useState } from 'react';
import { useWallet } from '../components/SharedWallet'; // Import wallet context
import { ToastContainer, toast } from 'react-toastify'; // Import React Toastify
import 'react-toastify/dist/ReactToastify.css'; // Toastify styles
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
import UserSidebar from './UserSidebar';
import Navbar from './Navbar';

const PayEmi = () => {
  const { walletBalance, withdrawFunds } = useWallet(); // Shared wallet context
  const [emiDetails, setEmiDetails] = useState([
    { id: 1, totalEMI: 35, paidEMI: 24, remainingEMI: 9, emiAmount: 500 },
    { id: 2, totalEMI: 24, paidEMI: 12, remainingEMI: 12, emiAmount: 1000 },
    { id: 3, totalEMI: 12, paidEMI: 6, remainingEMI: 6, emiAmount: 700 },
  ]);

  const handlePay = (emiId, emiAmount) => {
    if (emiAmount > walletBalance) {
      toast.error('Insufficient balance in wallet!', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    // Deduct amount from wallet
    withdrawFunds(emiAmount);

    // Update EMI details
    const updatedEmiDetails = emiDetails.map((emi) =>
      emi.id === emiId
        ? {
            ...emi,
            paidEMI: emi.paidEMI + 1,
            remainingEMI: emi.remainingEMI - 1,
          }
        : emi
    );

    setEmiDetails(updatedEmiDetails);

    // Show success toast
    toast.success(`EMI ID: ${emiId} paid successfully!`, {
      position: 'top-right',
      autoClose: 3000,
    });
  };


    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2; // Set the number of loans per page
  
    // Calculate the index range of loans to display for the current page
    const indexOfLastLoan = currentPage * itemsPerPage;
    const indexOfFirstLoan = indexOfLastLoan - itemsPerPage;
    const currentLoans = emiDetails.slice(indexOfFirstLoan, indexOfLastLoan);
  
    // Handle page change
    const handlePageChange = (event, pageNumber) => {
      setCurrentPage(pageNumber);
    };
  
    // Calculate total pages
    const totalPages = Math.ceil(emiDetails.length / itemsPerPage);

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
      <Card sx={{ p: 2, boxShadow: 3 }}>
      <Typography variant="h5" fontWeight="bold" >
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
              {emiDetails.map((emi) => (
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
