import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

function TutorProfile() {
  const [profile, setProfile] = useState({
    name: '',
    expertise: '',
    availability: '',
    hourlyRate: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/tutors/1'); // Replace `1` with dynamic tutor ID
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async () => {
    try {
      await axios.put('http://localhost:3000/api/tutors/1', profile); // Replace `1` with dynamic tutor ID
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div>
      <Navbar role="tutor" />
      <div className="min-h-screen bg-gray-100 p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Tutor Profile</h1>

        <div className="bg-white p-6 rounded shadow-md">
          <label className="block mb-2 font-semibold">Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
          />

          <label className="block mb-2 font-semibold">Expertise</label>
          <input
            type="text"
            name="expertise"
            value={profile.expertise}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
          />

          <label className="block mb-2 font-semibold">Availability</label>
          <input
            type="text"
            name="availability"
            value={profile.availability}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
          />

          <label className="block mb-2 font-semibold">Hourly Rate</label>
          <input
            type="number"
            name="hourlyRate"
            value={profile.hourlyRate}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
          />

          <button
            onClick={handleUpdateProfile}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default TutorProfile;
