import BooksController from './books.controller';
import 'should';
import sinon, { SinonSpy } from 'sinon';
import 'mocha';
import { Request, Response, response } from 'express';
import BookModel from '../models/book.model';

describe('BooksController Test', () => {
  describe('Post', () => {
    it('should not allow an empty title on post', async () => {
      const req: Request = {
        body: {
          author: 'Jon Doe',
        },
      } as Request;
      const send = sinon.spy();
      const res = {
        send,
        json: sinon.spy(),
        status: sinon.stub().returns({
          send,
          json: sinon.spy(),
        }),
      };

      sinon.stub(BookModel.prototype, 'save').returns(Promise.resolve());

      const controller = new BooksController();
      await controller.post(req, (res as unknown) as Response);

      res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args[0][0]}`);
      res.send.calledWith({ error: 'Title is required' }).should.equal(true);
    });
  });
});
