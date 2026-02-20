import mongoose from 'mongoose';

const connectDb = async (mongoUri) => {
  if (!mongoUri) {
    throw new Error('MONGODB_URI is not set');
  }
  mongoose.set('strictQuery', true);
  await mongoose.connect(mongoUri);
};

export default connectDb;

