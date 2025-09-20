const Book = require('../models/Book');
const User = require('../models/User');
const Author = require('../models/Author');
const Category = require('../models/Category');
const Genre = require('../models/Genre');

// Get all books
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find()
            .populate("author", "name")
            .populate("category", "name")
            .populate("genre", "name");
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ error : err.message });
    }
}

// Create new books
const createBook = async (req, res) => {
    try {
        const { name, author, category, genres, description } = req.body;
        const checkBook = await Book.findOne({ name });
        if(checkBook)
            return res.status(403).json({ message : "Book already exist"});
        const coverAdd = req.body.cover;
        if(req.file){
            coverAdd = req.file.path;
        }
        const book = await Book.create({
            name,
            author,
            category,
            genres,
            cover : coverAdd,
            description
        });
        res.status(200).json({ message : "Book created successfully", book});
    } catch (err) {
        res.status(500).json({ error : err.message });
    }
}

// Get book by Id
const getBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if(!book)
            return res.status(404).json({ message : "Book not found" });
        res.status(200).json(book);
    } catch (err) {
        res.status(500).json({ error : err.message });
    }
}

// Update book
const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, author, category, genres, description } = req.body;
        const updateData = { name, author, category, genres, description }
        if(req.file) {
            updateData.cover = req.file.path;
        }
        const book = await Book.findByIdAndUpdate( id, updateData, { new : true });
        if(!book) 
            return res.status(404).json({ message : "Book not found" });
        res.status(200).json({ message : "Book updated successfully", book});
    } catch (err) {
        res.status(500).json({ error : err.message });
    }
}

// Delete book
const deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if(!book)
            return res.status(404).json({ message : "Book not found"});
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({ message : "Book deleted successfully"});
    } catch (err) {
        res.status(500).json({ error : err.message });
    }
}

module.exports = {
    getAllBooks,
    createBook,
    getBook,
    updateBook,
    deleteBook
}