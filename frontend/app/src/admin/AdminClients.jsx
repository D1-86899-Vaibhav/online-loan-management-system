import React, { useEffect, useState } from 'react';
import DataGridTable from '../components/DataGridTable';
import { collection, getDocs, deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from '../firebase';
import Button from '@mui/material/Button';
import CreateClient from '../components/modal/createClient';
import columns from '../components/columns/ClientColumns';
import { GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';

const AdminClients = () => {
    const recordsCollectionRef = collection(db, "clients");
    const [records, setRecords] = useState([]);
    const [editData, setEditData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [recordColumns, setRecordColumns] = useState(columns);

    useEffect(() => {
        const hasActionColumn = columns.some((col) => col.field === 'actions');
        if (!hasActionColumn) {
            const actionColumn = {
                field: 'actions',
                type: 'actions',
                headerName: 'Actions',
                width: 100,
                cellClassName: 'actions',
                getActions: ({ id }) => [
                    <GridActionsCellItem icon={<EditIcon />} label="Edit" onClick={() => handleEditClick(id)} color="inherit" />,
                    <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={() => handleDeleteClick(id)} color="inherit" />,
                ],
            };
            setRecordColumns([...columns, actionColumn]);
        }
        setLoading(false);
    }, []);

    const handleEditClick = async (id) => {
        try {
            const recordDocRef = doc(recordsCollectionRef, id);
            const recordDoc = await getDoc(recordDocRef);
            if (recordDoc.exists()) {
                setEditData({ id: recordDoc.id, ...recordDoc.data() });
                setShowModal(true);
            } else {
                console.log("No such document found!");
            }
        } catch (error) {
            console.error("Error fetching record:", error);
        }
    };

    const handleDeleteClick = async (id) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this client?',
            buttons: [
                { label: 'Yes', onClick: () => handleDelete(id) },
                { label: 'No', onClick: () => {} }
            ]
        });
    };

    const handleDelete = async (id) => {
        try {
            const recordDocRef = doc(recordsCollectionRef, id);
            await deleteDoc(recordDocRef);
            setRecords((prevRecords) => prevRecords.filter(record => record.id !== id));
        } catch (error) {
            console.error("Error deleting record:", error);
        }
    };

    const hideModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        getUsers();
    }, [showModal]);

    const getUsers = async () => {
        try {
            const records = await getDocs(recordsCollectionRef);
            setRecords(records.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <AdminSidebar />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <AdminNavbar isAuthenticated={true} />
                <div className='p-4 mx-4'>
                    {showModal && <CreateClient hideModal={hideModal} editData={editData} />}
                    <h1 className='mt-5 text-2xl text-blue-600'>All Clients</h1>
                    <div className='mt-10'>
                        <div className='my-3 flex justify-end mr-4'>
                            <Button variant="outlined" size="small" onClick={() => { setEditData(null); setShowModal(true) }}>Add Client</Button>
                        </div>
                        {!loading && <DataGridTable data={records} columns={recordColumns} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminClients;
