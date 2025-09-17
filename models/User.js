const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true
    },
    password : {
        type : String,
        required : true,
    },
    role : {
        type : String,
        enum : ['admin', 'moderator', 'user'],
        default : 'user'
    },
    image : {
        type : String,
        default : "default.png"
    },
    createdAt : {
        type : Date,
        default : Date.now()
    },
    updatedAt : {
        type : Date,
        default : Date.now()
    }
});

module.exports = mongoose.model("User", userSchema);