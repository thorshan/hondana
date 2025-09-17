const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Get all categories
router.get('/categories', categoryController.getAllCategories);
// Create category
router.post('/categories', categoryController.createCategory);
// Get category by Id
router.get('/categories/:id', categoryController.getCategory);
// Update category
router.put('/categories/:id', categoryController.updateCategory);
// Delete category
router.delete('/categories/:id', categoryController.deleteCategory);

module.exports = router;