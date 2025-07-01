import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const initialSessions = [
  // sample session for demo, in real app fetch from backend
  {
    id: 1,
    studentName: 'Jane Smith',
    date: '2025-05-25',
    time: '15:00',
    topic: 'Algebra Basics',
    status: 'pending',
  },
  {
    id: 2,
    studentName: 'Mike Brown',
    date: '2025-05-26',
    time: '10:00',
    topic: 'Physics - Newton Laws',
    status: 'approved',
  },
];

function TutorSessions() {
  const [sessions, setSessions] = useState(initialSessions);

  const handleApprove = (id) => {
    setSessions(sessions.map(s => s.id === id ? {...s, status: 'approved'} : s));
  };

  const handleReject = (id) => {
    setSessions(sessions.map(s => s.id === id ? {...s, status: 'rejected'} : s));
  };

  return (
    <div>
      <Navbar role="tutor" />
      <div className="min-h-screen bg-gray-100 p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Sessions</h1>

        {sessions.length === 0 ? (
          <p>No sessions booked yet.</p>
        ) : (
          <ul className="space-y-4">
            {sessions.map(session => (
              <li key={session.id} className="bg-white p-4 rounded shadow-md flex justify-between items-center">
                <div>
                  <p><strong>Student:</strong> {session.studentName}</p>
                  <p><strong>Date:</strong> {session.date}</p>
                  <p><strong>Time:</strong> {session.time}</p>
                  <p><strong>Topic:</strong> {session.topic}</p>
                  <p><strong>Status:</strong> 
                    <span 
                      className={
                        session.status === 'approved' ? 'text-green-600' : 
                        session.status === 'rejected' ? 'text-red-600' : 'text-yellow-600'
                      }
                    > {session.status}</span>
                  </p>
                </div>

                {session.status === 'pending' && (
                  <div className="space-x-2">
                    <button
                      onClick={() => handleApprove(session.id)}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(session.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TutorSessions;
