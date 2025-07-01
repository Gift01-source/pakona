import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
});

function StudentDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/tutors')
      .then((res) => {
        setTutors(res.data);
        setLoading(false);
      })
      .catch(() => {
        setTutors([]);
        setLoading(false);
      });
  }, []);

  const filteredTutors = tutors.filter((tutor) =>
    `${tutor.name} ${tutor.subject || ''}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar role="student" />
      <div className="min-h-screen bg-blue-50 p-6">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-700">Student Dashboard</h1>
        </header>

        {/* 🔍 Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search tutors by name or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/2 p-3 border border-gray-300 rounded shadow"
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Upcoming Sessions */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <h2 className="font-semibold text-lg mb-2">Upcoming Sessions</h2>
            <p className="text-gray-600">You have 2 sessions scheduled this week.</p>
          </div>

          {/* Available Tutors - with filtered list */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <h2 className="font-semibold text-lg mb-2">Available Tutors</h2>
            {loading ? (
              <p className="text-gray-600">Loading tutors...</p>
            ) : filteredTutors.length > 0 ? (
              filteredTutors.map((tutor) => (
                <div key={tutor.id} className="border-t pt-2 mt-2">
                  <p className="text-gray-800 font-medium">{tutor.name}</p>
                  <p className="text-gray-500 text-sm">{tutor.subject || 'No subject listed'}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No tutors match your search.</p>
            )}
          </div>

          {/* My Progress */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <h2 className="font-semibold text-lg mb-2">My Progress</h2>
            <p className="text-gray-600">Track your learning and goals.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
