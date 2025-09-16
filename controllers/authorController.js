const Author = require("../models/Author");

// Get all authors
const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find().sort({ createdAt: -1 });
    res.status(200).json(authors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new author
const createAuthor = async (req, res) => {
  try {
    const { name } = req.body;
    const checkAuthor = await Author.findOne({ name });
    if (checkAuthor)
      return res.status(403).json({ message: "Author already exist" });
    const author = await Author.create({ name });
    res.status(200).json(author);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get author by ID
const getAuthor = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).json({ message: "Author not found" });
    res.status(200).json(author);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update author
const updateAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const author = await Author.findByIdAndUpdate(id, updateData, { new: true });
    if (!author) return res.status(404).json({ message: "Author not found" });
    res.status(200).json({ message: "Author updated successfully", author });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete author
const deleteAuthor = async (req, res) => {
  try {
    const checkAuthor = await Author.findById(req.params.id);
    if (!checkAuthor)
      return res.status(404).json({ message: "Author not found" });
    await Author.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Author deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllAuthors,
  getAuthor,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
