import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

export async function connectDatabase(): Promise<void> {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  await mongoose.connect(connectionString, { serverSelectionTimeoutMS: 2000 });
  console.log('Connected to octofit_db');
}

export default mongoose.connection;
