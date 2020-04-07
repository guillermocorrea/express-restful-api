import express from 'express';
import { connectDB } from './connect-db';
import bookRouter from './routes/books-router';
import bodyParser from 'body-parser';

const app = express();
const db = connectDB();
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', bookRouter);

// define a route handler for the default home page
app.get('/', (req, res) => {
  res.send('Hello world!!!');
});

// start the Express server
export const server = app.listen(port, () => {
  console.info(`server started at http://localhost:${port}`);
});

export default app;
