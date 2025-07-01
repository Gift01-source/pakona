import express from 'express';
import pool from '../config/dbConfig.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Send a message
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { receiver_id, content } = req.body;
    const sender_id = req.user.id;
    await pool.query(
      'INSERT INTO messages (sender_id, receiver_id, content) VALUES ($1, $2, $3)',
      [sender_id, receiver_id, content]
    );
    res.status(201).json({ message: 'Message sent!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get messages between two users
router.get('/:userId', authMiddleware, async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const myId = req.user.id;
    const result = await pool.query(
      `SELECT * FROM messages
       WHERE (sender_id = $1 AND receiver_id = $2)
          OR (sender_id = $2 AND receiver_id = $1)
       ORDER BY created_at ASC`,
      [myId, userId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;