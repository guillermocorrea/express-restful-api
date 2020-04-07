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
      return res.json(books);
    });
  }
}

export default BooksController;
