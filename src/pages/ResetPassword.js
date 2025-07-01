import React, { useState } from 'react';
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
});

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.trim() === '') {
      setError('Please enter your email');
      return;
    }

    try {
      await API.post('/reset-password', { email });
      setMessage(`If an account with ${email} exists, a password reset link has been sent.`);
      setError('');
      setEmail('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset link.');
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 p-6">
      <h1 className="text-3xl font-bold mb-6">Reset Password</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <label className="block mb-2 font-semibold">Enter your email address</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter your Email"
          className="w-full p-2 border rounded mb-4"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Send Reset Link
        </button>
      </form>

      {message && <p className="mt-6 text-green-700 font-semibold">{message}</p>}
      {error && <p className="mt-6 text-red-700 font-semibold">{error}</p>}
    </div>
  );
}

export default ResetPassword;
