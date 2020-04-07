import mongoose, { Mongoose } from 'mongoose';

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/bookAPI';
let db: Mongoose = null;

export async function connectDB() {
  if (db) {
    return db;
  }
  db = await mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });
  console.info('Connected to mongodb instance ', url);
  return db;
}
