import express from 'express';
import pool from '../config/dbConfig.js';

const router = express.Router();

// Get all tutors
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tutors');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tutors' });
  }
});

export default router;