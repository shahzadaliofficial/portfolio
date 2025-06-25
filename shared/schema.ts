import mongoose, { Schema, Document } from 'mongoose';
import { z } from 'zod';

// User interface and schema
export interface User extends Document {
  _id: string;
  username: string;
  email: string;
  createdAt: Date;
}

const userSchema = new Schema<User>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

export const UserModel = mongoose.model<User>('User', userSchema);

// Project interface and schema
export interface Project extends Document {
  _id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<Project>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  longDescription: { type: String },
  technologies: [{ type: String, required: true }],
  githubUrl: { type: String },
  liveUrl: { type: String },
  imageUrl: { type: String },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const ProjectModel = mongoose.model<Project>('Project', projectSchema);

// Experience interface and schema
export interface Experience extends Document {
  _id: string;
  title: string;
  company: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description: string;
  technologies: string[];
  createdAt: Date;
  updatedAt: Date;
}

const experienceSchema = new Schema<Experience>({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  current: { type: Boolean, default: false },
  description: { type: String, required: true },
  technologies: [{ type: String, required: true }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const ExperienceModel = mongoose.model<Experience>('Experience', experienceSchema);

// Admin interface and schema
export interface Admin extends Document {
  _id: string;
  username: string;
  passwordHash: string;
  createdAt: Date;
}

const adminSchema = new Schema<Admin>({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const AdminModel = mongoose.model<Admin>('Admin', adminSchema);

// Portfolio Content interface and schema
export interface PortfolioContent extends Document {
  _id: string;
  section: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const portfolioContentSchema = new Schema<PortfolioContent>({
  section: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const PortfolioContentModel = mongoose.model<PortfolioContent>('PortfolioContent', portfolioContentSchema);

// Zod validation schemas
export const insertAdminSchema = z.object({
  username: z.string().min(1),
  passwordHash: z.string().min(1),
});

export const insertPortfolioContentSchema = z.object({
  section: z.string().min(1),
  content: z.string().min(1),
});

export const insertProjectSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  longDescription: z.string().optional(),
  technologies: z.array(z.string()).min(1),
  githubUrl: z.string().optional(),
  liveUrl: z.string().optional(),
  imageUrl: z.string().optional(),
  featured: z.boolean().default(false),
});

export const insertExperienceSchema = z.object({
  title: z.string().min(1),
  company: z.string().min(1),
  location: z.string().optional(),
  startDate: z.date(),
  endDate: z.date().optional(),
  current: z.boolean().default(false),
  description: z.string().min(1),
  technologies: z.array(z.string()).min(1),
});

// Type exports
export type UpsertUser = Omit<User, '_id' | 'createdAt'>;
export type InsertAdmin = z.infer<typeof insertAdminSchema>;
export type InsertPortfolioContent = z.infer<typeof insertPortfolioContentSchema>;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type InsertExperience = z.infer<typeof insertExperienceSchema>;