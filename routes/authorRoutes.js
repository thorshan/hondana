const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');

// Get all authors
router.get('/authors', authorController.getAllAuthors);
// Create author
router.post('/authors', authorController.createAuthor);
// Get one author
router.get('/authors/:id', authorController.getAuthor);
// Update author
router.put('/authors/:id', authorController.updateAuthor);
// Delete author
router.delete('/authors/:id', authorController.deleteAuthor);

module.exports = router;