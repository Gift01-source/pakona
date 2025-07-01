import express from 'express';
import pool from '../config/dbConfig.js';

const router = express.Router();

// Get tutor profile by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM tutors WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Tutor not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tutor profile' });
  }
});

// Update tutor profile by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, expertise, availability, hourlyRate } = req.body;

    const result = await pool.query(
      'UPDATE tutors SET name = $1, expertise = $2, availability = $3, hourly_rate = $4 WHERE id = $5 RETURNING *',
      [name, expertise, availability, hourlyRate, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Tutor not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error updating tutor profile' });
  }
});

export default router;