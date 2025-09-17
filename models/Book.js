const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Author',
        required : true
    },
    genres : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Genres',
        required : true
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category',
        required : true
    },
    description : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now()
    }
});

module.exports = mongoose.model('Book', bookSchema);