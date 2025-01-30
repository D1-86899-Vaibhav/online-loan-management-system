import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Badge, Menu, MenuItem, Typography, Box } from "@mui/material";
import { Notifications, AccountCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";  // For routing, if you are using React Router

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications] = useState(3); // Example notification count

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Logic for logging out (clear session, etc.)
    console.log("Logging out...");
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Left side: Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>MyApp Logo</Link>
          </Typography>
        </Box>

        {/* Right side: Notification & Logout */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Notifications Icon with Badge */}
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <Badge badgeContent={notifications} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          {/* Notification Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Notification 1</MenuItem>
            <MenuItem onClick={handleMenuClose}>Notification 2</MenuItem>
            <MenuItem onClick={handleMenuClose}>Notification 3</MenuItem>
          </Menu>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit" onClick={handleLogout}>
              <AccountCircle />
            </IconButton>
            <Typography variant="body1" sx={{ color: "white", ml: 1 }}>
              Logout
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
