import {
  User,
  UpsertUser,
  Project,
  InsertProject,
  Experience,
  InsertExperience,
  Admin,
  InsertAdmin,
  PortfolioContent,
  InsertPortfolioContent,
  UserModel,
  ProjectModel,
  ExperienceModel,
  AdminModel,
  PortfolioContentModel,
} from "@shared/schema";
import { connectDB } from "./db"; // Import connectDB function

export interface IStorage {
  // User operations for auth
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Admin operations
  getAdminByUsername(username: string): Promise<Admin | undefined>;
  createAdmin(admin: InsertAdmin): Promise<Admin>;
  
  // Project operations
  getProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: Partial<InsertProject>): Promise<Project>;
  deleteProject(id: string): Promise<void>;
  
  // Experience operations
  getExperiences(): Promise<Experience[]>;
  getExperience(id: string): Promise<Experience | undefined>;
  createExperience(experience: InsertExperience): Promise<Experience>;
  updateExperience(id: string, experience: Partial<InsertExperience>): Promise<Experience>;
  deleteExperience(id: string): Promise<void>;
  
  // Portfolio content operations
  getPortfolioContent(section: string): Promise<PortfolioContent | undefined>;
  updatePortfolioContent(section: string, content: any): Promise<PortfolioContent>;
  getAllPortfolioContent(): Promise<PortfolioContent[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    try {
      const user = await UserModel.findById(id);
      return user || undefined;
    } catch (error) {
      console.error('Error getting user:', error);
      return undefined;
    }
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    try {
      const user = await UserModel.findOneAndUpdate(
        { username: userData.username },
        userData,
        { upsert: true, new: true }
      );
      return user;
    } catch (error) {
      console.error('Error upserting user:', error);
      throw error;
    }
  }

  async getProjects(): Promise<Project[]> {
    try {
      return await ProjectModel.find().sort({ createdAt: -1 });
    } catch (error) {
      console.error('Error getting projects:', error);
      return [];
    }
  }

  async getProject(id: string): Promise<Project | undefined> {
    try {
      const project = await ProjectModel.findById(id);
      return project || undefined;
    } catch (error) {
      console.error('Error getting project:', error);
      return undefined;
    }
  }

  async createProject(project: InsertProject): Promise<Project> {
    try {
      const newProject = new ProjectModel(project);
      return await newProject.save();
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  }

  async updateProject(id: string, project: Partial<InsertProject>): Promise<Project> {
    try {
      const updatedProject = await ProjectModel.findByIdAndUpdate(
        id,
        { ...project, updatedAt: new Date() },
        { new: true }
      );
      if (!updatedProject) {
        throw new Error('Project not found');
      }
      return updatedProject;
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  }

  async deleteProject(id: string): Promise<void> {
    try {
      await ProjectModel.findByIdAndDelete(id);
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  }

  async getExperiences(): Promise<Experience[]> {
    try {
      return await ExperienceModel.find().sort({ startDate: -1 });
    } catch (error) {
      console.error('Error getting experiences:', error);
      return [];
    }
  }

  async getExperience(id: string): Promise<Experience | undefined> {
    try {
      const experience = await ExperienceModel.findById(id);
      return experience || undefined;
    } catch (error) {
      console.error('Error getting experience:', error);
      return undefined;
    }
  }

  async createExperience(experience: InsertExperience): Promise<Experience> {
    try {
      const newExperience = new ExperienceModel(experience);
      return await newExperience.save();
    } catch (error) {
      console.error('Error creating experience:', error);
      throw error;
    }
  }

  async updateExperience(id: string, experience: Partial<InsertExperience>): Promise<Experience> {
    try {
      const updatedExperience = await ExperienceModel.findByIdAndUpdate(
        id,
        { ...experience, updatedAt: new Date() },
        { new: true }
      );
      if (!updatedExperience) {
        throw new Error('Experience not found');
      }
      return updatedExperience;
    } catch (error) {
      console.error('Error updating experience:', error);
      throw error;
    }
  }

  async deleteExperience(id: string): Promise<void> {
    try {
      await ExperienceModel.findByIdAndDelete(id);
    } catch (error) {
      console.error('Error deleting experience:', error);
      throw error;
    }
  }

  async getAdminByUsername(username: string): Promise<Admin | undefined> {
    try {
      const admin = await AdminModel.findOne({ username });
      return admin || undefined;
    } catch (error) {
      console.error('Error getting admin:', error);
      return undefined;
    }
  }

  async createAdmin(admin: InsertAdmin): Promise<Admin> {
    try {
      const newAdmin = new AdminModel(admin);
      return await newAdmin.save();
    } catch (error) {
      console.error('Error creating admin:', error);
      throw error;
    }
  }

  async getPortfolioContent(section: string): Promise<PortfolioContent | undefined> {
    try {
      const content = await PortfolioContentModel.findOne({ section });
      return content || undefined;
    } catch (error) {
      console.error('Error getting portfolio content:', error);
      return undefined;
    }
  }

  async updatePortfolioContent(section: string, content: any): Promise<PortfolioContent> {
    try {
      const contentString = typeof content === 'string' ? content : JSON.stringify(content);
      const updatedContent = await PortfolioContentModel.findOneAndUpdate(
        { section },
        { 
          section, 
          content: contentString,
          updatedAt: new Date()
        },
        { upsert: true, new: true }
      );
      return updatedContent;
    } catch (error) {
      console.error('Error updating portfolio content:', error);
      throw error;
    }
  }

  async getAllPortfolioContent(): Promise<PortfolioContent[]> {
    try {
      return await PortfolioContentModel.find();
    } catch (error) {
      console.error('Error getting all portfolio content:', error);
      return [];
    }
  }
}

export const storage = new DatabaseStorage();