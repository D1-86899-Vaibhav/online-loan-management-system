
import React from 'react';
import { Link } from 'react-router-dom';  // Use this if you are using React Router for navigation
import { useTheme } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PaymentIcon from '@mui/icons-material/Payment';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';
import EditNoteIcon from '@mui/icons-material/EditNote';
const UserSidebar = () => {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    return (
        <div className={`bg-${isDarkMode ? 'gray-800' : 'gray-100'} text-white p-4 h-full`}>
            {/* <div className="space-y-4">
                {/* <div className="text-xl font-semibold text-black">Dashboard</div> */}
                
                {/* Navigation Links */}
                {/* <Link to="/dashboard" className="block text-lg text-black hover:text-black-400">Dashboard</Link> */}
                {/* <Link to="/loan-details" className="block text-lg text-black hover:text-black-400">Loan Details</Link> */}
                {/* <Link to="/pay-emi" className="block text-lg text-black hover:text-black-400">Pay EMI</Link> */}
                {/* <Link to="/user-profile" className="block text-lg text-black hover:text-black-400">User Profile</Link> */}
                {/* <Link to="/wallet" className="block text-lg text-black hover:text-black-400">Wallet</Link> */}
                {/* <Link to="/kyc" className="block text-lg text-black hover:text-black-400">KYC</Link> */}
                {/* <Link to="/apply-for-loan" className="block text-lg text-black hover:text-black-400">Apply For Loan</Link> */}
                {/* Add more navigation links as required */}
            {/* </div> */} 

            <div className="mt-10">
                {/* Sidebar Stats or Icons */}
                <div className="flex items-center space-x-3">
                    <DashboardIcon className={`text-${isDarkMode ? 'purple-300' : 'purple-500'}`} />
                    <Link to="/dashboard" className="block text-lg text-black hover:text-black-400">Dashboard</Link>
                </div>
                <div className="flex items-center space-x-3 mt-4">
                    <ReceiptLongIcon className={`text-${isDarkMode ? 'blue-300' : 'blue-500'}`} />
                    <Link to="/loan-details" className="block text-lg text-black hover:text-black-400">Loan Details</Link>
                </div>
                <div className="flex items-center space-x-3 mt-4">
                    <PaymentIcon className={`text-${isDarkMode ? 'yellow-300' : 'yellow-500'}`} />
                    <Link to="/pay-emi" className="block text-lg text-black hover:text-black-400">Pay EMI</Link>                </div>
                <div className="flex items-center space-x-3 mt-4">
                    <AccountCircleIcon className={`text-${isDarkMode ? 'red-300' : 'red-500'}`} />
                    <Link to="/user-profile" className="block text-lg text-black hover:text-black-400">User Profile</Link>
                    
                </div>
                <div className="flex items-center space-x-3 mt-4">
                    <AccountBalanceWalletIcon className={`text-${isDarkMode ? 'purple-300' : 'purple-500'}`} />
                    <Link to="/wallet" className="block text-lg text-black hover:text-black-400">Wallet</Link>
                </div>
                <div className="flex items-center space-x-3 mt-4">
                    <DomainVerificationIcon className={`text-${isDarkMode ? 'blue-300' : 'blue-500'}`} />
                    <Link to="/kyc" className="block text-lg text-black hover:text-black-400">KYC</Link>
                </div>
                <div className="flex items-center space-x-3 mt-4">
                    <EditNoteIcon className={`text-${isDarkMode ? 'yellow-300' : 'yellow-500'}`} />
                    <Link to="/apply-for-loan" className="block text-lg text-black hover:text-black-400">Apply For Loan</Link>
                </div>
            </div>
        </div>
    );
};

export default UserSidebar;
