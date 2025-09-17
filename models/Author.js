const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now()
    }
});

module.exports = mongoose.model('Author', authorSchema);