import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import messagesRoutes from './routes/messagesRoutes.js';
import tutorRoutes from './routes/tutorProfileRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import tutorSearchRoutes from './routes/tutorSearchRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import callRoutes from './routes/callRoutes.js'; 
import resetpasswordRoutes from './routes/resetpasswordRoutes.js'; 
import pool from './config/dbConfig.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Correct way to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Correct way to parse URL-encoded bodies



// Routes
app.use('/api', authRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/tutors', tutorRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/tutor/search', tutorSearchRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/calls', callRoutes);
app.use('/api/reset-password', resetpasswordRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});