import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { signup } from "../services/api";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await signup(username, password, fullName);
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err.message);
      setError(err.message || "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <>
      <div
        className="w-screen min-h-screen bg-cover bg-center fixed transition-opacity duration-1000 overflow-hidden"
        style={{ backgroundImage: "url('./Load_page.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-200 via-transparent to-teal-200 opacity-70 pointer-events-none" />

        <Navbar />

        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md relative z-10">
            <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
              Create Your Account
            </h2>

            {error && (
              <div className="bg-red-100 border border-red-300 text-red-700 p-3 mb-4 rounded-md text-sm">
                {error}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="Jane Doe"
                  required
                />
              </div>

              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="Username"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-purple-700 text-white py-2 rounded-xl font-semibold hover:bg-purple-800 transition"
              >
                Sign Up
              </button>
            </form>

            <p className="mt-4 text-sm text-center text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-600 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
