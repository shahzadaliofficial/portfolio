# Portfolio Website - Shahzad Ali

A modern, full-stack portfolio website built with React, Node.js, Express, and MongoDB. Features dynamic content management, admin authentication, and responsive design.

## 🚀 Features

- **Dynamic Content Management**: Admin panel for managing projects, experiences, and portfolio content
- **Authentication System**: JWT-based admin authentication with secure login
- **Responsive Design**: Mobile-first design using Tailwind CSS and Shadcn UI components
- **MongoDB Integration**: Scalable database with Mongoose ODM
- **Real-time Updates**: Dynamic content loading with TanStack Query
- **Professional UI**: Clean, modern interface with smooth animations

## 🛠️ Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS & Shadcn UI
- TanStack Query for state management
- Wouter for routing
- Framer Motion for animations

### Backend
- Node.js & Express
- MongoDB with Mongoose
- JWT Authentication
- Email integration with Nodemailer

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shahzadaliofficial/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 🔧 Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/         # Route components
│   │   ├── hooks/         # Custom hooks
│   │   └── lib/           # Utilities
├── server/                # Express backend
│   ├── auth.ts            # Authentication logic
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Database operations
│   └── index.ts           # Server entry point
├── shared/                # Shared types and schemas
└── package.json
```

## 🚪 Admin Access

- **URL**: `/admin`
- **Default Credentials**:
  - Username: `admin`
  - Password: `admin123`

## 📝 Features Overview

### Public Portfolio
- Hero section with professional introduction
- About section with skills and contact information
- Experience timeline with career progression
- Projects showcase with live demos and GitHub links
- Contact form with email integration

### Admin Panel
- Project management (CRUD operations)
- Experience management
- Dynamic content editing for all sections
- Password change functionality
- Secure authentication with JWT

## 🚀 Deployment

The project is configured for deployment on platforms like Vercel, Netlify, or Replit:

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Environment Variables**
   Set up the same environment variables in your deployment platform

3. **Deploy**
   Follow your platform-specific deployment instructions

## 🔗 Live Demo

- **Portfolio**: [Live Site](https://your-portfolio-url.com)
- **Admin Panel**: [Admin Access](https://your-portfolio-url.com/admin)

## 👨‍💻 Developer

**Shahzad Ali** - Software Engineer

- [GitHub](https://github.com/shahzadaliofficial)
- [LinkedIn](https://linkedin.com/in/shahzadali786)
- [Resume](https://usner.vercel.app/resume)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ by Shahzad Ali