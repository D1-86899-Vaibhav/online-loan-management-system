import React, { useState } from 'react';
import UserSidebar from './UserSidebar'; // Import Sidebar
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
  Badge,
  Grid,
} from '@mui/material';
import Navbar from './Navbar';

const LoanDetails = () => {
  // Mock data for multiple loans
  const loans = [
    {
      id: 1,
      loanAmount: 'USD 50,000/-',
      emiAmount: 'USD 5,000/-',
      duration: '1 year',
      startDate: '20 Feb 2021',
      endDate: '20 Feb 2022',
      totalEMI: 35,
      paidEMI: 24,
      remainingEMI: 9,
      lastEMIDate: '22 August 2021',
      nextEMIDate: '29 August 2021',
      status: 'Active',
    },
    {
      id: 2,
      loanAmount: 'USD 30,000/-',
      emiAmount: 'USD 3,000/-',
      duration: '2 years',
      startDate: '15 Mar 2021',
      endDate: '15 Mar 2023',
      totalEMI: 24,
      paidEMI: 12,
      remainingEMI: 12,
      lastEMIDate: '15 July 2023',
      nextEMIDate: '15 August 2023',
      status: 'Active',
    },
    {
      id: 3,
      loanAmount: 'USD 20,000/-',
      emiAmount: 'USD 2,000/-',
      duration: '6 months',
      startDate: '10 Jan 2023',
      endDate: '10 July 2023',
      totalEMI: 12,
      paidEMI: 6,
      remainingEMI: 6,
      lastEMIDate: '10 June 2023',
      nextEMIDate: '10 July 2023',
      status: 'Closed',
    },
    // More loan data here...
  ];

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // Set the number of loans per page

  // Calculate the index range of loans to display for the current page
  const indexOfLastLoan = currentPage * itemsPerPage;
  const indexOfFirstLoan = indexOfLastLoan - itemsPerPage;
  const currentLoans = loans.slice(indexOfFirstLoan, indexOfLastLoan);

  // Handle page change
  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total pages
  const totalPages = Math.ceil(loans.length / itemsPerPage);

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
        {/* Heading */}
        <Card sx={{ mb: 4, boxShadow: 3 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mt: 3,ml:2  }}>
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
                    <TableCell>{loan.loanAmount}</TableCell>
                    <TableCell>{loan.emiAmount}</TableCell>
                    <TableCell>{loan.duration}</TableCell>
                    <TableCell>{loan.startDate}</TableCell>
                    <TableCell>{loan.endDate}</TableCell>
                    <TableCell>{loan.totalEMI}</TableCell>
                    <TableCell>{loan.paidEMI}</TableCell>
                    <TableCell>{loan.remainingEMI}</TableCell>
                    <TableCell>{loan.lastEMIDate}</TableCell>
                    <TableCell>{loan.nextEMIDate}</TableCell>
                    <TableCell>
                      <Badge
                        badgeContent={loan.status}
                        color={loan.status === 'Active' ? 'success' : 'error'}
                      />
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
