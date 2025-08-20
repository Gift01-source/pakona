import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/image.png'; // Adjust the path if needed

function Navbar({ role }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      
      <div className="space-x-6 text-sm font-medium">
        {role === 'tutor' && (
          <>
            <Link to="/tutor-dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
            <Link to="/tutor-profile" className="text-gray-700 hover:text-blue-600">Profile</Link>
            <Link to="/tutor-sessions" className="text-gray-700 hover:text-blue-600">My Sessions</Link>
          </>
        )}
        {role === 'student' && (
          <>
            <Link to="/student-dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
            <Link to="/student-profile" className="text-gray-700 hover:text-blue-600">Profile</Link>
            <Link to="/book-session" className="text-gray-700 hover:text-blue-600">Book Session</Link>
          </>
        )}
        <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
