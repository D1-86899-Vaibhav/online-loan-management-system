import React, { useEffect, useState } from "react";
import DataGridTable from "../components/DataGridTable";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import columns from "../components/columns/UserColumns";
import AdminSidebar from './AdminSidebar'; // Import the sidebar
import AdminNavbar from './AdminNavbar'; // Import the navbar
import { Box, Card, CircularProgress } from '@mui/material';

const AdminUsers = () => {
  const usersCollectionRef = collection(db, "users");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const records = await getDocs(usersCollectionRef);
      const usersData = records.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false); // End loading
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