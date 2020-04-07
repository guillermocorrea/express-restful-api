import mongoose, { Schema, Document } from 'mongoose';

export interface Book extends Document {
  title: string;
  author: string;
  genre: string;
  read: boolean;
  [key: string]: any;
}

const bookModel: Schema = new Schema({
  title: { type: String },
  author: { type: String },
  genre: { type: String },
  read: { type: Boolean, default: false },
});

export default mongoose.model<Book>('Book', bookModel);
