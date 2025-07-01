import express from 'express';
import pool from '../config/dbConfig.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Record a call session (audio/video)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { with_user_id, type, started_at, ended_at } = req.body; // type: 'audio' or 'video'
    const user_id = req.user.id;
    await pool.query(
      'INSERT INTO calls (user_id, with_user_id, type, started_at, ended_at) VALUES ($1, $2, $3, $4, $5)',
      [user_id, with_user_id, type, started_at, ended_at]
    );
    res.status(201).json({ message: 'Call session recorded!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get call history
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const user_id = req.user.id;
    const result = await pool.query(
      `SELECT * FROM calls WHERE user_id = $1 OR with_user_id = $1 ORDER BY started_at DESC`,
      [user_id]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;