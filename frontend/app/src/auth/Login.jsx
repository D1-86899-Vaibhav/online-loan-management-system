import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const API_URL = 'http://localhost:8080/users/login';

    const onLogin = async (e) => {
        e.preventDefault();

        if (email.trim() === '') {
            toast.error("Please Enter a Valid Email!");
            return;
        }
        if (pass.trim() === '') {
            toast.error("Please Enter the Password!");
            return;
        }

        const payload = { email, password: pass };

        try {
            toast.loading("Logging in...", { id: "loginToast" });

            // Make API call using axios
            const response = await axios.post(API_URL, payload);

            toast.dismiss("loginToast");

            if (response.status === 200) {
                const { token, role } = response.data; // Extract token & role from response

                // Store token and role in sessionStorage
                sessionStorage.setItem('authToken', token);
                sessionStorage.setItem('userRole', role);

                toast.success("Login Successful!");

                // Redirect based on user role
                if (role === 'ROLE_ADMIN') {
                    navigate('/AdminDashboard');  // Admin dashboard
                } else {
                    navigate('/dashboard');  // User dashboard
                }
            }
        } catch (error) {
            toast.dismiss("loginToast");

            // Handle error gracefully
            if (error.response) {
                toast.error(error.response.data.message || "Login failed.");
            } else {
                toast.error("An error occurred. Please try again.");
            }

            console.error("Login error:", error);
        }
    };

    try {
      // Show a loading toast
      toast.loading("Logging in...", { id: "loginToast" });

      // Post using Axios
      // Post using Axios
const response = await axios.post(API_URL, payload, {
    headers: { 'Content-Type': 'application/json' },
  });
  
  // Log the entire response
  console.log('Response data:', response.data);
  

      // Dismiss the loading toast
      toast.dismiss("loginToast");

      // Assuming the response data contains the token in a field named 'token'
      const { jwt: token } = response.data;

      console.log(token)
      if (!token) {
        throw new Error("Token not found in response.");
      }

      // Save JWT to sessionStorage
      sessionStorage.setItem('authToken', token);

      toast.success("Login Successful!");

      // Redirect to the dashboard
      navigate('/dashboard');
    } catch (error) {
      toast.dismiss("loginToast");

      // Extract error message from response if available
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage);
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <Toaster />
      <form
        className="w-full max-w-md p-8 space-y-4 bg-white shadow-md rounded-2xl"
        onSubmit={onLogin}
      >
        <div>
          <h2 className="text-3xl font-bold mb-7 text-center text-blue-900">
            LOGIN
          </h2>

          <div className="mt-5">
            <label htmlFor="email" className="text-sm font-semibold mb-1">
              Email
            </label>
            <input
              className="w-full px-3 py-2 border rounded"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              id="email"
            />
          </div>

          <div className="mt-5">
            <label htmlFor="password" className="text-sm font-semibold mb-1">
              Password
            </label>
            <input
              className="w-full px-3 py-2 border rounded"
              onChange={(e) => setPass(e.target.value)}
              type="password"
              placeholder="Password"
              id="pass"
            />
          </div>

          <div className="mt-8">
            <center>
              <button
                className="px-7 py-2 text-white bg-blue-950 hover:bg-blue-900 rounded-md"
                type="submit"
              >
                <span className="text-sm">LOGIN</span>
              </button>
            </center>
          </div>

          <div className="mt-5 text-center">
            <p className="text-[13px] cursor-pointer text-slate-400 mt-1">
              Don't Have an Account?
              <span
                className="ml-1 font-semibold hover:text-blue-900 text-slate-700"
                onClick={() => navigate('/register')}
              >
                Register
              </span>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
