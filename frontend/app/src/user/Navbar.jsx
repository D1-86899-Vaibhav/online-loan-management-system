import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Badge, Menu, MenuItem, Typography, Box } from "@mui/material";
import { Notifications, AccountCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import { Tooltip } from "@mui/material";



const Navbar = ({ isAuthenticated }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications] = useState(3); // Example notification count

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    
    console.log("Logging out...");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto p-4 flex flex-col md:flex-row justify-between items-center">
        {/* Logo and Title */}
        <div className="flex items-center space-x-2">
          <img
            src="https://cdn-icons-png.flaticon.com/128/1466/1466700.png"
            alt="Logo"
            className="w-10 h-10"
          />
          <h1 className="text-2xl font-bold text-blue-600">Easy Loan!</h1>
        </div>

        {/* Buttons and Icons */}
        <div className="flex space-x-4 mt-4 md:mt-0 items-center">
          {isAuthenticated ? (
            <>
              {/* Notifications Icon */}
              <div className="relative">
                <IconButton color="primary" onClick={handleMenuOpen}>
                  <Badge badgeContent={notifications} color="error">
                    <Notifications />
                  </Badge>
                </IconButton>
                {/* Notification Menu */}
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                  <MenuItem onClick={handleMenuClose}>Notification 1</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Notification 2</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Notification 3</MenuItem>
                </Menu>
              </div>

              {/* User Profile and Logout */}
              <div className="flex items-center space-x-2 cursor-pointer" onClick={handleLogout}>
                <AccountCircle fontSize="large" className="text-blue-600" />
                <span className="text-blue-600 font-semibold">Logout</span>
              </div>
            </>
          ) : (
            <>
              {/* Login Button */}

              <Link
                to="/user-profile"
                className="text-blue-600 font-semibold flex items-center space-x-2"
              >
                <Tooltip title="User Profile" arrow>
                  <AccountCircle fontSize="large" className="bg-transparent" />
                </Tooltip>
              </Link>



              <Link to="/login" onClick={handleLogout}

                className="relative px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg overflow-hidden group flex items-center space-x-2"
              >
                {/* Logout Icon */}
                <Logout fontSize="small" />
                <span className="relative z-10">Logout</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition duration-300"></div>
              </Link>

            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
