import * as React from 'react';
import './index.css';
import * as ReactDOM from 'react-dom/client';
 
import App from './App';
import Layout from './layouts/Layout';
import AuthLayout from './auth/Layout';
import Dashboard from './pages/Dashboard';
import Client from './pages/Client';
import Loans from './pages/Loans';
import Emi from './pages/Emi';
import Calculator from './pages/Calculator';
import Contact from './pages/Contact';
import Users from './pages/Users';
 
import Login from './auth/Login';
import Register from './auth/Register';
import {BrowserRouter} from 'react-router-dom'
 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
  <BrowserRouter>
  
  <App />

</BrowserRouter>
);

 
 