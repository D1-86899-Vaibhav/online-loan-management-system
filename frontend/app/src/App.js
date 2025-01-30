import React, { useEffect, useState } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Outlet } from 'react-router-dom';
import { AppProvider } from '@toolpad/core/react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import ContactsIcon from '@mui/icons-material/Contacts';
import PeopleIcon from '@mui/icons-material/People';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CalculateIcon from '@mui/icons-material/Calculate';
import LoginIcon from '@mui/icons-material/Login';
import Loans from './pages/Loans';
import { Link, Route, Routes,Router } from 'react-router-dom'
import Main from './landing/Main';
import Login from './auth/Login';
import Register from './auth/Register';
import Landing from './landing/Landing';
import Dashboard from './user/Dashboard';
import LoanDetails from './user/LoanDetails';
import PayEmi from './user/PayEmi';
import { SharedWalletProvider } from './components/SharedWallet';
import Wallet from './user/Wallet';
import UserProfile from './user/UserProfile';
import KYCForm from './user/Kyc';
import LoanApplicationForm from './user/LoanApplication';
 
 


export default function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
 

  return (    
    <Routes>
    <Route path='/' element={<Landing/>}  />
    <Route path='login' element={<Login/>}  />
    <Route path='register' element={<Register/>}  />
    <Route path ='MainPage' element={<Main/>} />
    <Route path ='dashboard' element={<Dashboard/>} />
    <Route path ='loan-details' element={<LoanDetails/>} /> 
    {/* Wrap only PayEmi, Wallet with SharedWalletProvider */}
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

<Route path ='user-profile' element={<UserProfile/>} /> 
<Route path ='kyc' element={<KYCForm/>} /> 
<Route path ='apply-for-loan' element={<LoanApplicationForm/>} /> 


    
     
  
   </Routes>
 


 
 
  );
}