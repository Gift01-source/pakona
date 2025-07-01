import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/userModel.js'; // Assuming you have a User model defined

export const authController = {
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res.json({ access_token: token, role: user.role });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },

  register: async (req, res) => {
    const { email, password, role } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ email, password: hashedPassword, role });
      await user.save();

      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res.status(201).json({ access_token: token, role: user.role });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },
};