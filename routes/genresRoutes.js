const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genreController');

// Get all genres
router.get('/genres', genreController.getAllGenres);
// Create new genre
router.post('/genres', genreController.createGenre);
// Get genre by Id
router.get('/genres/:id', genreController.getGenre);
// Update genre
router.put('/genres/:id', genreController.updateGenre);
// Delete genre
router.delete('/genres/:id', genreController.deleteGenre);

module.exports = router;