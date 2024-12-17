const express = require("express"); // Import Express.js
const app = express();
const PORT = 3000; // Define the port

// Middleware to parse JSON data
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.send("Welcome to the Book Directory API!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
// Sample in-memory data for books
let books = [
  { id: 1, title: "1984", author: "George Orwell" },
  { id: 2, title: "The Alchemist", author: "Paulo Coelho" },
  { id: 3, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
];
app.get("/books", (req, res) => {
  res.json(books);
});
app.get("/books/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((b) => b.id === parseInt(id));

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.json(book);
});
app.post("/books", (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res
      .status(400)
      .json({ message: "Title and author are required fields" });
  }

  const newBook = {
    id: books.length + 1,
    title,
    author,
  };

  books.push(newBook);
  res.status(201).json(newBook);
});
app.put("/books/:id", (req, res) => {
  const { id } = req.params;
  const { title, author } = req.body;

  const book = books.find((b) => b.id === parseInt(id));

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (title) book.title = title;
  if (author) book.author = author;

  res.json(book);
});
app.delete("/books/:id", (req, res) => {
  const { id } = req.params;
  const bookIndex = books.findIndex((b) => b.id === parseInt(id));

  if (bookIndex === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  books.splice(bookIndex, 1);
  res.json({ message: "Book deleted successfully" });
});
