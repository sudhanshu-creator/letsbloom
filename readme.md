

# Book Management API

This Node.js application uses Express.js and MongoDB (Mongoose) to manage books.

## Getting Started

To run this application locally, follow these steps:

1. Clone this repository.
2. Install dependencies by running: `npm install`
3. Start the server: `npm start`
4. The server will be running on `http://localhost:4000` by default.

## Available Endpoints

### Retrieve All Books

Endpoint: `GET /api/books`

This endpoint retrieves all books stored in the database.

### Add a New Book

Endpoint: `POST /api/books`

To add a new book, send a POST request to this endpoint with the following JSON payload:

```json
{
  "title": "Book Title",
  "author": "Author Name",
  "genre": "Genre"
}
```

### Update Book Details

Endpoint: `PUT /api/books/:id`

To update a book's details, send a PUT request to this endpoint with the book ID (`:id`) in the URL path and provide the updated book information in the request body:

```json
{
  "title": "Updated Title",
  "author": "Updated Author",
  "genre": "Updated Genre"
}
```

## Error Handling

- `400 Bad Request`: Occurs when the request payload is invalid or missing required fields.
- `404 Not Found`: Returned when attempting to update a non-existent book.
- `500 Internal Server Error`: For unexpected server errors.

## Schema Validation

The book schema enforces the following constraints:

- `title`: Required string.
- `author`: Required string.
- `genre`: Required string.

## Dependencies

- express
- mongoose
- body-parser

## Environment Variables

Ensure that the following environment variable is set:

- `PORT`: Specifies the server port. Default is 4000.

## Additional Notes

- The application handles basic validation for adding and updating books based on the defined schema.

```