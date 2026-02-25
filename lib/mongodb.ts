import mongoose from 'mongoose';

type MongooseCache = {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const globalForMongoose = globalThis as typeof globalThis & {
  mongooseCache?: MongooseCache;
};

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
const cached =
  globalForMongoose.mongooseCache ??
  (globalForMongoose.mongooseCache = { conn: null, promise: null });

/**
 * Establishes a connection to MongoDB using Mongoose.
 * Caches the connection to prevent multiple connections in development.
 *
 * @returns {Promise<mongoose.Connection>} The Mongoose connection instance
 */
async function connectDB(): Promise<mongoose.Connection> {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error(
      'Please define the MONGODB_URI environment variable inside .env.local'
    );
  }

  // Return cached connection if it exists
  if (cached.conn) {
    return cached.conn;
  }

  // If there's no cached promise, create a new connection
  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false, // Disable buffering to fail fast if connection is not established
    };

    cached.promise = mongoose.connect(mongoUri, opts).then((mongoose) => {
      return mongoose.connection;
    });
  }

  try {
    // Wait for the connection promise to resolve
    cached.conn = await cached.promise;
  } catch (e) {
    // If connection fails, clear the promise so we can retry
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
