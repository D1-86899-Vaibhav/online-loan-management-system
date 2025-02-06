import React, { useEffect, useState } from "react";
import DataGridTable from "../components/DataGridTable";
import columns from "../components/columns/UserColumns";
import AdminSidebar from './AdminSidebar'; // Import the sidebar
import AdminNavbar from './AdminNavbar'; // Import the navbar
import { Box, Card, CircularProgress } from '@mui/material';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state for handling fetch errors

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/users/AllUsers");
      
      // Check if the response is OK (status code 200)
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const usersData = await response.json(); // Parse the JSON response
      setUsers(usersData); // Set the users data
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to load users. Please try again later.");
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <Box className="min-h-screen flex flex-col">
      {/* Navbar */}
      <AdminNavbar isAuthenticated={true} />

      <Box className="flex flex-row flex-grow">
        {/* Sidebar */}
        <Box className="w-1/5 bg-gray-100 p-4">
          <AdminSidebar />
        </Box>

        {/* Main Content */}
        <Box className="w-4/5 p-6">
          <Card className="p-6 shadow-lg">
            <h1 className="text-2xl font-semibold text-blue-600 mt-5">All Users</h1>
            <div className="mt-10">
              {error && <Box className="text-red-500 text-center">{error}</Box>}
              {!loading ? (
                <DataGridTable data={users} columns={columns} />
              ) : (
                <Box className="flex justify-center items-center h-40">
                  <CircularProgress />
                </Box>
              )}
            </div>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminUsers;
