import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';  // Correct import

export default function VerifyOtp() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const tempToken = sessionStorage.getItem('tempToken');
  const userRole = sessionStorage.getItem('userRole');

  // Handle OTP verification on form submit
  const onVerifyOtp = async (e) => {
    e.preventDefault();

    if (otp.trim() === '') {
      toast.error("Please Enter the OTP!");
      return;
    }

    setLoading(true);
    toast.loading("Verifying OTP...", { id: "otpToast" });

    // Decode the tempToken to extract userId
    let userId = null;
    if (tempToken) {
      try {
        const decoded = jwtDecode(tempToken); // Decode JWT token correctly
        userId = decoded.sub; // Assuming userId is in the 'sub' field of JWT
      } catch (error) {
        toast.error("Failed to decode token");
        setLoading(false);
        return;
      }
    }

    if (!userId) {
      toast.error("User ID is missing in the token");
      setLoading(false);
      return;
    }

    // Include userId in the payload for OTP verification
    const payload = { otp, userId };

    // Log token and payload before making the request
    console.log("Temp Token Sent with OTP Verification: ", tempToken);
    console.log("Payload with OTP and User ID: ", payload);

    try {
      const response = await axios.post('http://localhost:8080/users/verify-otp', payload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tempToken}`, // Add tempToken in Authorization header
        },
      });

      // OTP verified successfully
      toast.dismiss("otpToast");
      toast.success("OTP Verified Successfully!");

      // Extract jwt token and role from the response
      const { jwt, role } = response.data;

      // Store the JWT token and role after OTP verification
      sessionStorage.setItem('authToken', jwt);
      sessionStorage.setItem('userRole', role); // Store the role for role-based redirects

      console.log("AuthToken stored in sessionStorage:", sessionStorage.getItem('authToken')); // Check that the token is correctly stored
      console.log("UserRole stored in sessionStorage:", sessionStorage.getItem('userRole')); // Check that the role is correctly stored

      // Redirect to the appropriate dashboard based on the role
      if (role === 'ROLE_ADMIN') {
        navigate('/AdminDashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      toast.dismiss("otpToast");
      const errorMessage = error.response?.data?.message || error.message || "Invalid OTP. Please try again.";
      toast.error(errorMessage);
      setLoading(false);
    }
  };

  // Redirect back to login if no tempToken is found
  useEffect(() => {
    if (!tempToken) {
      navigate('/login');
    }
  }, [tempToken, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <Toaster />
      <form
        className="w-full max-w-md p-8 space-y-4 bg-white shadow-md rounded-2xl"
        onSubmit={onVerifyOtp}
      >
        <h2 className="text-3xl font-bold mb-7 text-center text-blue-900">Verify OTP</h2>
        <div className="mt-5">
          <label htmlFor="otp" className="text-sm font-semibold mb-1">OTP</label>
          <input
            className="w-full px-3 py-2 border rounded"
            type="text"
            placeholder="Enter OTP"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>
        <div className="mt-8">
          <center>
            <button
              className="px-7 py-2 text-white bg-blue-950 hover:bg-blue-900 rounded-md"
              type="submit"
              disabled={loading}
            >
              <span className="text-sm">{loading ? "Verifying..." : "Verify OTP"}</span>
            </button>
          </center>
        </div>
      </form>
    </div>
  );
}
