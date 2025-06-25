import express from "express";
import { registerRoutes } from "../server/routes";
import dotenv from "dotenv";
import { connectDB } from "../server/db";
import { setupDefaultAdmin } from "../server/auth";

// Load environment variables
dotenv.config();

// Create an Express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Error handling middleware
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

// Initialize MongoDB connection when the serverless function starts
let isDbConnected = false;

const initializeApp = async () => {
  if (!isDbConnected) {
    try {
      await connectDB();
      await setupDefaultAdmin();
      isDbConnected = true;
    } catch (error) {
      console.error('Failed to initialize server:', error);
    }
  }
};

export default async (req: express.Request, res: express.Response) => {
  await initializeApp();
  
  // Pass the request to the Express app
  return app(req, res);
};