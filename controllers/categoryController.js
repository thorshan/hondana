const Category = require('../models/Category');

// Get all categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ createdAt : -1 });
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ error : err.message });
    }
}

// Create category
const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const checkCategory = await Category.findOne({ name });
        if(checkCategory) 
            return res.status(404).json({ message : "Category already exist" });
        const category = await Category.create({ name });
        res.status(200).json({ message : "Category created successfully", category});
    } catch (err) {
        res.status(500).json({ error : err.message });
    }
}

// Get category by Id
const getCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if(!category)
            return res.status(404).json({ message : "Category not found" });
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({ error : err.message });
    }
}

// Update category
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const category = await Category.findByIdAndUpdate(id, updateData, { new : true });
        if(!category)
            return res.status(404).json({ message : "Category not found" });
        res.status(200).json({ message : "Category updated successfully", category});
    } catch (err) {
        res.status(500).json({ error : err.message });
    }
}

// Update category
const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if(!category) 
            return res.status(404).json({ message : "Category not found "});
        await Category.findByIdAndDelete(req.params.id);
        res.status(200).json({ message : "Category deleted successfully"});
    } catch (err) {
        res.status(500).json({ error : err.message });
    }
}



module.exports = {
    getAllCategories,
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory
}