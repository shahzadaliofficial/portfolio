# GitHub Setup Guide

## Method 1: Using Git Command Line

1. **Extract your project files** (from the tar.gz file I created)

2. **Navigate to your project folder**
   ```bash
   cd portfolio
   ```

3. **Initialize Git repository**
   ```bash
   git init
   ```

4. **Add all files**
   ```bash
   git add .
   ```

5. **Make initial commit**
   ```bash
   git commit -m "Initial commit: Portfolio website with MongoDB and admin panel"
   ```

6. **Create GitHub repository**
   - Go to https://github.com/new
   - Repository name: `portfolio` (or your preferred name)
   - Keep it public or private as needed
   - Don't initialize with README (we already have one)

7. **Connect to GitHub**
   ```bash
   git branch -M main
   git remote add origin https://github.com/shahzadaliofficial/portfolio.git
   git push -u origin main
   ```

## Method 2: Using GitHub CLI (if you have it installed)

1. **Create and push in one step**
   ```bash
   gh repo create portfolio --public --source=. --remote=origin --push
   ```

## Method 3: Upload via GitHub Web Interface

1. Go to https://github.com/new
2. Create a new repository named "portfolio"
3. Click "uploading an existing file"
4. Drag and drop all your project files
5. Commit the files

## Important Environment Variables

When you deploy, make sure to set these environment variables:

```env
DATABASE_URL=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_jwt_secret_key
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
```

## Next Steps After GitHub Setup

1. **Update repository URL in README**
2. **Set up deployment** (Vercel/Netlify recommended)
3. **Configure environment variables** in your deployment platform
4. **Test the deployed version**

Your portfolio is ready to be shared with the world! 🚀