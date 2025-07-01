import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
});

pool.on('connect', () => {
  console.log('Connected to PostgreSQL');
});

export default pool;