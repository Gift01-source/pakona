import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/image.png';
import axios from 'axios';

// API configuration
const API = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
});

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post('/login', { email, password });
      const data = response.data;

      // Debug: See what you get from backend
      console.log('Login response:', data);

      // Save token and role in localStorage
      localStorage.setItem('token', data.token); // <-- use data.token
      localStorage.setItem('role', data.user.role); // <-- use data.user.role

      // Redirect based on role
      if (data.user.role === 'tutor') {
        navigate('/tutor-dashboard');
      } else if (data.user.role === 'student') {
        navigate('/student-dashboard');
      } else {
        alert('Unknown role: ' + data.user.role); // Show the actual value for debugging
      }
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Login failed';
      alert(errMsg);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <img src={logo} alt="TutorApp Logo" className="w-24 mx-auto mb-6" />
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
          >
            Log In
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          Don’t have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
        <p className="mt-4 text-center text-sm">
          <Link to="/reset-password" className="text-blue-600 hover:underline">
            Forgot Password?
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
