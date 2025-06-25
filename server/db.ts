import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://shahzadaliofficial:Shahzadali786@cluster0.3oql5.mongodb.net/portfolio?retryWrites=true&w=majority';

if (!MONGO_URI) {
  throw new Error(
    "MONGO_URI must be set. Please provide a MongoDB connection string.",
  );
}

// For Vercel serverless environment, handle connection caching
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Declare global mongoose cache for serverless environment
declare global {
  var mongoose: MongooseCache | undefined;
}

// Use cached connection if available
const cached: MongooseCache = global.mongoose || { conn: null, promise: null };

// Store cache in global variable
if (!global.mongoose) {
  global.mongoose = cached;
}

// Connect to MongoDB with proper configuration
const connectDB = async (): Promise<typeof mongoose> => {
  if (cached.conn) {
    console.log('Using cached MongoDB connection');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      serverSelectionTimeoutMS: 30000, // 30 seconds
      socketTimeoutMS: 45000, // 45 seconds
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGO_URI, opts)
      .then((mongoose) => {
        console.log('New MongoDB connection established');
        return mongoose;
      })
      .catch((error) => {
        console.error('Failed to connect to MongoDB:', error);
        cached.promise = null;
        // In serverless environment, don't exit process
        if (process.env.VERCEL_DEPLOYMENT !== 'true') {
          process.exit(1);
        } else {
          throw error;
        }
      });
  }
  
  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
};

// Set up error handlers for the connection
mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

export { mongoose, connectDB };