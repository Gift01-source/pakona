import express from 'express';
import pool from '../config/dbConfig.js'; // adjust path if needed
import authMiddleware from '../middleware/authMiddleware.js'; // if you have authentication

const router = express.Router();

// Book a session
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { tutor_id, session_time, topic } = req.body;
    const student_id = req.user.id; // assuming authMiddleware sets req.user

    // Check if tutor exists and is a registered tutor
    const tutorCheck = await pool.query(
      "SELECT * FROM users WHERE id = $1 AND role = 'tutor'",
      [tutor_id]
    );
    if (tutorCheck.rows.length === 0) {
      return res.status(400).json({ message: 'Selected tutor does not exist.' });
    }

    const result = await pool.query(
      'INSERT INTO bookings (student_id, tutor_id, session_time, topic) VALUES ($1, $2, $3, $4) RETURNING *',
      [student_id, tutor_id, session_time, topic]
    );
    res.status(201).json({ message: 'Session booked!', booking: result.rows[0] });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get bookings for logged-in student
router.get('/my', authMiddleware, async (req, res) => {
  try {
    const student_id = req.user.id;
    const result = await pool.query(
      `SELECT b.*, u.name AS tutor_name, u.email AS tutor_email
       FROM bookings b
       JOIN users u ON b.tutor_id = u.id
       WHERE b.student_id = $1
       ORDER BY b.session_time DESC`,
      [student_id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Fetch bookings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;