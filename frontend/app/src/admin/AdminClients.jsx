import React, { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';
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
  Button,
} from '@mui/material';
import { green, yellow, red } from '@mui/material/colors';
import toast, { Toaster } from 'react-hot-toast'; // For notifications

const AdminClients = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // Number of loans per page

  // Fetch loans from the admin endpoint using the JWT token
  const fetchLoans = useCallback(async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem('authToken'); // Adjust based on your JWT storage
      // Admin endpoint: returns all loans (not filtered by user)
      const response = await fetch('http://localhost:8080/loans/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorMsg = await response.text();
        throw new Error(errorMsg || 'Failed to fetch loans');
      }
      const data = await response.json();

      // Format the API response data for display
      const formattedData = data.map((loan) => ({
        ...loan,
        id: loan.id, // Correctly mapping id
        loanAmountFormatted: loan.loanAmount.toLocaleString('en-IN', {
          style: 'currency',
          currency: 'INR',
          minimumFractionDigits: 2,
        }),
        emiAmountFormatted: loan.emiAmount.toLocaleString('en-IN', {
          style: 'currency',
          currency: 'INR',
          minimumFractionDigits: 2,
        }),
        startDateFormatted: format(new Date(loan.startDate), 'dd-MMM-yyyy'),
        endDateFormatted: format(new Date(loan.endDate), 'dd-MMM-yyyy'),
        nextEMIDateFormatted: loan.nextEMIDate
          ? format(new Date(loan.nextEMIDate), 'dd-MMM-yyyy')
          : 'N/A',
        statusFormatted:
          loan.status === 'APPROVED'
            ? 'Active'
            : loan.status === 'PENDING'
            ? 'Pending'
            : 'Closed',
      }));

      setLoans(formattedData);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching loans:', err);
      setError(err.message || 'Error fetching loan details. Please try again later.');
      toast.error(err.message || 'Error fetching loan details. Please try again later.');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLoans();
  }, [fetchLoans]);

  // Calculate pagination details
  const totalPages = Math.ceil(loans.length / itemsPerPage);
  const indexOfLastLoan = currentPage * itemsPerPage;
  const indexOfFirstLoan = indexOfLastLoan - itemsPerPage;
  const currentLoans = loans.slice(indexOfFirstLoan, indexOfLastLoan);

  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Update loan status API call (approve or reject)
  const handleUpdateStatus = async (id, action) => {
    try {
      const token = sessionStorage.getItem('authToken');
      const response = await fetch(`http://localhost:8080/loans/${id}/updateStatus`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ action: action }),
      });
      if (!response.ok) {
        const errorMsg = await response.text();
        throw new Error(errorMsg || 'Failed to update loan status');
      }
      toast.success(`Loan ${action === 'approve' ? 'Approved' : 'Rejected'}`);
      fetchLoans(); // Refresh the loans list after status update
    } catch (err) {
      console.error(`Error ${action}ing loan:`, err);
      toast.error(err.message || `Error ${action}ing loan`);
    }
  };

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

  return (
    <Box display="flex" flexDirection="column">
      <Toaster />
      {/* Navbar */}
      <AdminNavbar />

      <Box display="flex">
        {/* Sidebar */}
        <Box width="20%">
          <AdminSidebar />
        </Box>

        {/* Main Content */}
        <Box width="80%" p={4}>
          <Card sx={{ mb: 4, boxShadow: 3 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mt: 3, ml: 2 }}>
              Loan Applications
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Loan ID</TableCell>
                    <TableCell>User ID</TableCell> {/* Remove or adjust based on your data */}
                    <TableCell>Loan Amount</TableCell>
                    <TableCell>EMI Amount</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
                    <TableCell>Next EMI Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentLoans.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} align="center">
                        No loan applications found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentLoans.map((loan) => (
                      <TableRow key={loan.id}>
                        <TableCell>{loan.id}</TableCell>
                        <TableCell>{loan.userId}</TableCell> {/* Remove or adjust based on your data */}
                        <TableCell>{loan.loanAmountFormatted}</TableCell>
                        <TableCell>{loan.emiAmountFormatted}</TableCell>
                        <TableCell>{loan.startDateFormatted}</TableCell>
                        <TableCell>{loan.endDateFormatted}</TableCell>
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
                        <TableCell>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleUpdateStatus(loan.id, 'approve')}
                            disabled={loan.status !== 'PENDING'}
                            sx={{ mr: 2 }}
                          >
                            Approve
                          </Button>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleUpdateStatus(loan.id, 'reject')}
                            disabled={loan.status !== 'PENDING'}
                          >
                            Reject
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>

          {/* Render Pagination if there are records */}
          {loans.length > 0 && (
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminClients;
