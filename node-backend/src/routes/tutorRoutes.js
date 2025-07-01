import express from 'express';
import pool from '../config/dbConfig.js';

const router = express.Router();

// Get all registered tutors
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email, subject FROM users WHERE role = 'tutor'"
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;