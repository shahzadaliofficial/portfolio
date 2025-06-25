# Deployment Guide

## Vercel Deployment

### Environment Variables Required

Set these environment variables in your Vercel dashboard:

```env
DATABASE_URL=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_jwt_secret_key
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
NODE_ENV=production
```

### Deployment Steps

1. **Push to GitHub** (already done)
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables

3. **Build Settings**
   - Build Command: `npm run build:vercel`
   - Output Directory: `dist/public`
   - Install Command: `npm install`

### Alternative: Replit Deployment

Since this is a full-stack application, Replit Deployments might be easier:

1. **In Replit**
   - Click the "Deploy" button
   - Choose "Autoscale deployment"
   - Configure environment variables
   - Deploy

### Database Setup

Make sure your MongoDB Atlas cluster:
- Allows connections from anywhere (0.0.0.0/0) for production
- Has the correct connection string in environment variables
- Database user has read/write permissions

### Post-Deployment

1. **Test the deployment**
   - Visit your deployed URL
   - Test admin login at `/admin`
   - Verify all API endpoints work

2. **Admin Access**
   - Username: `admin`
   - Password: `admin123`
   - Change password after first login

### Troubleshooting

If deployment fails:
1. Check environment variables are set correctly
2. Verify MongoDB connection string
3. Check build logs for specific errors
4. Ensure all dependencies are in package.json