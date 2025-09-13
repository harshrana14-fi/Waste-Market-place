import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://jatoliyaharsh8_db_user:4wB3G4NUsDwsnLov@cluster0.wqm5495.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Connects to MongoDB and returns a mongoose instance
 * @returns Promise<typeof mongoose>
 * @throws Error if connection fails
 */
const connectDB = async (): Promise<typeof mongoose> => {
  const opts: mongoose.ConnectOptions = {
    bufferCommands: false,
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    family: 4,
    autoIndex: true,
    maxPoolSize: 10
  };

  try {
    // Return existing connection if it exists
    if (cached?.conn) {
      // Verify connection is still alive
      try {
        // A more robust way to check is the readyState
        if (cached.conn.connection.readyState === 1) {
            return cached.conn;
        }
        // If not connected, reset the cache to force a new connection
        cached.conn = null;
        cached.promise = null;
      } catch {
        // Connection is dead, reset it
        cached.conn = null;
        cached.promise = null;
      }
    }

    // Create new connection if none exists
    if (!cached?.promise) {
      cached!.promise = mongoose.connect(MONGODB_URI, opts);
    }

    try {
      const mongoose_instance = await cached!.promise;
      cached!.conn = mongoose_instance;
      return mongoose_instance;
    } catch (err) {
      cached!.promise = null;
      throw err;
    }

  } catch (error: unknown) {
    // Reset cache on error
    if (cached) {
      cached.promise = null;
      cached.conn = null;
    }
    console.error('MongoDB connection error:', error);
    throw new Error(
      'Failed to connect to MongoDB. Please check your connection string and make sure your MongoDB instance is running.'
    );
  }
};

// Export the connection function
export default connectDB;
