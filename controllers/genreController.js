const Genre = require('../models/Genre');

// Get all genres
const getAllGenres = async (req, res) => {
    try {
        const genres = await Genre.find().sort({ createdAt : -1 });
        res.status(200).json(genres);
    } catch (err) {
        res.status(500).json({ error : err.message });
    }
}

// Create new genre
const createGenre = async (req, res) => {
    try {
        const { name } = req.body;
        const checkGenre = await Genre.findOne({ name });
        if(checkGenre)
            return res.status(404).json({ message : "Genre already exist"});
        const genre = await Genre.create({ name });
        res.status(200).json({ message : "Genre created successfully", genre});
    } catch (err) {
        res.status(500).json({ error : err.message });
    }
}

// Get genre by Id
const getGenre = async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id);
        if(!genre)
            return res.status(404).json({ message : "Genre not found"});
        res.status(200).json({ genre });
    } catch (err) {
        res.status(500).json({ error : err.message });
    }
}

// Update genre
const updateGenre = async (req, res) => {
    try {
        const {id} = req.params;
        const updateData = req.body;
        const genre = await Genre.findByIdAndUpdate(id, updateData, { new : true });
        if(!genre)
            return res.status(404).json({ message : "Genre not found"})
        res.status(200).json({ message : "Genre updated successfully" , genre});
    } catch (err) {
        res.status(500).json({ error : err.message });
    }
}

// Delete genre
const deleteGenre = async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id);
        if(!genre)
            return res.status(404).json({ message : "Genre not found"});
        await Genre.findByIdAndDelete(req.params.id);
        res.status(200).json({ message : "Genre deleted successfully"});
    } catch (err) {
        res.status(500).json({ error : err.message });
    }
}

module.exports = {
    getAllGenres,
    createGenre,
    getGenre,
    updateGenre,
    deleteGenre
}