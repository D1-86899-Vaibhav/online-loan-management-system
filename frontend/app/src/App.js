import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Landing from './landing/Landing';
import Main from './landing/Main';
import Login from './auth/Login';
import Register from './auth/Register';

// Admin Routes
import AdminDashboard from './admin/AdminDashboard';
import AdminClients from './admin/AdminClients';
import AdminLoans from './admin/AdminLoans';
import AdminEMI from './admin/AdminEMI';
import AdminLogout from './admin/AdminLogout';
import AdminCalculator from './admin/AdminCalculator';
import AdminUsers from './admin/AdminUsers';
import AdminContact from './admin/AdminContact';
// User Routes
import Dashboard from './user/Dashboard';
import LoanDetails from './user/LoanDetails';
import PayEmi from './user/PayEmi';
import Wallet from './user/Wallet';
import UserProfile from './user/UserProfile';
import KYCForm from './user/Kyc';
import LoanApplicationForm from './user/LoanApplication';
import Logout from './auth/Logout';  // Import Logout component

import { SharedWalletProvider } from './components/SharedWallet';
import ProtectedRoute from './auth/ProtectedRoute'; // Import ProtectedRoute

export default function App() {
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    const role = sessionStorage.getItem('userRole');

    if (token && role) {
      setUserRole(role);
    } else {
      // Redirect to login page if not authenticated
      navigate('/login');
    }
  }, [navigate]);

  const redirectBasedOnRole = () => {
    if (userRole === 'ROLE_ADMIN') {
      navigate('/AdminDashboard');
    } else if (userRole === 'ROLE_USER') {
      navigate('/dashboard');
    }
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="MainPage" element={<Main />} />

      {/* Admin Routes (only for Admin users) */}
      <Route path="AdminDashboard" element={
        <ProtectedRoute requiredRole="ROLE_ADMIN">
          <AdminDashboard />
        </ProtectedRoute>
      } />
      <Route path="AdminClients" element={
        <ProtectedRoute requiredRole="ROLE_ADMIN">
          <AdminClients />
        </ProtectedRoute>
      } />
      <Route path="AdminLoans" element={
        <ProtectedRoute requiredRole="ROLE_ADMIN">
          <AdminLoans />
        </ProtectedRoute>
      } />
      <Route path="AdminEMI" element={
        <ProtectedRoute requiredRole="ROLE_ADMIN">
          <AdminEMI />
        </ProtectedRoute>
      } />
      <Route path="AdminCalculator" element={
        <ProtectedRoute requiredRole="ROLE_ADMIN">
          <AdminCalculator />
        </ProtectedRoute>
      } />
      <Route path="AdminUsers" element={
        <ProtectedRoute requiredRole="ROLE_ADMIN">
          <AdminUsers />
        </ProtectedRoute>
      } />
      <Route path="AdminContact" element={
        <ProtectedRoute requiredRole="ROLE_ADMIN">
          <AdminContact />
        </ProtectedRoute>
      } />

      {/* User Routes (only for regular users) */}
      <Route path="dashboard" element={
        <ProtectedRoute requiredRole="ROLE_USER">
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="loan-details" element={
        <ProtectedRoute requiredRole="ROLE_USER">
          <LoanDetails />
        </ProtectedRoute>
      } />
      <Route path="pay-emi" element={
        <ProtectedRoute requiredRole="ROLE_USER">
          <SharedWalletProvider>
            <PayEmi />
          </SharedWalletProvider>
        </ProtectedRoute>
      } />
      <Route path="wallet" element={
        <ProtectedRoute requiredRole="ROLE_USER">
          <SharedWalletProvider>
            <Wallet />
          </SharedWalletProvider>
        </ProtectedRoute>
      } />
      <Route path="user-profile" element={
        <ProtectedRoute requiredRole="ROLE_USER">
          <UserProfile />
        </ProtectedRoute>
      } />
      <Route path="kyc" element={
        <ProtectedRoute requiredRole="ROLE_USER">
          <KYCForm />
        </ProtectedRoute>
      } />
      <Route path="apply-for-loan" element={
        <ProtectedRoute requiredRole="ROLE_USER">
          <LoanApplicationForm />
        </ProtectedRoute>
      } />

      {/* Logout Route */}
      <Route path="logout" element={<Logout />} />

      {/* Catch-all route redirects to login page if user is not authenticated */}
      <Route path="*" element={<Login />} />
    </Routes>
  );
}
