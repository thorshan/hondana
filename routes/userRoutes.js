const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// Call multer for image uploads
const upload = require('../middleware/image');

// Get all users
router.get('/users', userController.getAllUsers);
// Create user
router.post('/users', upload.single("image") ,userController.createUser);
// Get user by Id
router.get('/users/:id', userController.getUser);
// Update user
router.put('/users/:id', upload.single("iamge"), userController.updateUser);
// Delete user
router.delete('/users/:id', userController.deleteUser);

module.exports = router;