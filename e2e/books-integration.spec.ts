process.env.MONGODB_URI = 'mongodb://localhost:27017/bookAPI_Test';

import 'should';
import request from 'supertest';
import mongoose from 'mongoose';
import app, { server } from '../src/server';

const Book = mongoose.model('Book');
const agent = request.agent(app);

describe('Book Crud Test', () => {
  it('should allow a book to be posted and return read and _id', (done) => {
    const body = { title: 'My Book', author: 'Jon Doe', genre: 'Fiction' };
    agent
      .post('/api/books')
      .send(body)
      .expect(200)
      .end((err, results) => {
        if (err) {
          console.log(err);
        }
        results.body.read.should.equal(false);
        results.body.should.have.property('_id');
        done();
      });
  });

  afterEach((done) => {
    Book.deleteMany({}).exec((err, results) => {
      if (err) {
        console.log(err);
      }
      done();
    });
  });

  after((done) => {
    mongoose.connection.close();
    server.close();
    done();
  });
});
