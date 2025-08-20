
import React,{ useState, useEffect, View, StyleSheet } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import Messages from './Messages.js';

// Create an axios instance for your API
const API = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
});

function TutorDashboard({route}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true); 
  const userId = route.params?.userId; // Get userId from route params

  useEffect(() => {
    // Fetch registered students from backend
    API.get('/students')
      .then((res) => {
        setStudents(res.data);
        setLoading(false);
      })
      .catch(() => {
        setStudents([]);
        setLoading(false);
      });
  }, []);

  const filteredStudents = students.filter((student) =>
    `${student.name} ${student.email || ''}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  

  return (
    <div>
      <Navbar role="tutor" />
      <div className="min-h-screen bg-blue-50 p-6">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-700">Tutor Dashboard</h1>
        </header>

        {/* 🔍 Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search students by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/2 p-3 border border-gray-300 rounded shadow"
          />
        </div>
        <View style={styles.container}>
          <Messages userId= {userId} />
        </View>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Upcoming Sessions */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <h2 className="font-semibold text-lg mb-2">Upcoming Sessions</h2>
            <p className="text-gray-600">You have sessions scheduled with students.</p>
          </div>

          {/* Registered Students - with filtered list */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <h2 className="font-semibold text-lg mb-2">Registered Students</h2>
            {loading ? (
              <p className="text-gray-600">Loading students...</p>
            ) : filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <div key={student.id} className="border-t pt-2 mt-2">
                  <p className="text-gray-800 font-medium">{student.name}</p>
                  <p className="text-gray-500 text-sm">{student.email}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No students found matching your search.</p>
            )}
          </div>

          {/* My Profile */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <h2 className="font-semibold text-lg mb-2">My Profile</h2>
            <p className="text-gray-600">View and edit your profile information.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  messageContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
export default TutorDashboard;