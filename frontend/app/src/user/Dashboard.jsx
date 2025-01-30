import React, { useState } from 'react';
import UserSidebar from './UserSidebar'; // Import Sidebar component

import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
  Button,
  Badge,
  Grid,
} from '@mui/material';
import { green, yellow, red } from '@mui/material/colors';
import Navbar from './Navbar';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, date: '2023-10-01', amount: 5000, type: 'Credit', status: 'Completed' },
    { id: 2, date: '2023-10-05', amount: 3000, type: 'Debit', status: 'Pending' },
    { id: 3, date: '2023-10-10', amount: 2000, type: 'Credit', status: 'Completed' },
    ...Array.from({ length: 20 }, (_, i) => ({
      id: i + 4,
      date: `2023-10-${i + 11}`,
      amount: 1000 + i * 500,
      type: i % 2 === 0 ? 'Credit' : 'Debit',
      status: i % 3 === 0 ? 'Completed' : i % 3 === 1 ? 'Pending' : 'Failed',
    })),
  ]);

  const [loanStatus, setLoanStatus] = useState([
    { id: 1, loanId: 'LOAN123', amount: 50000, status: 'Approved' },
    { id: 2, loanId: 'LOAN456', amount: 30000, status: 'Pending' },
    { id: 3, loanId: 'LOAN789', amount: 20000, status: 'Rejected' },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const getTotalLoanAmountByStatus = (status) => {
    return loanStatus
      .filter((loan) => loan.status === status)
      .reduce((total, loan) => total + loan.amount, 0);
  };

  const indexOfLastTransaction = currentPage * itemsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - itemsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(transactions.length / itemsPerPage);

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
        {/* Transaction History */}
        <Card sx={{ mb: 4, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Transaction History
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>₹{transaction.amount}</TableCell>
                      <TableCell>{transaction.type}</TableCell>
                      <TableCell>
                        <Badge
                          sx={{
                            color:
                              transaction.status === 'Completed'
                                ? green[600]
                                : transaction.status === 'Pending'
                                ? yellow[800]
                                : red[600],
                          }}
                        >
                          {transaction.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              sx={{ mt: 2, justifyContent: 'center', display: 'flex' }}
            />
          </CardContent>
        </Card>

        {/* Loan Status */}
        <Card sx={{ boxShadow: 3 }}>
          <CardContent>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}
            >
              <Typography variant="h5" fontWeight="bold">
                Loan Status
              </Typography>
              <Button variant="contained" color="primary">
                View All
              </Button>
            </Box>
            <Grid container spacing={2}>
              {[
                {
                  title: 'Approved Loans',
                  status: 'Approved',
                  color: green[600],
                  count: loanStatus.filter((loan) => loan.status === 'Approved')
                    .length,
                  total: getTotalLoanAmountByStatus('Approved'),
                },
                {
                  title: 'Pending Loans',
                  status: 'Pending',
                  color: yellow[800],
                  count: loanStatus.filter((loan) => loan.status === 'Pending')
                    .length,
                  total: getTotalLoanAmountByStatus('Pending'),
                },
                {
                  title: 'Rejected Loans',
                  status: 'Rejected',
                  color: red[600],
                  count: loanStatus.filter((loan) => loan.status === 'Rejected')
                    .length,
                  total: getTotalLoanAmountByStatus('Rejected'),
                },
              ].map((item, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card sx={{ boxShadow: 2 }}>
                    <CardContent>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            bgcolor: item.color,
                            borderRadius: '50%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'white',
                            mr: 2,
                          }}
                        >
                          {item.status[0]}
                        </Box>
                        <Box>
                          <Typography variant="h6" fontWeight="bold">
                            {item.count}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Total: ₹{item.total}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Box>
    </Box>
  );
};

export default Dashboard;
