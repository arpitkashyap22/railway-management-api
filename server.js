import express from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import routes from './src/routes/index.js';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Routes
app.use('/api', routes);

// Database connection and server startup
const startServer = async () => {
  try {
    // Connect to the database
    await prisma.$connect();
    console.log('Database connected successfully');

    // Start the server after database is connected
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1); // Exit if DB connection fails
  }
};

// Call the startServer function
startServer();

export { prisma };
