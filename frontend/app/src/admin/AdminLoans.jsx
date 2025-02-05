import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout"; // Reusable layout component
import DataGridTable from "../components/DataGridTable";
import { collection, getDocs, deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import Button from "@mui/material/Button";
import CreateLoan from "../components/modal/createLoan";
import columns from "../components/columns/LoanColumns";
import { GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Box, Card, CircularProgress } from '@mui/material';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';

const AdminLoans = () => {
  const recordsCollectionRef = collection(db, "loans");
  const clientsCollectionRef = collection(db, "clients");

  const [records, setRecords] = useState([]);
  const [editData, setEditData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [recordColumns, setRecordColumns] = useState(columns);
  const [clientEmails, setClientEmails] = useState([]);

  useEffect(() => {
    // Fetch clients and add action columns only once when component mounts
    const fetchInitialData = async () => {
      try {
        const clientsData = await getDocs(clientsCollectionRef);
        const emails = clientsData.docs.map((doc) => ({ email: doc.id }));
        setClientEmails(emails);

        const hasActionColumn = columns.some((col) => col.field === "actions");
        if (!hasActionColumn) {
          const actionColumn = {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            width: 100,
            cellClassName: "actions",
            getActions: ({ id }) => [
              <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit"
                onClick={() => handleEditClick(id)}
                color="inherit"
              />,
              <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                onClick={() => handleDeleteClick(id)}
                color="inherit"
              />,
            ],
          };
          setRecordColumns([...columns, actionColumn]);
        }
      } catch (error) {
        console.error("Error fetching clients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    // Fetch loans whenever modal state changes
    getRecords();
  }, [showModal]);

  const getRecords = async () => {
    try {
      const recordsSnapshot = await getDocs(recordsCollectionRef);
      const recordsData = recordsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecords(recordsData);
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  const handleEditClick = async (id) => {
    try {
      const recordDocRef = doc(recordsCollectionRef, id);
      const recordDoc = await getDoc(recordDocRef);
      if (recordDoc.exists()) {
        const recordData = { id: recordDoc.id, ...recordDoc.data() };
        setEditData(recordData);
        setShowModal(true);
      } else {
        console.log("No such document found!");
      }
    } catch (error) {
      console.error("Error fetching record:", error);
    }
  };

  const handleDeleteClick = (id) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete this loan account?",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleDelete(id),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const handleDelete = async (id) => {
    try {
      const recordDocRef = doc(recordsCollectionRef, id);
      await deleteDoc(recordDocRef);
      setRecords((prevRecords) =>
        prevRecords.filter((record) => record.id !== id)
      );
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  const hideModal = () => {
    setShowModal(false);
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
            {showModal && (
              <CreateLoan
                hideModal={hideModal}
                editData={editData}
                clientEmails={clientEmails}
              />
            )}
            <h1 className="text-2xl font-semibold text-blue-600 mt-5">All Loans</h1>
            <div className="mt-10">
              <div className="flex justify-end mb-4">
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    setEditData(null);
                    setShowModal(true);
                  }}
                >
                  Add Loan Account
                </Button>
              </div>
              {!loading ? (
                <DataGridTable data={records} columns={recordColumns} />
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

export default AdminLoans;