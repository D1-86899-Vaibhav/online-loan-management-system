import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

export default function Register() {
  const navigate = useNavigate();
  const [showOTP, setShowOTP] = useState(false);

  const [firstName, setFirst] = useState('');
  const [lastName, setLast] = useState('');
  const [email, setMail] = useState('');
  const [password, setPass] = useState('');
  const [confirmPassword, setConfPass] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  // Replace with your actual API endpoint
  const API_URL = 'http://localhost:8080/users/register';

  const onRegister = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (firstName.trim() === '') {
      toast.error("First Name Required!");
      return;
    }
    if (lastName.trim() === '') {
      toast.error("Last Name Required!");
      return;
    }
    if (email.trim() === '') {
      toast.error("Email is Required!");
      return;
    }
    if (password.trim() === '') {
      toast.error("Password is Required!");
      return;
    }
    if (confirmPassword.trim() === '') {
      toast.error("Please Confirm your Password!");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    if (phone.trim() === '') {
      toast.error("Phone Number is Required!");
      return;
    }
    if (otp.trim() === '') {
      toast.error("OTP is Required!");
      return;
    }

    // Prepare the payload. Adjust keys based on your API's requirements.
    const payload = {
      firstName,
      lastName,
      email,
      password,
      phone,
      otp,
    };

    try {
      toast.loading("Registering...", { id: "registerToast" });

      const response = await axios.post(API_URL, payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      toast.dismiss("registerToast");

      // If the registration is successful:
      toast.success("You are registered successfully!");

      // Redirect after a short delay
      setTimeout(() => {
        navigate('/login'); // Adjust the route if necessary
      }, 2000);
    } catch (error) {
      toast.dismiss("registerToast");

      // Extract error message from response if available
      const errorMessage =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      toast.error(errorMessage);
      console.error("Registration error:", error);
    }
  };

  const onOtp = async () => {
    if (otp.trim() === '') {
      toast.error("Please Enter OTP!");
    } else {
      // If your API has an endpoint to verify the OTP, you can call it here.
      // For example: await axios.post('/api/verify-otp', { phone, otp });
      toast.success("OTP Verified!");
    }
  };

  const handleSendOTP = () => {
    if (phone.trim() === '') {
      toast.error("Please Enter Phone Number!");
      return;
    }
    setShowOTP(true);
    // If your API supports sending OTP automatically, you can call it here.
    // For example: await axios.post('/api/send-otp', { phone });
    toast.success("OTP Sent to the registered number!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <Toaster />
      <form
        className="w-full max-w-2xl p-10 space-y-6 bg-white shadow-md rounded-2xl"
        onSubmit={onRegister}
      >
        <h2 className="text-3xl font-bold mb-7 text-center text-blue-900">
          REGISTER
        </h2>

        <div className="flex justify-between gap-4">
          <div className="flex-1">
            <label
              htmlFor="firstName"
              className="text-sm font-semibold mb-1 block"
            >
              First Name
            </label>
            <input
              id="firstName"
              className="w-full px-3 py-2 border rounded"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirst(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor="lastName"
              className="text-sm font-semibold mb-1 block"
            >
              Last Name
            </label>
            <input
              id="lastName"
              className="w-full px-3 py-2 border rounded"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLast(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-between gap-4">
          <div className="flex-1">
            <label htmlFor="email" className="text-sm font-semibold mb-1 block">
              Email
            </label>
            <input
              id="email"
              className="w-full px-3 py-2 border rounded"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setMail(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor="password"
              className="text-sm font-semibold mb-1 block"
            >
              Password
            </label>
            <input
              id="password"
              className="w-full px-3 py-2 border rounded"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPass(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-between gap-4">
          <div className="flex-1">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-semibold mb-1 block"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              className="w-full px-3 py-2 border rounded"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfPass(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label htmlFor="phone" className="text-sm font-semibold mb-1 block">
              Phone Number
            </label>
            <div className="flex items-center gap-2">
              <input
                id="phone"
                className="w-full px-3 py-2 border rounded"
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength={10}
              />
              <button
                className="px-7 text-white bg-blue-950 hover:bg-blue-900 rounded-md"
                type="button"
                onClick={handleSendOTP}
              >
                Send OTP
              </button>
            </div>
          </div>
        </div>

        {showOTP && (
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <label htmlFor="otp" className="text-sm font-semibold mb-1 block">
                Enter OTP
              </label>
              <input
                id="otp"
                className="w-full px-3 py-2 border rounded"
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <button
              className="px-4 py-2 mt-5 text-white bg-blue-950 hover:bg-blue-900 rounded-md"
              type="button"
              onClick={onOtp}
            >
              Verify OTP
            </button>
          </div>
        )}

        <div className="mt-6">
          <center>
            <button
              className="px-4 py-2 text-white bg-blue-950 hover:bg-blue-900 rounded-md"
              type="submit"
            >
              <span className="text-sm">SIGN UP</span>
            </button>
          </center>
        </div>

        <div className="mt-4 text-center">
          <p className="text-[13px] cursor-pointer text-slate-400">
            Already have an account?
            <span
              className="ml-1 font-semibold hover:text-blue-900 text-slate-700"
              onClick={() => navigate('/login')}
            >
              Sign In
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}
