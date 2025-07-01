import React, { useState } from 'react';
import Navbar from '../components/Navbar';

function StudentProfile() {
  const [profile, setProfile] = useState({
    name: 'Jane Smith',
    email: 'jane@example.com',
    goals: 'Improve algebra skills',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    alert('Profile saved! (You can connect to backend here)');
    // TODO: Send profile data to backend API
  };

  return (
    <div>
      <Navbar role="student" />
      <div className="min-h-screen bg-blue-50 p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Student Profile</h1>

        <div className="bg-white p-6 rounded shadow-md">
          <label className="block mb-2 font-semibold">Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
          />

          <label className="block mb-2 font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
          />

          <label className="block mb-2 font-semibold">Learning Goals</label>
          <textarea
            name="goals"
            value={profile.goals}
            onChange={handleChange}
            rows={4}
            className="w-full p-2 border rounded mb-4"
          />

          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;
