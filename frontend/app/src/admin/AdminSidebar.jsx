import React from 'react';
import { Link } from 'react-router-dom';  // Use this if you are using React Router for navigation
import { useTheme } from '@mui/material/styles';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const AdminSidebar = ({ children }) => {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <div className={`w-1/5 p-4 min-h-screen ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} text-white`}>
                

                {/* Sidebar Stats or Icons */}
                <div className="mt-10">
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

            {/* Main Content */}
            <div className="w-4/5 p-6 bg-gray-100">
                {children}  {/* This ensures wrapped content is displayed */}
            </div>
        </div>
    );
};

export default AdminSidebar;
