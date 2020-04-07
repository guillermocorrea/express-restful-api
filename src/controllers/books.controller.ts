import { Request, Response } from 'express';
import BookModel from '../models/book.model';
class BooksController {
  async post(req: Request, res: Response) {
    if (!req.body.title) {
      return res.status(400).send({ error: 'Title is required' });
    }
    const book = new BookModel(req.body);
    try {
      await book.save();
    } catch (error) {
      return res.status(400).json(error);
    }
    return res.status(201).json(book);
  }

  async getAll(req: Request, res: Response) {
    const query: any = {};
    if (req.query.genre) {
      query.genre = req.query.genre;
    }
    BookModel.find(query, (err, books) => {
      if (err) {
        return res.send(err);
      }

      const returnBooks = books.map((book) => {
        const newBook = book.toJSON();
        newBook.links = {
          self: `http://${req.headers.host}/api/books/${book.id}`,
        };
        return newBook;
      });

      return res.json(returnBooks);
    });
  }
}

export default BooksController;
