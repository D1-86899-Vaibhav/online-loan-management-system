import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PaymentIcon from "@mui/icons-material/Payment";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import DomainVerificationIcon from "@mui/icons-material/DomainVerification";
import EditNoteIcon from "@mui/icons-material/EditNote";

const UserSidebar = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <div
      className={`w-64 md:w-72 lg:w-80 bg-${isDarkMode ? "gray-900" : "gray-100"} 
      text-${isDarkMode ? "white" : "black"} p-4 h-screen flex flex-col`}
    >
      <h2 className="text-xl font-bold text-center py-4 border-b border-gray-400">
        USER DASHBOARD
      </h2>

      {/* Sidebar Links */}
      <div className="mt-6 space-y-4">
        {[
          { name: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
          { name: "Loan Details", icon: <ReceiptLongIcon />, path: "/loan-details" },
          { name: "Pay EMI", icon: <PaymentIcon />, path: "/pay-emi" },
          { name: "User Profile", icon: <AccountCircleIcon />, path: "/user-profile" },
          { name: "Wallet", icon: <AccountBalanceWalletIcon />, path: "/wallet" },
          { name: "KYC", icon: <DomainVerificationIcon />, path: "/kyc" },
          { name: "Apply For Loan", icon: <EditNoteIcon />, path: "/apply-for-loan" },
        ].map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="flex items-center space-x-4 p-3 
            hover:bg-gray-300 hover:rounded-lg transition duration-300 ease-in-out"
          >
            <span className="text-lg text-blue-500">{item.icon}</span>
            <span className="text-md font-medium">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserSidebar;
