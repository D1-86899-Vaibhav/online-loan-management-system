import React from 'react';
import { Link } from 'react-router-dom';  // Use this if you are using React Router for navigation
import { useTheme } from '@mui/material/styles';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const Sidebar = () => {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    return (
        <div className={`bg-${isDarkMode ? 'gray-800' : 'gray-100'} text-white p-4 h-full`}>
            <div className="space-y-4">
                <div className="text-xl font-semibold text-black">Dashboard</div>
                
                {/* Navigation Links */}
                <Link to="/dashboard" className="block text-lg text-black hover:text-black-400">Dashboard</Link>
                <Link to="/clients" className="block text-lg text-black hover:text-black-400">Clients</Link>
                <Link to="/loans" className="block text-lg text-black hover:text-black-400">Loans</Link>
                <Link to="/payments" className="block text-lg text-black hover:text-black-400">Payments</Link>
                {/* Add more navigation links as required */}
            </div>

            <div className="mt-10">
                {/* Sidebar Stats or Icons */}
                <div className="flex items-center space-x-3">
                    <PeopleAltIcon className={`text-${isDarkMode ? 'purple-300' : 'purple-500'}`} />
                    <span className="text-lg text-black">Clients</span>
                </div>
                <div className="flex items-center space-x-3 mt-4">
                    <CreditScoreIcon className={`text-${isDarkMode ? 'blue-300' : 'blue-500'}`} />
                    <span className="text-lg text-black">Loan Accounts</span>
                </div>
                <div className="flex items-center space-x-3 mt-4">
                    <AccountBalanceIcon className={`text-${isDarkMode ? 'yellow-300' : 'yellow-500'}`} />
                    <span className="text-lg text-black">Loan Distributed</span>
                </div>
                <div className="flex items-center space-x-3 mt-4">
                    <AccountBalanceWalletIcon className={`text-${isDarkMode ? 'red-300' : 'red-500'}`} />
                    <span className="text-lg text-black">Loan Collected</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
