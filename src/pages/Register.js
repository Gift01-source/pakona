import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/image.png';
import axios from 'axios';

// Correct API configuration
const API = axios.create({
  baseURL: 'http://localhost:3000/api', // Ensure this matches your backend URL
  withCredentials: true,
});

function Register() {
  const [formData, setFormData] = useState({
    role: 'student',
    fullName: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await API.post('/register', {
        role: formData.role,
        full_name: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 201) {
        navigate('/login', { state: { registrationSuccess: true } });
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || 'An error occurred during registration';
      setError(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg text-center">
        <img src={logo} alt="App Logo" className="w-24 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-blue-600 mb-6">Create Account</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password (min 6 characters)"
            className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            value={formData.password}
            onChange={handleChange}
            minLength="6"
            required
          />

          <select
            name="role"
            className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="student">Student</option>
            <option value="tutor">Tutor</option>
          </select>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-600 text-white py-3 rounded transition-colors ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/Login" className="text-blue-600 hover:text-blue-800 font-semibold">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;