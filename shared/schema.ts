import {
  pgTable,
  text,
  varchar,
  integer,
  timestamp,
  boolean,
  jsonb,
  index,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for authentication
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table for authentication
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Projects table
export const projects = pgTable("projects", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  features: text("features").array(),
  technologies: text("technologies").array(),
  appUrl: varchar("app_url", { length: 500 }),
  githubUrl: varchar("github_url", { length: 500 }),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Experience table
export const experiences = pgTable("experiences", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: varchar("title", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }).notNull(),
  location: varchar("location", { length: 255 }),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"),
  isCurrent: boolean("is_current").default(false),
  responsibilities: text("responsibilities").array().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Admin credentials table (simple auth)
export const adminCredentials = pgTable("admin_credentials", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  username: varchar("username", { length: 100 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Portfolio content table for editable sections
export const portfolioContent = pgTable("portfolio_content", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  section: varchar("section", { length: 100 }).notNull().unique(), // 'about', 'skills', 'hero', etc.
  content: jsonb("content").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Schema types
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

export const insertAdminSchema = createInsertSchema(adminCredentials).pick({
  username: true,
  passwordHash: true,
});

export const insertPortfolioContentSchema = createInsertSchema(portfolioContent).pick({
  section: true,
  content: true,
});

export type InsertAdmin = z.infer<typeof insertAdminSchema>;
export type Admin = typeof adminCredentials.$inferSelect;

export type InsertPortfolioContent = z.infer<typeof insertPortfolioContentSchema>;
export type PortfolioContent = typeof portfolioContent.$inferSelect;

export const insertProjectSchema = createInsertSchema(projects).pick({
  title: true,
  description: true,
  features: true,
  technologies: true,
  appUrl: true,
  githubUrl: true,
  startDate: true,
  endDate: true,
  isActive: true,
});

export const insertExperienceSchema = createInsertSchema(experiences).pick({
  title: true,
  company: true,
  location: true,
  startDate: true,
  endDate: true,
  isCurrent: true,
  responsibilities: true,
  responsibilities: true,
});

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

export type InsertExperience = z.infer<typeof insertExperienceSchema>;
export type Experience = typeof experiences.$inferSelect;
