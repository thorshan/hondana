require('dotenv').config();
const mongoose = require('mongoose');

const connectDb = async () => {
    try{
        await mongoose.connect(process.env.DB_URI);
        console.log(`MongoDb is connected on ${mongoose.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDb;