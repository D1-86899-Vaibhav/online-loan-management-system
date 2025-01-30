import React, { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from '../firebase';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const Loans = () => {
    const recordsCollectionRef = collection(db, "loans");
    const clientsCollectionRef = collection(db, "clients");
    const [records, setRecords] = useState([]);
    const [clientEmails, setClientEmails] = useState([]);
    const [loading, setLoading] = useState(true);

    // Form State
    const [loanData, setLoanData] = useState({
        fullName: '',
        dob: '',
        area: '',
        city: '',
        country: '',
        branch: '',
        phoneNumber: '',
        email: '',
        profession: '',
        loanType: '',
        otherIncome: '',
        loanAmount: '',
        loanTenure: '',
        existingLoan: '',
        agreement: false,
    });

    const loanTypes = ['Apartment Purchase Loan', 'Car Loan', 'Personal Loan'];

    // Fetch client emails for the dropdown
    const getClients = async () => {
        try {
            const clientsData = await getDocs(clientsCollectionRef);
            const emails = clientsData.docs.map((doc) => ({ email: doc.id }));
            setClientEmails(emails);
        } catch (error) {
            console.error("Error fetching clients:", error);
        }
    };

    useEffect(() => {
        getClients();
        getRecords();
        setLoading(false);
    }, []);

    // Fetch existing loan records
    const getRecords = async () => {
        try {
            const records = await getDocs(recordsCollectionRef);
            const recordsData = records.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setRecords(recordsData);
        } catch (error) {
            console.error("Error fetching records:", error);
        }
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoanData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Handle checkbox change
    const handleCheckboxChange = (e) => {
        setLoanData((prevData) => ({ ...prevData, agreement: e.target.checked }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(recordsCollectionRef, loanData);
            console.log("Loan record added:", loanData);
            setLoanData({
                fullName: '',
                dob: '',
                area: '',
                city: '',
                country: '',
                branch: '',
                phoneNumber: '',
                email: '',
                profession: '',
                loanType: '',
                otherIncome: '',
                loanAmount: '',
                loanTenure: '',
                existingLoan: '',
                agreement: false,
            });
            getRecords(); // Refresh the loan records
        } catch (error) {
            console.error("Error adding loan record:", error);
        }
    };

    // Delete loan record
    const handleDeleteClick = async (id) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to delete this loan record?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => handleDelete(id),
                },
                {
                    label: 'No',
                    onClick: () => { },
                },
            ],
        });
    };

    const handleDelete = async (id) => {
        try {
            const recordDocRef = doc(recordsCollectionRef, id);
            await deleteDoc(recordDocRef);
            console.log(`Record with ID ${id} deleted successfully.`);
            setRecords((prevRecords) => prevRecords.filter((record) => record.id !== id));
        } catch (error) {
            console.error("Error deleting record:", error);
        }
    };

    return (
        <div className='p-4 mx-4'>
            <center>
                <h1 className='text-3xl text-blue-600 '>Apply For Loan!</h1>
                </center>

            {/* Loan Application Form */}
            <form onSubmit={handleSubmit} className=" p-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto my-4">
            
                {/* <h2 className="text-2xl font-semibold text-center mb-6">Loan Application</h2> */}
                <p className="text-sm text-red-500 text-center mb-8">
    Please complete the application neatly & include all information, documentation, and identification required.
</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <TextField
                        label="Full Name"
                        name="fullName"
                        value={loanData.fullName}
                        onChange={handleInputChange}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                    />
                    {/* Date of Birth */}
                    <TextField
                        type="date"
                        label="Date of Birth"
                        name="dob"
                        value={loanData.dob}
                        onChange={handleInputChange}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                    />
                    {/* Area / Location */}
                    <TextField
                        label="Area / Location"
                        name="area"
                        value={loanData.area}
                        onChange={handleInputChange}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                    />
                    {/* City */}
                    <TextField
                        label="City"
                        name="city"
                        value={loanData.city}
                        onChange={handleInputChange}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                    />
                    {/* Country */}
                    <TextField
                        label="Country"
                        name="country"
                        value={loanData.country}
                        onChange={handleInputChange}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                    />
                    {/* Nearest Branch */}
                    <TextField
                        select
                        label="Nearest Branch"
                        name="branch"
                        value={loanData.branch}
                        onChange={handleInputChange}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                    >
                        <MenuItem value="Dhaka">Dhaka</MenuItem>
                        <MenuItem value="Chittagong">Chittagong</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </TextField>
                    {/* Phone Number */}
                    <TextField
                        label="Phone Number"
                        name="phoneNumber"
                        value={loanData.phoneNumber}
                        onChange={handleInputChange}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                    />
                    {/* Email */}
                    <TextField
                        label="Email"
                        name="email"
                        value={loanData.email}
                        onChange={handleInputChange}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                    />
                    {/* Profession */}
                    <TextField
                        label="Profession"
                        name="profession"
                        value={loanData.profession}
                        onChange={handleInputChange}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                    />
                    {/* Loan Type */}
                    <TextField
                        select
                        label="Loan Type"
                        name="loanType"
                        value={loanData.loanType}
                        onChange={handleInputChange}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                    >
                        {loanTypes.map((type, index) => (
                            <MenuItem key={index} value={type}>{type}</MenuItem>
                        ))}
                    </TextField>
                    {/* Monthly income from other sources */}
                    <TextField
                        label="Monthly income from other sources (if any)"
                        name="otherIncome"
                        value={loanData.otherIncome}
                        onChange={handleInputChange}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                    />
                    {/* Requested Loan Amount */}
                    <TextField
                        label="Requested Loan Amount"
                        name="loanAmount"
                        value={loanData.loanAmount}
                        onChange={handleInputChange}
                        type="number"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                    />
                    {/* Loan Tenure */}
                    <TextField
                        label="Tenure of your loan (Years)"
                        name="loanTenure"
                        value={loanData.loanTenure}
                        onChange={handleInputChange}
                        type="number"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                    />
                    {/* Existing Loan */}
                    <TextField
                        select
                        label="Do you have any existing loan?"
                        name="existingLoan"
                        value={loanData.existingLoan}
                        onChange={handleInputChange}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                    >
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                    </TextField>
                </div>
                <br>
                </br>

                {/* Checkbox Agreement */}
                <div className=" col-span-1 md:col-span-2">
                    <label className="inline-flex items-start">
                        <input
                            type="checkbox"
                            checked={loanData.agreement}
                            onChange={handleCheckboxChange}
                            className="h-4 w-4 border border-gray-300 rounded"
                        />
                        <span className="ml-2 text-gray-600">
                            I do hereby admit that all the above information that is true & correct.  
                           
                        </span>
                    </label>
                </div>
                <br>
                </br>

                {/* Submit Button */}
                <div className="col-span-1 md:col-span-2 text-center">
                    <Button type="submit" variant="contained" color="primary"   >
                        Submit 
                    </Button>
                </div>
            </form>

            {/* Loan Records Table
            <h2 className='text-2xl text-gray-700 mt-6'>Loan Records</h2>
            {!loading && records.length > 0 && (
                <ul className="mt-4 space-y-2">
                    {records.map((record) => (
                        <li key={record.id} className="border p-2 rounded flex justify-between">
                            <div>
                                <p><strong>Client Email:</strong> {record.clientEmail}</p>
                                <p><strong>Loan Amount:</strong> {record.loanAmount}</p>
                                <p><strong>Loan Tenure:</strong> {record.loanTenure} years</p>
                            </div>
                            <Button
                                onClick={() => handleDeleteClick(record.id)}
                                variant="outlined" color="error"
                            >
                                Delete
                            </Button>
                        </li>
                    ))}
                </ul>
            )} */}
        </div>
    );
};

export default Loans;
