import express from 'express';
import pool from '../config/dbConfig.js';
import bcrypt from 'bcrypt';

const router = express.Router();

// Reset password route
router.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ message: 'Email and new password are required.' });
  }

  try {
    // Check if user exists
    const userResult = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'No account found with that email.' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password in the database
    await pool.query('UPDATE users SET password = $1 WHERE email = $2', [hashedPassword, email]);

    res.json({ message: 'Password reset successful.' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

export default router;