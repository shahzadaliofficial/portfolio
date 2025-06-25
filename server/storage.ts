import {
  users,
  projects,
  experiences,
  adminCredentials,
  portfolioContent,
  type User,
  type UpsertUser,
  type Project,
  type Experience,
  type InsertProject,
  type InsertExperience,
  type Admin,
  type InsertAdmin,
  type PortfolioContent,
  type InsertPortfolioContent,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // User operations for auth
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Admin operations
  getAdminByUsername(username: string): Promise<Admin | undefined>;
  createAdmin(admin: InsertAdmin): Promise<Admin>;
  
  // Project operations
  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project>;
  deleteProject(id: number): Promise<void>;
  
  // Experience operations
  getExperiences(): Promise<Experience[]>;
  getExperience(id: number): Promise<Experience | undefined>;
  createExperience(experience: InsertExperience): Promise<Experience>;
  updateExperience(id: number, experience: Partial<InsertExperience>): Promise<Experience>;
  deleteExperience(id: number): Promise<void>;
  
  // Portfolio content operations
  getPortfolioContent(section: string): Promise<PortfolioContent | undefined>;
  updatePortfolioContent(section: string, content: any): Promise<PortfolioContent>;
  getAllPortfolioContent(): Promise<PortfolioContent[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations for auth
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Project operations
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects).where(eq(projects.isActive, true)).orderBy(desc(projects.createdAt));
  }

  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }

  async createProject(project: InsertProject): Promise<Project> {
    const [newProject] = await db.insert(projects).values(project).returning();
    return newProject;
  }

  async updateProject(id: number, project: Partial<InsertProject>): Promise<Project> {
    const [updatedProject] = await db
      .update(projects)
      .set({ ...project, updatedAt: new Date() })
      .where(eq(projects.id, id))
      .returning();
    return updatedProject;
  }

  async deleteProject(id: number): Promise<void> {
    await db.update(projects).set({ isActive: false }).where(eq(projects.id, id));
  }

  // Experience operations
  async getExperiences(): Promise<Experience[]> {
    return await db.select().from(experiences).orderBy(desc(experiences.startDate));
  }

  async getExperience(id: number): Promise<Experience | undefined> {
    const [experience] = await db.select().from(experiences).where(eq(experiences.id, id));
    return experience;
  }

  async createExperience(experience: InsertExperience): Promise<Experience> {
    const [newExperience] = await db.insert(experiences).values(experience).returning();
    return newExperience;
  }

  async updateExperience(id: number, experience: Partial<InsertExperience>): Promise<Experience> {
    const [updatedExperience] = await db
      .update(experiences)
      .set({ ...experience, updatedAt: new Date() })
      .where(eq(experiences.id, id))
      .returning();
    return updatedExperience;
  }

  async deleteExperience(id: number): Promise<void> {
    await db.delete(experiences).where(eq(experiences.id, id));
  }

  // Admin operations
  async getAdminByUsername(username: string): Promise<Admin | undefined> {
    const [admin] = await db.select().from(adminCredentials).where(eq(adminCredentials.username, username));
    return admin;
  }

  async createAdmin(admin: InsertAdmin): Promise<Admin> {
    const [newAdmin] = await db.insert(adminCredentials).values(admin).returning();
    return newAdmin;
  }

  // Portfolio content operations
  async getPortfolioContent(section: string): Promise<PortfolioContent | undefined> {
    const [content] = await db.select().from(portfolioContent).where(eq(portfolioContent.section, section));
    return content;
  }

  async updatePortfolioContent(section: string, content: any): Promise<PortfolioContent> {
    const [updatedContent] = await db
      .insert(portfolioContent)
      .values({ section, content })
      .onConflictDoUpdate({
        target: portfolioContent.section,
        set: { content, updatedAt: new Date() },
      })
      .returning();
    return updatedContent;
  }

  async getAllPortfolioContent(): Promise<PortfolioContent[]> {
    return await db.select().from(portfolioContent);
  }
}

export const storage = new DatabaseStorage();
