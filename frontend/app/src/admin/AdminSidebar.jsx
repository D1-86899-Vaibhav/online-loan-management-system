import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PaymentIcon from "@mui/icons-material/Payment";
import CalculateIcon from "@mui/icons-material/Calculate";
import ContactsIcon from "@mui/icons-material/Contacts";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import LogoutIcon from "@mui/icons-material/Logout";


const AdminSidebar = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <div
      className={`w-64 md:w-72 lg:w-80 bg-${isDarkMode ? "gray-900" : "gray-100"} 
      text-${isDarkMode ? "white" : "black"} p-4 h-screen flex flex-col`}
    >
      <h2 className="text-xl font-bold text-center py-4 border-b border-gray-400">
        ADMIN DASHBOARD
      </h2>

      {/* Sidebar Links */}
      <div className="mt-6 space-y-4">
        {[
          { name: "Dashboard", icon: <DashboardIcon />, path: "/AdminDashboard" },
          { name: "Clients", icon: <PeopleIcon />, path: "/AdminClients" },
          { name: "Loans", icon: <AccountBalanceIcon />, path: "/AdminLoans" },
          { name: "EMI Payments", icon: <PaymentIcon />, path: "/AdminEMI" },
          { name: "Calculator", icon: <CalculateIcon />, path: "/AdminCalculator" },
          { name: "Users", icon: <SupervisorAccountIcon />, path: "/AdminUsers" },
          { name: "Contact", icon: <ContactsIcon />, path: "/AdminContact" },
          { name: "Logout", icon: <LogoutIcon />, path: "/logout" },
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

export default AdminSidebar;
