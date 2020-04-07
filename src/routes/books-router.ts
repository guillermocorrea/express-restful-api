import express from 'express';
import BookModel from '../models/book.model';
import BooksController from '../controllers/books.controller';

const bookRouter = express.Router();
const booksController = new BooksController();

bookRouter.route('/books').post(booksController.post).get(booksController.getAll);

bookRouter.use('/books/:bookId', (req, res, next) => {
  BookModel.findById(req.params.bookId, (err, book) => {
    console.log(err, book);
    if (err) {
      return res.status(404).send({ message: 'not found' });
    }
    if (book) {
      req.book = book;
      return next();
    }
    return res.status(404).send({ message: 'not found' });
  });
});
bookRouter
  .route('/books/:bookId')
  .get(async (req, res) => res.json(req.book))
  .put(async (req, res) => {
    const { book } = req;
    book.title = req.body.title;
    book.author = req.body.author;
    book.genre = req.body.genre;
    book.read = req.body.read;
    try {
      await book.save();
      return res.json(book);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  })
  .patch(async (req, res) => {
    const { book } = req;
    if (req.body._id) {
      delete req.body._id;
    }
    Object.entries(req.body).forEach((item) => {
      const key = item[0];
      const value = item[1];
      book[key] = value;
    });
    try {
      await book.save();
      return res.json(book);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  })
  .delete(async (req, res) => {
    console.log(req.book);
    try {
      await req.book.remove();
      return res.sendStatus(204);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  });

export default bookRouter;
