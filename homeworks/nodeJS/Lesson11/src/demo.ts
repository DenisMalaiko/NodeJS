import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function initDB() {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('Database connected at:', result.rows[0].now);
  } catch (err) {
    console.error('Database connection error:', err);
  } finally {
    await pool.end();
  }
}

initDB();