const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt : -1 });
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error : err.message });
    }
}

// Generate Avator
function generateAvatarBase64(name) {
  const colors = ["#FF5733", "#33FF57", "#3357FF", "#FFC300", "#8E44AD"];
  const bg = colors[Math.floor(Math.random() * colors.length)];
  const initial = name ? name.charAt(0).toUpperCase() : "U";

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
      <rect width="100" height="100" fill="${bg}" />
      <text x="50%" y="50%" font-size="40" dy=".3em" text-anchor="middle" fill="#fff">
        ${initial}
      </text>
    </svg>
  `;

  // Convert SVG string to Base64 Data URI
  const base64 = "data:image/svg+xml;base64," + Buffer.from(svg).toString("base64");
  return base64;
}


// Create users
const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const checkUser = await User.findOne({ email });
        if(checkUser)
            return res.status(403).json({ message : "User already exist" });
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password : hashedPassword,
            image : req.file ? req.file.path : generateAvatarBase64(name)

        });
        res.status(200).json({ message : "User created successfully", user});
    } catch (err) {
        res.status(500).json({ error : err.message });
    }
}

// Get user
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user) 
            return res.status(404).json({ message : "User not found" });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error : err.message });
    }
}

// Update user
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;
        const updateData = { name, email }
        if(password) {
            updateData.password = await bcrypt.hash(password, 10);
        }
        if(req.file) {
            updateData.image = req.file.path;
        }
        const user = await User.findByIdAndUpdate( id, updateData, { new : true });
        user.updatedAt = Date.now();
        if(!user)
            return res.status(404).json({ message : "User not found" });
        res.status(200).json({ message : "User updated successfully", user});
    } catch (err) {
        res.status(500).json({ error : err.message });
    }
}

// Delete user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user) 
            return res.status(404).json({ message : "User not found" });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message : "User deleted successfully"});
    } catch (err) {
        res.status(500).json({ error : err.message });
    }
}

module.exports = {
    getAllUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser
}