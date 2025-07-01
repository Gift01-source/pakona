import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/dbConfig.js';

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  console.log('Register request body:', req.body);

  const { full_name, email, password, role } = req.body;
  if (!full_name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
      [full_name, email, hashedPassword, role || 'student']
    );

    res.status(201).json({ message: 'User registered successfully', user: result.rows[0] });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  console.log('Login request body:', req.body);

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    console.log('User lookup result:', userCheck.rows);

    if (userCheck.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const user = userCheck.rows[0];
    console.log('User role from DB:', user.role);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

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