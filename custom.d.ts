import { Book } from './src/models/book.model';

declare module 'express-serve-static-core' {
  interface Request {
    book?: Book;
  }
}
