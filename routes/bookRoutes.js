const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Get all books
router.get('/books', bookController.getAllBooks);
// Create new book
router.post('/books', bookController.createBook);
// Get book by Id
router.get('/books/:id', bookController.getBook);
// Update book
router.put('/books/:id', bookController.updateBook);
// Delete books
router.delete('/books/:id', bookController.deleteBook);

module.exports = router;