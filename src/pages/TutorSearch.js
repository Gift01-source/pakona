import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TutorSearch = () => {
  const [tutors, setTutors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/tutors');
        setTutors(response.data);
      } catch (error) {
        console.error('Error fetching tutors:', error);
      }
    };

    fetchTutors();
  }, []);

  const filteredTutors = tutors.filter((tutor) =>
    tutor.expertise.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1>Find a Tutor</h1>
      <input
        type="text"
        placeholder="Search by expertise"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div>
        {filteredTutors.map((tutor) => (
          <div key={tutor.id}>
            <h2>{tutor.name}</h2>
            <p>Expertise: {tutor.expertise}</p>
            <p>Availability: {tutor.availability}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorSearch;