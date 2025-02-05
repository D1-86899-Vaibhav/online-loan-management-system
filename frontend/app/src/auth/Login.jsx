import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    // Replace with your actual API endpoint
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

        const payload = {
            email,
            password: pass,
        };

        try {
            // Show a loading toast
            toast.loading("Logging in...", { id: "loginToast" });

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            // Remove the loading toast
            toast.dismiss("loginToast");

            if (response.ok) {
                const data = await response.json(); // Response should include the JWT token
                const { token } = data; // Adjust based on your API's response structure

                // Save JWT to sessionStorage
                sessionStorage.setItem('authToken', token);

                toast.success("Login Successful!");

                // Redirect to the dashboard
                navigate('/dashboard');
            } else {
                const errorData = await response.json();
                const errorMessage = errorData.message || "Login failed. Please try again.";
                toast.error(errorMessage);
            }
        } catch (error) {
            toast.dismiss("loginToast");
            toast.error("An error occurred. Please try again.");
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
                                <span className="text-sm">
                                    LOGIN
                                </span>
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
