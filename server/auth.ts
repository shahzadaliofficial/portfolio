import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { storage } from "./storage";
import type { Request, Response, NextFunction } from "express";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this";

export interface AuthRequest extends Request {
  adminId?: number;
  username?: string;
}

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

export function generateToken(adminId: number, username: string): string {
  return jwt.sign({ adminId, username }, JWT_SECRET, { expiresIn: "24h" });
}

export function verifyToken(token: string): { adminId: number; username: string } | null {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { adminId: number; username: string };
    return payload;
  } catch (error) {
    return null;
  }
}

export async function authenticateAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.substring(7);
    const payload = verifyToken(token);
    
    if (!payload) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.adminId = payload.adminId;
    req.username = payload.username;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed" });
  }
}

export async function setupDefaultAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await storage.getAdminByUsername("admin");
    if (existingAdmin) {
      return;
    }

    // Create default admin account
    const defaultPassword = "admin123"; // Change this!
    const hashedPassword = await hashPassword(defaultPassword);
    
    await storage.createAdmin({
      username: "admin",
      passwordHash: hashedPassword,
    });

    console.log("Default admin account created:");
    console.log("Username: admin");
    console.log("Password: admin123");
    console.log("Please change the password after first login!");
  } catch (error) {
    console.error("Failed to setup default admin:", error);
  }
}