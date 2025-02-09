import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure this path is correct
import AdminSidebar from './AdminSidebar'; // Use the AdminSidebar component
import AdminNavbar from './AdminNavbar'; // Use the AdminNavbar component
import StackedBarChart from '../components/charts/BarChart';
import StackedAreaChart from '../components/charts/AreaChart';
import BiaxialLineChart from '../components/charts/LineChart';
import { useTheme } from '@mui/material/styles';
import TwoSimplePieChart from "../components/charts/PieChart";
import PieChartWithPaddingAngle from "../components/charts/PieChartPadding";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
 
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { Box } from '@mui/material';
import axios from 'axios';

const AdminDashboard = () => {
  const [registeredUsersCount, setRegisteredUsersCount] = useState(0);
  const [LoanAppliedCount, setLoanAppliedCount] = useState(0);
  const [KycAppliedCount, setKycAppliedCount] = useState(0);

  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const [clientsCount, setClientsCount] = useState(0);
  const [loanAccountsCount, setLoanAccountsCount] = useState(0);
  const [emiAccountsCount, setEmiAccountsCount] = useState(0);
  const [loanDistributed, setLoanDistributed] = useState(0);
  const [loanCollected, setLoanCollected] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const clientsSnapshot = await getDocs(collection(db, 'clients'));
        setClientsCount(clientsSnapshot.size);

        const response = await axios.get('http://localhost:8080/api/users/AllUsers/count');
        setRegisteredUsersCount(response.data); // Set the registered users count

        const responseL = await axios.get('http://localhost:8080/loan-applications/Loancount');
        setLoanAppliedCount(responseL.data);

        const responseK = await axios.get('http://localhost:8080/kyc/kyccount');
        setKycAppliedCount(responseK.data);


        const loanAccountsSnapshot = await getDocs(collection(db, 'loans'));
        setLoanAccountsCount(loanAccountsSnapshot.size);

        const loanData = loanAccountsSnapshot.docs.map((doc) => doc.data());
        const totalLoanDistributed = loanData.reduce((sum, item) => sum + item.loanAmount, 0);
        setLoanDistributed(totalLoanDistributed);

        const emisSnapshot = await getDocs(collection(db, 'emis'));
        setEmiAccountsCount(emisSnapshot.size);

        const emisData = emisSnapshot.docs.map((doc) => doc.data());
        const totalLoanCollected = emisData.reduce((sum, item) => sum + item.totalEMIPaid, 0);
        setLoanCollected(totalLoanCollected);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

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
          <div className="grid grid-cols-10 gap-4">
            {/* Main Charts Section */}
            <div className="col-span-7">
              <div className="grid grid-cols-3 gap-4">
                {/* Total Clients */}

                <div className={`rounded-lg flex justify-center p-2 shadow-md min-h-[100px] ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  <div className="flex">
                    <div className="bg-purple-100 rounded-full my-5 p-5">
                      <AccountBalanceWalletIcon className="text-purple-500" />
                    </div>
                    <div className="ml-5 mt-6">
                      <div className="font-semibold text-xl">{LoanAppliedCount}</div>
                      <div className="text-xs text-slate-500 font-semibold">Loan Applications</div>
                    </div>
                  </div>
                </div>

                {/* Total Loan Accounts */}
                <div className={`rounded-lg flex justify-center p-2 shadow-md min-h-[100px] ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  <div className="flex">
                    <div className="bg-blue-100 rounded-full my-5 p-5">
                      <CreditScoreIcon className="text-blue-500" />
                    </div>
                    <div className="ml-5 mt-6">
                      <div className="font-semibold text-xl">{registeredUsersCount}</div>
                      <div className="text-xs text-slate-500 font-semibold">User Accounts</div>
                    </div>
                  </div>
                </div>

                <div className={`rounded-lg flex justify-center p-2 shadow-md min-h-[100px] ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  <div className="flex">
                    <div className="bg-blue-100 rounded-full my-5 p-5">
                      <NoteAltIcon className="text-blue-500" />
                    </div>
                    <div className="ml-5 mt-6">
                      <div className="font-semibold text-xl">{KycAppliedCount}</div>
                      <div className="text-xs text-slate-500 font-semibold">Kyc Applications</div>
                    </div>
                  </div>
                </div>

                {/* Loan Distributed & Collected */}
                {/* <div>
                  <div className={`rounded-lg flex justify-center p-1 shadow-md min-h-[50px] ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <div className="flex">
                      <div className="bg-yellow-100 rounded-full my-2 p-1">
                        <AccountBalanceIcon className="text-yellow-500" />
                      </div>
                      <div className="ml-5 mt-1">
                        <div className="font-semibold text-lg">₹{loanDistributed}</div>
                        <div className="text-xs text-slate-500 font-semibold">Loan Distributed</div>
                      </div>
                    </div>
                  </div>


                  <div className={`rounded-lg mt-2 flex justify-center p-1 shadow-md min-h-[50px] ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <div className="flex">
                      <div className="bg-red-100 rounded-full my-2 p-1">
                        <AccountBalanceWalletIcon className="text-red-500" />
                      </div>
                      <div className="ml-5 mt-1">
                        <div className="font-semibold text-lg">₹{loanCollected}</div>
                        <div className="text-xs text-slate-500 font-semibold">Loan Collected</div>
                      </div>
                    </div>
                  </div>
                </div> */}
                
              </div>

              {/* Line Chart */}
              <div className={`mt-4 rounded-lg flex justify-center p-2 shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <BiaxialLineChart />
              </div>

              {/* Pie Charts */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className={`rounded-lg flex justify-center p-1 shadow-md min-h-[50px] ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <div className="flex">
                      <div className="bg-yellow-100 rounded-full my-2 p-1">
                        <AccountBalanceIcon className="text-yellow-500" />
                      </div>
                      <div className="ml-5 mt-1">
                        <div className="font-semibold text-lg">₹{loanDistributed}</div>
                        <div className="text-xs text-slate-500 font-semibold">Loan Distributed</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`rounded-lg mt-2 flex justify-center p-1 shadow-md min-h-[50px] ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <div className="flex">
                      <div className="bg-red-100 rounded-full my-2 p-1">
                        <AccountBalanceWalletIcon className="text-red-500" />
                      </div>
                      <div className="ml-5 mt-1">
                        <div className="font-semibold text-lg">₹{loanCollected}</div>
                        <div className="text-xs text-slate-500 font-semibold">Loan Collected</div>
                      </div>
                    </div>
                  </div>

              </div>
            </div>

            {/* Extra Charts Section */}
            <div className="col-span-3">
              <div className={`rounded-lg flex justify-center p-2 shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <StackedAreaChart />
              </div>
              <div className={`rounded-lg flex justify-center p-2 mt-4 shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <StackedBarChart />
              </div>
            </div>
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;