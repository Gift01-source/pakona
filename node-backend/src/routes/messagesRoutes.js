import express from 'express';
import pool from '../config/dbConfig.js';

const router = express.Router();

// Get all messages
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM messages');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages' });
  }
});

// Send a new message
router.post('/', async (req, res) => {
  try {
    const { content } = req.body;
    const result = await pool.query(
      'INSERT INTO messages (content) VALUES ($1) RETURNING *',
      [content]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error sending message' });
  }
});

export default router;