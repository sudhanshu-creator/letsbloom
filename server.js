const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 4000;

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://admin:admin@bloom.jihuiik.mongodb.net');

    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(1);
  }
};


connectDB();

mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
  closeServer();
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB reconnected');
});

mongoose.connection.on('reconnected', () => {
  console.log('MongoDB reconnected');
});


// Book Schema
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
});
const Book = mongoose.model('Book', bookSchema);

// Middleware
app.use(bodyParser.json());

// Retrieve All Books Endpoint
app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find({});
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a New Book Endpoint
app.post('/api/books', async (req, res) => {
  try {
    const { title, author, genre } = req.body;

    // Validate request payload using Mongoose schema
    const newBook = new Book({ title, author, genre });
    const validationError = newBook.validateSync();

    if (validationError) {
      return res.status(400).json({ error: validationError.message });
    }

    // Check for existing book
    const existingBook = await Book.findOne({ title, author, genre });

    if (existingBook) {
      return res.status(400).json({ error: 'Book already exists' });
    }

    // Save the new book
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ error: 'Bad Request' });
  }
});

// Update Book Details Endpoint
app.put('/api/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, genre } = req.body;

    // Validate the request body against the bookSchema
    const bookData = { title, author, genre };
    const { error } = validateBookData(bookData);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }


    // non existent book error handled
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid book ID' });
    }

    const updatedBook = await Book.findByIdAndUpdate(id, { title, author, genre }, { new: true });

    if (!updatedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json(updatedBook);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
