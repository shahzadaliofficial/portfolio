# Replit.md

## Overview

This is a full-stack portfolio website built for Shahzad Ali using modern web technologies. The application follows a clean monorepo structure with a React frontend and Express.js backend, designed to showcase professional experience, skills, and projects in a responsive and interactive format.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Session Storage**: connect-pg-simple for PostgreSQL session store
- **Authentication**: Prepared for JWT-based authentication
- **Development**: TSX for TypeScript execution in development

### Database Layer
- **Primary Database**: PostgreSQL (configured via Neon serverless)
- **ORM**: Drizzle ORM with type-safe queries
- **Schema Management**: Drizzle Kit for migrations
- **Development Fallback**: In-memory storage for development/testing

## Key Components

### Frontend Components Structure
```
client/src/components/
├── ui/           # Shadcn UI component library
├── pages/        # Route components (Home, NotFound)
├── sections/     # Portfolio sections (Hero, About, Skills, etc.)
└── navigation/   # Navigation components
```

### Backend Structure
```
server/
├── index.ts      # Express server setup with middleware
├── routes.ts     # API route definitions
├── storage.ts    # Data access layer with interface
└── vite.ts       # Development server integration
```

### Database Schema
- **Users Table**: Basic user management with username/password
- **Extensible Design**: Schema ready for additional portfolio features

## Data Flow

1. **Client Requests**: React Router handles client-side navigation
2. **API Calls**: TanStack Query manages server state and caching
3. **Server Processing**: Express.js processes API requests
4. **Data Access**: Storage interface abstracts database operations
5. **Response**: JSON responses with error handling middleware

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Headless UI component primitives
- **drizzle-orm**: Type-safe database ORM
- **tailwindcss**: Utility-first CSS framework

### Development Tools
- **vite**: Fast build tool and dev server
- **tsx**: TypeScript execution for Node.js
- **esbuild**: JavaScript bundler for production

### UI Component System
- Complete Shadcn/ui component library implementation
- Consistent design system with CSS custom properties
- Responsive design patterns throughout

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds React app to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Database**: Drizzle migrations ensure schema consistency

### Environment Configuration
- **Development**: TSX with hot reloading via Vite middleware
- **Production**: Node.js serves bundled application
- **Database**: Environment-based connection strings

### Replit Integration
- **Auto-scaling deployment** target configured
- **Port 5000** for development, external port 80
- **PostgreSQL module** enabled for database support
- **Workflow automation** for streamlined development

## Recent Changes

✓ Added real links: GitHub (https://github.com/shahzadaliofficial), LinkedIn (linkedin.com/in/shahzadali786), Resume (https://usner.vercel.app/resume)
✓ Created PostgreSQL database with projects and experiences tables
✓ Implemented full CRUD API for projects and experiences management
✓ Built admin panel (/admin) for adding/editing/deleting projects and experiences
✓ Enhanced projects and experience sections to display both static and dynamic content
✓ Added navigation to admin panel with settings icon
✓ Integrated email functionality using Gmail SMTP for contact form
✓ Made email and phone numbers clickable for better user experience
✓ Added proper form validation and success/error handling
✓ Implemented JWT-based authentication system for admin access
✓ Protected all admin routes with authentication middleware
✓ Added login page with default credentials (admin/admin123)
✓ Created password change functionality in admin settings
✓ Enhanced admin panel with user management and content editing tabs

## Changelog

```
Changelog:
- June 25, 2025. Initial portfolio setup with static content
- June 25, 2025. Added database functionality and admin management system
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```