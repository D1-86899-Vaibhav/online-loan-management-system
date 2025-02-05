import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserSidebar from './UserSidebar'; // Import your Sidebar component
import Navbar from './Navbar';          // Import your Navbar component
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
  Pagination,
} from '@mui/material';
import { green, yellow, red } from '@mui/material/colors';
import toast, { Toaster } from 'react-hot-toast'; // For notifications

const LoanDetails = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // Number of loans per page

  // URL for the API
  const API_LOANS_DETAILS_URL = 'http://localhost:8080/loans/details';

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        // Start loading
        setLoading(true);

        // Retrieve the JWT token from session storage
        const token = sessionStorage.getItem('authToken'); // Ensure 'authToken' is the correct key

        // Set up headers
        const headers = { 'Content-Type': 'application/json' };
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        } else {
          // Handle the case where the token is missing
          throw new Error('Authentication token is missing. Please log in.');
        }

        // Make the API call
        const response = await axios.get(API_LOANS_DETAILS_URL, { headers });

        const data = response.data;

        // Log the data to check property names
        console.log('API Response Data:', data);

        // Currency and Date formatters
        const currencyFormatter = new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
          minimumFractionDigits: 2,
        });

        const dateFormatter = new Intl.DateTimeFormat('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        });

        // Helper function to format dates
        const formatDate = (dateString) => {
          if (!dateString) return 'N/A'; // Handle null or undefined dates
          const date = new Date(dateString);
          return isNaN(date.getTime()) ? 'Invalid Date' : dateFormatter.format(date);
        };

        // Formatting the data
        const formattedData = data.map((loan) => ({
          ...loan,
          loanAmountFormatted: currencyFormatter.format(loan.loanAmount),
          emiAmountFormatted: currencyFormatter.format(loan.emiAmount),
          startDateFormatted: formatDate(loan.startDate),
          endDateFormatted: formatDate(loan.endDate),
          lastEMIDateFormatted: formatDate(loan.lastEmiDate),
          nextEMIDateFormatted: formatDate(loan.nextEmiDate),
          statusFormatted:
            loan.status === 'APPROVED' ? 'Active' :
            loan.status === 'PENDING' ? 'Pending' :
            loan.status === 'REJECTED' ? 'Closed' :
            loan.status,
          totalEMI: loan.totalEMI,
          paidEMI: loan.paidEMI,
          remainingEMI: loan.remainingEMI,
        }));

        setLoans(formattedData);
      } catch (err) {
        console.error('Error fetching loans:', err.response || err);
        const errorMessage = err.response?.data?.message || err.message || 'Error fetching loan details. Please try again later.';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        // End loading
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  // Pagination calculations
  const totalPages = Math.ceil(loans.length / itemsPerPage);
  const indexOfLastLoan = currentPage * itemsPerPage;
  const indexOfFirstLoan = indexOfLastLoan - itemsPerPage;
  const currentLoans = loans.slice(indexOfFirstLoan, indexOfLastLoan);

  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handling loading and error states
  if (loading) {
    return (
      <Box display="flex" minHeight="100vh" justifyContent="center" alignItems="center">
        <Typography variant="h6">Loading Loan Details...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" minHeight="100vh" justifyContent="center" alignItems="center">
        <Toaster />
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  // If no loans are found
  if (loans.length === 0) {
    return (
      <Box display="flex" minHeight="100vh" justifyContent="center" alignItems="center">
        <Typography variant="h6">No loan records found.</Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" minHeight="100vh" flexDirection="column">
      <Toaster />
      {/* Navbar Component */}
      <Navbar />

      <Box display="flex" flex={1}>
        {/* Sidebar */}
        <Box width="20%" minHeight="100vh">
          <UserSidebar />
        </Box>
        {/* Main Content */}
        <Box width="80%" p={4}>
          {/* Heading */}
          <Card sx={{ mb: 4, boxShadow: 3 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mt: 3, ml: 2 }}>
              Loan Details
            </Typography>
            {/* Loans Table */}
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Loan Amount</TableCell>
                    <TableCell>EMI Amount</TableCell>
                    <TableCell>Duration</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
                    <TableCell>Total EMI</TableCell>
                    <TableCell>Paid EMI</TableCell>
                    <TableCell>Remaining EMI</TableCell>
                    <TableCell>Last EMI Date</TableCell>
                    <TableCell>Next EMI Date</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentLoans.map((loan) => (
                    <TableRow key={loan.id}>
                      <TableCell>{loan.loanAmountFormatted}</TableCell>
                      <TableCell>{loan.emiAmountFormatted}</TableCell>
                      <TableCell>{loan.duration}</TableCell>
                      <TableCell>{loan.startDateFormatted}</TableCell>
                      <TableCell>{loan.endDateFormatted}</TableCell>
                      <TableCell>{loan.totalEMI}</TableCell>
                      <TableCell>{loan.paidEMI}</TableCell>
                      <TableCell>{loan.remainingEMI}</TableCell>
                      <TableCell>{loan.lastEMIDateFormatted}</TableCell>
                      <TableCell>{loan.nextEMIDateFormatted}</TableCell>
                      <TableCell>
                        <Typography
                          sx={{
                            color:
                              loan.statusFormatted === 'Active'
                                ? green[600]
                                : loan.statusFormatted === 'Pending'
                                ? yellow[800]
                                : red[600],
                          }}
                        >
                          {loan.statusFormatted}
                        </Typography>
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
        </Box>
      </Box>
    </Box>
  );
};

export default LoanDetails;
