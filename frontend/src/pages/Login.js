import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://skillfordge-portfolio-7.onrender.com/api/auth/login", {
        email,
        password,
      });

      console.log("Response data:", res.data);

      // Store token and userId in localStorage
      localStorage.setItem("token", res.data.token);

      // ✅ Fix: use `id` instead of `_id`
      localStorage.setItem("userId", res.data.user.id);

      console.log("Token from server:", res.data.token);
      setMessage("Login Successful!");

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      setMessage(error.response?.data?.error || "Login failed!");
      console.log("Error object:", error);
      console.log("Error response:", error.response);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white bg-opacity-90 px-4">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-semibold mb-6">Log In</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
          >
            Log In
          </button>
        </form>

        {message && (
          <p className="text-sm mt-4 text-red-500 font-medium">{message}</p>
        )}

        <p className="mt-4 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
