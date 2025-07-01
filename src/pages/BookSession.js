import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ApprovedSessionActions from '../components/ApprovedSessionActions';
import { format } from 'date-fns';
import axios from 'axios';

// API instance
const API = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
});

function BookSession() {
  const [form, setForm] = useState({
    tutorId: '',
    date: '',
    time: '',
    topic: '',
  });

  const [tutors, setTutors] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState({
    tutors: true,
    bookings: true
  });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState({
    loading: false,
    success: false,
    error: null
  });

  useEffect(() => {
    // Fetch tutors from backend
    API.get('/tutors')
      .then((res) => {
        setTutors(res.data);
        setLoading(prev => ({ ...prev, tutors: false }));
      })
      .catch((err) => {
        setSubmitStatus({
          loading: false,
          success: false,
          error: 'Failed to load tutors. Please try again later.'
        });
        setLoading(prev => ({ ...prev, tutors: false }));
      });

    // Fetch existing bookings
    API.get('/bookings/my')
      .then((res) => {
        setBookings(res.data);
        setLoading(prev => ({ ...prev, bookings: false }));
      })
      .catch((err) => {
        setSubmitStatus({
          loading: false,
          success: false,
          error: 'Failed to load bookings. Please try again later.'
        });
        setLoading(prev => ({ ...prev, bookings: false }));
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.tutorId) newErrors.tutorId = 'Please select a tutor';
    if (!form.date) newErrors.date = 'Please select a date';
    if (!form.time) newErrors.time = 'Please select a time';
    if (!form.topic.trim()) {
      newErrors.topic = 'Please enter a topic';
    } else if (form.topic.trim().length < 5) {
      newErrors.topic = 'Topic should be at least 5 characters';
    }
    if (form.date && form.time) {
      const selectedDateTime = new Date(`${form.date}T${form.time}`);
      if (selectedDateTime < new Date()) {
        newErrors.date = 'Please select a future date and time';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setSubmitStatus({ loading: true, success: false, error: null });

    // Combine date and time into ISO string
    const session_time = new Date(`${form.date}T${form.time}`).toISOString();

    API.post('/bookings', {
      tutor_id: form.tutorId,
      session_time,
      topic: form.topic
    })
      .then((res) => {
        setSubmitStatus({
          loading: false,
          success: 'Session booked successfully!',
          error: null
        });
        // Optionally refresh bookings
        API.get('/bookings/my').then((r) => setBookings(r.data));
        // Clear form
        setForm({ tutorId: '', date: '', time: '', topic: '' });
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSubmitStatus(prev => ({ ...prev, success: null }));
        }, 3000);
      })
      .catch((err) => {
        const errorMessage = err.response?.data?.message || 'Booking failed. Please try again.';
        setSubmitStatus({
          loading: false,
          success: false,
          error: errorMessage
        });
      });
  };

  // Get today's date in YYYY-MM-DD format for min date
  const today = format(new Date(), 'yyyy-MM-dd');

  return (
    <div>
      <Navbar role="student" />
      <div className="min-h-screen bg-blue-50 p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Book a Tutoring Session</h1>

        {/* Status Messages */}
        {submitStatus.success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
            {submitStatus.success}
          </div>
        )}
        {submitStatus.error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {submitStatus.error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-700">Select Tutor</label>
            <select
              name="tutorId"
              value={form.tutorId}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${errors.tutorId ? 'border-red-500' : 'border-gray-300'}`}
              disabled={loading.tutors}
            >
              <option value="">-- Select Tutor --</option>
              {loading.tutors ? (
                <option disabled>Loading tutors...</option>
              ) : (
                tutors.map((tutor) => (
                  <option key={tutor.id} value={tutor.id}>
                    {tutor.name} ({tutor.email})
                  </option>
                ))
              )}
            </select>
            {errors.tutorId && <p className="mt-1 text-red-500 text-sm">{errors.tutorId}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                min={today}
                className={`w-full p-2 border rounded ${errors.date ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.date && <p className="mt-1 text-red-500 text-sm">{errors.date}</p>}
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Time</label>
              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${errors.time ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.time && <p className="mt-1 text-red-500 text-sm">{errors.time}</p>}
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-700">Topic</label>
            <input
              type="text"
              name="topic"
              value={form.topic}
              onChange={handleChange}
              placeholder="What do you want to learn?"
              className={`w-full p-2 border rounded ${errors.topic ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.topic && <p className="mt-1 text-red-500 text-sm">{errors.topic}</p>}
          </div>

          <button
            type="submit"
            disabled={submitStatus.loading}
            className={`w-full bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors ${
              submitStatus.loading 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-blue-700 hover:shadow-md'
            }`}
          >
            {submitStatus.loading ? 'Booking Session...' : 'Book Session'}
          </button>
        </form>

        <h2 className="text-2xl font-semibold mb-4 text-gray-800">My Booked Sessions</h2>

        {loading.bookings ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : bookings.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-gray-600 mb-4">You haven't booked any sessions yet.</p>
            <p className="text-gray-500">Book your first session using the form above!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white p-5 rounded-lg shadow-md border-l-4 border-blue-500">
                <div className="mb-3">
                  <p className="font-semibold text-gray-800">Tutor: <span className="font-normal">{booking.tutor_name || booking.tutorId}</span></p>
                  <p className="font-semibold text-gray-800">Date: <span className="font-normal">{booking.session_time ? booking.session_time.split('T')[0] : ''}</span></p>
                  <p className="font-semibold text-gray-800">Time: <span className="font-normal">{booking.session_time ? booking.session_time.split('T')[1].slice(0,5) : ''}</span></p>
                  <p className="font-semibold text-gray-800">Topic: <span className="font-normal">{booking.topic}</span></p>
                </div>
                <ApprovedSessionActions session={booking} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BookSession;