import React, { useEffect, useState } from "react";
import DataGridTable from "../components/DataGridTable";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import columns from "../components/columns/UserColumns";
import AdminLayout from "./AdminLayout";

const AdminUsers = () => {
  const usersCollectionRef = collection(db, "users");
  const [users, setUsers] = useState([]);

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
    }
  };

  return (
    <AdminLayout>
      <h1 className="mt-5">All Users</h1>
      <div className="mt-16">
        <DataGridTable data={users} columns={columns} />
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
