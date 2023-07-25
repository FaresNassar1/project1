import express from 'express';
import booksData from './data/MOCK_DATA.js';

const app = express();
const port = 3000;

app.use(express.json());
app.get('/books', (req, res) => {
  res.json(booksData);
});
app.get('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const book = booksData.find((book) => book.id === bookId);

  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
});
app.post('/books', (req, res) => {
  const newBook = req.body;

  booksData.push(newBook);

  res.status(201).json({ message: 'Book added successfully', book: newBook });
});
app.put('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const updatedBook = req.body;

  const index = booksData.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    booksData[index] = { ...booksData[index], ...updatedBook };
    res.json({ message: 'Book updated successfully', book: booksData[index] });
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
});
app.delete('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const index = booksData.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    const deletedBook = booksData.splice(index, 1)[0];
    res.json({ message: 'Book deleted successfully', book: deletedBook });
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
});
app.get('/books', (req, res) => {
  const bookName = req.query.name;
  const matchingBooks = booksData.filter((book) => book.name.includes(bookName));
  res.json(matchingBooks);
});
app.get('/books', (req, res) => {
  const publishingYear = req.query.year;
  const matchingBooks = booksData.filter((book) => book.year === publishingYear);
  res.json(matchingBooks);
});
