import React, { useEffect } from 'react';
import socket from './socket'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import TutorDashboard from './pages/TutorDashboard';
import StudentDashboard from './pages/StudentDashboard';
import TutorProfile from './pages/TutorProfile';
import StudentProfile from './pages/StudentProfile';
import BookSession from './pages/BookSession';
import TutorSessions from './pages/TutorSessions';
import ResetPassword from './pages/ResetPassword';
import Payment from './pages/Payment';
import Messages from './pages/Messages';
import Home from './pages/Home';

function App() {
  useEffect(() => {
    // Handle socket connection
    socket.on('connect', () => {
      console.log('Socket connected');
    });

    socket.on('message', (data) => {
      console.log('Message received:', data);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    // Cleanup socket listeners on unmount
    return () => {
      socket.off('connect');
      socket.off('message');
      socket.off('disconnect');
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/tutor-dashboard" element={<TutorDashboard />} />
        <Route path="/student-profile" element={<StudentProfile />} />
        <Route path="/tutor-profile" element={<TutorProfile />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/book-session" element={<BookSession />} /> 
        <Route path="/tutor-sessions" element={<TutorSessions />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;




