import app from './app';
import { Pool } from 'pg';  
import dotenv from "dotenv";

dotenv.config();

const PORT = Number(process.env.PORT);
const HOST = process.env.HOST as string;

// Connect to Postgres using environment variables
const POOL = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD as string, 
  port: Number(process.env.POSTGRES_PORT),
});

const connectWithRetry = () => {
  POOL.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.log('Database not ready, retrying in 2 seconds...');
      setTimeout(connectWithRetry, 2000);
    } else {
      console.log('Connected to Database successfully:', res.rows[0]);
    }
  });
};

async function startServer() {
    try {
         connectWithRetry();
         
         app.listen(PORT, HOST, () => {
            console.log(`Server running on http://${HOST}:${PORT}`);
         });
    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1);
    }
}

export {POOL}

startServer();