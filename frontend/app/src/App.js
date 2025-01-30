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
import Dashboard from './pages/Dashboard';
import AdminDashboard from './admin/AdminDashboard';
import AdminClients from './admin/AdminClients';
import AdminLoans from './admin/AdminLoans';
import AdminEMI from './admin/AdminEMI';
 


export default function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
 

  return (
 
    <Routes>
    <Route path='/' element={<Landing/>}  />
    <Route path='login' element={<Login/>}  />
    <Route path='register' element={<Register/>}  />
    <Route path ='MainPage' element={<Main/>} />
    <Route path ='Dashboard' element={<Dashboard/>} />
    <Route path ='AdminDashboard' element={<AdminDashboard/>} /> 
    <Route path ='AdminClients' element={<AdminClients/>} /> 
    <Route path ='AdminLoans' element={<AdminLoans/>} /> 
    <Route path ='AdminEMI' element={<AdminEMI/>} /> 
   
     
 
   </Routes>
 


 
 
  );
}