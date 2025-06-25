# Vercel Deployment Guide

## Required Environment Variables

To properly deploy this portfolio project on Vercel, you must configure the following environment variables in your Vercel project settings:

### Critical Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority` |
| `JWT_SECRET` | Secret key for JWT token generation | `your-secure-random-string` |

### Email Variables (for Contact Form)

| Variable | Description | Example |
|----------|-------------|---------|
| `SMTP_HOST` | SMTP server host | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP server port | `587` |
| `SMTP_USER` | SMTP username/email | `your-email@gmail.com` |
| `SMTP_PASS` | SMTP password or app password | `your-app-password` |
| `FROM_EMAIL` | Email address messages come from | `your-email@gmail.com` |

### Other Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment name | `production` |
| `VERCEL_DEPLOYMENT` | Flag for Vercel-specific code | `true` |

## Setting Environment Variables in Vercel

1. Go to your Vercel Dashboard
2. Open your portfolio project
3. Click on "Settings"
4. Select "Environment Variables"
5. Add each variable with its corresponding value
6. Click "Save" to apply changes
7. Redeploy your project to apply the new environment variables

## Troubleshooting

If your deployment is encountering 500 errors:

1. Check that all environment variables are properly set
2. Verify your MongoDB connection string is correct and accessible from Vercel
3. Ensure your MongoDB Atlas cluster allows connections from anywhere (0.0.0.0/0) or specifically from Vercel's IP ranges
4. Check the Function Logs in your Vercel deployment to see specific error messages

## Database Setup

Make sure your MongoDB database has:

1. An admin user collection with default credentials
2. Proper indexes for performance
3. Network access configured to allow connections from Vercel
