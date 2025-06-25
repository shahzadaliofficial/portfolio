import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "../server/routes";
import dotenv from "dotenv";
import { connectDB } from "../server/db";
import { setupDefaultAdmin } from "../server/auth";
import { serveStatic } from "../server/vite";

// Load environment variables
dotenv.config();

// Create an Express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      console.log(logLine);
    }
  });

  next();
});

// Define the API routes directly in this file for Vercel serverless functions
import { storage } from "../server/storage";
import { insertProjectSchema, insertExperienceSchema, insertPortfolioContentSchema } from "../shared/schema";
import { sendContactEmail, type ContactFormData } from "../server/email";
import { authenticateAdmin, comparePassword, generateToken, hashPassword, setupDefaultAdmin, type AuthRequest } from "../server/auth";
import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  subject: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Auth routes
app.post("/api/auth/login", async (req, res) => {
  try {
    const { username, password } = loginSchema.parse(req.body);
    
    const admin = await storage.getAdminByUsername(username);
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isValidPassword = await comparePassword(password, admin.passwordHash);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(admin.id, admin.username);
    res.json({ 
      token, 
      username: admin.username,
      message: "Login successful" 
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Invalid input", errors: error.errors });
    }
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
});

// Projects routes
app.get("/api/projects", async (req, res) => {
  try {
    const projects = await storage.getAllProjects();
    res.json(projects);
  } catch (error) {
    console.error("Get projects error:", error);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

// Experiences routes
app.get("/api/experiences", async (req, res) => {
  try {
    const experiences = await storage.getAllExperiences();
    res.json(experiences);
  } catch (error) {
    console.error("Get experiences error:", error);
    res.status(500).json({ message: "Failed to fetch experiences" });
  }
});

// Portfolio content routes
app.get("/api/portfolio-content/:section", async (req, res) => {
  try {
    const { section } = req.params;
    const content = await storage.getPortfolioContent(section);
    res.json(content || { section, content: {} });
  } catch (error) {
    console.error(`Get portfolio content error for ${req.params.section}:`, error);
    res.status(500).json({ message: `Failed to fetch ${req.params.section} content` });
  }
});

// Contact form route
app.post("/api/contact", async (req, res) => {
  try {
    const contactData = contactFormSchema.parse(req.body) as ContactFormData;
    await sendContactEmail(contactData);
    res.json({ message: "Message sent successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Invalid input", errors: error.errors });
    }
    console.error("Contact form error:", error);
    res.status(500).json({ message: "Failed to send message" });
  }
});

// Initialize MongoDB connection
let isDbConnected = false;

const initializeDB = async () => {
  if (!isDbConnected) {
    try {
      console.log("Connecting to MongoDB...");
      await connectDB();
      console.log("MongoDB connection successful");
      await setupDefaultAdmin();
      isDbConnected = true;
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
      throw error; // Rethrow to handle in the main handler
    }
  }
};

// Main handler function for Vercel
export default async (req: Request, res: Response) => {
  try {
    // Initialize database connection for each request (will only connect once)
    await initializeDB();
    
    // Process the request with our Express app
    return app(req, res);
  } catch (error) {
    console.error("API request error:", error);
    return res.status(500).json({ 
      error: "Internal Server Error", 
      message: "Failed to process request. Database connection may be unavailable." 
    });
  }
};