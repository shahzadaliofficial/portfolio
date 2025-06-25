# Vercel Deployment Guide

## Environment Variables Required

Make sure to set these environment variables in your Vercel project settings:

```
MONGO_URI=mongodb+srv://admin-url-shortner:admin-url-shortner@clusterproject0.2pkm7ns.mongodb.net/portfolio?retryWrites=true&w=majority
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=malikbilal20553@gmail.com
SMTP_PASS=sqgp ugpw qnxu sbwr
FROM_EMAIL=malikbilal20553@gmail.com
NODE_ENV=production
```

## Important Notes

1. **Database Connection Issues**: If you're experiencing database connection issues:
   - Make sure the MongoDB URI is correct
   - Ensure the MongoDB cluster allows connections from Vercel's IP addresses (or set it to allow connections from anywhere: 0.0.0.0/0)
   - Check that the database user has the proper permissions

2. **Function Timeout**: Vercel serverless functions have a default timeout. We've set the max duration to 60 seconds in the vercel.json file.

3. **Cold Start Issues**: The first request may take longer due to serverless function cold starts.

## Troubleshooting Steps

If you encounter issues with the database connection:

1. Check Vercel logs for any errors
2. Verify that all environment variables are set correctly
3. Try connecting to the MongoDB cluster from a different service to ensure it's accessible
4. Make sure the MongoDB cluster is active and not in sleep mode (if using Atlas free tier)

## Admin Login

Default credentials:
- Username: `admin`
- Password: `admin123`

Remember to change these credentials after your first login.
