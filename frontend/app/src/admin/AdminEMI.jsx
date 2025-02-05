import React, { useEffect, useState } from "react";
import { Box, Card, Button, CircularProgress } from "@mui/material";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import DataGridTable from "../components/DataGridTable";
import { collection, getDocs, deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import CreateEmi from "../components/modal/createEmi";
import columns from "../components/columns/EmiColumns";
import { GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const AdminEmi = () => {
    const recordsCollectionRef = collection(db, "emis");
    const loansCollectionRef = collection(db, "loans");
    const [records, setRecords] = useState([]);
    const [editData, setEditData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [recordColumns, setRecordColumns] = useState([]);
    const [loanEmails, setLoanEmails] = useState([]);

    // Fetch loan emails (loan IDs or related identifiers)
    const fetchLoanEmails = async () => {
        try {
            const loanDocs = await getDocs(loansCollectionRef);
            const loans = loanDocs.docs.map((doc) => ({ loanId: doc.id }));
            setLoanEmails(loans);
        } catch (error) {
            console.error("Error fetching loan emails:", error.message);
        }
    };

    // Fetch EMI records
    const fetchEmis = async () => {
        try {
            const emiDocs = await getDocs(recordsCollectionRef);
            const emiData = emiDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setRecords(emiData);
        } catch (error) {
            console.error("Error fetching EMI records:", error.message);
        } finally {
            setLoading(false);
        }
    };

    // Add actions column dynamically
    const initializeColumns = () => {
        const actionColumn = {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            width: 100,
            cellClassName: "actions",
            getActions: ({ id }) => [
                <GridActionsCellItem icon={<EditIcon />} label="Edit" onClick={() => handleEditClick(id)} color="inherit" />,
                <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={() => handleDeleteClick(id)} color="inherit" />,
            ],
        };
        setRecordColumns([...columns, actionColumn]);
    };

    useEffect(() => {
        fetchLoanEmails();
        fetchEmis();
        initializeColumns();
    }, []);

    const handleEditClick = async (id) => {
        try {
            const recordDocRef = doc(recordsCollectionRef, id);
            const recordDoc = await getDoc(recordDocRef);
            if (recordDoc.exists()) {
                setEditData({ id: recordDoc.id, ...recordDoc.data() });
                setShowModal(true);
            } else {
                console.warn("No such document found!");
            }
        } catch (error) {
            console.error("Error fetching record for edit:", error.message);
        }
    };

    const handleDeleteClick = (id) => {
        confirmAlert({
            title: "Confirm Deletion",
            message: "Are you sure you want to delete this record?",
            buttons: [
                { label: "Yes", onClick: () => handleDelete(id) },
                { label: "No" },
            ],
        });
    };

    const handleDelete = async (id) => {
        try {
            const recordDocRef = doc(recordsCollectionRef, id);
            await deleteDoc(recordDocRef);
            setRecords((prevRecords) => prevRecords.filter((record) => record.id !== id));
        } catch (error) {
            console.error("Error deleting record:", error.message);
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
                        {showModal && (
                            <CreateEmi hideModal={() => setShowModal(false)} editData={editData} loanEmails={loanEmails} />
                        )}

                        <h1 className="text-2xl font-bold text-blue-600 mb-4">All EMIs</h1>

                        {/* Add EMI Button */}
                        <div className="flex justify-end mb-4">
                            <Button variant="contained" color="primary" onClick={() => { setEditData(null); setShowModal(true); }}>
                                Add EMI
                            </Button>
                        </div>

                        {/* Data Grid Table */}
                        {!loading ? (
                            <DataGridTable data={records} columns={recordColumns} />
                        ) : (
                            <Box className="flex justify-center items-center h-40">
                                <CircularProgress />
                            </Box>
                        )}
                    </Card>
                </Box>
            </Box>
        </Box>
    );
};

export default AdminEmi;
