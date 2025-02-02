import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Landing from './landing/Landing';
import Main from './landing/Main';
import Login from './auth/Login';
import Register from './auth/Register';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ContactsIcon from '@mui/icons-material/Contacts';
import PeopleIcon from '@mui/icons-material/People';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CalculateIcon from '@mui/icons-material/Calculate';
import LoginIcon from '@mui/icons-material/Login';

import { SharedWalletProvider } from './components/SharedWallet';

// Admin Routes
import AdminDashboard from './admin/AdminDashboard';
import AdminClients from './admin/AdminClients';
import AdminLoans from './admin/AdminLoans';
import AdminEMI from './admin/AdminEMI';

// User Routes
import Dashboard from './user/Dashboard';
import LoanDetails from './user/LoanDetails';
import PayEmi from './user/PayEmi';
import Wallet from './user/Wallet';
import UserProfile from './user/UserProfile';
import KYCForm from './user/Kyc';
import LoanApplicationForm from './user/LoanApplication';
import AdminCalculator from './admin/AdminCalculator';
import AdminUsers from './admin/AdminUsers';
import AdminContact from './admin/AdminContact';
import AdminNavbar from './admin/AdminNavbar';
import Navbar from './user/Navbar';

export default function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  return (    
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing/>} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="MainPage" element={<Main />} />

      {/* Admin Routes */}
      <Route path="AdminDashboard" element={<AdminDashboard />} /> 
      <Route path="AdminClients" element={<AdminClients />} /> 
      <Route path="AdminLoans" element={<AdminLoans />} /> 
      <Route path="AdminEMI" element={<AdminEMI />} /> 
      <Route path="AdminCalculator" element={<AdminCalculator/>} /> 
      <Route path="AdminUsers" element={<AdminUsers/>} /> 
      <Route path="AdminContact" element={<AdminContact/>} /> 



      {/* User Routes */}
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="loan-details" element={<LoanDetails />} /> 
      
      {/* Wrap PayEmi & Wallet with SharedWalletProvider */}
      <Route path="pay-emi" element={
        <SharedWalletProvider>
          <PayEmi />
        </SharedWalletProvider>
      } />
      <Route path="wallet" element={
        <SharedWalletProvider>
          <Wallet />
        </SharedWalletProvider>
      } />

      <Route path="user-profile" element={<UserProfile />} /> 
      <Route path="kyc" element={<KYCForm />} /> 
      <Route path="apply-for-loan" element={<LoanApplicationForm />} /> 
    </Routes>
  );
}
