import mongoose from 'mongoose';

const connectMongo = async () => {
  if (mongoose.connections[0].readyState) {
    // If a connection already exists, use it
    return;
  }

  const uri = process.env.MONGODB_URI as string;

  try {
    await mongoose.connect(uri);
    console.log('MongoDB Connected');

  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Could not connect to MongoDB');
  }
};

export default connectMongo;
