import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProjectSchema, insertExperienceSchema, insertPortfolioContentSchema } from "@shared/schema";
import { sendContactEmail, type ContactFormData } from "./email";
import { authenticateAdmin, comparePassword, generateToken, hashPassword, setupDefaultAdmin, type AuthRequest } from "./auth";
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

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup default admin account
  await setupDefaultAdmin();

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

  app.post("/api/auth/change-password", authenticateAdmin, async (req: AuthRequest, res) => {
    try {
      const { currentPassword, newPassword } = changePasswordSchema.parse(req.body);
      
      const admin = await storage.getAdminByUsername(req.username!);
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }

      const isValidPassword = await comparePassword(currentPassword, admin.passwordHash);
      if (!isValidPassword) {
        return res.status(400).json({ message: "Current password is incorrect" });
      }

      const hashedNewPassword = await hashPassword(newPassword);
      await storage.createAdmin({
        username: admin.username,
        passwordHash: hashedNewPassword,
      });

      res.json({ message: "Password changed successfully" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      console.error("Change password error:", error);
      res.status(500).json({ message: "Failed to change password" });
    }
  });

  app.get("/api/auth/verify", authenticateAdmin, (req: AuthRequest, res) => {
    res.json({ 
      valid: true, 
      username: req.username,
      message: "Token is valid" 
    });
  });

  // Portfolio content routes
  app.get("/api/portfolio-content", async (req, res) => {
    try {
      const content = await storage.getAllPortfolioContent();
      res.json(content);
    } catch (error) {
      console.error("Error fetching portfolio content:", error);
      res.status(500).json({ message: "Failed to fetch portfolio content" });
    }
  });

  app.get("/api/portfolio-content/:section", async (req, res) => {
    try {
      const { section } = req.params;
      const content = await storage.getPortfolioContent(section);
      if (!content) {
        return res.status(404).json({ message: "Content not found" });
      }
      res.json(content);
    } catch (error) {
      console.error("Error fetching portfolio content:", error);
      res.status(500).json({ message: "Failed to fetch portfolio content" });
    }
  });

  app.put("/api/portfolio-content/:section", authenticateAdmin, async (req: AuthRequest, res) => {
    try {
      const { section } = req.params;
      const { content } = req.body;
      
      const updatedContent = await storage.updatePortfolioContent(section, content);
      res.json(updatedContent);
    } catch (error) {
      console.error("Error updating portfolio content:", error);
      res.status(500).json({ message: "Failed to update portfolio content" });
    }
  });

  // Project routes
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const project = await storage.getProject(id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });

  app.post("/api/projects", authenticateAdmin, async (req: AuthRequest, res) => {
    try {
      const projectData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(projectData);
      res.status(201).json(project);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid project data", errors: error.errors });
      }
      console.error("Error creating project:", error);
      res.status(500).json({ message: "Failed to create project" });
    }
  });

  app.put("/api/projects/:id", authenticateAdmin, async (req: AuthRequest, res) => {
    try {
      const id = parseInt(req.params.id);
      const projectData = insertProjectSchema.partial().parse(req.body);
      const project = await storage.updateProject(id, projectData);
      res.json(project);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid project data", errors: error.errors });
      }
      console.error("Error updating project:", error);
      res.status(500).json({ message: "Failed to update project" });
    }
  });

  app.delete("/api/projects/:id", authenticateAdmin, async (req: AuthRequest, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteProject(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting project:", error);
      res.status(500).json({ message: "Failed to delete project" });
    }
  });

  // Experience routes
  app.get("/api/experiences", async (req, res) => {
    try {
      const experiences = await storage.getExperiences();
      res.json(experiences);
    } catch (error) {
      console.error("Error fetching experiences:", error);
      res.status(500).json({ message: "Failed to fetch experiences" });
    }
  });

  app.get("/api/experiences/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const experience = await storage.getExperience(id);
      if (!experience) {
        return res.status(404).json({ message: "Experience not found" });
      }
      res.json(experience);
    } catch (error) {
      console.error("Error fetching experience:", error);
      res.status(500).json({ message: "Failed to fetch experience" });
    }
  });

  app.post("/api/experiences", authenticateAdmin, async (req: AuthRequest, res) => {
    try {
      const experienceData = insertExperienceSchema.parse(req.body);
      const experience = await storage.createExperience(experienceData);
      res.status(201).json(experience);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid experience data", errors: error.errors });
      }
      console.error("Error creating experience:", error);
      res.status(500).json({ message: "Failed to create experience" });
    }
  });

  app.put("/api/experiences/:id", authenticateAdmin, async (req: AuthRequest, res) => {
    try {
      const id = parseInt(req.params.id);
      const experienceData = insertExperienceSchema.partial().parse(req.body);
      const experience = await storage.updateExperience(id, experienceData);
      res.json(experience);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid experience data", errors: error.errors });
      }
      console.error("Error updating experience:", error);
      res.status(500).json({ message: "Failed to update experience" });
    }
  });

  app.delete("/api/experiences/:id", authenticateAdmin, async (req: AuthRequest, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteExperience(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting experience:", error);
      res.status(500).json({ message: "Failed to delete experience" });
    }
  });

  // Contact form route
  app.post("/api/contact", async (req, res) => {
    try {
      const formData = contactFormSchema.parse(req.body);
      
      const emailSent = await sendContactEmail(formData);
      
      if (emailSent) {
        res.json({ 
          success: true, 
          message: "Message sent successfully! I'll get back to you soon." 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to send message. Please try again later." 
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        });
      }
      console.error("Error processing contact form:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to process contact form" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
