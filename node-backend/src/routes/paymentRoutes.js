import express from 'express';
import pool from '../config/dbConfig.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Make a payment
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { amount } = req.body;
    const user_id = req.user.id;
    await pool.query(
      'INSERT INTO payments (user_id, amount) VALUES ($1, $2)',
      [user_id, amount]
    );
    res.status(201).json({ message: 'Payment successful' });
  } catch (error) {
    res.status(500).json({ message: 'Payment failed' });
  }
});

// Get payment history
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const user_id = req.user.id;
    const result = await pool.query(
      'SELECT * FROM payments WHERE user_id = $1',
      [user_id]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Could not fetch payment history' });
  }
});

export default router;